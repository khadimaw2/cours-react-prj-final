import api from './api';

const VIDEO_PATH = '/videoRouter';

const videoService = {
  // Récupérer toutes les vidéos
  getAllVideos: async () => {
    try {
      const response = await api.get(`${VIDEO_PATH}/videos`);
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : new Error('Erreur de serveur');
    }
  },

  // Ajouter une nouvelle vidéo
  addVideo: async (title, description, url) => {
    try {
      const response = await api.post(`${VIDEO_PATH}/add`, {
        title,
        description,
        url
      });
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : new Error('Erreur de serveur');
    }
  },

  // Supprimer une vidéo
  deleteVideo: async (videoId) => {
    try {
      const response = await api.delete(`${VIDEO_PATH}/videos/${videoId}`);
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : new Error('Erreur de serveur');
    }
  },

  // Extraire l'ID d'une vidéo YouTube à partir de son URL
  getYouTubeVideoId: (url) => {
    if (!url) return null;
    
    // Formats possibles pour les URL YouTube
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    
    return (match && match[2].length === 11)
      ? match[2]
      : null;
  },

  // Générer l'URL d'embed pour une vidéo YouTube
  getYouTubeEmbedUrl: (url) => {
    const videoId = videoService.getYouTubeVideoId(url);
    if (!videoId) return null;
    
    return `https://www.youtube.com/embed/${videoId}`;
  }
};

export default videoService;