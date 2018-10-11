import { render } from 'react-dom';
import App from './app.jsx'
import React from 'react'
import ReactDOM from 'react-dom';

import styles from './scss/application.scss'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const ThemedApp = () => (
  <MuiThemeProvider>
    <App />
  </MuiThemeProvider>
);

render(
  <ThemedApp/>, document.getElementById('root'),
);

