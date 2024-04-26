import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { MantineProvider } from '@mantine/core';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './Store/store';
import LoginComponent from './Components/Login/LoginComponent';
import LoginErrorComponent from './Components/Login/LoginErrorComponent';
import LoginSuccessComponent from './Components/Login/LoginSuccessComponent';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const isAuthenticated = true;

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <MantineProvider defaultColorScheme='dark'>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </MantineProvider>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
// 