import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Bootstrap CSS et JS (importés ici comme mentionné dans votre requête)
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

// Font Awesome pour les icônes
import '@fortawesome/fontawesome-free/css/all.min.css';

// CSS personnalisé global
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);