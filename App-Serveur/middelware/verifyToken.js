
const jwt = require('jsonwebtoken');
const SECRET_KEY = 'clé_secrète';

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, SECRET_KEY);
        // Stocke l'ID de l'utilisateur dans req.userData
        req.userData = { id: decoded.id }; 
        next();
    } catch (error) {
        res.status(401).json({ error: 'Authentification échouée!' });
    }
};
