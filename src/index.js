import React from 'react'
import ReactDOM from 'react-dom'
import { ConnectedRouter } from "react-router-redux";
// import { ConnectedRouter } from 'connected-react-router'

import * as serviceWorker from './serviceWorker';
import { ThemeProvider } from 'styled-components';
import { Provider } from 'react-redux';
import { createBrowserHistory } from "history";


import App from './containers/App';
import theme from './utils/theme';
import GlobalStyles from  './global-styles';
import configureStore from './store/dev-configStore'

const browserHistory = createBrowserHistory();
const initialState = {};

const store = configureStore(initialState, browserHistory);

// Does the user's browser support the HTML5 history API?
// If the user's browser doesn't support the HTML5 history API then we
// will force full page refreshes on each page change.
const supportsHistory = "pushState" in window.history;

function render() {
  const app = (
     <Provider store={store}>
        <ConnectedRouter  history={browserHistory} forceRefresh={!supportsHistory} >
          <ThemeProvider theme={theme} >
            <GlobalStyles />
            <App />
          </ThemeProvider>
        </ConnectedRouter>
      </Provider>
  
  )
  ReactDOM.render(app, document.getElementById('app'))
  
}

render();
serviceWorker.unregister();