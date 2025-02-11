const Joi = require("joi");

// Schéma Joi pour la création d'un livre
const schemaDuLivre = Joi.object({
    numero: Joi.number().required(),
    titre: Joi.string().required(),
    pages: Joi.array().items(Joi.string()).required(),
});

function validerLivre(donneesLivre) {
    return schemaDuLivre.validate(donneesLivre);
}

module.exports = {
    validerLivre,
};
