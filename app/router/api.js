const express = require("express");
const routeurApi = express.Router();

// Importation des contrôleurs avec leurs nouveaux noms
const authCtrl = require("../controller/authController");
const livresCtrl = require("../controller/livresController");

// Middleware d'authentification renommé
const { verifierJeton } = require("../middleware/authMiddleware");

// =========== ROUTE D'AUTHENTIFICATION ===========

// Pour obtenir un token en tant qu'administrateur : POST /login
routeurApi.post("/login", authCtrl.connexionAdmin);

// =========== ROUTES LIVRES ===========

// (A) Routes GET (publiques)
routeurApi.get("/livres", livresCtrl.recupererTousLesLivres);
routeurApi.get("/livres/:numlivre", livresCtrl.recupererLivreParNumero);
routeurApi.get("/livres/:numlivre/pages", livresCtrl.recupererPagesLivre);
routeurApi.get("/livres/:numlivre/pages/:numpage", livresCtrl.recupererPageLivre);

// (B) Routes POST/PUT/DELETE (protégées, token requis)
routeurApi.post("/livres", verifierJeton, livresCtrl.creerLivre);
routeurApi.delete("/livres/:numlivre", verifierJeton, livresCtrl.supprimerLivre);
routeurApi.put("/livres/:numlivre", verifierJeton, livresCtrl.modifierLivre);

module.exports = routeurApi;
