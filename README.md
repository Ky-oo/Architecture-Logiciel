# Architecture Logiciel

Ce projet est une application Node.js structurée selon les bonnes pratiques de l'architecture logicielle. Voici la présentation de sa structure et le rôle de chaque dossier :

## Structure du projet

```
app.js
orm.js
package.json
README.md
ai/
    AI_USAGE.md
    prompts/
        2025-09-25_readme.md
bin/
    www
models/
    index.js
    User.js
public/
    images/
    javascripts/
    stylesheets/
        style.css
routes/
    index.js
    users.js
services/
    userService.js
```

## Dossiers principaux

### `ai/`

Contient des ressources liées à l'intelligence artificielle, comme des documents d'utilisation (`AI_USAGE.md`) et des prompts pour l'IA.

### `bin/`

Contient les scripts de démarrage de l'application, notamment le fichier `www` qui lance le serveur.

### `models/`

Définit les modèles de données utilisés dans l'application, par exemple le modèle `User`.

### `public/`

Regroupe les fichiers statiques accessibles par les utilisateurs : images, scripts JavaScript, feuilles de style CSS.

### `routes/`

Définit les routes de l'application, c'est-à-dire les points d'entrée pour les différentes fonctionnalités (ex : `index.js`, `users.js`).

### `services/`

Contient la logique métier et les services, comme la gestion des utilisateurs (`userService.js`).

## Fichiers principaux

- `app.js` : Point d'entrée principal de l'application.
- `orm.js` : Configuration de l'ORM pour la gestion des données.
- `package.json` : Dépendances et scripts du projet.
- `README.md` : Documentation principale du projet.

---

Ce README offre une vue d'ensemble claire de la structure du projet et du rôle de chaque dossier pour faciliter la prise en main et la contribution.
