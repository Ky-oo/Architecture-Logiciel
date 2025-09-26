# Architecture Logiciel – Clean Architecture

## Structure du projet

Ce projet applique la Clean Architecture en 5 couches hexagonales :

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
    presentation/  # Contrôleurs, routes Express
        user/
            userController.ts
    external/      # Intégrations externes (API, services tiers)
```

## Principes et choix de conception

- **Domain** : contient toute la logique métier, les entités et les interfaces. Exemple : la règle d’assignation du rôle utilisateur (Admin/User selon l’email) est dans `User.ts`.
- **Application** : expose les cas d’usage (services) et les ports d’accès (interfaces). Les services reçoivent leurs dépendances (repositories) par injection.
- **Persistence** : implémente les interfaces de repository du domaine, ici en mémoire ou via ORM.
- **Presentation** : routes et contrôleurs Express, découplés de la logique métier et des implémentations.
- **External** : prévu pour les intégrations tierces (API, services externes).

## Dépendances et injection

- Les dépendances sont injectées manuellement : le contrôleur instancie le service avec le repository.
- Les interfaces TypeScript sont utilisées uniquement pour le typage, jamais importées au runtime.

## Démarrage et test

1. Installer les dépendances :
   ```sh
   npm install
   ```
2. Démarrer le serveur :
   ```sh
   npm start
   ```
3. Tester l’API utilisateur :
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
- Respect des principes SOLID et hexagonaux

---

Pour toute contribution, suivre la structure et les conventions ci-dessus.
