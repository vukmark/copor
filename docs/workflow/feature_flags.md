# Feature Flags Guide

## Overview

Feature flags (also known as *feature toggles*) allow you to control which parts of the application are enabled **without redeploying**.
This makes it possible to **gradually roll out new features**, **test them safely**, or **disable them quickly** if needed.

---

## Architecture

The feature flag system consists of three main parts:

1. **Backend API** - stores all available feature flags and their current state (`true` / `false`).
2. **Frontend service** - fetches and caches the active feature flags.
3. **UI logic** - shows or hides components depending on active flags.

---

## How It Works

1. When the app starts, after login, the frontend requests the list of feature flags from the API.
2. The API returns a JSON object with all allowed features for that user, for example:
   
   ```json 
   {
    "featureList": [
        "/administration-dashboard",
        "/administration/tag",
        "/ai-assistance",
        "/my-account",
        "/search",
        "/todo",
        "/vu-meet"
    ]
   }

3. The service stores these values locally (SharedPreferences).
4. Each component can then check the flag state and adjust its behavior accordingly.

---

## Admin UI for Managing Feature Flags

The application includes a **Feature Flags Panel** that allows authorized users to manage feature flags.

### Features

- **View all available feature flags**
    - Name and current state (`enabled` / `disabled`)
- **Toggle flags on or off** without redeploying the app


### How It Works

1. Admin opens the **Feature Flags** section (Administration -> System -> Feature Flags).
2. The UI fetches the current list of feature flags from the backend.
3. When an admin enables/disables a flag:
    - After clicking the Save button, the frontend sends a POST request
    - The backend updates the flag state in the database.

---

## Adding a New Feature Flag

A feature's key **is the frontend route it unlocks** (e.g. `/administration/tag`):
the feature list the API returns is a list of routes, and the app checks a
route against it by prefix.

1. **Backend** — add the key to `CoreFeature` (`packages/core/server/src/domain/FeatureList/enum/CoreFeature.ts`)
   and define it in `CoreFeatureDefinitions.ts`; for a module, its own
   `<Feature>Feature.ts` + `<Feature>FeatureDefinitions.ts` (registered by the
   module). `viewPermission` decides who gets it in their feature list;
   `menuItem` / `dashboardItem` put it in the menu / on the administration
   dashboard. Add the feature name (keyed by route) to the `feature_flags`
   locale namespace (core's `Resources/locales/feature_flags/`, or the module's
   own `locales/feature_flags/`).

2. **Routing (frontend)** — nothing to register: the router's guard
   (`FeatureGuard.checkIfRedirectIsAllowed`, `modules/administration/feature_flags/config/feature_guard.dart`)
   lets a URI through when it starts with one of the user's features, or with
   one of `AppRoutes.alwaysAccessibleRoutes` (a module adds to those through its
   `alwaysAccessibleRoutes`). Anything else redirects to the access-denied page.

3. **Navigation** — a module's `ModuleNavEntry` has `requiresFeature`
   (default `true`): the bottom navigation shows it only when the feature list
   contains its route.

4. **UI** — to show or hide something inside a page, read the list from
   `FeatureAccessBloc` and check the route, e.g.
   `featureList.contains(accountDeletionFeature)` in
   `my_account/presentation/widgets/account_deletion.dart`.

5. **Test** — verify the route, menu entry and UI appear only for users whose
   role grants the `viewPermission`.

---

## Caching & Refresh Policy

- Flags are cached locally using `SharedPreferences`.
- They are refreshed:
    - After every user login.
    - Whenever `FeatureAccessBloc` receives `GetFeatureList` again.

---

## Security Note

Feature flags in the frontend are **not a security mechanism**.
They control visibility, not access.

The backend must always verify permissions
before performing sensitive operations,
even if the corresponding UI is hidden by a flag.
