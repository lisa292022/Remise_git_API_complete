const express = require("express");
const server = express();

// Configuration pour analyser les données JSON reçues
server.use(express.json());

// Importation du routeur principal
const apiRouteur = require("./app/router/api");

// Montage du routeur principal sur la racine "/"
server.use("/", apiRouteur);

// Démarrage du serveur sur le port spécifié
const PORT_SERVEUR = 5000;
server.listen(PORT_SERVEUR, () => {
    console.log(`Application en écoute sur http://localhost:${PORT_SERVEUR}`);
});
