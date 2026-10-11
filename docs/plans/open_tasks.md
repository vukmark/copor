# Open tasks

What is still to do on the platform. Known bugs of a single module live in
that module's spec (`docs/modules/<Entity>.md`, "Known Bugs & Gaps") and are
only listed here.

## Next

- [ ] **First app repo + version tags.** A separate repo per real app (thin
      host: core + its own features) that depends on this platform at a git
      tag. Needs: a git host for both repos; server packages via a git
      submodule of the platform (reusing its workspaces and `paths`) — or,
      later, built npm packages in a private registry (Verdaccio / GitHub
      Packages); Flutter packages via pub `git:` dependencies
      (`path: packages/<pkg>/flutter`, `ref: <tag>`). Start with a minimal
      example app. Before tagging, a module's removal check: drop it from the
      app's module lists and dependencies, then typecheck + tests, a fresh
      `db:migrate`, Flutter analyze + test + web build.
- [ ] **`copor check`** — one command for every check: server typecheck +
      tests, per-package typechecks, Flutter analyze + test (incl. the module
      boundary test); optionally as a git pre-push hook, and in a CI pipeline
      once there is a shared remote.

## Cleanup

- [ ] **Module env vars:** core's `requiredEnvVariables.ts` still lists the
      module upload limits (`TODO_/VU_MEET_/CLOUD_MAX_FILE_SIZE_MB`); a module
      should declare its own required env vars.
- [ ] **Permission keys on save:** the set-permission-list endpoints accept
      keys that no module registered (`isRegisteredPermission` in
      `PermissionRegistry.ts` exists but they don't call it).
- [ ] **Frontend core translations:** `CommonTranslation`,
      `SearchPageTranslation`, `MyAccountTranslation`, `LogTypeTranslation`
      still have getters for keys that belong to modules (they read '' when
      the module is absent); move them into the modules' translation classes.
- [ ] **Unused locale keys:** about 400 core keys have no code reference,
      plus the `error` keys of exceptions removed on 2026-10-10.

## Known bugs (tracked in module specs)

- VuMeet gap #42 — iOS calls don't ring in the background (VoIP push path
  not wired) — [VuMeet.md](../modules/VuMeet.md) §10.
- VuMeet gap #43 — a chat message push reaches only one other member —
  [VuMeet.md](../modules/VuMeet.md) §10.
- ToDo — create/update storage checks are no-ops in production —
  [ToDo.md](../modules/ToDo.md), Known Gaps.

## When deploying to an existing server

- Servers set up before VuMeet was named VuMeet need
  `TEXTER_MAX_FILE_SIZE_MB` renamed to `VU_MEET_MAX_FILE_SIZE_MB` in
  `apps/copor/server/.env`; app builds that old call `/texter`, so update
  server and app together.
