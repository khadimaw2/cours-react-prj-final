import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import authService from '../../services/auth.service';

const Navbar = () => {
  const navigate = useNavigate();
  const isLoggedIn = authService.isLoggedIn();

  const handleLogout = () => {
    authService.logout();
    navigate('/login');
  };

  if (!isLoggedIn) return null;

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-success shadow-sm">
      <div className="container">
        <Link className="navbar-brand fw-bold d-flex align-items-center" to="/videos">
          <i className="fas fa-play-circle me-2"></i>
          Streaming App
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link d-flex align-items-center" to="/videos">
                <i className="fas fa-film me-2"></i> Vidéos
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link d-flex align-items-center" to="/video-list">
                <i className="fas fa-list me-2"></i> Liste des vidéos
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link d-flex align-items-center" to="/users">
                <i className="fas fa-users me-2"></i> Utilisateurs
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link d-flex align-items-center" to="/add-video">
                <i className="fas fa-plus me-2"></i> Ajouter vidéo
              </Link>
            </li>
          </ul>
          <div className="d-flex">
            <button
              className="btn btn-outline-light rounded-pill px-3"
              onClick={handleLogout}
            >
              <i className="fas fa-sign-out-alt me-2"></i> Déconnexion
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
