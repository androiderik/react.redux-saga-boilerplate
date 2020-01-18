/* eslint-disable no-param-reassign */
import React from "react";
import PropTypes from "prop-types";
import hoistNonReactStatics from "hoist-non-react-statics";

export const DAEMON = "DAEMON";
export const RESTART_ON_REMOUNT = "RESTART_ON_REMOUNT";
export const ONCE_TILL_UNMOUNT = "ONCE_TILL_UNMOUNT";

function injectSagaFactory(store) {
  return function injectSaga(key, descriptor = {}, args) {
    const newDescriptor = {
      ...descriptor,
      mode: descriptor.mode || RESTART_ON_REMOUNT,
    };
    const { saga, mode } = newDescriptor;
    let hasSaga = Reflect.has(store.asyncSagas, key);

    if (process.env.NODE_ENV !== "production") {
      const oldDescriptor = store.asyncSagas[key];
      // enable hot reloading of daemon and once-till-unmount sagas
      if (hasSaga && oldDescriptor.saga !== saga) {
        oldDescriptor.task.cancel();
        hasSaga = false;
      }
    }

    if (
      !hasSaga ||
      (hasSaga && mode !== DAEMON && mode !== ONCE_TILL_UNMOUNT)
    ) {
      store.asyncSagas[key] = {
        // eslint-disable-line no-param-reassign
        ...newDescriptor,
        task: store.runSaga(saga, args),
      }; // eslint-disable-line no-param-reassign
    }
  };
}

function ejectSagaFactory(store) {
  return function ejectSaga(key) {
    if (Reflect.has(store.asyncSagas, key)) {
      const descriptor = store.asyncSagas[key];
      if (descriptor.mode && descriptor.mode !== DAEMON) {
        descriptor.task.cancel();
        // Clean up in production; in development we need `descriptor.saga` for hot reloading
        if (process.env.NODE_ENV === "production") {
          // Need some value to be able to detect `ONCE_TILL_UNMOUNT` sagas in `injectSaga`
          store.asyncSagas[key] = "done"; // eslint-disable-line no-param-reassign
        }
      }
    }
  };
}

/**
 * Dynamically injects a saga, passes component's props as saga arguments
 *
 * @param {string} key A key of the saga
 * @param {function} saga A root saga that will be injected
 * @param {string} [mode] By default (constants.RESTART_ON_REMOUNT) the saga will be started on component mount and
 * cancelled with `task.cancel()` on component un-mount for improved performance. Another two options:
 *   - constants.DAEMON—starts the saga on component mount and never cancels it or starts again,
 *   - constants.ONCE_TILL_UNMOUNT—behaves like 'RESTART_ON_REMOUNT' but never runs it again.
 *
 */
export default function withSaga({ key, saga, mode }) {
  return WrappedComponent => {
    class InjectSaga extends React.Component {
      constructor(props, context) {

        super(props, context);

        this.eject = ejectSagaFactory(context.store);
        this.inject = injectSagaFactory(context.store);
      }

      componentWillMount() {
        this.inject(key, { saga, mode }, this.props);
      }

      componentWillUnmount() {
        this.eject(key);
      }

      render() {
        return <WrappedComponent {...this.props} />;
      }
    }

    InjectSaga.displayName = `withSaga(${WrappedComponent.displayName})`;
    InjectSaga.contextTypes = {
      store: PropTypes.object.isRequired,
    };

    return hoistNonReactStatics(InjectSaga, WrappedComponent);
  };
}
