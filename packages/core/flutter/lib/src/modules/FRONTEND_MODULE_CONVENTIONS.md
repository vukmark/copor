# Frontend Module Conventions

A developer should be able to read this and know exactly how to structure a new module.

---

## Folder Structure

The tree below is a module's `lib/src/modules/<module_name>/` inside core (core features); an optional module's own package has the same tree directly under its `lib/src/` (see "Optional modules").

```
modules/<module_name>/
├── config/                        # Wiring — no business logic, no UI
│   ├── <module>_module.dart                 # CoporModule descriptor (optional modules only)
│   ├── <module>_dependency_injection.dart   # GetIt registrations
│   ├── <module>_router.dart                 # GoRouter branch + BlocProviders + BlocListeners
│   ├── <module>_routes.dart                 # Route path constants
│   ├── <module>_keys.dart                   # String keys for loading/error/warning states
│   ├── <module>_namespaces.dart             # String keys for BlocScopeRegistry
│   └── scopes/
│       └── <module>_page_scope.dart         # ScopeBuilder — provides blocs to a sub-tree
│
├── data/                          # Everything that touches the network or local storage
│   ├── data_source/
│   │   └── <feature>/
│   │       ├── <feature>_remote_source.dart      # Retrofit @RestApi interface + impl
│   │       ├── <feature>_remote_source.g.dart    # Generated
│   │       └── <feature>_local_source.dart       # SharedPreferences impl (if needed)
│   ├── model/
│   │   ├── <feature>/
│   │   │   ├── <feature>_model.dart              # Response DTO (fromJson / toJson)
│   │   │   ├── <feature>_model.g.dart            # Generated
│   │   │   └── <feature>_req_body_dto.dart       # Request DTO (if different from model)
│   │   └── translation/
│   │       └── <module>_translation.dart         # Translation keys class
│   └── repository_impl/
│       └── <feature>/
│           ├── <feature>_repository.dart         # Abstract interface
│           └── <feature>_repository_impl.dart    # Extends BaseRepository, calls sources
│
├── logic/                         # State management — no UI, no HTTP
│   ├── <feature>/
│   │   ├── <feature>_bloc.dart    # Bloc or Cubit
│   │   ├── <feature>_event.dart   # Events (Bloc only)
│   │   └── <feature>_state.dart   # State
│   └── utils/
│       ├── <module>_bloc_factory.dart           # Creates and initialises blocs from getIt
│       ├── <module>_bloc_event_dispatcher.dart  # Typed methods that add events to blocs
│       └── <module>_bloc_reactions.dart         # Context-level shortcuts (reads bloc + dispatches)
│
├── presentation/                  # UI only — reads state, delegates actions upward
│   ├── pages/
│   │   └── <page>/
│   │       └── <page>_page.dart   # Full screen; HookWidget; wires state → layout builder
│   ├── components/                # Reusable widgets scoped to this module
│   │   └── <feature>/
│   │       └── <widget>.dart
│   ├── modals/                    # Bottom sheets and dialogs
│   │   └── <name>_modal.dart / <name>_sheet.dart
│   ├── <module>_module_root.dart  # Top-level HookWidget; owns local handlers and calls layout builder
│   ├── <module>_layout_builder.dart  # Pure StatelessWidget; receives all data/callbacks as params
│   └── <module>_scaffold.dart     # Implements DSPageAppBar / DSPageDrawer / DSPageBottomNavBar
│
└── helpers/                       # Pure functions with no Flutter/bloc dependency
    └── <helper>.dart
```

---

## Layer Responsibilities

**`config/`** — wires everything together; contains no business logic and no widgets.
- `dependency_injection.dart` registers all data sources, repositories, and blocs into GetIt. Core modules: call `init()` from the global DI file. Optional modules: call it from `registerDependencies()` in the module's `<module>_module.dart` (see Optional modules below).
- `router.dart` defines the `GoRouter` `StatefulShellBranch` or `ShellRoute`, instantiates `BlocProvider` and `BlocListener` lists, and maps paths to pages.
- `routes.dart` holds only path string constants and URI builder helpers.
- `keys.dart` holds only string constants used as loading/error/warning keys passed to the scaffold.
- `namespaces.dart` holds string keys used with `BlocScopeRegistry`.
- `scopes/` contains `ScopeBuilder` subclasses that provide a subset of blocs to a specific sub-tree (e.g. a single page rather than the whole module).

