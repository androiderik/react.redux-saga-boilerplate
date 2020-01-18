import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import React from "react";
import { bindActionCreators, compose } from "redux";

import withSaga, { DAEMON } from "../WithSaga";
import withReducer from "../WithReducer";
import { loadMessage } from "./actions";
import loginSaga from "./sagas";
import reducer from "./reducer";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.loadMessage();
  }

  render() {
    const { message } = this.props.welcomeMessage.login;
    return (
      <>
        <h1>{message} </h1>
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    welcomeMessage: state
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators({ loadMessage }, dispatch);

export default compose(
  withReducer({ key: "login", reducer }),
  withSaga({ key: "login", saga: loginSaga, mode: DAEMON }),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(withRouter(Login));
