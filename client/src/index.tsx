import React from 'react';
import ReactDOM from 'react-dom';
import './scss/index.scss';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import Authorization from './routes/Authorization';
import GalleryRoute from './routes/GalleryRoute';
import LoginRoute from './routes/LoginRoute';
import HealthCheck from './routes/HealthCheck';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Authorization loginPage={false} path={<GalleryRoute />} />} />
        <Route path="/login" element={<Authorization loginPage={true} path={<LoginRoute />} />} />
        <Route path="/status" element={<HealthCheck />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);