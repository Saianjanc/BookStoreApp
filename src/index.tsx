import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import AuthPage from './Components/AuthPage';
import BooksContainer from './Components/BooksContainer';
import Home from './Components/Home';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import BookDetails from './Components/BookDetails';
import Cart from './Components/Cart';

let router = createBrowserRouter([
  {
    path:'/',
    element:<AuthPage/>
  },
  {
    path:'/book',
    element:<Home/>,
    children:[
      {
        path:'',
        element:<BooksContainer/>,
      },
      {
        path:':bookId',
        element:<BookDetails/>,
      },
      {
        path:'cart',
        element:<Cart/>,
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