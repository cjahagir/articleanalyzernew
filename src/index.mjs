import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './frontend/frontend.mjs'; // Correct the import path

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
