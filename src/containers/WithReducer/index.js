import React from "react";
import PropTypes from "prop-types";
import hoistNonReactStatics from "hoist-non-react-statics";
import createReducer from "../../store/rootReducer";

function injectReducerFactory(store) {
  return function injectReducer(key, reducer) {
    // Check `store.injectedReducers[key] === reducer` for hot reloading when a key is the same but a reducer is different
    if (
      Reflect.has(store.asyncReducers, key) &&
      store.asyncReducers[key] === reducer
    )
      return;

    store.asyncReducers[key] = reducer; // eslint-disable-line no-param-reassign
    store.replaceReducer(createReducer(store.asyncReducers));
  };
}

export default function withReducer({ key, reducer }) {
  return WrappedComponent => {
    class ReducerInjector extends React.Component {
      constructor(props, context) {
        super(props, context);
        this.inject = injectReducerFactory(context.store);
      }

      componentWillMount() {
        this.inject(key, reducer);
      }

      render() {
        return <WrappedComponent {...this.props} />;
      }
    }

    ReducerInjector.displayName = `withReducer(${WrappedComponent.displayName})`;
    ReducerInjector.contextTypes = {
      store: PropTypes.object,
    };

    return hoistNonReactStatics(ReducerInjector, WrappedComponent);
  };
}
