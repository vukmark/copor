# copor_scaffold

Scaffold system for Copor applications. Provides a BLoC-driven shell that any page in the app can configure — app bar, drawer, loading indicators, error banners, toast notifications, and badge counts — without `GlobalKey`s or prop-drilling.

---

## Contents

- [Architecture overview](#architecture-overview)
- [Setup](#setup)
- [Configuring a page](#configuring-a-page)
- [Loading indicators](#loading-indicators)
- [Banners](#banners)
- [Toast notifications](#toast-notifications)
- [Badge counts](#badge-counts)
- [Page interface contracts](#page-interface-contracts)
- [CoporScaffoldConfig](#coporscaffoldconfig)
- [Tester page](#tester-page)

---

## Architecture overview

```
BlocProvider<CoporScaffoldCubit>          ← provided once, at the app root
└── CoporScaffold                         ← the shell (Scaffold + overlays)
    └── CoporScaffoldSetup (per page)     ← pushes chrome into the cubit
        └── page content
```

`CoporScaffoldCubit` is the single source of truth for all scaffold-level UI state. Pages push their chrome (app bar, FAB, drawer…) into the cubit via `CoporScaffoldSetup`; `CoporScaffold` reads the cubit and renders it. Runtime state (loading, banners, notifications, badges) can be mutated from anywhere in the tree at any time.

---

## Setup

### 1. Add the dependency

```yaml
dependencies:
  copor_scaffold:
    path: ../copor_scaffold   # or your path / git ref
```

### 2. Provide the cubit and wrap with `CoporScaffold`

Do this once, above your router / navigator:

```dart
BlocProvider(
  create: (_) => CoporScaffoldCubit(),
  child: CoporScaffold(
    child: myAppRouter,
  ),
)
```

`CoporScaffold` renders the Flutter `Scaffold`, the page-loading overlay, the banner queue, and the notification toast queue automatically. No further wiring is required.

---

## Configuring a page

Use `CoporScaffoldSetup` inside any page to declare what chrome that route should show. It calls `CoporScaffoldCubit.configureScaffold` on first build and on any structural change.

```dart
class MyPage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return CoporScaffoldSetup(
      appBar: const DTAppBarShell(),
      leading: Builder(
        builder: (ctx) => DTButton.floating(
          icon: PhosphorIconsRegular.list,
          label: 'Menu',
          onPressed: () => Scaffold.of(ctx).openDrawer(),
        ),
      ),
      title: const Text('My Page'),
      actions: [
        Builder(
          builder: (ctx) => CoporNotificationButton(
            destination: DTNotificationDestination.bell,
            onPressed: () => Scaffold.of(ctx).openEndDrawer(),
          ),
        ),
      ],
      drawer: const AppMenuDrawer(),
      endDrawer: const NotificationsDrawer(),
      floatingActionButton: Builder(
        builder: (ctx) => DTButton.floating(
          icon: PhosphorIconsRegular.plus,
          label: 'New',
          onPressed: _handleNew,
        ),
      ),
      child: const _MyPageBody(),
    );
  }
}
```

Every slot is optional. Omitting or passing `null` for a slot clears it from the scaffold. Runtime state (banners, loading sources, badges) is always preserved across `configureScaffold` calls.

### DTAppBarShell

`DTAppBarShell` is a thin `PreferredSizeWidget` that reads the cubit and delegates to `DTAppBar`. Use it as the `appBar` argument in `CoporScaffoldSetup` on any migrated route:

```dart
appBar: const DTAppBarShell(maxWidth: coporMaxContentWidth),
```

---

## Loading indicators

Two styles, chosen by `DTLoadingSourceType`:

| Type | Visual | When to use |
|---|---|---|
| `request` | Thin progress bar in the app bar | Background API calls (save, paginate) |
| `page` | Full-page ring-loader overlay | Blocking fetches where content isn't ready yet |

Multiple sources can be active simultaneously. The indicator hides only when all sources for that type are removed. Removal has a built-in **500 ms debounce** to prevent flicker on fast consecutive loads.

```dart
final cubit = context.read<CoporScaffoldCubit>();

// Show
cubit.addLoadingSource(const DTLoadingSource.request('api_save'));
cubit.addLoadingSource(const DTLoadingSource.page('translations'));

// Hide (debounced 500 ms)
await cubit.removeLoadingSource('api_save');
await cubit.removeLoadingSource('translations');

// Shorthand
cubit.addRequestLoading('search');
cubit.addPageLoading('initial_data');
```

---

## Banners

Persistent messages displayed at the bottom of the page content area, one at a time. Banners are queued by priority: `error > warning > success > info`.

### Showing a banner

```dart
final cubit = context.read<CoporScaffoldCubit>();

cubit.addBanner(const CoporBanner.error(
  'Connection failed.',
  source: 'login_bloc',
));

cubit.addBanner(const CoporBanner.warning(
  'Your session will expire in 5 minutes.',
  source: 'auth_bloc',
));

cubit.addBanner(const CoporBanner.success(
  'Profile saved.',
  source: 'profile_bloc',
));

cubit.addBanner(const CoporBanner.info(
  'New version available.',
  source: 'update_checker',
));
```

`source` identifies the producer and is used for **deduplication** — adding the same `source` + `type` pair a second time is a no-op.

### Dismiss behaviour

Each banner can override the auto-dismiss timing independently:

```dart
// Uses the config default for its type (see CoporScaffoldConfig):
CoporBanner.error('Something failed.', source: 'api')

// Never auto-dismisses — user must tap ✕:
CoporBanner.warning(
  'Unsaved changes.',
  source: 'form',
  dismiss: CoporBannerDismiss.indefinite,
)

// Auto-dismisses after a specific duration, ignoring the config:
CoporBanner.success(
  'Copied!',
  source: 'clipboard',
  dismiss: CoporBannerDismiss.after(const Duration(seconds: 2)),
)
```

### Removing banners

```dart
cubit.removeBanner();    // removes the currently shown banner
cubit.clearBanners();    // removes all banners
```

---

## Toast notifications

Short-lived cards shown in the top-right corner (desktop) or top-centre (mobile). They queue automatically and self-dismiss after a configurable duration.

`NotificationQueue` is rendered automatically by `CoporScaffold` — no extra widget needed.

### Showing a toast

```dart
context.read<CoporScaffoldCubit>().addNotification(
  DTNotification(
    id: 'msg_${DateTime.now().millisecondsSinceEpoch}',
    title: 'Alice',
    body: 'Hey, are you free tomorrow?',
    imageUrl: 'https://example.com/alice.jpg', // optional avatar
  ),
);
```

| Field | Required | Description |
|---|---|---|
| `id` | ✓ | Unique key; use a timestamp or UUID to avoid collisions |
| `title` | ✓ | Primary headline (shown as avatar initials when no image) |
| `body` | ✓ | Message preview |
| `imageUrl` | — | Avatar/thumbnail URL |
| `unreadCount` | — | Optional count to display inside the toast |

Toasts and badge counts are **independent** — showing a toast does not automatically change any badge. Increment badges separately:

```dart
cubit.addNotification(...);
cubit.incrementBadgeCount(DTNotificationDestination.bell.key);
```

---

## Badge counts

Badge counts are stored in the cubit as a `Map<String, int>` keyed by destination key. Any widget can read and render the count; `CoporNotificationButton` does this automatically.

### Managing counts

```dart
final cubit = context.read<CoporScaffoldCubit>();

// Set an absolute count (e.g. after fetching inbox on login):
cubit.setBadgeCount(DTNotificationDestination.bell.key, 12);
cubit.setBadgeCount('messages', 3);

// Increment (e.g. on incoming push notification):
cubit.incrementBadgeCount(DTNotificationDestination.bell.key);
cubit.incrementBadgeCount('messages', 2);

// Clear a single destination (e.g. after user opens the drawer):
cubit.clearBadgeCount(DTNotificationDestination.bell.key);

// Clear all:
cubit.clearAllBadgeCounts();
```

> **Built-in behaviour:** `CoporScaffold` automatically calls  
> `clearBadgeCount(DTNotificationDestination.bell.key)` whenever the end drawer is opened.

### Custom destinations

Define your own destination keys for bottom-nav items or any other badge-bearing surface:

```dart
const messagesDestination = DTNotificationDestination('messages');
const calendarDestination = DTNotificationDestination('calendar');
```

### CoporNotificationButton

A ready-made button that reads the cubit and renders the badge automatically:

```dart
CoporNotificationButton(
  destination: DTNotificationDestination.bell,
  onPressed: () => Scaffold.of(context).openEndDrawer(),
  border: true,
)

// Custom destination:
CoporNotificationButton(
  destination: DTNotificationDestination('messages'),
  icon: PhosphorIconsRegular.chatCentered,
  tooltip: 'Messages',
  onPressed: () { /* navigate */ },
)
```

---

## Page interface contracts

Optional abstract classes for routes that need to expose scaffold chrome to a parent shell or router. Implement only the ones you need:

```dart
class MyRoute extends StatelessWidget
    implements PageAppBar, AppBarTitle, AppBarActions {

  @override
  PreferredSizeWidget getAppBar() => const DTAppBarShell();

  @override
  Widget getTitle() => const Text('My Route');

  @override
  List<Widget> getActions() => [const _ThemeToggle()];
}
```

| Interface | Method | Purpose |
|---|---|---|
| `PageAppBar` | `getAppBar()` | App bar widget |
| `AppBarLeading` | `getLeading()` | Leading button |
| `AppBarTitle` | `getTitle()` | Centre title |
| `AppBarActions` | `getActions()` | Trailing actions |
| `PageDrawer` | `getDrawer()` | Start drawer |
| `PageEndDrawer` | `getEndDrawer()` | End drawer |
| `PageBottomNavBar` | `getBottomNavBar()` | Bottom navigation bar |
| `PageFloatingButton` | `getFloatingButton()` | FAB |

`EmptyAppBar` is a convenience implementation for routes that should have no visible app bar:

```dart
@override
PreferredSizeWidget getAppBar() => const EmptyAppBar().getAppBar();
```

---

## CoporScaffoldConfig

Pass a `CoporScaffoldConfig` to `CoporScaffold` to customise the default auto-dismiss durations for banners:

```dart
CoporScaffold(
  config: CoporScaffoldConfig(
    autoDismissDurationProvider: (type) => switch (type) {
      CoporBannerType.error   => null,                        // indefinite
      CoporBannerType.warning => const Duration(seconds: 10),
      CoporBannerType.success => const Duration(seconds: 3),
      CoporBannerType.info    => const Duration(seconds: 3),
    },
  ),
  child: myRouter,
)
```

Built-in defaults when no config is provided:

| Type | Default duration |
|---|---|
| `error` | 8 s |
| `warning` | 8 s |
| `success` | 4 s |
| `info` | 3 s |

---

## Tester page

`CoporScaffoldTesterPage` is an interactive dev-tools page for exercising every piece of scaffold state. Mount it in your debug menu or as a standalone route.

**Hosted mode** (default) — uses the host app's existing cubit and scaffold:

```dart
CoporScaffoldTesterPage(
  drawer: const AppMenuDrawer(),
  endDrawer: const NotificationsDrawer(),
  leading: Builder(builder: (ctx) => DTButton.floating(...)),
  extraActions: [Builder(builder: (ctx) => DTButton.floating(...))],
  onThemeToggle: () { /* toggle your PreferencesBloc */ },
  bottomNavBar: const DTBottomNavigation(),
)
```

**Standalone mode** — self-contained with its own cubit; no host scaffold required:

```dart
CoporScaffoldTesterPage(
  standalone: true,
  onThemeToggle: _toggleTheme,
)
```

The tester page covers: loading sources (request / page), banners (all four types), toast notifications (including typed bell / VuMeet / desk badge increments), and badge counts (set / increment / clear).
