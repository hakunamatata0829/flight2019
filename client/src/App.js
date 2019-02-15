import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { SecureRoute, ImplicitCallback } from '@okta/okta-react';

import Navigation from './components/shared/Navigation';
import HomePage from './components/home/HomePage';
import RegistrationForm from './components/auth/RegistrationForm';
import config from './app.config';
import LoginPage from './components/auth/LoginPage';

import AircraftPage from './components/subpage/Aircraft';
import CrewPage from './components/subpage/Crew';
import MaintennacePage from './components/subpage/Maintenance';
import SalesPage from './components/subpage/Sales';
import MovementsPage from './components/subpage/Movements';
import ElearningPage from './components/subpage/Elearning';

import AircraftEdit from './components/subpage/AircraftEdit';

import './App.css';

class App extends Component {
  render() {
    return (
      <div className="wrapper">
        <Navigation />
        <main>
          <Route path='/' exact component={HomePage} />
          <Route
            path="/login"
            render={() => <LoginPage baseUrl={config.url} />}
          />
          <Route path="/implicit/callback" component={ImplicitCallback} />
          <Route path="/register" component={RegistrationForm} />
          <SecureRoute path="/aircraft" component={AircraftPage} />
          <SecureRoute path="/crew" component={CrewPage} />
          <SecureRoute path="/maintenance" component={MaintennacePage} />
          <SecureRoute path="/sales" component={SalesPage} />
          <SecureRoute path="/movements" component={MovementsPage} />
          <SecureRoute path="/elearning" component={ElearningPage} />
          <SecureRoute path="/aircraftcreate" component={AircraftEdit} />
         
        </main>
      </div>
    );
  }
}

export default App;
