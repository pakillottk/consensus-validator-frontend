import React, { Component } from 'react';
import './App.css';

import { Route } from 'react-router'
import { ConnectedRouter } from 'react-router-redux'
import { Provider } from 'react-redux'
import { store, history } from './redux/store'

import ThemeStyles from './components/ui/ThemeStyles'
import UIThemeProvider from './components/ui/UIThemeProvider'

import LoginGuard from './components/loginGuard/LoginGuard';
import LoginPage from './pages/LoginPage'
import SessionsPage from './pages/SessionsPage'

import { Any } from './components/auth/authLevels';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <UIThemeProvider theme={ThemeStyles}>
          <ConnectedRouter history={history}>
            <div>
                <Route path='/' component={LoginGuard} />
                <Route exact path="/" component={LoginPage} />
                <Route path="/sessions" component={Any(SessionsPage)} />
            </div>
          </ConnectedRouter>
        </UIThemeProvider>
      </Provider>
    );
  }
}

export default App;