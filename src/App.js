import React, { Component } from 'react';
import './App.css';

import { Route } from 'react-router'
import { ConnectedRouter } from 'react-router-redux'
import { Provider } from 'react-redux'
import { store, history } from './redux/store'

import ThemeStyles from './components/ui/ThemeStyles'
import UIThemeProvider from './components/ui/UIThemeProvider'

import LoginPage from './pages/LoginPage';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <UIThemeProvider theme={ThemeStyles}>
          <ConnectedRouter history={history}>
            <div>
              <Route exact path="/" component={LoginPage} />
            </div>
          </ConnectedRouter>
        </UIThemeProvider>
      </Provider>
    );
  }
}

export default App;