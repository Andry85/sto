import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import {ContextProvider, GoogleContextProvider} from './context/Context';

ReactDOM.render(
  <React.StrictMode>
    <ContextProvider>
      <GoogleContextProvider>
        <App />
      </GoogleContextProvider>
    </ContextProvider> 
  </React.StrictMode>,
  document.getElementById('root')
);

