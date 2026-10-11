# copor_theme

The Copor design system — theme tokens, atoms, components, and form fields for Flutter.

---

## Installation

Add the package to your app's `pubspec.yaml`:

```yaml
dependencies:
  copor_theme:
    path: ../packages/copor_theme   # adjust relative path as needed
```

Then run:

```sh
flutter pub get
```

---

## Applying the theme

Use `CoporThemeBuilder.build()` to generate a pair of `ThemeData` objects, then pass them to `MaterialApp`:

```dart
import 'package:copor_theme/copor_theme.dart';
import 'package:flutter/material.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    final appTheme = CoporThemeBuilder.build(
      themeMode: ThemeMode.system,         // light | dark | system
      contrastMode: ContrastMode.normal,   // normal | high
      fontWeight: AppFontWeight.normal,    // normal | bold
      fontSize: FontSize.normal,           // normal | large | extraLarge
      baseTextTheme: Theme.of(context).textTheme,
    );

    return MaterialApp(
      theme: appTheme.light,
      darkTheme: appTheme.dark,
      themeMode: ThemeMode.system,
      home: const MyHomePage(),
    );
  }
}
```

> **Note:** `CoporThemeBuilder.build()` returns an `AppTheme` record with `.light` and `.dark` fields. Pass both to `MaterialApp` so the OS can switch automatically.

---

## Accessing design tokens

### Colors — `CoporColors.of(context)`

```dart
final c = CoporColors.of(context);

// Semantic color groups
c.primary          // brand primary
c.primaryContainer // tinted fill behind primary elements
c.onPrimaryContainer

c.secondary / c.tertiary / c.success / c.error   // same pattern for each group
// ...Container, on...Container, ...Border, ...Hovered, ...Pressed

c.surface          // page background
c.surfaceBackground
c.surfaceContainer // card / input background
c.surfaceHovered
c.surfacePressed

c.outline          // default border
c.outlineSubtle    // secondary / subtle border

c.onSurface        // primary text
c.onSurfaceSubtle  // secondary / muted text

c.shadow
c.scrim
```

### Text styles — `CoporTheme.of(context).text`

```dart
final dt = CoporTheme.of(context);

dt.text.heroTitle        // large display text
dt.text.pageTitle        // page-level headings
dt.text.sectionTitle     // section / card headings
dt.text.columnHeader     // table column headers
dt.text.bodyStrong       // bold body text
dt.text.body             // default body text
dt.text.bodyLight        // lighter body variant
dt.text.bodySecondary    // de-emphasised / caption text
dt.text.labelDefault     // form labels
dt.text.chipLabel        // small labels inside chips or decorators
dt.text.buttonLabel      // button text
dt.text.compactDefault   // compact list items
dt.text.compactActive    // active compact list item
dt.text.avatarInitials   // text inside avatar circles
```

### Constants

```dart
import 'package:copor_theme/copor_theme.dart';

coporBorderRadius         // 8.0 — standard corner radius
coporInputXLarge          // extra-large input height (DTInputSize.xl)
coporInputLarge           // 52.0 — standard input height
coporInputMedium          // 44.0
coporInputSmall           // 36.0
coporInputExtraSmall      // 28.0
coporMaxContentWidth      // 1120.0 — wide page max-width
coporCompactContentWidth  // 560.0  — modal / form max-width
```

`DTInputSize` (in `dt_input_constants.dart`, exported from the barrel) is the shared sizing tier used by `DTButton.toggle`, `DTButton`'s auto-square icon buttons, and `DTCommonButtons`: `xl | normal | compact | small | xs`, each mapping to a fixed container size and default icon size.

---

## Component catalogue

All components are exported from the single barrel import:

```dart
import 'package:copor_theme/copor_theme.dart';
```

### Buttons

| Widget | Description |
|--------|-------------|
| `DTButton.primary / .secondary / .tertiary / .positive / .surface / .negative / .floating` | Themed push buttons — label, icon, or both. Auto-squares into an icon-only button when `label` is empty and `icon` is set — no separate icon-only constructor needed. |
| `DTButton.toggle` | Icon/label button that lights up when `isToggled`; supports `iconToggled`/`labelToggled` for a different look when active, and `animatedIcon` (e.g. `DTAnimatedChevron`) in place of a static icon |
| `DTCommonButtons.info / .copy / .document / .edit / .delete / .action / .negativeAction / .theme / .themeLabeled / .notification` | Pre-configured icon actions at sensible default sizes |
| `DTActionFooter.single` / `.dual` / `.delete` | Full-width bottom-sheet/dialog footer with one or two action buttons |

