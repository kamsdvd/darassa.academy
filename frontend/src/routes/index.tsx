import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';

const AppRoutes = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      {/* Ajouter d'autres routes ici */}
    </Routes>
  </BrowserRouter>
);

export default AppRoutes; 