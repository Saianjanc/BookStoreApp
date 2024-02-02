import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import AuthPage from './Components/AuthPage';
import BooksContainer from './Components/BooksContainer';
import Home from './Components/Home';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import BookDetails from './Components/BookDetails';
import Cart from './Components/Cart';
import WishList from './Components/WishList';
import MyOrders from './Components/MyOrders';
import SuccessPage from './Components/SuccessPage';
import ProfilePage from './Components/ProfilePage';

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
        element:<BooksContainer/>
      },
      {
        path:':bookId',
        element:<BookDetails/>
      },
      {
        path:'cart',
        element:<Cart/>
      },
      {
        path:'wishlist',
        element:<WishList/>
      },
      {
        path:'orders',
        element:<MyOrders/>
      },
      {
        path:'orderplaced',
        element:<SuccessPage/>
      },
      {
        path:'profile',
        element:<ProfilePage/>
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