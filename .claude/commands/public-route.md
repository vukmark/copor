Add a public (unauthenticated) API route. Ask for the route path and HTTP method if not provided.

Public routes must be registered in two places — keep them in sync or the frontend will send requests without tokens that the backend will reject (or vice versa).

1. **Backend** — `packages/core/server/src/client/Core/Middleware/JwtAuthenticationMiddleware.ts`, `excludedEndpoints` array:
   ```typescript
   {path: '/your-path/*', method: 'POST'},
   ```
   Use `/*` suffix to match any sub-path; omit it for exact path matching.

2. **Frontend** — `packages/core/flutter/lib/src/network/public_routes.dart`, `_routes` map:
   ```dart
   '/your-path': ['POST'],
   ```
