import React, { Component } from 'react';
import './App.css';

import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import { Provider } from 'react-redux'
import { store } from './redux/store'

import ThemeStyles from './components/ui/ThemeStyles'
import UIThemeProvider from './components/ui/UIThemeProvider'
import Layout from './components/ui/Layout';
import Navigation from './components/navigation/Navigation'

import LoginGuard from './components/loginGuard/LoginGuard';
import LoginPage from './pages/LoginPage'
import RecintsPage from './pages/RecintsPage'
import RecintEditorPage from './pages/RecintEditorPage'
import SessionsPage from './pages/SessionsPage'
import SessionPage from './pages/SessionPage'
import SessionAdminPage from './pages/SessionAdminPage'
import CompaniesPage from './pages/CompaniesPage'
import UsersPage from './pages/UsersPage'
import TicketOfficePage from './pages/TicketOfficePage'
import RecintStateMonitorPage from './pages/RecintStateMonitorPage'
import MonitorPage from './pages/MonitorPage'
import AnalyzerPage from './pages/AnalyzerPage'
import SummaryPage from './pages/SummaryPage'

import UISetup from './pages/UISetup'
import LegacyRouteAdapter from './router/LegacyRouteAdapter';

import { Any, Seller, Supervisor, Super, Admin } from './components/auth/authLevels'

const AnySessionsPage = Any(SessionsPage);
const AnySessionPage = Any(SessionPage);
const AnyRecintStateMonitorPage = Any(RecintStateMonitorPage);
const SuperRecintsPage = Super(RecintsPage);
const SuperRecintEditorPage = Super(RecintEditorPage);
const SuperCompaniesPage = Super(CompaniesPage);
const SuperUsersPage = Super(UsersPage);
const AdminSessionAdminPage = Admin(SessionAdminPage);
const AdminAnalyzerPage = Admin(AnalyzerPage);
const SupervisorMonitorPage = Supervisor(MonitorPage);
const SellerTicketOfficePage = Seller(TicketOfficePage);
const SellerSummaryPage = Seller(SummaryPage);

const RoutedLayout = ({ children }) => {
  const location = useLocation();
  return (
    <Layout Navigation={Navigation} pathname={location.pathname}>
      {children}
    </Layout>
  );
};

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <UIThemeProvider theme={ThemeStyles}>
          <BrowserRouter>
            <div>
              <LegacyRouteAdapter Component={LoginGuard} />
              <RoutedLayout>
                <Routes>
                  <Route path='/ui' element={<LegacyRouteAdapter Component={UISetup} />} />
                  <Route path='/' element={<LegacyRouteAdapter Component={LoginPage} />} />
                  <Route path='/recintos' element={<LegacyRouteAdapter Component={SuperRecintsPage} />} />
                  <Route path='/recintos/:id' element={<LegacyRouteAdapter Component={SuperRecintEditorPage} />} />
                  <Route path='/sesiones' element={<LegacyRouteAdapter Component={AnySessionsPage} />} />
                  <Route path='/sesiones/:id' element={<LegacyRouteAdapter Component={AnySessionPage} />} />
                  <Route path='/sesiones/:id/administrar' element={<LegacyRouteAdapter Component={AdminSessionAdminPage} />} />
                  <Route path='/sesiones/:id/taquilla' element={<LegacyRouteAdapter Component={SellerTicketOfficePage} />} />
                  <Route path='/sesiones/:id/recinto' element={<LegacyRouteAdapter Component={AnyRecintStateMonitorPage} />} />
                  <Route path='/sesiones/:id/monitor' element={<LegacyRouteAdapter Component={SupervisorMonitorPage} />} />
                  <Route path='/sesiones/:id/analizador' element={<LegacyRouteAdapter Component={AdminAnalyzerPage} />} />
                  <Route path='/resumen' element={<LegacyRouteAdapter Component={SellerSummaryPage} />} />
                  <Route path='/companias' element={<LegacyRouteAdapter Component={SuperCompaniesPage} />} />
                  <Route path='/usuarios' element={<LegacyRouteAdapter Component={SuperUsersPage} />} />
                </Routes>
              </RoutedLayout>
            </div>
          </BrowserRouter>
        </UIThemeProvider>
      </Provider>
    );
  }
}

export default App;