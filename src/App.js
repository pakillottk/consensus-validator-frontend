import React, { Component } from 'react';
import './App.css';

import { Route } from 'react-router'
import { ConnectedRouter } from 'react-router-redux'
import { Provider } from 'react-redux'
import { store, history } from './redux/store'

import ThemeStyles from './components/ui/ThemeStyles'
import UIThemeProvider from './components/ui/UIThemeProvider'

import LoginPage from './pages/LoginPage'

import Connection from './communication/connections/Connection'
import JSONHeaders from './communication/headers/StandardJsonHeaders'
import AuthTokenRouter from './communication/routers/AuthTokenRouter'

import { env } from './env'

const APIConnection = new Connection( env.api.protocol, env.api.host, env.api.port, new JSONHeaders() );
const AuthRouter = new AuthTokenRouter( APIConnection, {
  login: '/login'
});

(async () => {
  await AuthRouter.attemptLogin({
    ...env.auth,
    username: 'root',
    password: 'root'
  });
  
  const me = await APIConnection.get( '/me' );
  console.log( me.data );
})();

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <UIThemeProvider theme={ThemeStyles}>
          <ConnectedRouter history={history}>
            <div>
              <Route exact path="/" component={LoginPage} />
              <Route path="/sessions" component={null} />
            </div>
          </ConnectedRouter>
        </UIThemeProvider>
      </Provider>
    );
  }
}

export default App;