```dart
// Label variants auto-square when label is empty:
DTButton.primary(label: '', icon: Icons.add, tooltip: 'Add', onPressed: () {});

// Toggle with different icon/label when active:
DTButton.toggle(
  icon: PhosphorIconsRegular.sidebar,
  iconToggled: PhosphorIconsFill.sidebar,
  isToggled: isOpen,
  highlightToggled: false,
  onPressed: () => setState(() => isOpen = !isOpen),
);
```

### Display

| Widget | Description |
|--------|-------------|
| `DTAvatar` / `DTAvatar.withActivity` | Initials avatar with optional active/inactive dot |
| `DTBadge` | Numeric overlay badge — hidden when `count == 0` |
| `DTAnimatedChevron` | Rotates 180° on `isOpen` change |
| `DTCard` / `DTCard.tap` | Plain or tappable card (ripple, hover/press states) |
| `DTDivider` / `DTDivider.subtle` / `DTDivider.vertical` | Horizontal and vertical rules |
| `DTEntityHeader.small / .mobile / .large` | Profile header (avatar + title + chips + info rows) |
| `DTExpandableSection` / `DTExpandableSection.slim` | Collapsible section with animated chevron — bordered card or borderless with just a divider |
| `DTInfoChip.primary / .secondary / .tertiary / .surface / .success / .error` | Compact status chips |
| `DTInfoRow` | Icon + label row (email, phone, location…) |
| `DTListTile.primary / .secondary / .tertiary / .positive / .surface / .negative / .floating / .toggle / .expandable` | Full-width list tile sharing the same color tokens/API as `DTButton`; `.toggle` lights up when `isToggled`; `.expandable` renders a collapsible header + nested `children` |
| `DTRingLoader` / `.page` / `.inline` | Circular loading spinner (page-sized vs inline) |
| `DTEmptyState` | Icon + title + optional subtitle/CTA for empty lists/pages |
| `DTWavingDots` | Animated decorative dot layer |

```dart
// DTListTile.expandable — collapsible nav tree node, closed by default:
DTListTile.expandable(
  icon: Icons.folder_outlined,
  iconExpanded: Icons.folder_open_outlined,
  label: 'Settings',
  children: [
    DTListTile.toggle(label: 'Theme', isToggled: false, onPressed: () {}),
    DTListTile.toggle(label: 'Security', isToggled: false, onPressed: () {}),
  ],
);
```

### Inputs

| Widget | Description |
|--------|-------------|
| `DTInputField` | Text field with label, validation, and error display |
| `DTInputDecorator` / `.withHelp` / `.withAction` | Label wrapper for any input child; `.withHelp` adds a toggleable help panel, `.withAction` adds a trailing icon button |
| `DTDropdown<T>.single` / `.multi` / `.chips` | Unified dropdown: single-select, multi-select (checkbox panel), or multi-select with removable chips above the trigger. All three support `enableSearch` (local filter) or `onSearch` (async/remote, debounced, paginated via `onScrollBottom`), and fall back to a mobile bottom sheet when `isMobile: true` |
| `DTCheckbox` | Styled checkbox with label |
| `DTRadioButton` | Styled radio row |
| `DTSwitchInput` | Labelled toggle switch, with optional `helpContent` and `errorText` |
| `DTDateInput` / `.compact` | Date picker field (native date picker on Android/web, Cupertino sheet on iOS) |
| `DTPhoneInput` | Single phone number + type (`DTPhoneType`) row |
| `DTDynamicPhoneList` | Editable list of `DTPhoneEntry` items, built on `DTPhoneInput` |
| `DTTagDropdown` | Multi-select tag picker using `List<DTTag>`, optional trailing action |
| `DTPasswordField` | Password field with visibility toggle |
| `DTSearchBar` | Styled search field |
| `DTSegmentedButton<T>` | Thin wrapper over Flutter's `SegmentedButton`, styled to match the DS |
| `DTLanguageButton` / `.compact` | Country-flag language picker (full label or flag-only) |
| `DTColorPicker` | Color-swatch dropdown driven by a `Map<int, Color>` of named color enums |
| `DTContractSwitch` | Styled accept/decline toggle with a download-contract action |

