const jwt = require("jsonwebtoken");

const CLE_SECRETE = "Acces_premium"; // La clé doit être identique à celle utilisée dans authController

exports.verifierJeton = (req, res, next) => {
    const enTeteAuth = req.headers.authorization;
    if (!enTeteAuth) {
        return res.status(403).json({ error: "Jeton absent" });
    }

    const jeton = enTeteAuth.split(" ")[1];
    if (!jeton) {
        return res.status(403).json({ error: "Jeton absent" });
    }

    try {
        const donneesDecodees = jwt.verify(jeton, CLE_SECRETE);
        req.user = donneesDecodees; // ex: {username: "admin", admin: true, iat:..., exp:...}
        next();
    } catch (erreur) {
        return res.status(403).json({ error: "Jeton invalide ou expiré" });
    }
};
