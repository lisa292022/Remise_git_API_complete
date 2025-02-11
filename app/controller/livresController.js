const modelLivres = require("../model/livresModel");
const { validerLivre } = require("../validation/livresValidation");

// 1. Récupérer la liste de tous les livres
exports.recupererTousLesLivres = async (req, res) => {
    try {
        const listeLivres = await modelLivres.recupererTousLesLivres();
        res.json(listeLivres);
    } catch (erreur) {
        console.error("Erreur lors de la récupération de tous les livres :", erreur);
        res.status(500).json({ error: "Erreur interne du serveur" });
    }
};

// 2. Récupérer un livre par son numéro
exports.recupererLivreParNumero = async (req, res) => {
    const numeroLivre = parseInt(req.params.numlivre);
    try {
        const livre = await modelLivres.recupererLivreParNumero(numeroLivre);
        if (!livre) {
            return res.status(404).json({ error: "Livre non trouvé" });
        }
        res.json(livre);
    } catch (erreur) {
        console.error("Erreur lors de la récupération du livre :", erreur);
        res.status(500).json({ error: "Erreur interne du serveur" });
    }
};

// 3. Récupérer les pages d'un livre
exports.recupererPagesLivre = async (req, res) => {
    const numeroLivre = parseInt(req.params.numlivre);
    try {
        const livre = await modelLivres.recupererLivreParNumero(numeroLivre);
        if (!livre) {
            return res.status(404).json({ error: "Livre non trouvé" });
        }
        res.json(livre.pages);
    } catch (erreur) {
        console.error("Erreur lors de la récupération des pages :", erreur);
        res.status(500).json({ error: "Erreur interne du serveur" });
    }
};

// 4. Récupérer une page spécifique d'un livre
exports.recupererPageLivre = async (req, res) => {
    const numeroLivre = parseInt(req.params.numlivre);
    const numeroPage = parseInt(req.params.numpage);
    try {
        const livre = await modelLivres.recupererLivreParNumero(numeroLivre);
        if (!livre) {
            return res.status(404).json({ error: "Livre non trouvé" });
        }
        if (numeroPage < 1 || numeroPage > livre.pages.length) {
            return res.status(404).json({ error: "Page non trouvée" });
        }
        res.json({ page: livre.pages[numeroPage - 1] });
    } catch (erreur) {
        console.error("Erreur lors de la récupération de la page :", erreur);
        res.status(500).json({ error: "Erreur interne du serveur" });
    }
};

// 5. Création d'un livre
exports.creerLivre = async (req, res) => {
    // Valider la structure du livre avec Joi
    const { error, value } = validerLivre(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }

    try {
        // Vérifier si un livre avec ce numéro existe déjà
        const livreExistant = await modelLivres.recupererLivreParNumero(value.numero);
        if (livreExistant) {
            return res.status(400).json({ error: "Un livre avec ce numéro existe déjà" });
        }

        // Créer le nouveau livre
        const nouveauLivre = await modelLivres.creerLivre(value);
        res.status(201).json(nouveauLivre);
    } catch (erreur) {
        console.error("Erreur lors de la création du livre :", erreur);
        res.status(500).json({ error: "Erreur interne du serveur" });
    }
};

// 6. Suppression d'un livre
exports.supprimerLivre = async (req, res) => {
    const numeroLivre = parseInt(req.params.numlivre);
    try {
        const livreSupprime = await modelLivres.supprimerLivre(numeroLivre);
        if (!livreSupprime) {
            return res.status(404).json({ error: "Livre non trouvé" });
        }
        res.json(livreSupprime);
    } catch (erreur) {
        console.error("Erreur lors de la suppression du livre :", erreur);
        res.status(500).json({ error: "Erreur interne du serveur" });
    }
};

// 7. Modification d'un livre
exports.modifierLivre = async (req, res) => {
    const numeroLivre = parseInt(req.params.numlivre);
    // Extraction des champs à mettre à jour (par exemple, titre et pages)
    const { titre, pages } = req.body;

    try {
        const livreModifie = await modelLivres.modifierLivre(numeroLivre, { titre, pages });
        if (!livreModifie) {
            return res.status(404).json({ error: "Livre non trouvé" });
        }
        res.json(livreModifie);
    } catch (erreur) {
        console.error("Erreur lors de la mise à jour du livre :", erreur);
        res.status(500).json({ error: "Erreur interne du serveur" });
    }
};