```dart
// Single-select with async remote search:
DTDropdown<String>.single(
  value: selected,
  items: const [],           // seed with the currently-selected option(s) when editing
  onChanged: (v) => setState(() => selected = v),
  label: 'Assignee',
  onSearch: (query, offset) => api.searchUsers(query, offset),
);

// Multi-select with removable chips:
DTDropdown<String>.chips(
  inputLabel: 'Add technology',
  label: 'Technologies',
  selectedValues: selected,
  items: items,
  onChanged: (v) => setState(() => selected = v),
);
```

### Feedback

| Widget | Description |
|--------|-------------|
| `DTBanner.error / .warning / .success / .info` | Inline status banner with optional `onDismiss` |
| `DTDialog` | Standardised dialog card with an optional footer; use directly only when embedding in a custom `showDialog` (e.g. to inject extra `BlocProvider`s) |
| `DTDialog.show` | Presents a custom `DTDialog` via `showDialog` |
| `DTDialog.showConfirm` | Confirmation dialog (cancel + confirm) |
| `DTDialog.showDelete` | Confirmation dialog (cancel + destructive delete) |
| `DTNotificationCard` | Toast-style card (title, message, avatar, `dismissProgress` for an auto-dismiss countdown) |
| `DTDismissButton` | Small close button used alongside `DTNotificationCard` / `DTBanner` |
| `DTTopLoadingBar` | Thin indeterminate progress bar for page-level loading state |
| `DTTransparentPage` | Full-screen transparent overlay page |

```dart
DTDialog.showConfirm(
  context,
  title: 'Delete item?',
  content: 'This cannot be undone.',
  cancelLabel: 'Cancel',
  confirmLabel: 'Delete',
);
```

### Navigation

| Widget | Description |
|--------|-------------|
| `DTAppBar` | `PreferredSizeWidget` app bar with `title`, `leading`, `actions`, `isMobile` |
| `DTBreadcrumb` | Row of `DTBreadcrumbItem`s separated by chevrons; the last item (no `onTap`) renders as the active crumb |
| `DTMenuDrawer` | Drawer shell with `header` / `content` / `footer` slots |
| `DTModalAppBar` | App bar variant for modal/full-form screens — cancel button + title + proceed action, with an optional `leadingExtra` widget |
| `DTNavBar` | Bottom navigation bar driven by a list of `DTNavBarItem` (icon, label, badge `count`, `selected`, `onTap`); switches presentation via `isMobile` |
| `DTTabBar` | Themed `TabBar` |

### Layout

| Widget | Description |
|--------|-------------|
| `DTResponsiveModalLayout` | Wraps a child in the standard edit-form chrome — full content on mobile, centered card with a translucent backdrop and Escape-to-close on desktop |
| `DTStepContent` | Animated cross-fade/slide between wizard steps, keyed by `stepIndex` |
| `DTSnapScrollView` | Header + scrollable body where the header snaps away/back based on scroll direction |
| `DTDraggableScrollableSheet` | Bottom sheet with a drag handle, scrollable `contentBuilder`, and optional `footer` |
| `DTFullFormLayout` / `DTCoporForm` | Full-page create/edit form layouts wrapping `FloatingContainerLayout` with cancel/save chrome (`DTFullFormLayout` is the full-screen variant; `DTCoporForm` is the shorter, non-full-screen wrapper) |
| `FloatingContainerLayout` | Floating card layout with shadow, used underneath the two form layouts above |

```dart
DTResponsiveModalLayout(
  onClose: () => Navigator.of(context).pop(),
  child: Padding(padding: const EdgeInsets.all(24), child: myForm),
);
```

### Data / Tables

| Widget | Description |
|--------|-------------|
| `DTTable` | Pure presentation table — pass `headers`/`rows`/`isMobile` and it switches between the desktop grid and mobile card list. Requires a `DTTableLabels` (via `labels:` or an ancestor `DTTableLabelsProvider`) for cell copy like "No data found" |
| `DTTextCell` / `DTDateCell` / `DTColorCell` / `DTPublishStatusCell` / `DTPriorityCell` / `DTProgressCell` / `DTCheckedCell` / `DTFeaturedCell` / `DTCopyableTextCell` / `DTHiddenTextCell` / `DTActionCell` | Pre-built cell widgets for `DTTable` rows, each rendering one typed value (`DTPublishStatus`, `DTPriority`, `DTProgress`, etc.) |

