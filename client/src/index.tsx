import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.scss';
import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './app/store';
import Authorization from './routes/Authorization';
import GalleryRoute from './routes/GalleryRoute';
import LoginRoute from './routes/LoginRoute';
import HealthCheck from './routes/HealthCheck';

const root = createRoot(document.getElementById('root') as Element);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Authorization loginPage={false} path={<GalleryRoute />} />} />
          <Route path="/login" element={<Authorization loginPage path={<LoginRoute />} />} />
          <Route path="/status" element={<HealthCheck />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
);
