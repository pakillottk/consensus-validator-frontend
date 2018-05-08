import React, { Component } from 'react';
import './App.css';

import { Route } from 'react-router'
import { ConnectedRouter } from 'react-router-redux'
import { Provider } from 'react-redux'
import { store, history } from './redux/store'

import ThemeStyles from './components/ui/ThemeStyles'
import UIThemeProvider from './components/ui/UIThemeProvider'
import Layout from './components/ui/Layout';
import Navigation from './components/navigation/Navigation'

import LoginGuard from './components/loginGuard/LoginGuard';
import LoginPage from './pages/LoginPage'
import SessionsPage from './pages/SessionsPage'
import SessionPage from './pages/SessionPage'
import SessionAdminPage from './pages/SessionAdminPage'
import CompaniesPage from './pages/CompaniesPage'
import UsersPage from './pages/UsersPage'
import TicketOfficePage from './pages/TicketOfficePage'
import MonitorPage from './pages/MonitorPage'
import SummaryPage from './pages/SummaryPage'

import UISetup from './pages/UISetup'

import { Any, Seller, Supervisor, Super, Admin } from './components/auth/authLevels'

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <UIThemeProvider theme={ThemeStyles}>
          <ConnectedRouter history={history}>
            <div>
                <Layout Navigation={Navigation}>
                  <Route exact path='/ui' component={UISetup} />
                  <Route path='/' component={LoginGuard} />
                  <Route exact path="/" component={LoginPage} />
                  <Route exact path="/sesiones" component={Any(SessionsPage)} />
                  <Route exact path="/sesiones/:id" component={Any(SessionPage)} />
                  <Route exact path="/sesiones/:id/administrar" component={Supervisor(SessionAdminPage)} />
                  <Route exact path="/sesiones/:id/taquilla" component={Seller(TicketOfficePage)} />
                  <Route exact path="/sesiones/:id/monitor" component={Supervisor(MonitorPage)} />
                  <Route exact path="/resumen" component={Seller(SummaryPage)} />
                  <Route exact path="/companias" component={Super(CompaniesPage)} />
                  <Route exact path="/usuarios" component={Admin(UsersPage)} />
                </Layout>
            </div>
          </ConnectedRouter>
        </UIThemeProvider>
      </Provider>
    );
  }
}

export default App;