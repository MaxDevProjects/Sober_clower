# Clower — Prototype statique

Prototype statique du site Clower créé pour démontrer une approche web sobre et éco-conçue. Le projet fournit toutes les pages HTML, une feuille de style Tailwind minimale et un script JavaScript vanille léger pour le formulaire de contact et le sommaire des articles.

## Structure
- Pages statiques sous `index.html`, `offre/`, `portfolio/`, `blog/`, `a-propos/`, `contact/`, `mentions-legales/` et `confidentialite/`.
- Composants et tokens centralisés dans `assets/css/main.css` et `tailwind.config.js`.
- Logique progressive-enhancement dans `assets/js/main.js`.

## Développement
1. Servir les fichiers statiques via n'importe quel serveur local (`python -m http.server`, `npx serve`, etc.).
2. Éditer les fichiers HTML/CSS/JS selon les besoins du projet.
3. Aucun build n'est nécessaire : le code est prêt pour un déploiement statique.

## Git
Le travail est commité sur la branche `work`. Poussez vos modifications vers le dépôt distant habituel une fois la revue terminée.
