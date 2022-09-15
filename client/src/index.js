import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import {GoogleContextProvider} from './context/Context';

ReactDOM.render(
  <React.StrictMode>
    <GoogleContextProvider>
      <App />
    </GoogleContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
