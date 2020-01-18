import React from 'react';
import { Switch, Route } from "react-router-dom";
import Login from '../Login';

/**
 * This component render all the routes and components of the project 
 */
class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Switch>
        <Route exact path="/" component={Login} />
      </Switch>
    );
    
    
  }
};

export default App;