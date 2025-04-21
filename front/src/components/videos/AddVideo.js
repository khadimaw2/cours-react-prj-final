import React, { useState } from 'react';
import videoService from '../../services/video.service';
import { isValidYoutubeUrl } from '../../utils/authUtils';

const AddVideo = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    url: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [previewVideoId, setPreviewVideoId] = useState('');

  const { title, description, url } = formData;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Si l'URL est modifiée, mettre à jour l'aperçu de la vidéo
    if (name === 'url' && isValidYoutubeUrl(value)) {
      const videoId = videoService.getYouTubeVideoId(value);
      setPreviewVideoId(videoId);
    } else if (name === 'url') {
      setPreviewVideoId('');
    }
  };

  const validateForm = () => {
    if (!title) {
      setError('Le titre est obligatoire');
      return false;
    }

    if (!url) {
      setError("L'URL est obligatoire");
      return false;
    }

    if (!isValidYoutubeUrl(url)) {
      setError('Veuillez entrer une URL YouTube valide');
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
      await videoService.addVideo(title, description, url);
      setSuccess('Vidéo ajoutée avec succès');
      
      // Réinitialiser le formulaire
      setFormData({
        title: '',
        description: '',
        url: ''
      });
      setPreviewVideoId('');
    } catch (err) {
      setError(err.error || "Une erreur est survenue lors de l'ajout de la vidéo");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header bg-success text-white">
              <h4 className="mb-0">Ajouter une vidéo</h4>
            </div>
            <div className="card-body">
              {error && (
                <div className="alert alert-danger" role="alert">
                  {error}
                </div>
              )}
              {success && (
                <div className="alert alert-success" role="alert">
                  {success}
                </div>
              )}
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">
                    Titre <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="title"
                    name="title"
                    value={title}
                    onChange={handleChange}
                    placeholder="Entrez le titre de la vidéo"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">
                    Description
                  </label>
                  <textarea
                    className="form-control"
                    id="description"
                    name="description"
                    value={description}
                    onChange={handleChange}
                    placeholder="Entrez une description (optionnel)"
                    rows="3"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="url" className="form-label">
                    URL YouTube <span className="text-danger">*</span>
                  </label>
                  <input
                    type="url"
                    className="form-control"
                    id="url"
                    name="url"
                    value={url}
                    onChange={handleChange}
                    placeholder="https://www.youtube.com/watch?v=..."
                    required
                  />
                  <small className="form-text text-muted">
                    Entrez une URL YouTube valide (ex: https://www.youtube.com/watch?v=xyz123)
                  </small>
                </div>
                <div className="d-grid gap-2">
                  <button
                    type="submit"
                    className="btn btn-success"
                    disabled={loading}
                  >
                    {loading ? (
                      <span>
                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                        Ajout en cours...
                      </span>
                    ) : (
                      'Ajouter la vidéo'
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card">
            <div className="card-header bg-success text-white">
              <h4 className="mb-0">Aperçu de la vidéo</h4>
            </div>
            <div className="card-body">
              {previewVideoId ? (
                <div className="ratio ratio-16x9">
                  <iframe
                    src={`https://www.youtube.com/embed/${previewVideoId}`}
                    title="YouTube video player"
                    allowFullScreen
                  ></iframe>
                </div>
              ) : (
                <div className="text-center p-5 bg-light">
                  <i className="fas fa-film fa-4x text-muted mb-3"></i>
                  <p className="lead">Entrez une URL YouTube valide pour afficher l'aperçu</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddVideo;