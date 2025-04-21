import React, { useState, useEffect } from 'react';
import videoService from '../../services/video.service';

const VideoGrid = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedVideo, setSelectedVideo] = useState(null);

  useEffect(() => {
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

    fetchVideos();
  }, []);

  const handleVideoClick = (video) => {
    setSelectedVideo(video);
  };

  const handleCloseModal = () => {
    setSelectedVideo(null);
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center mt-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Chargement...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger" role="alert">
        {error}
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Vidéos disponibles</h2>

      {videos.length === 0 ? (
        <div className="alert alert-info">
          Aucune vidéo disponible pour le moment.
        </div>
      ) : (
        <div className="row">
          {videos.map((video) => (
            <div key={video._id} className="col-md-4 mb-4">
              <div className="card h-100">
                <div 
                  className="card-img-top video-thumbnail"
                  style={{ 
                    cursor: 'pointer',
                    height: '200px',
                    backgroundImage: `url(https://img.youtube.com/vi/${videoService.getYouTubeVideoId(video.url)}/mqdefault.jpg)`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                  }}
                  onClick={() => handleVideoClick(video)}
                >
                  <div className="play-icon">
                    <i className="fas fa-play-circle fa-3x text-white"></i>
                  </div>
                </div>
                <div className="card-body">
                  <h5 className="card-title">{video.title}</h5>
                  {video.description && (
                    <p className="card-text text-truncate">
                      {video.description}
                    </p>
                  )}
                  <button
                    className="btn btn-sucess btn-sm mt-2"
                    onClick={() => handleVideoClick(video)}
                  >
                    <i className="fas fa-play me-1"></i>
                    Regarder
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal pour afficher la vidéo */}
      {selectedVideo && (
        <div
          className="modal fade show"
          id="videoModal"
          tabIndex="-1"
          aria-labelledby="videoModalLabel"
          style={{ display: 'block', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
        >
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="videoModalLabel">
                  {selectedVideo.title}
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  aria-label="Close"
                  onClick={handleCloseModal}
                ></button>
              </div>
              <div className="modal-body">
                <div className="ratio ratio-16x9">
                  <iframe
                    src={videoService.getYouTubeEmbedUrl(selectedVideo.url)}
                    title={selectedVideo.title}
                    allowFullScreen
                  ></iframe>
                </div>
                {selectedVideo.description && (
                  <div className="mt-3">
                    <h6>Description:</h6>
                    <p>{selectedVideo.description}</p>
                  </div>
                )}
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={handleCloseModal}
                >
                  Fermer
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CSS pour l'overlay de lecture */}
      <style jsx="true">{`
        .video-thumbnail {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .play-icon {
          opacity: 0.7;
          transition: opacity 0.3s ease;
        }
        .video-thumbnail:hover .play-icon {
          opacity: 1;
        }
      `}</style>
    </div>
  );
};

export default VideoGrid;