**`data/`** — the only layer that knows about HTTP, SharedPreferences, or Retrofit.
- `data_source/` splits into `remote` (Retrofit `@RestApi`) and `local` (SharedPreferences via `BaseListLocalDataSource`). Each sub-feature gets its own folder.
- `model/` contains JSON-serialisable DTOs (`@JsonSerializable`). Request bodies and response models live here. Always add a `translation/` subfolder for the module's translation key class.
- `repository_impl/` defines an abstract interface and a concrete `BaseRepository` subclass that composes local + remote calls. The repository decides caching strategy (`performOperationAndMapToResult` = try local first, then remote; `performVoidOperation` = remote only).

**`logic/`** — pure state machines; no `BuildContext`, no HTTP.
- One folder per feature, each with `_bloc.dart` / `_event.dart` / `_state.dart`.
- Use `Bloc` when you need distinct event types; use `Cubit` for simpler toggle/selection state.
- `utils/` holds three files that keep bloc usage consistent across the module:
  - `_bloc_factory.dart` — creates blocs from `getIt` and fires initial events.
  - `_bloc_event_dispatcher.dart` — typed methods that wrap `bloc.add(Event(...))` calls. UI never constructs events directly.
  - `_bloc_reactions.dart` — shortcut methods that take `BuildContext`, read the right bloc, and call the dispatcher.

**`presentation/`** — reads state and delegates all mutations upward via callbacks.
- `<module>_module_root.dart` is a `HookWidget` that watches blocs, derives local handlers (delete confirm, navigation), and passes pure data + callbacks into the layout builder.
- `<module>_layout_builder.dart` is a `StatelessWidget` with no bloc reads — it accepts everything as constructor params. This is the only file that builds the actual widget tree.
- `<module>_scaffold.dart` implements the `DSPageAppBar` / `DSPageDrawer` family of interfaces to supply the app shell with the module's app bar, drawer, and bottom nav.
- `pages/` holds full screens. `components/` holds reusable sub-widgets. `modals/` holds bottom sheets and dialogs.

**`helpers/`** — stateless pure functions (no Flutter, no bloc). Utilities that don't belong in any layer above.

---

## Naming Conventions

| Layer | File pattern | Class pattern |
|---|---|---|
| Remote source | `<feature>_remote_source.dart` | `<Feature>RemoteDataSource` (abstract) + `<Feature>RemoteDataSourceImpl` |
| Local source | `<feature>_local_source.dart` | `<Feature>LocalDataSource` (abstract) + `<Feature>LocalDataSourceImpl` |
| Repository | `<feature>_repository.dart` + `<feature>_repository_impl.dart` | `<Feature>Repository` / `<Feature>RepositoryImpl` |
| Model | `<feature>_model.dart` | `<Feature>Model` |
| Request DTO | `<action>_<feature>_req_body_dto.dart` | `<Action><Feature>ReqBodyDTO` |
| Bloc | `<feature>_bloc.dart` | `<Feature>Bloc` |
| Event | `<feature>_event.dart` | `<Feature>Event` (sealed/abstract) |
| State | `<feature>_state.dart` | `<Feature>State` |
| Cubit | `<feature>_cubit.dart` | `<Feature>Cubit` |
| Factory | `<module>_bloc_factory.dart` | `<Module>BlocFactory` |
| Dispatcher | `<module>_bloc_event_dispatcher.dart` | `<Module>BlocEventDispatcher` |
| Reactions | `<module>_bloc_reactions.dart` | `<Module>BlocReactions` |
| Page | `<page>_page.dart` | `<Page>Page` |
| Layout | `<module>_layout_builder.dart` | `<Module>LayoutBuilder` |
| Module root | `<module>_module_root.dart` | `<Module>ModuleRoot` |
| Scaffold | `<module>_scaffold.dart` | `<Module>Scaffold` |
| Scope | `<module>_page_scope.dart` | `<Module>PageScope` |

---

## Key Patterns

### Data flow
```
UI widget
  → calls EventDispatcher method
    → bloc.add(Event)
      → Bloc calls Repository
        → Repository calls RemoteDataSource (HTTP) or LocalDataSource (cache)
          → emits new State
            → UI rebuilds via BlocBuilder / context.watch
```

