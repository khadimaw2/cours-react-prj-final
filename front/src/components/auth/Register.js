import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import authService from '../../services/auth.service';
import { isValidEmail, isStrongPassword } from '../../utils/authUtils';

const Register = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { email, password, confirmPassword } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    if (!email || !password || !confirmPassword) {
      setError('Tous les champs sont obligatoires');
      return false;
    }
    if (!isValidEmail(email)) {
      setError('Veuillez entrer une adresse email valide');
      return false;
    }
    if (!isStrongPassword(password)) {
      setError(
        'Le mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule et un chiffre'
      );
      return false;
    }
    if (password !== confirmPassword) {
      setError('Les mots de passe ne correspondent pas');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      const response = await authService.register(email, password);
      setSuccess(response.message || 'Inscription réussie! Vous pouvez maintenant vous connecter.');
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (err) {
      setError(err.error || "Une erreur est survenue lors de l'inscription");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5 mb-5">
      <div className="row justify-content-center">
        <div className="col-md-7 col-lg-6">
          <div className="card shadow-lg border-0 rounded-4">
            <div className="card-header bg-success text-white rounded-top-4">
              <h3 className="mb-0 text-center">Créer un compte</h3>
            </div>
            <div className="card-body px-4 py-4">
              {error && (
                <div className="alert alert-danger fade show" role="alert">
                  {error}
                </div>
              )}
              {success && (
                <div className="alert alert-success fade show" role="alert">
                  {success}
                </div>
              )}
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Adresse Email</label>
                  <div className="input-group">
                    <span className="input-group-text"><i className="fas fa-envelope"></i></span>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      name="email"
                      value={email}
                      onChange={handleChange}
                      placeholder="ex: exemple@mail.com"
                      required
                    />
                  </div>
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">Mot de passe</label>
                  <div className="input-group">
                    <span className="input-group-text"><i className="fas fa-lock"></i></span>
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      name="password"
                      value={password}
                      onChange={handleChange}
                      placeholder="Minimum 8 caractères"
                      required
                    />
                  </div>
                  <small className="form-text text-muted">
                    Inclure majuscule, minuscule et chiffre.
                  </small>
                </div>
                <div className="mb-4">
                  <label htmlFor="confirmPassword" className="form-label">Confirmation du mot de passe</label>
                  <div className="input-group">
                    <span className="input-group-text"><i className="fas fa-check"></i></span>
                    <input
                      type="password"
                      className="form-control"
                      id="confirmPassword"
                      name="confirmPassword"
                      value={confirmPassword}
                      onChange={handleChange}
                      placeholder="Confirmez le mot de passe"
                      required
                    />
                  </div>
                </div>
                <div className="d-grid">
                  <button
                    type="submit"
                    className="btn btn-success btn-lg rounded-3"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                        Inscription en cours...
                      </>
                    ) : (
                      "S'inscrire"
                    )}
                  </button>
                </div>
              </form>
              <div className="mt-4 text-center">
                <p className="mb-0">
                  Déjà inscrit ?{' '}
                  <Link to="/login" className="text-success fw-bold text-decoration-none">
                    Se connecter ici
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
