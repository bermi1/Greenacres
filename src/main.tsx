import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import App from './App';
import { LangProvider } from './lib/i18n';
import './index.css';

// The shareable preview runs inside a frame where only in-app navigation works.
const Router = import.meta.env.VITE_PREVIEW === '1' ? MemoryRouter : BrowserRouter;

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Router>
      <LangProvider>
        <App />
      </LangProvider>
    </Router>
  </React.StrictMode>,
);
