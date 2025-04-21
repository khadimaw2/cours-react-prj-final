import api from './api';

const AUTH_PATH = '/auth';

const authService = {
  // Inscription d'un nouvel utilisateur
  register: async (email, password) => {
    try {
      const response = await api.post(`${AUTH_PATH}/signUp`, {
        email,
        password
      });
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : new Error('Erreur de serveur');
    }
  },

  // Connexion d'un utilisateur
  login: async (email, password) => {
    try {
      const response = await api.post(`${AUTH_PATH}/login`, {
        email,
        password
      });
      
      // Stocker le token dans le localStorage
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
      }
      
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : new Error('Erreur de serveur');
    }
  },

  // Déconnexion de l'utilisateur
  logout: () => {
    localStorage.removeItem('token');
  },

  // Mettre à jour le mot de passe
  updatePassword: async (email, currentPassword, newPassword) => {
    try {
      const response = await api.put(`${AUTH_PATH}/updatePassword`, {
        email,
        currentPassword,
        newPassword
      });
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : new Error('Erreur de serveur');
    }
  },

  // Supprimer le compte
  deleteAccount: async (password) => {
    try {
      const response = await api.delete(`${AUTH_PATH}/deleteAccount`, {
        data: { password }
      });
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : new Error('Erreur de serveur');
    }
  },

  // Vérifier si l'utilisateur est connecté
  isLoggedIn: () => {
    return !!localStorage.getItem('token');
  }
};

export default authService;