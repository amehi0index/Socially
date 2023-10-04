import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

import { Amplify } from 'aws-amplify';
import config from './aws-exports';
Amplify.configure(config);


const isLocalhost = Boolean(
  window.location.hostname === 'localhost' ||
    // [::1] is the IPv6 localhost address.
    window.location.hostname === '[::1]' ||
    // 127.0.0.1/8 is considered localhost for IPv4.
    window.location.hostname.match(
      /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
    )
);

// by default, say it's localhost
const oauth = {
  domain: 'socially3fe368ff-3fe368ff-dev.auth.us-west-2.amazoncognito.com',
  scope: ['phone', 'email', 'profile', 'openid', 'aws.cognito.signin.user.admin'],
  redirectSignIn: 'http://localhost:3000/',
  redirectSignOut: 'http://localhost:3000/',
  responseType: 'code' // or 'token', note that REFRESH token will only be generated when the responseType is code
};

// if not, update the URLs
if (!isLocalhost) {
  oauth.redirectSignIn = 'https://main.d2mpmmgvvwzzqh.amplifyapp.com//';
  oauth.redirectSignOut = 'https://main.d2p4v1a9bpr5tk.amplifyapp.com/';
}

// copy the constant config (aws-exports.js) because config is read only.
var configUpdate = config;
// update the configUpdate constant with the good URLs
configUpdate.oauth = oauth;
// Configure Amplify with configUpdate
// Amplify.Logger.LOG_LEVEL = "DEBUG"
Amplify.configure(configUpdate);


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

