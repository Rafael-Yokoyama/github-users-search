import React from 'react';
import ReactDOM from 'react-dom';
import './styles/global.css';
import App from './App';
import { GithubProvider } from './context';

ReactDOM.render(
  <React.StrictMode>
   <GithubProvider>
    <App />
    </GithubProvider>
  </React.StrictMode>,
  document.getElementById('root')
);


