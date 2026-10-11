# Help

Status: 🟢 Implemented — static pages in the app; the changelog is served by the server

Owner: _(assign)_

Code: optional module `help` — server `packages/help/server/src/domain/Help/` (permissions,
features, `Changelog/`) and `packages/help/server/src/client/Help/` (`HelpModule.ts`, the
changelog routes; no tables), content in `apps/copor/server/changelog/`;
frontend `packages/help/flutter/lib/src/` (`config/help_module.dart`,
`config/help_routes.dart`). Listed in `apps/copor/server/src/modules.ts` and
`frontend/lib/modules.dart`.

## Purpose

The app's help and information pages:

- **Help dashboard** (`/help`) — links to external documentation, contact and
  account-deletion info (`AppLinks`).
- **About** (`/about`) — app version and the changelog, from the server
  (`ChangeLogService`, see "Changelog" below).
- **Tools** (`/tools`) — an empty dashboard template for an app's own
  external tools; the only Help page with a side-menu entry (order 50).
- **App installation** (`/app-installation-page`) — public (no login): how to
  install the app, with the download links of the latest changelog entry.
  The login page links to it through `AppInstallationButton`.

## Changelog

`apps/copor/server/changelog/<version>.md`, one file per version (see the folder's
README for the format, the date and the `RELEASES` download-link block).
Files whose name doesn't start with a digit (README, template) are ignored;
versions sort newest first by their dot-separated numbers. Read on every
request, so a new entry or link needs no app release.

- `GET /help/changelog` — `[{version, publishDate?}]`, newest first.
- `GET /help/changelog/<version>` or `/latest` — `{version, publishDate?,
  content, releases: [{platform, url}]}`; `content` is the Markdown without
  the `RELEASES` block, `platform` upper case (`IOS`, `ANDROID`). Unknown
  version (or no changelog for `latest`): 404 `ChangelogNotFoundException`.
  Only names the folder lists are read, never a path built from the request.

Both are public (excluded in `JwtAuthenticationMiddleware`, listed in the
frontend's `PublicRoutes`): the installation page is shown before login.
Requests: `__HTTPRequest__/Help.http`.

## Available for Roles

- Feature access: `help.canViewHelpFeature`, `help.canViewAboutFeature`,
  `help.canViewToolsFeature` (one per page, no dependencies). The frontend
  also lists the three pages as always accessible, so `FeatureGuard` lets
  them through regardless (unchanged from before the module). The
  installation page and the changelog routes are public.

## How it plugs into core

Frontend hooks (see `FRONTEND_MODULE_CONVENTIONS.md`): `routeBranches` (About,
Help, Tools), `publicRoutes` (installation page), `loginPageActions`
(install button), `drawerFooterLinks` (About), `pageScaffold`,
`alwaysAccessibleRoutes`. Server: `routes` (`/help`).

Without Help, the drawer footer shows only Logout and the login page has no
install button; nothing else changes.

## Leaving it out

Remove `helpModule` from `apps/copor/server/src/modules.ts` and
`@copor/help` from the app's `package.json`, and `HelpModule()` from
`frontend/lib/modules.dart` and `copor_help` from `frontend/pubspec.yaml`.
`apps/copor/server/changelog/` is then simply unused.

## Open Questions

_(none open)_
