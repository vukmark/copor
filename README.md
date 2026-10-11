# Copor

By [VukMark](https://github.com/vukmark).

A multi-tenant application platform: a core (login, self-registration,
users, roles, permissions, user groups, tenants, system settings,
notifications, file storage, code generators, a Flutter theme and scaffold)
plus optional feature modules an app includes or leaves out — VuMeet (chat
and calls), Cloud (files), ToDo, Checklist, Calendar, News, Contacts, Help
and AI context items.

## Layout

| Path | Purpose |
|------|---------|
| `packages/core/server/` | `@copor/core`: the core server — `src/domain` (business logic) and `src/client` (Express.js, Kysely/MySQL) |
| `packages/<module>/server/` | `@copor/<module>`: each optional module's server side |
| `apps/copor/server/` | The Copor server app: composition root, `.env`, settings, changelog, assets, app tests |
| `packages/core/flutter/` | `copor_core`: the core Flutter package — app shell, routing, DI, shared data and components, core pages |
| `packages/<module>/flutter/` | `copor_<module>`: an optional module's Flutter side |
| `frontend/` | The Copor Flutter app (mobile/web/desktop): composition root (`lib/main.dart`, `lib/modules.dart`), Firebase options, platform folders, assets, tests |
| `packages/copor_theme`, `packages/copor_scaffold*` | Shared Flutter design-system packages |
| `docs/` | Decisions, module specs, dev documentation (start at `docs/MOC.md`) |

An app picks its modules in `apps/copor/server/src/modules.ts` and
`frontend/lib/modules.dart`. See `CLAUDE.md` for the architecture guide
(layer conventions, controller pattern, RepoPicker DI, modules, code
generators) and `docs/plans/open_tasks.md` for what is still to do.

## Setup

The `copor` command (`tools/`) does each step; source its environment first
(e.g. from your shell's rc file): `source <repo>/tools/copor_env.sh`.

1. `copor npm install` — `npm install` at the root (npm workspaces: every
   `packages/*/server` and `apps/*/server`) plus `flutter pub get` in every
   Flutter package and the app.
2. `copor setup env` — creates `apps/copor/server/.env` from its `.dist.env`;
   fill in real values. Supply your own Firebase service-account key at the
   path in `FIREBASE_ADMIN_KEY_FILE`.
3. `copor db create` — creates the local database and its user from `.env`
   (`DB_NAME`, `DB_USER`, `DB_PASS`; rights on that database only, via
   `sudo mysql` or `COPOR_DB_ADMIN`) and runs the migrations (core first,
   then each included module). Later schema changes:
   `cd apps/copor/server && npm run db:migrate`.
4. `copor setup hooks` — git hooks that run `flutter pub get` after a pull or
   checkout changes a pubspec.
5. `copor run backend` and `copor run web` (or `cd apps/copor/server && npm run dev`
   and `cd frontend && flutter run -d chrome`).

More commands are in `CLAUDE.md`.

## Placeholders to replace

- **External services**: Jitsi (`https://meet.example.com`), release-mode API
  URL (`https://server.example.com`), git host (`git.example.com`), deploy
  target in `apps/copor/server/bin/hooks/bare/post-receive`.
- **Firebase**: `frontend/lib/firebase_options.dart`, `google-services.json`,
  `GoogleService-Info.plist`, `firebase.json` and
  `web/firebase-messaging-sw.js` hold dummy values — run
  `flutterfire configure` against your own project.
- **App ID** `com.example.copor` on Android/iOS/macOS/Linux (including the
  native file-saver method channel).
- **Artwork** (the Copor logo): the in-app logo is
  `frontend/assets/logo-solo-cropped.svg` (its strokes use `currentColor`,
  drawn in the theme's text colour by `AppLogoSvg`); platform icons
  regenerate from `frontend/assets/copor.png` and `frontend/assets/app_icon/*`
  via `dart run flutter_launcher_icons` (config in
  `frontend/flutter_launcher_icons.yaml`); the web loading splash is inline in
  `frontend/web/index.html`; the backend logo (`/logo`, e-mails) is
  `apps/copor/server/assets/img/{copor,logo}.png`.
- **Look**: colours are the light/dark Material schemes in
  `packages/copor_theme/lib/src/theme/app_theme.dart` plus the component
  tokens in `extensions/copor_colors.dart` (the initials-avatar palettes in
  core, server and Flutter, mirror their primary/secondary/tertiary/success/
  error); the font is Inter (`frontend/assets/fonts/inter/`, OFL), the corner
  radius `coporBorderRadius` in `tokens/spacing.dart`.
- **Legal texts**: the Impressum and Terms of Use served at `/documents/*`
  are placeholder PDFs in `apps/copor/server/assets/documents/` (sources and
  regeneration steps in its `README.md`); external links are in `AppLinks`
  (`packages/core/flutter/lib/src/utils/constants.dart`) and the `default` locale's e-mail
  strings.
- **Changelog**: `apps/copor/server/changelog/<version>.md` (see its `README.md`).

## Tests

- `cd apps/copor/server && npm run test` — every package's tests, plus the
  package boundary check.
- `cd frontend && flutter test` — run
  `dart run build_runner build --build-filter="test/**"` once on a fresh
  checkout to generate the gitignored mocks.

## License

[MIT](./LICENSE) © 2022–2026 VukMark. The license covers the code; the names
"Copor" and "VukMark" and the logo are not licensed for use by others —
replace them in your own apps (see "Placeholders to replace").
