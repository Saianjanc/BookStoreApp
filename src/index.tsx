import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import AuthPage from './Components/AuthPage';
import BooksContainer from './Components/BooksContainer';
import Home from './Components/Home';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

let router = createBrowserRouter([
  {
    path:'/',
    element:<AuthPage/>
  },
  {
    path:'/home',
    element:<Home/>,
    children:[
      {
        path:'',
        element:<BooksContainer/>,
      }
      ]
  }
])

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
    <RouterProvider router={router} />
);