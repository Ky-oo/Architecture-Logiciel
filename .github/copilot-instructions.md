# Copilot Instructions for Architecture Logiciel

This guide helps AI coding agents work productively in this Node.js project. It summarizes the architecture, workflows, and conventions specific to this codebase.

## Project Architecture

- **Entry Point:** `app.ts` (or `app.js` in README) initializes the application and middleware.
- **ORM Setup:** `orm.ts` configures data access and models.
- **Models:** All data models (e.g., `User`) are in `models/`, with interfaces in `models/interfaces/` and repositories in `models/repositories/`.
- **Services:** Business logic is in `services/` (e.g., `userService.ts`).
- **Routes:** API endpoints are defined in `Présentation/routes/` (not just `routes/` as in README). Example: `users.ts` for user-related endpoints.
- **Static Assets:** Served from `public/`.
- **AI Resources:** Prompts and usage docs are in `ai/`.

## Developer Workflows

- **Start Server:** Use `npm start` (see `bin/www` for server launch logic).
- **TypeScript:** Project uses TypeScript (`.ts` files, see `tsconfig.json`).
- **Build/Test:** No explicit test or build scripts found; add them to `package.json` if needed.
- **Debugging:** Main debugging entry is `app.ts` and `bin/www`.

## Conventions & Patterns

- **Models:** Use interfaces for type safety (`models/interfaces/`).
- **Repositories:** Data access logic is separated in `models/repositories/`.
- **Services:** Keep business logic out of routes/controllers; use service classes.
- **Routes:** Group by domain (e.g., `users.ts`).
- **AI Integration:** Use `ai/prompts/` for prompt engineering and `AI_USAGE.md` for documentation.

## Integration Points

- **ORM:** All data access goes through `orm.ts` and repository classes.
- **External Dependencies:** Managed via `package.json`.
- **Static Files:** Served from `public/`.

## Examples

- To add a new model: create in `models/`, define interface in `models/interfaces/`, repository in `models/repositories/`, and service in `services/`.
- To add a new route: create in `Présentation/routes/`, import relevant service.

## Key Files & Directories

- `app.ts`, `orm.ts`, `bin/www`, `models/`, `services/`, `Présentation/routes/`, `ai/`, `public/`

---

For more details, see `README.md` and `ai/AI_USAGE.md`.
