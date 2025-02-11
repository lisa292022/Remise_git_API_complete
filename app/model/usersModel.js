// Simuler une table "utilisateurs" en mémoire
const utilisateurs = [
    { username: "Paul",  password: "passpaul123",  admin: false },
    { username: "Lucie", password: "lucie123", admin: false },
    { username: "administrateur", password: "admin1234", admin: true  },
];

module.exports = {
    // Recherche un utilisateur par son nom d'utilisateur
    trouverUtilisateurParNom(nomUtilisateur) {
        return utilisateurs.find(utilisateur => utilisateur.username === nomUtilisateur);
    },
};
