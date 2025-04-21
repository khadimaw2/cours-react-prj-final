import api from './api';
import { jwtDecode } from 'jwt-decode';

const USER_PATH = '/auth';

const userService = {
  // Récupérer tous les utilisateurs
  // Note: Cette fonctionnalité n'est pas présente dans l'API fournie
  // Il faudrait ajouter cette route au backend
  getAllUsers: async () => {
    try {
      // C'est une route fictive, il faudrait l'ajouter au backend
      const response = await api.get(`${USER_PATH}/users`);
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : new Error('Erreur de serveur');
    }
  },

  // Obtenir l'ID de l'utilisateur connecté à partir du token JWT
  getCurrentUserId: () => {
    const token = localStorage.getItem('token');
    if (!token) return null;

    try {
      const decodedToken = jwtDecode(token);
      return decodedToken.id;
    } catch (error) {
      console.error('Erreur lors du décodage du token:', error);
      return null;
    }
  }
};

export default userService;