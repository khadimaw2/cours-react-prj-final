import React, { useState, useEffect } from 'react';
import videoService from '../../services/video.service';

const VideoList = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [deleteSuccess, setDeleteSuccess] = useState('');

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    try {
      const data = await videoService.getAllVideos();
      setVideos(data);
      setLoading(false);
    } catch (err) {
      setError('Erreur lors du chargement des vidéos');
      setLoading(false);
    }
  };

  const handleDelete = async (videoId) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette vidéo ?')) {
      try {
        setLoading(true);
        await videoService.deleteVideo(videoId);
        
        // Mettre à jour la liste des vidéos
        const updatedVideos = videos.filter(video => video._id !== videoId);
        setVideos(updatedVideos);
        
        // Afficher un message de succès
        setDeleteSuccess('Vidéo supprimée avec succès');
        setTimeout(() => setDeleteSuccess(''), 3000); // Faire disparaître le message après 3 secondes
      } catch (err) {
        setError('Erreur lors de la suppression de la vidéo');
        setTimeout(() => setError(''), 3000);
      } finally {
        setLoading(false);
      }
    }
  };

  if (loading && videos.length === 0) {
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
      <h2 className="mb-4">Liste des vidéos</h2>

      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      {deleteSuccess && (
        <div className="alert alert-success" role="alert">
          {deleteSuccess}
        </div>
      )}

      {videos.length === 0 ? (
        <div className="alert alert-info">
          Aucune vidéo disponible pour le moment.
        </div>
      ) : (
        <div className="card">
          <div className="card-body p-0">
            <div className="table-responsive">
              <table className="table table-striped mb-0">
                <thead className="table-dark">
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Titre</th>
                    <th scope="col">Description</th>
                    <th scope="col">URL</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {videos.map((video, index) => (
                    <tr key={video._id}>
                      <th scope="row">{index + 1}</th>
                      <td>{video.title}</td>
                      <td>
                        {video.description ? (
                          video.description.length > 50 ? (
                            `${video.description.substring(0, 50)}...`
                          ) : (
                            video.description
                          )
                        ) : (
                          <span className="text-muted">Aucune description</span>
                        )}
                      </td>
                      <td>
                        <a
                          href={video.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-truncate d-inline-block"
                          style={{ maxWidth: '200px' }}
                        >
                          {video.url}
                        </a>
                      </td>
                      <td>
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => handleDelete(video._id)}
                          disabled={loading}
                        >
                          <i className="fas fa-trash-alt me-1"></i>
                          Supprimer
                        </button>
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

export default VideoList;