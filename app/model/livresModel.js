const connexionCouch = require('nano')('http://lisa292022:CouchDBMMI3A@localhost:5984');
// Nom de la base de données
const nomBase = "livres";
// Récupération de la référence à la base
const base = connexionCouch.db.use(nomBase);

module.exports = {
    // Récupération de tous les livres
    recupererTousLesLivres: async () => {
        try {
            // Lister tous les documents de la base
            const reponse = await base.list({ include_docs: true });
            // Retourner les documents (chaque élément rows contient le doc)
            return reponse.rows.map(row => row.doc);
        } catch (err) {
            throw err;
        }
    },

    // Récupération d’un livre par son numéro
    recupererLivreParNumero: async (numero) => {
        try {
            // Recherche du livre correspondant au numéro via un sélecteur
            const reponse = await base.find({
                selector: { numero: numero },
                limit: 1,
            });
            if (reponse.docs.length === 0) return null;
            return reponse.docs[0];
        } catch (err) {
            throw err;
        }
    },

    // Création d’un livre
    creerLivre: async (donneesLivre) => {
        try {
            const reponse = await base.insert(donneesLivre);
            // Retourne le livre créé avec les champs _id et _rev ajoutés
            return { ...donneesLivre, _id: reponse.id, _rev: reponse.rev };
        } catch (err) {
            throw err;
        }
    },

    // Suppression d’un livre
    supprimerLivre: async (numero) => {
        try {
            // Récupérer le livre correspondant au numéro
            const livre = await module.exports.recupererLivreParNumero(numero);
            if (!livre) {
                return null;
            }
            // Supprimer le document en utilisant son _id et _rev
            await base.destroy(livre._id, livre._rev);
            return livre; // Retourne le livre supprimé
        } catch (err) {
            throw err;
        }
    },

    // Mise à jour d’un livre
    modifierLivre: async (numero, donneesMiseAJour) => {
        try {
            // Récupérer le livre correspondant au numéro
            const livre = await module.exports.recupererLivreParNumero(numero);
            if (!livre) {
                return null;
            }
            // Appliquer les modifications éventuelles
            if (typeof donneesMiseAJour.titre !== "undefined") {
                livre.titre = donneesMiseAJour.titre;
            }
            if (Array.isArray(donneesMiseAJour.pages)) {
                livre.pages = donneesMiseAJour.pages;
            }
            // Enregistrer les mises à jour dans la base
            const reponse = await base.insert(livre);
            return { ...livre, _rev: reponse.rev };
        } catch (err) {
            throw err;
        }
    },
};
