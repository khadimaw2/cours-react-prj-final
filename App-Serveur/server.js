const express = require('express');
const mongoose = require('mongoose');
var cors = require('cors')



const app = express();
app.use(cors());

/*app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));*/
// Middleware pour le parsing JSON
app.use(express.json());

// Connexion à MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/streamingSite', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Connexion à MongoDB Atlas (cloud)
/*mongoose.connect('mongodb+srv://user:pwd@cluster0.yhmwexg.mongodb.net/?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});*/

mongoose.connection.on('error', err => {
    console.error('MongoDB connection error:', err);
});

// Routes
//Auth
const authRouter = require('./routes/authRoutes');
app.use('/auth', authRouter);
//video

const videoRouter = require('./routes/videoRoutes');
app.use('/videoRouter', videoRouter);

// Démarrage du serveur
const PORT = 3010;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
