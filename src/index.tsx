import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import LandPage from './Components/LandPage';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <LandPage/>
  </React.StrictMode>
);