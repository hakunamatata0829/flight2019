import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Security } from '@okta/okta-react';

import './index.css';
import config from './app.config';
import App from './App';
import * as serviceWorker from './serviceWorker';
import 'semantic-ui/dist/semantic.min.css';

function onAuthRequired({ history }) {
  history.push('/login');
}

ReactDOM.render(
  <Router>
    <Security
      issuer={config.issuer}
      client_id={config.client_id}
      redirect_uri={config.redirect_uri}
      onAuthRequired={onAuthRequired}
    >
      <App />
    </Security>
  </Router>,
  document.getElementById('root')
);
serviceWorker.unregister();
