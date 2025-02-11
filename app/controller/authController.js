const jwt = require("jsonwebtoken");
const modelUtilisateurs = require("../model/usersModel");

// Clé secrète en dur pour l'exemple (doit être identique à celle du middleware)
const CLE_SECRETE = "Acces_premium";

exports.connexionAdmin = (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res
            .status(400)
            .json({ error: "Veuillez fournir username et password dans le corps de la requête" });
    }

    // Recherche de l'utilisateur dans la "base" en mémoire
    const utilisateur = modelUtilisateurs.trouverUtilisateurParNom(username);
    if (!utilisateur) {
        return res.status(401).json({ error: "Utilisateur inconnu" });
    }

    // Vérification du mot de passe
    if (utilisateur.password !== password) {
        return res.status(401).json({ error: "Mot de passe incorrect" });
    }

    // Vérification que l'utilisateur a bien les droits d'administrateur
    if (!utilisateur.admin) {
        return res.status(403).json({ error: "Vous n'êtes pas administrateur" });
    }

    // Génération du jeton JWT
    const jeton = jwt.sign(
        { username: utilisateur.username, admin: utilisateur.admin },
        CLE_SECRETE,
        { expiresIn: "1h" } // Durée d'expiration par exemple
    );

    // Retour du jeton au format JSON
    res.json({ token: jeton });
};
