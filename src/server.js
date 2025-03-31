const express = require('express');
const cors = require('cors');
const axios = require('axios');

// Chargement sécurisé du fichier .env
try {
  require('dotenv').config();
} catch (error) {
  console.error("❌ Erreur lors du chargement du fichier .env", error);
}

const app = express();
const PORT = process.env.PORT || 5000;

// Vérification des variables d'environnement
const requiredEnvVars = ['service_lafrzet', 'template_bh308um', 'CQUQ77pQ0M0Iao4ui', 'CLIENT_URL'];
const missingVars = requiredEnvVars.filter(varName => !process.env[varName]);

if (missingVars.length > 0) {
  console.error('❌ ERREUR: Variables d\'environnement manquantes:', missingVars.join(', '));
  process.exit(1); // Arrêter le serveur si une variable essentielle manque
} else {
  console.log('✅ Configuration EmailJS chargée avec succès');
}

// Configuration CORS avec domaine spécifique
const corsOptions = {
  origin: process.env.CLIENT_URL, // 🔒 Remplace '*' par ton domaine en prod
  methods: ['GET', 'POST'],
  credentials: true,
  optionsSuccessStatus: 200
};

// Middleware
app.use(express.json()); // Remplace body-parser
app.use(cors(corsOptions));

// Route principale pour vérifier le fonctionnement de l'API
app.get('/', (req, res) => {
  res.send('✅ API de formulaire de contact opérationnelle');
});

// Route d'envoi d'email
app.post('/api/contact', async (req, res) => {
  try {
    const { fullName, email, message } = req.body;
    
    // Vérification des champs
    if (!fullName || !email || !message) {
      console.log('❌ Validation échouée:', { fullName, email, message });
      return res.status(400).json({ success: false, message: 'Tous les champs sont requis' });
    }

    console.log('📩 Données reçues:', { fullName, email });

    // Préparation des données pour EmailJS
    const data = {
      service_id: process.env.EMAILJS_SERVICE_ID,
      template_id: process.env.EMAILJS_TEMPLATE_ID,
      user_id: process.env.EMAILJS_USER_ID,
      template_params: {
        from_name: fullName,
        reply_to: email,
        message: message,
        to_name: 'Administrateur du site',
        subject: `Nouveau message de contact de ${fullName}`
      }
    };

    console.log('📨 Tentative d\'envoi via EmailJS');

    // Envoi via EmailJS
    const response = await axios.post(
      'https://api.emailjs.com/api/v1.0/email/send',
      JSON.stringify(data),
      { headers: { 'Content-Type': 'application/json' } }
    );

    console.log('✅ Email envoyé avec succès via EmailJS');

    return res.status(200).json({ success: true, message: 'Votre message a été envoyé avec succès' });
    
  } catch (error) {
    console.error('❌ Erreur détaillée:', error.response?.data || error.message || error);

    let errorMessage = 'Une erreur est survenue lors du traitement de votre demande';
    
    if (error.response) {
      if (error.response.status === 400) errorMessage = 'Erreur de validation des données.';
      if (error.response.status === 403) errorMessage = 'Erreur d\'authentification avec EmailJS.';
    }

    return res.status(500).json({ success: false, message: errorMessage });
  }
});

// Route 404 pour les requêtes inconnues
app.use((req, res) => {
  res.status(404).json({ success: false, message: "Route non trouvée" });
});

// Démarrage du serveur
app.listen(PORT, () => {
  console.log(`🚀 Serveur démarré sur le port ${PORT}`);
  console.log(`🔗 API en ligne: http://localhost:${PORT}/api/contact`);
});
