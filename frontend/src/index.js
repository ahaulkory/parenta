import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Si vous souhaitez que votre application fonctionne hors ligne et se charge plus rapidement,
// vous pouvez modifier unregister() pour register() ci-dessous.
serviceWorkerRegistration.register();

// Pour mesurer les performances de votre application
reportWebVitals();
