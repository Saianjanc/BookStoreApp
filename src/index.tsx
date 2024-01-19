import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import LandPage from './Components/LandPage';
import BooksContainer from './Components/BooksContainer';
import Home from './Components/Home';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

let router = createBrowserRouter([
  {
      path:'/',
      element:<Home/>,
      children:[
        {
          path:'home',
          element:<BooksContainer/>,
        },
        {
          path:'profile',
          element:<LandPage/>
        }
      ]
  }
])

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);