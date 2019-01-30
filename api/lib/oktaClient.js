const okta = require('@okta/okta-sdk-nodejs');

const client = new okta.Client({
  orgUrl: 'https://dev-712703.oktapreview.com',
  token: '00TEGmUWwdB1KvW40bJyVVSoeWNOXYSt22xsb1dozm'
});

module.exports = client;