### DI lifecycle
- **`registerLazySingleton`** — blocs that persist for the app lifetime (VuMeet-style: always-on WebSocket listeners, chat state).
- **`registerFactory`** — blocs that must be fresh per page visit (form blocs, translation blocs).

### Bloc scope
- Module-wide blocs are provided at the `ShellRoute` level in `router.dart`.
- Page-specific blocs that should be disposed on navigation away use `ScopeBuilder` + `BlocScopeRegistry` in `scopes/<module>_page_scope.dart`.

### Listeners vs builders
- `BlocListener` (in `router.dart` or `scope.dart`) handles side-effects: navigation, banners, refreshing a second bloc.
- `BlocBuilder` / `context.watch` (in widgets) handles rebuilds.
- Never mix both concerns in the same widget.

### Loading / error feedback
Pass string keys from `<module>_keys.dart` to scaffold helpers (`BlocReactions.common.addPageLoadingToScaffold`, `addFailureToScaffold`). Do not show `SnackBar` or `Dialog` directly from a bloc listener unless the scaffold pattern doesn't apply.

Never put a raw `Failure.message` into a banner — both `addFailureToScaffold` and `addWarningToScaffold` run it through `getTranslatedFailureMessage`, which maps connection and 5xx codes onto `CommonTranslation` strings. A message that reaches the user unmapped is whatever the transport happened to return (a proxy's HTML error page, for instance), not something a user can read.

### Picking users

A module that lets the user pick people (share recipients, chat members, …)
uses core's `UserPickerList` (`lib/src/components/user_picker/`) with the
path of its own server picker route (e.g. `/cloud/recipients`); it doesn't
call another module's list (such as Contacts) or write its own user query.
The server side is `ListVisibleUsersController` (see `client/CLAUDE.md`).

`UserPickerList` owns the search bar, paging (next page near the end of the
list) and the fetching; it fills its parent, so put it where the height is
finite (`DTFloatingLayout.expandedChild`, an `Expanded`). The caller owns the
selection (`isSelected`, `onTap`). Optional: `selectedUsers` shows the picked
users above the search (`SelectedUsersRow`, also usable on its own),
`tileBuilder` + `itemExtent` swap the default checkbox tile for the module's
own (VuMeet's `VuMeetContactPicker` does both).

### Translations
Each module owns a `<module>_translation.dart` with a typed class. Fetch it via `TranslationBloc<ModuleTranslation>` registered in DI as a factory. Fire the fetch event from `BlocFactory` during initialisation. Never hardcode strings in widgets.

## Optional modules

A feature an app may leave out (VuMeet, ToDo, Cloud, News, Calendar, Contacts, Help — the same set as the server's modules) has a `config/<module>_module.dart` extending `CoporModule` (`lib/src/core/module/copor_module.dart`), listed in the app's `frontend/lib/modules.dart` (`enabledModules`, plus the app's `homeRoute`). `main()` hands both to `AppModules.register` (`lib/src/core/module/app_modules.dart`) before anything else runs, and the app's `test/flutter_test_config.dart` does the same for every test file. Core never imports such a module by name; it loops over `AppModules.enabled` (and reads `AppModules.homeRoute`). A module imports only core and the modules in its `dependsOn`. The app's `test/core/module/module_boundaries_test.dart` enforces both (the app's `lib/` is the composition root and may import anything); move shared code into core or declare the dependency rather than importing across.

**Packages.** Core is the Flutter package `copor_core` (`packages/core/flutter`). Every optional module is its own package, `copor_<module>` in `packages/<module>/flutter` (`<module>` is the module's `name`, the same folder as its server package: `vu_meet`, `todo`, `cloud`, `calendar_entry`, `contacts`, `help`, `news`); core's `lib/src/modules/` holds only core features. A module package has the module folder flattened into its `lib/src/` (`lib/src/config/<module>_module.dart`, `lib/src/presentation/…`). Its `pubspec.yaml` depends on `copor_core` (path `../../core/flutter`), on the packages of its `dependsOn`, and on the third-party packages only it uses (Jitsi and CallKit live in `copor_vu_meet`, not core); with Retrofit/json_serializable models it also has the `build_runner` dev deps and runs its own `dart run build_runner build`. The module's tests stay in the app's `test/modules/<module>/`. The app's and the app's `frontend/pubspec.yaml` adds it next to the `enabledModules` entry. Imports across packages use `package:copor_core/…` / `package:copor_<module>/…`; relative imports stay inside one package. Leaving a module package out means removing its `enabledModules` entry and its line in `frontend/pubspec.yaml`.


| Hook | Used by |
|---|---|
| `registerDependencies()` | `config/dependency_injection.dart` (`registerAllModules`) |
| `routeBranches` | `config/router/app_router.dart` (authenticated shell) |
| `alwaysAccessibleRoutes` | `AppRoutes.alwaysAccessibleRoutes` → `FeatureGuard` |
| `navEntries` (`ModuleNavEntry`: icon, label, `order`, `requiresFeature`, `badgeKey`, dot, `onOpen`) | bottom navigation; the drawer uses the matching entry's dot and `onOpen` |
| `pageScaffold(context, state, path)` | `ScaffoldUpdater.getPageScaffold` (first non-null wins) |
| `globalProviders(context)` | app root providers in `copor_app.dart` |
| `searchSections` (`ModuleSearchSection`: `order`, `providers`, `listeners`, `search`, `hasResults`, `buildSection`) | core Search page (`search_router.dart`, `search_results.dart`) — sections below Users, in `order` |
| `preferenceSections` (`ModulePreferenceSection`: `titleKey`, `helpOnKey`, `helpOffKey`, `toggles` of `preferenceKey` + `labelKey`, `order`) | My Account → Notifications (`notifications.dart`); keys are `my_account` translation keys the module adds through its server locales, values come from `PreferencesModel.modulePreferences` |
| `onLogout()` | `AuthorizationBloc` logout |
| `openInboxNotification(id)` / `openPushNotification(data)` | end-drawer inbox tap / push notification tap |
| `handleForegroundPush(message)` | `NotificationService.handleMessage` — a push that arrives while the app is open (first module returning true wins; `NotificationService.showLocalNotification` shows the system notification) |
| `handleWebSocketMessage(event, payload)` | `ConnectionManager` — each WebSocket message (first module returning true wins) |
| `handleBackgroundPush(message)` | `firebaseMessagingBackgroundHandler` in `main.dart` — its own isolate: DI is set up, the widget tree isn't |
| `onPushNotificationsInit()` | `initialisePushNotifications` — after Firebase is up (VuMeet: CallKit, call signaling) |
| `scaffoldListeners()` | `AppScaffold` — listeners that must not depend on the mounted page (VuMeet joins a connected call) |
| `wrapAppBarTitle(title)` | `ScaffoldUpdater` — replaces a page's app-bar title (VuMeet's return-to-call pill) |
| `publicRoutes` (`GoRoute`s) | `app_router.dart` — added next to login, outside the authenticated shell; their paths join `AppRoutes.publicRoutes` (Help's app installation page). `pageScaffold` covers them too |
| `loginPageActions(context)` | login page — widgets above the sign-in button (Help's "install the app" button) |
| `drawerFooterLinks` / `devMenuLinks` (`ModuleDrawerLink`: route, icon, label) | `app_menu_drawer.dart` — footer buttons before Logout (Help's About) / the debug-only Dev menu (no module uses it today) |

Settings a module's server hands the app (its `clientConfig`, e.g. its upload limit) are in `PreferencesModel.moduleConfig[<name>]`; read the upload limit with `preferences.moduleMaxFileSize(<Module>.moduleName)` (each module class has a `moduleName` constant matching the server). Core screens use core's own `maxImageSize`, never a module's limit.

`homeRoute` is the page behind the bottom nav's Desk entry. It must be a route of core or an enabled module, and not one a module already has in `navEntries` (with `/vu-meet` as home the nav shows Desk and VuMeet as two tabs to the same page). Leaving out a module may mean dropping the modules that depend on it: without ToDo, Checklist and Calendar go too.

Route constants of an optional module live in its own `<module>_routes.dart`, not in core's `AppRoutes`. Assets a module ships (Help's changelog and progress Markdown) are still declared in `pubspec.yaml`; leaving the module out means removing those `flutter: assets:` lines too, or the build fails on the missing folders. Core keeps the shared push plumbing: `flutterLocalNotificationsPlugin` and `androidNotificationChannel` (`config/push_notification_options.dart`), `NotificationService.showLocalNotification`, and `PushNotificationHelper`'s platform checks. Core widgets that need a module's strings take an interface (e.g. `MediaPickerTranslations`) that the module's translation class implements, never the module's class.
