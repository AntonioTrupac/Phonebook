import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import FetchContext from './context/FetchContext';

ReactDOM.render(
  <React.StrictMode>
    <FetchContext>
      <App />
    </FetchContext>
  </React.StrictMode>,
  document.getElementById('root')
);
