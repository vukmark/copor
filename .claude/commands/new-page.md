Add a new Flutter frontend page. Ask whether it should be authenticated or public (no login required) if not specified.

The paths below are for a core page (`packages/core/flutter`). A page of an optional module lives in that module's package, `packages/<module>/flutter/lib/src/` (its route constant in the module's `<module>_routes.dart`, not `AppRoutes`, and its route returned from the module's `routeBranches` / `publicRoutes`).

### Authenticated page (requires login)

1. Add a route constant to `AppRoutes` in `packages/core/flutter/lib/src/config/router/routes.dart`
2. Add it to `AppRoutes.all` list in the same file (unless it's a sub-route)
3. Create `packages/core/flutter/lib/src/modules/<module>/config/<module>_route.dart` with a `createXxxRoute()` function returning a `StatefulShellBranch`
4. Register by calling `createXxxRoute()` inside the **inner** (authenticated) `StatefulShellRoute` branches in `packages/core/flutter/lib/src/config/router/app_router.dart` — or, if the page belongs to an optional module, return it from that module's `routeBranches` in `config/<module>_module.dart` instead
5. Create the page widget in `packages/core/flutter/lib/src/modules/<module>/presentation/`

### Public page (no login required)

Same as above, but:
- Add the route constant to `AppRoutes.publicRoutes` list in `routes.dart`
- Register the route in the **outer** (unauthenticated) `StatefulShellBranch` in `app_router.dart` (alongside login, registration, etc.)
- The `appRedirect` guard in `packages/core/flutter/lib/src/config/router/utils/route_guards.dart` uses `AppRoutes.publicRoutes` to decide whether to redirect unauthenticated users to `/login`
