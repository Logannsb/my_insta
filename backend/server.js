const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');  // Ajoute cette ligne
const authRoutes = require('./routes/auth');
const postRoutes = require('./routes/post');

const app = express();
app.use(cors());  // Ajoute cette ligne pour activer CORS

app.use(express.json());

// Connexion à MongoDB
mongoose.connect('mongodb+srv://aze:azouzou@myinstagramcluster.6kea2.mongodb.net/instagram?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log("MongoDB connecté"))
  .catch(err => console.error('Erreur MongoDB:', err));

// Utilisation des routes
app.use('/auth', authRoutes);
app.use('/api', postRoutes);

// Démarrage du serveur
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Serveur démarré sur le port ${PORT}`));
