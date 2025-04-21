import React, { useState, useEffect } from 'react';
import api from '../../services/api';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        // Note: Cette route n'existe pas dans le backend fourni
        // Il faudra l'ajouter au backend pour que cette fonctionnalité fonctionne
        const response = await api.get('/auth/users');
        setUsers(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Erreur lors de la récupération des utilisateurs:', err);
        setError('Erreur lors du chargement des utilisateurs. Cette fonctionnalité peut ne pas être disponible dans le backend.');
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return (
      <div className="d-flex justify-content-center mt-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Chargement...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Liste des utilisateurs</h2>

      {error && (
        <div className="alert alert-warning" role="alert">
          <i className="fas fa-exclamation-triangle me-2"></i>
          {error}
          <p className="mt-2 mb-0">
            <strong>Note pour le développeur:</strong> Il semble que l'API pour récupérer la liste des utilisateurs
            n'existe pas encore dans le backend. Vous devrez ajouter cette route à votre backend.
          </p>
          <p className="mt-2 mb-0">
            <strong>Exemple de route à ajouter dans authController.js:</strong>
          </p>
          <pre className="bg-light p-2 mt-2 rounded">
            {`exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};`}
          </pre>
          <p className="mt-2 mb-0">
            <strong>Et dans authRoutes.js:</strong>
          </p>
          <pre className="bg-light p-2 mt-2 rounded">
            {`router.get('/users', authController.getAllUsers);`}
          </pre>
        </div>
      )}

      {!error && users.length === 0 && (
        <div className="alert alert-info">
          Aucun utilisateur trouvé.
        </div>
      )}

      {!error && users.length > 0 && (
        <div className="card">
          <div className="card-body p-0">
            <div className="table-responsive">
              <table className="table table-striped mb-0">
                <thead className="table-dark">
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Email</th>
                    <th scope="col">Vérifié</th>
                    <th scope="col">ID</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user, index) => (
                    <tr key={user._id}>
                      <th scope="row">{index + 1}</th>
                      <td>{user.email}</td>
                      <td>
                        {user.isVerified ? (
                          <span className="badge bg-success">Oui</span>
                        ) : (
                          <span className="badge bg-warning text-dark">Non</span>
                        )}
                      </td>
                      <td>
                        <small className="text-muted">{user._id}</small>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserList;