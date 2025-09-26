# Architecture Logiciel – Clean Architecture & CQRS

## Structure du projet

Ce projet applique la Clean Architecture en 5 couches hexagonales, avec CQRS et Mediator :

```
src/
    domain/        # Entités, interfaces, règles métier
        user/
            User.ts
            IUser.ts
            IUserRepository.ts
    application/   # Cas d’usage, services, ports
        user/
            UserService.ts
            IUserService.ts
    persistence/   # Implémentations des repositories, accès DB
        user/
            UserRepository.ts
            UserModel.ts
    presentation/  # Contrôleurs, routes Express
        user/
            userController.ts
    mediator/      # Bus central, commandes, handlers, pipeline
        Mediator.ts
        CreateUserCommand.ts
        CreateUserHandler.ts
    external/      # Intégrations externes (API, services tiers)
```

## Principes et choix de conception

- **Domain** : logique métier, entités, interfaces. Exemple : la règle d’assignation du rôle utilisateur (Admin/User selon l’email) est dans `User.ts`.
- **Application** : cas d’usage (services), ports d’accès. Les services reçoivent leurs dépendances (repositories) par injection.
- **Persistence** : implémentation des repositories, accès DB via Sequelize/MySQL (container Docker).
- **Presentation** : routes et contrôleurs Express, découplés de la logique métier et des implémentations.
- **Mediator** : bus central pour acheminer commandes/requêtes vers les handlers, avec pipeline de middlewares (validation, pré-traitement, etc).
- **External** : prévu pour les intégrations tierces (API, services externes).

## Mediator & Pipeline

- Le Mediator permet d’acheminer les commandes/requêtes vers leurs handlers.
- Un pipeline de middlewares peut être ajouté pour valider ou pré-traiter les données avant le handler.
- Exemple de middleware pour vérifier l’unicité de l’email :
  ```typescript
  mediator.use(async (request) => {
    if (request.constructor.name === "CreateUserCommand") {
      const existing = await UserModel.findOne({
        where: { email: request.body.email },
      });
      if (existing) throw new Error("Cet email existe déjà.");
    }
  });
  ```

## Dépendances et injection

- Les dépendances sont injectées manuellement : le contrôleur instancie le service avec le repository.
- Les interfaces TypeScript sont utilisées uniquement pour le typage, jamais importées au runtime.
- Les imports ESM doivent inclure l’extension `.ts` pour la compatibilité avec ts-node.

## Démarrage et test

1. Installer les dépendances :
   ```sh
   npm install
   ```
2. Démarrer la base MySQL dans Docker :
   ```sh
   docker-compose up -d
   ```
3. Démarrer le serveur :
   ```sh
   npm start
   ```
4. Tester l’API utilisateur :
   ```sh
   curl http://localhost:3000/users
   ```

## Règle métier

La logique d’assignation du rôle utilisateur est strictement dans le domaine :

```typescript
// src/domain/user/User.ts
static assignRole(email: string): string {
    return email.split("@")[1] === "company.com" ? "Admin" : "User";
}
```

## Avantages

- Séparation stricte des responsabilités
- Facilité de test et d’évolution
- Respect des principes SOLID, hexagonaux et CQRS
- Validation et pré-traitement centralisés via le pipeline du Mediator
- Base de données isolée dans un container Docker

---

Pour toute contribution, suivre la structure et les conventions ci-dessus.
