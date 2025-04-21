import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import authService from '../../services/auth.service';

const PrivateRoute = () => {
  // Si l'utilisateur est connecté, rendre les routes enfants
  // Sinon, rediriger vers la page de connexion
  return authService.isLoggedIn() ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;