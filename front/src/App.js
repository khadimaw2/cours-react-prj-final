import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Composants du layout
import Navbar from './components/layout/Navbar';
import PrivateRoute from './components/layout/PrivateRoute';

// Composants d'authentification
import Login from './components/auth/Login';
import Register from './components/auth/Register';

// Composants de vidéos
import VideoGrid from './components/videos/VideoGrid';
import VideoList from './components/videos/VideoList';
import AddVideo from './components/videos/AddVideo';

// Composants utilisateurs
import UserList from './components/users/UsersList';

// Services
import authService from './services/auth.service';

function App() {
  const isAuthenticated = authService.isLoggedIn();

  return (
    <Router data-bs-theme="dark">
      <div className="App">
        {/* Navbar - sera affichée uniquement si l'utilisateur est connecté */}
        <Navbar />
        
        <div className="content-container">
          <Routes>
            {/* Route par défaut - redirige vers /videos si authentifié, sinon vers /login */}
            <Route 
              path="/" 
              element={isAuthenticated ? <Navigate to="/videos" /> : <Navigate to="/login" />} 
            />

            {/* Routes publiques */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Routes protégées */}
            <Route element={<PrivateRoute />}>
              <Route path="/videos" element={<VideoGrid />} />
              <Route path="/video-list" element={<VideoList />} />
              <Route path="/add-video" element={<AddVideo />} />
              <Route path="/users" element={<UserList />} />
            </Route>

            {/* Route 404 - redirige vers /videos si authentifié, sinon vers /login */}
            <Route 
              path="*" 
              element={isAuthenticated ? <Navigate to="/videos" /> : <Navigate to="/login" />} 
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;