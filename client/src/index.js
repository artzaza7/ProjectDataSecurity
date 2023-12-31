import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
// import App from './App';
import reportWebVitals from './reportWebVitals';

// import extra
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
// import components
import Login from './components/pages/Login/Login'
import Register from './components/pages/Register/Register';
import ForgotPassword from './components/pages/ForgotPassword/ForgotPassword';
import Index from './components/pages/Index/Index';
import AddTask from './components/pages/AddTask/AddTask';
import Navbar from './components/pages/Navbar/Navbar';
import MainScreen from './components/pages/MainScreen/MainScreen';
import UpdateTask from './components/pages/UpdateTask/UpdateTask';
import ErrorPage from './components/pages/ErrorPage/ErrorPage';
import Unauthorized from './components/pages/Unauthorized/Unauthorized';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />
  },
  {
    path: "/register",
    element: <Register />
  },
  {
    path: "/forgotpassword",
    element: <ForgotPassword />
  },
  {
    path: "/index",
    element: <Index />
  },
  {
    path: "/addtask",
    element: <AddTask />
  },
  {
    path: "/navbar",
    element: <Navbar />
  },
  {
    path: "/mainscreen",
    element: <MainScreen />
  },
  {
    path: "/updatetask/:id",
    element: <UpdateTask />
  },
  {
    path: "/unauthorized",
    element: <Unauthorized />
  },
  {
    path: "*",
    element: <ErrorPage />
  },
  
  
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
