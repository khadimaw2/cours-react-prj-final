const Video = require('../models/Video');

exports.addVideo = async (req, res) => {
    try {
        const video = new Video({
            title: req.body.title,
            description: req.body.description,
            url: req.body.url,
        });

        const savedVideo = await video.save();
        res.status(201).json(savedVideo);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getAllVideos = async (req, res) => {
    try {
        const videos = await Video.find();
        res.status(200).json(videos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.deleteVideo = async (req, res) => {
    try {
        const videoId = req.params.id;
        const video = await Video.findById(videoId);

        if (!video) {
            return res.status(404).json({ message: "Vidéo non trouvée" });
        }

        await Video.findByIdAndRemove(videoId);
        res.status(200).json({ message: "Vidéo supprimée avec succès" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
