import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import MasterProvider from './Context.jsx/Context.jsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from './components/Login.jsx';
import Logout from './components/Logout.jsx';
import User from './components/User.jsx';
import Sign from './components/Sign.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/user',
    element: <User />,
  },
  {
    path: '/logout',
    element: <Logout />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/sign',
    element: <Sign />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <MasterProvider>
      <RouterProvider router={router} />
    </MasterProvider>
  </React.StrictMode>
);