```dart
DTTable(
  headers: [ColumnHeader(name: 'Name', key: 'name', sortKey: 'name')],
  rows: [
    [const DTTextCell(text: 'Alice Smith')],
  ],
  noData: const Center(child: Text('No data')),
  labels: const DTTableLabels(/* ... */),
  isMobile: false,
);
```

---

## Models

```dart
// Generic option for dropdowns
DTOption<T>(value: T, label: String, leading: Widget?)

// Async remote-search signature used by DTDropdown.onSearch
typedef DTDropdownSearch<T> = Future<List<DTOption<T>>> Function(String query, int offset);

// Phone entry for DTDynamicPhoneList / DTPhoneInput
DTPhoneEntry(phoneNumber: String, type: DTPhoneType)
// DTPhoneType: mobile | home | work

// Tag for DTTagDropdown
DTTag(id: String, name: String, color: int, isPrivate: bool, description: String?)

// Table column definition and per-cell enums
ColumnHeader(name: String, key: String?, sortKey: String?, ...)
DTTableLabels(noDataFound: ..., published: ..., ...)  // copy for DTTable's built-in cells
DTPublishStatus: published | unpublished | draft
DTPriority: normal | high | urgent
DTProgress: toDo | started | halfWay | almostDone | finished

// Validation helpers (dt_validators.dart)
isValidEmail(String) / isValidPostalCode(String) / isValidDoubleNumber(String) / isValidPassword(String)
```

---

## Icons

The package re-exports [Phosphor Icons](https://phosphoricons.com) (`phosphor_flutter`, MIT license) — about 1,500 icons in `PhosphorIconsThin`, `PhosphorIconsLight`, `PhosphorIconsRegular`, `PhosphorIconsBold` and `PhosphorIconsFill` — plus a small `DTIcons` set of semantic aliases (used internally by components like `DTCommonButtons` and `DTDropdown`). The app's look is the Thin weight:

```dart
Icon(PhosphorIconsThin.plus)
Icon(PhosphorIconsThin.pen)
Icon(PhosphorIconsThin.trash)
Icon(PhosphorIconsThin.caretDown)
Icon(PhosphorIconsFill.star)   // filled variant

Icon(DTIcons.info)      // semantic alias, e.g. used by DTCommonButtons.info
Icon(DTIcons.calendar)  // used by DTDateInput
```

---

## Showcase

A component showcase page, `DTShowcasePage`, lives in the separate dev-only package **`copor_scaffold_dev`** (`packages/copor_scaffold_dev`) rather than in `copor_theme` itself — it depends on `copor_theme` (and `copor_scaffold`, for the shared page chrome), so production apps only ever pull it in as a local path dependency they can drop from release builds:

```yaml
dev_dependencies:
  copor_scaffold_dev:
    path: ../packages/copor_scaffold_dev
```

```dart
import 'package:copor_scaffold_dev/copor_scaffold_dev.dart';

// Standalone — wraps itself in its own DSScaffold/MaterialApp-level theme,
// for use outside a host app (e.g. a dev-only entrypoint):
runApp(MaterialApp(
  theme: appTheme.light,
  darkTheme: appTheme.dark,
  home: const DTShowcasePage(standalone: true),
));

// Embedded — mounts as a normal page inside a host app's existing DSScaffold,
// passing through the host's real navigation chrome:
DTShowcasePage(
  leading: myLeading,
  drawer: myDrawer,
  rail: myRail,
  onThemeToggle: () => toggleTheme(),
  extraChildren: [
    DTShowcaseCategory(icon: Icons.extension, label: 'My Widgets', page: MyWidgetsPage()),
  ],
);
```

The page organizes every `copor_theme` component behind a collapsible in-content sidebar (closed by default, toggled the same way as a folder-tree/content-tree panel elsewhere in the app): categories are `DTListTile.expandable` nodes, each showcased widget is a leaf `DTListTile.toggle`, and selecting a leaf shows that widget's demo — covering every constructor variant and key property combination, with a light/dark toggle in the app bar.
