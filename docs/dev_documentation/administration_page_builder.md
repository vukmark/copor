# Administration Page Builder

Administration Page Builder is an abstraction made for easy implementation of administrator pages on frontend.

## Standard Implementation

Follow these steps to generate a standard administration page with default Create and Edit functionality.

### Step 1: Define Namespace and Filter Key constants

The framework relies on a `namespace` and a `filterKey` to communicate with the backend.

* **Namespace:** Used to fetch the correct tables, translated page titles, and generate routes.
* **Filter Key:** Used to fetch the corresponding filters.

> **Critical:** Both the namespace and filter key must exactly match the corresponding backend endpoints.

Add a `static const String` to each file:

* `administration_namespaces.dart` — e.g., `static const String myFeature = 'my-feature';`
* `administration_filter_keys.dart` — e.g., `static String myFeature = 'MY_FEATURE';`

### Step 2: Add Route and Translations

1. Define the new route path in `AppRoutes` (`packages/core/flutter/lib/src/config/router/routes.dart`).
2. Add the required translation keys to your `.json` translation files:
    * Page Title (e.g., `CONTRACT_TYPE`)
    * Edit Title (e.g., `EDIT_CONTRACT_TYPE`)
    * Create Title (e.g., `ADD_CONTRACT_TYPE`)

### Step 3: Register Namespace Configuration

In `administration_namespaces.dart`, add an entry to the `_configs` map for your new namespace. This wires together the filter key, route, and translated titles so the framework can resolve them automatically.

```dart
myFeature: _AdminNamespaceConfig(
  filterKey: AdministrationFilterKeys.myFeature,
  route: AppRoutes.myFeature,
  title: (t) => t.MY_FEATURE,
),
```

The `editTitle` and `createTitle` fields are optional — they fall back to the generic `t.EDIT` and `t.ADD` if omitted.

### Step 4: Create the Page Builder Class

In `administration_page_builder.dart`, create a new class that extends `AdministrationPageBuilder`. Pass your new namespace to the `super` constructor.

```dart
class MyFeaturePage extends AdministrationPageBuilder {
  const MyFeaturePage()
      : super(namespace: AdministrationNamespaces.myFeature);
}
```

By default, both the create and edit routes are rendered as modals. Override `useModalCreateRoute()` or `useModalEditRoute()` to return `false` if you need full-page navigation instead.

### Step 5: Add to Router

In `administration_dashboard_route.dart`, add an instance of your new class to `administrationPageList`. This automatically registers the base route along with the `/create` and `/edit/:id` sub-routes.

```dart
const List<AdministrationPageBuilder> administrationPageList = [
  // ... existing pages
  MyFeaturePage(),
];
```

### Step 6: Dashboard entry (server side)

The administration dashboard is built by the server (`GetDashboardMenuPresenter`) from the registered features' `dashboardItem`; the frontend renders the categories it receives. Add the entry on the feature definition in Step 7 — no frontend dashboard change. Items whose feature the user hasn't unlocked are left out automatically.

### Step 7: Register the Feature

Add the feature to `packages/core/server/src/domain/FeatureList/enum/CoreFeature.ts` (or, for an optional module, that module's `<Feature>Feature.ts`). The value **must exactly equal the `AppRoutes` path string** — the frontend checks feature access by matching the route path against the enabled feature list.

```typescript
ADMINISTRATION_MY_FEATURE = '/administration/my-feature',
```

Then define it in `CoreFeatureDefinitions.ts` (or the module's `<Feature>FeatureDefinitions.ts`):

```typescript
{
    key: CoreFeature.ADMINISTRATION_MY_FEATURE,
    viewPermission: CorePermission.canViewAdministrationMyFeatureFeature,
    dashboardItem: {category: DashboardCategory.SYSTEM, icon: 'gear', titleKey: 'MY_FEATURE', order: 100}
},
```

A user sees the feature when their effective permissions ALLOW its `viewPermission`.

### Step 8: App Bar

There is no abstracted app bar yet. You will need to define `pageEdit` and `pageCreate` route constants in `routes.dart` and pass them to the app bar updater, following the same pattern as existing pages.

---

## Advanced Usage: Special Cases

The `AdministrationPageBuilder` is designed to be extensible for modules requiring specific state management or non-standard routing structures.

### 1. Injecting Custom Providers

If a module requires specific Blocs (e.g., providing a `StateSimpleListBloc` in forms), override `getAdditionalProvidersBuilder`. This ensures the Bloc is available within the correct scope without modifying the global routing logic.

```dart
class RegionPage extends AdministrationPageBuilder {
  const RegionPage() : super(namespace: AdministrationNamespaces.region);

  @override
  List<BlocProvider> Function()? getAdditionalProvidersBuilder() =>
      () => [BlocScopeRegistry.provider<StateSimpleListBloc>(namespace)];
}
```

### 2. Adding Custom Sub-Pages

Certain modules require routing structures beyond the standard Create/Edit flow. For instance, `LogPage` does not use the standard form; instead it requires a custom `/info` sub-route for read-only log details.

Override `getAdditionalPageBuilder` to define the custom sub-page:

```dart
class LogPage extends AdministrationPageBuilder {
  const LogPage() : super(namespace: AdministrationNamespaces.log);

  @override
  AdditionalPageBuilder? getAdditionalPageBuilder() => AdditionalPageBuilder(
        pageKey: 'info',
        pageBuilder: (id) => LogInfoPage(id: id!),
        title: (t) => t.VIEW_LOG_DATA,
      );
}
```

### 3. Suppressing UI Controls

Add the namespace to any of these static sets in `AdministrationNamespaces` to hide the corresponding UI element for that page:

| Set | Effect |
|-----|--------|
| `noAddButtonPages` | Hides the create/add button |
| `noSearchBarPages` | Hides the search bar |
| `noFilterButtonPages` | Hides the filter button |

---

## Implementation Checklist

Before completing the implementation, verify the following:

- [ ] **Namespace constant** added to `AdministrationNamespaces` in `administration_namespaces.dart`
- [ ] **Filter key constant** added to `AdministrationFilterKeys` in `administration_filter_keys.dart`
- [ ] **Namespace config** (`filterKey`, `route`, `title`) registered in the `_configs` map in `administration_namespaces.dart`
- [ ] **Route constant** defined in `AppRoutes` (`routes.dart`)
- [ ] **Translation keys** added for Page Title, Edit Title, and Create Title in all supported locale files
- [ ] **Page builder class** created in `administration_page_builder.dart` and added to `administrationPageList` in `administration_dashboard_route.dart`
- [ ] **Dashboard item**: `dashboardItem` set on the feature definition (server side)
- [ ] **Feature** added to `CoreFeature.ts` (or the module's `<Feature>Feature.ts`) with value matching the `AppRoutes` path string, plus its definition with `viewPermission`
- [ ] **Feature flag enabled** for the required roles via the Feature Flags admin page
