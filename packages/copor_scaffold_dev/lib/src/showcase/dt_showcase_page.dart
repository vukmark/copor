import 'package:copor_scaffold/copor_scaffold.dart';
import 'package:copor_scaffold/src/utils/ds_device_extensions.dart';
import 'package:copor_theme/copor_theme.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_hooks/flutter_hooks.dart';
import '../shared/dt_dev_notifications_panel.dart';

// ─────────────────────────────────────────────────────────────────────────────
// Shell
// ─────────────────────────────────────────────────────────────────────────────

/// One extra tab a host app can append to [DTShowcasePage] via
/// [DTShowcasePage.extraChildren]. Appears in the in-content category
/// sidebar alongside the built-in categories; [page] is shown as-is when
/// selected.
class DTShowcaseCategory {
  final IconData icon;
  final String label;
  final Widget page;

  const DTShowcaseCategory({required this.icon, required this.label, required this.page});
}

const _kSidebarWidth = 240.0;

/// (icon, nav label, sections) for one built-in top-level category.
typedef _CategoryDef = (IconData, String, List<(String, Widget)>);

/// Self-contained showcase for every component in the `copor_theme` package.
///
/// A normal `DSScaffold` page — like [DSScaffoldTesterPage], it only differs
/// from any other page in its body content and app bar (title + theme
/// toggle action). It configures the shared scaffold chrome via
/// [DSScaffoldSetup] rather than building its own `Scaffold`, so it renders
/// inside whichever [DSScaffold] the host app already has mounted, with the
/// exact same desktop-rail/tablet-and-mobile-drawer/app-bar-height behavior
/// as every other page. [leading]/[drawer]/[rail]/[bottomNavBar] are the
/// same overrides `DSScaffoldTesterPage` exposes, for a host app to plug in
/// its real navigation (e.g. `AppMenuRail`/`AppMenuDrawer`).
///
/// Set [standalone] to wrap itself in its own [DSScaffold] for use outside
/// a host app (e.g. this package's example app):
///
/// ```dart
/// MaterialApp(
///   theme: CoporThemeBuilder.build(...).light,
///   darkTheme: CoporThemeBuilder.build(...).dark,
///   home: const DTShowcasePage(standalone: true),
/// );
/// ```
///
/// Beside the page content itself, a toolbar button opens/closes a docked
/// sidebar holding the *showcase's own* navigation (its categories) — kept
/// as page content rather than a chrome slot, since it's specific to
/// browsing the showcase, not the host app's own navigation.
class DTShowcasePage extends StatefulWidget {
  /// Drawer section key [drawer] (the host's own nav drawer, if supplied)
  /// is registered under — a host app's own hamburger/menu button should
  /// `selectDrawerSection(DTShowcasePage.hostDrawerSectionKey)` before
  /// calling `Scaffold.of(context).openDrawer()`, the same way
  /// `ScaffoldUpdater._buildMenuLeading` always selects its own
  /// `mainMenuDrawerSectionKey` first. Without that, opening the drawer
  /// after this page's own category-tree toggle last selected
  /// [DTShowcasePage.categoryTreeDrawerSectionKey] would show the category
  /// tree again instead of the host's main menu.
  static const String hostDrawerSectionKey = 'dt-showcase-host-drawer';

  /// Drawer section key the showcase's own category tree is registered
  /// under (see [hostDrawerSectionKey]).
  static const String categoryTreeDrawerSectionKey = 'dt-showcase-category-tree';

  /// Wraps itself in its own [DSScaffold] for use outside a host app.
  final bool standalone;

  /// Called when the user taps the theme toggle button.
  /// When null the toggle is hidden.
  final VoidCallback? onThemeToggle;

  final Widget? leading;
  final Widget? drawer;
  final Widget? rail;
  final Widget? bottomNavBar;

  /// Overrides the notifications end-drawer section's content. Defaults to
  /// a bare-bones panel reading the same `DSNotificationCubit` inbox — a
  /// host app should pass its own real notifications panel here (the same
  /// one it shows on every other page), same as [DSScaffoldTesterPage].
  final Widget? notificationsPanel;

  /// Extra tabs appended after the built-in categories.
  final List<DTShowcaseCategory> extraChildren;

  const DTShowcasePage({
    super.key,
    this.standalone = false,
    this.onThemeToggle,
    this.leading,
    this.drawer,
    this.rail,
    this.bottomNavBar,
    this.notificationsPanel,
    this.extraChildren = const [],
  });

  @override
  State<DTShowcasePage> createState() => _DTShowcasePageState();
}

class _DTShowcasePageState extends State<DTShowcasePage> {
  // `ValueNotifier`s rather than plain fields + `setState` — the category
  // tree's selection needs to stay reactive inside `_drawer` below even
  // though that whole widget is only ever *built* once (see `_drawer`'s
  // doc comment), which a `setState`-driven rebuild of this State's own
  // `build()` can't reach.
  final ValueNotifier<int> _selectedLeafIndex = ValueNotifier(0);
  final ValueNotifier<bool> _contentTreeOpen = ValueNotifier(true);

  static final _builtInCategories = <_CategoryDef>[
    (
      Icons.palette_outlined,
      'Foundations',
      [('Color Tokens', _ColorTokens()), ('Typography', _Typography()), ('Icons', const _Icons())],
    ),
    (
      Icons.smart_button_outlined,
      'Buttons',
      [
        ('DTButton', const _ButtonsShowcase()),
        ('DTCommonButtons', const _CommonButtonsShowcase()),
        ('DTActionFooter', const _ActionFooters()),
      ],
    ),
    (
      Icons.grid_view_outlined,
      'Display',
      [
        ('DTAnimatedChevron', const _AnimatedChevrons()),
        ('DTAvatar', const _Avatars()),
        ('DTBadge', const _Badges()),
        ('DTCard', const _TappableCards()),
        ('DTDivider', const _Dividers()),
        ('DTEntityHeader', const _EntityHeaders()),
        ('DTExpandableSection', const _ExpandableSections()),
        ('DTInfoChip', const _InfoChips()),
        ('DTInfoRow', const _InfoRows()),
        ('DTRingLoader', const _RingLoaders()),
        ('DTWavingDots', const DTWavingDots(height: 60)),
      ],
    ),
    (
      Icons.edit_outlined,
      'Inputs',
      [
        ('DTCheckbox', const _CheckboxShowcase()),
        ('DTContractSwitch', const _ContractSwitchShowcase()),
        ('DTDateInput', const _DateFields()),
        ('DTDropdown — single', const _FormDropdowns()),
        ('DTDropdown — multi', const _CheckboxMultiselects()),
        ('DTDropdown — chips', const _ChipsDropdownShowcase()),
        ('DTDynamicPhoneList', const _PhoneLists()),
        ('DTInputDecorator', const _InputDecorators()),
        ('DTInputField', const _InputFields()),
        ('DTLanguageButton', const _LanguageButtons()),
        ('DTPasswordField', const _PasswordFields()),
        ('DTPhoneInput', const _PhoneInputShowcase()),
        ('DTSearchBar', const _SearchBarShowcase()),
        ('DTSegmentedButton', const _SegmentedButtonShowcase()),
        ('DTSwitchInput', const _SwitchInputs()),
        ('DTTagDropdown', const _TagDropdownShowcase()),
      ],
    ),
    (
      Icons.notifications_outlined,
      'Feedback',
      [
        ('DTBanner', const _BannerShowcase()),
        ('DTDialog', const _DialogShowcase()),
        ('DTNotificationCard', const _NotificationCardShowcase()),
        ('DTTopLoadingBar', const _TopLoadingBarShowcase()),
      ],
    ),
    (
      Icons.explore_outlined,
      'Navigation',
      [
        ('DTAppBar', const _AppBarShowcase()),
        ('DTMenuDrawer', const _MenuDrawerShowcase()),
        ('DTListTile.expandable', const _MenuItemShowcase()),
        ('DTModalAppBar', const _ModalAppBarShowcase()),
        ('DTNavBar', const _NavBarShowcase()),
        ('DTTabBar', const _TabBarShowcase()),
      ],
    ),
    (
      Icons.view_sidebar_outlined,
      'Layout',
      [
        ('DTCoporForm / DTFullFormLayout', const _CoporFormShowcase()),
        ('DTDraggableScrollableSheet', const _DraggableSheetShowcase()),
        ('DTResponsiveModalLayout', const _ResponsiveModalShowcase()),
        ('DTSnapScrollView', const _SnapScrollViewShowcase()),
        ('DTStepContent', const _StepContentShowcase()),
      ],
    ),
    (
      Icons.table_chart_outlined,
      'Data',
      [
        ('DTTableDesktop', const _DynamicTableShowcase()),
        ('DTTable', const _TableViewShowcase()),
        ('DTTableMobile', const _TableCardsShowcase()),
        ('Table Cells', const _TableCellsShowcase()),
      ],
    ),
  ];

  /// One selectable leaf in the sidebar tree: a single showcased widget.
  late final List<({IconData icon, String category, String title, Widget page})> _leaves = [
    for (final c in _builtInCategories)
      for (final s in c.$3) (icon: c.$1, category: c.$2, title: s.$1, page: s.$2),
    for (final c in widget.extraChildren)
      (icon: c.icon, category: c.label, title: c.label, page: c.page),
  ];

  /// Leaves grouped by category, in first-seen order — one
  /// [DTListTile.expandable] per group, mirroring how the reference app's
  /// folder tree nests files under folders.
  late final List<({IconData icon, String category, List<int> leafIndices})> _groups = () {
    final indexByCategory = <String, int>{};
    final groups = <({IconData icon, String category, List<int> leafIndices})>[];
    for (var i = 0; i < _leaves.length; i++) {
      final leaf = _leaves[i];
      final groupIdx = indexByCategory[leaf.category];
      if (groupIdx == null) {
        indexByCategory[leaf.category] = groups.length;
        groups.add((icon: leaf.icon, category: leaf.category, leafIndices: [i]));
      } else {
        groups[groupIdx].leafIndices.add(i);
      }
    }
    return groups;
  }();

  void _selectLeaf(int i) => _selectedLeafIndex.value = i;

  // Chrome slots handed to `DSScaffoldSetup` below — computed once, in
  // `initState`, rather than inline in `build()`. `DSScaffoldSetup` only
  // re-pushes its config into the shared `DSChromeCubit` when one of these
  // isn't `identical()` to what it held before; freshly-constructed
  // `Widget`s (a new `IgnorePointer(...)`/`Builder(...)` every `build()`
  // call) always fail that check. That's harmless for a page that's
  // actually on-screen, but this page is kept alive off-stage forever by
  // the outer `StatefulShellRoute.indexedStack` (dev routes live in that
  // shell's single branch), so it keeps rebuilding long after you've
  // navigated elsewhere — and each of those off-stage rebuilds was
  // re-pushing this page's own title/actions/drawer, clobbering whichever
  // page you'd actually navigated to. Freezing these here means an
  // off-stage rebuild produces the exact same instances, so
  // `DSScaffoldSetup` sees no change and never re-applies. `_drawer`
  // still needs to reflect the current category selection, so its
  // reactive parts go through `_selectedLeafIndex`/`_contentTreeOpen`
  // directly (see `_buildCategoryNavList`/`_buildContentToolbar`) instead
  // of relying on this whole subtree being rebuilt.
  late final Widget _title = IgnorePointer(
    // Same icon as the "DT Showcase" entry in the app's dev menu
    // (AppDrawerNavigation's Dev submenu).
    child: DTButton.floating(
      icon: PhosphorIconsThin.palette,
      label: 'DT Showcase',
      border: false,
      onPressed: () {},
    ),
  );

  late final List<Widget> _actions = [
    // Same bell → end-drawer wiring as `DSScaffoldTesterPage`.
    Builder(
      builder: (ctx) => DSEndDrawerAnchor(
        child: DSNotificationButton(
          destination: DSNotificationDestination.bell,
          border: !ctx.isMobile,
          onPressed: () => ctx.read<DSScaffoldController>().showEndDrawerSection(
            DSNotificationDestination.bell.key,
          ),
        ),
      ),
    ),
    Builder(
      builder: (ctx) => DTCommonButtons.theme(
        isDark: Theme.of(ctx).brightness == Brightness.dark,
        border: !ctx.isMobile,
        onPressed: () => widget.onThemeToggle?.call(),
      ),
    ),
  ];

  // The host's own nav drawer (if any) stays the default section — a host
  // that opens the drawer via its own hamburger button (without calling
  // `selectDrawerSection` first) still sees its own content, same as
  // before this page had a drawer of its own. The category tree is only
  // shown when its own toggle explicitly selects it.
  late final Widget _drawer = DSDrawerHost(
    sections: [
      if (widget.drawer != null)
        DSDrawerSection(key: DTShowcasePage.hostDrawerSectionKey, child: widget.drawer!),
      DSDrawerSection(
        key: DTShowcasePage.categoryTreeDrawerSectionKey,
        child: _buildCategoryTreeDrawer(),
      ),
    ],
  );

  late final Widget _endDrawer = DSEndDrawerHost(
    sections: [
      DSEndDrawerSection(
        key: DSNotificationDestination.bell.key,
        child: widget.notificationsPanel ?? const DTDevNotificationsPanel(),
      ),
    ],
  );

  @override
  void dispose() {
    _selectedLeafIndex.dispose();
    _contentTreeOpen.dispose();
    super.dispose();
  }

  /// Same floating-pill header style as the reference app's
  /// `FolderTreeHeader` (Cloud's folder-tree sidebar) — a non-interactive
  /// label identifying this docked panel as the showcase's own navigation.
  Widget _buildSidebarHeader() {
    return Align(
      alignment: Alignment.centerLeft,
      child: IgnorePointer(
        child: DTButton.floating(
          icon: PhosphorIconsThin.sidebar,
          label: 'Components',
          border: false,
          onPressed: () {},
        ),
      ),
    );
  }

  /// The showcase's own navigation tree — categories as
  /// [DTListTile.expandable] nodes, each showcased widget as a leaf
  /// [DTListTile.toggle], exactly like the reference app's folder tree.
  /// Shown in the in-content sidebar on desktop/tablet, and inside the
  /// mobile drawer (see [_buildCategoryTreeDrawer]) — [closeDrawerOnSelect]
  /// mirrors `FolderTreeWidget`'s own param, only relevant for the latter.
  Widget _buildCategoryNavList({bool closeDrawerOnSelect = false}) {
    void select(int i) {
      _selectLeaf(i);
      if (closeDrawerOnSelect && Scaffold.of(context).isDrawerOpen)
        Scaffold.of(context).closeDrawer();
    }

    return ValueListenableBuilder<int>(
      valueListenable: _selectedLeafIndex,
      builder: (context, selectedLeafIndex, _) => ListView(
        padding: EdgeInsets.zero,
        children: [
          for (final group in _groups)
            if (group.leafIndices.length == 1 &&
                _leaves[group.leafIndices.single].title == group.category)
              // A lone extra-child category has nothing to expand into.
              DTListTile.toggle(
                icon: group.icon,
                label: group.category,
                isToggled: selectedLeafIndex == group.leafIndices.single,
                onPressed: () => select(group.leafIndices.single),
              )
            else
              DTListTile.expandable(
                icon: group.icon,
                label: group.category,
                children: [
                  for (final i in group.leafIndices)
                    DTListTile.toggle(
                      label: _leaves[i].title,
                      isToggled: selectedLeafIndex == i,
                      onPressed: () => select(i),
                      border: false,
                    ),
                ],
              ),
        ],
      ),
    );
  }

  /// The content card's own toolbar: on desktop/tablet the button opens/
  /// closes the in-content category sidebar (mirroring the reference app's
  /// content-tree toggle, distinct from — and living below — the app bar);
  /// on mobile there's no docked sidebar to toggle, so it instead selects
  /// and opens [_buildCategoryTreeDrawer] via the main drawer, same as
  /// Cloud's own mobile folder-tree toggle.
  Widget _buildContentToolbar(BuildContext context, CoporTheme dt) {
    final isMobile = context.isMobile;
    return ValueListenableBuilder<int>(
      valueListenable: _selectedLeafIndex,
      builder: (context, selectedLeafIndex, _) {
        final current = _leaves[selectedLeafIndex];
        return ValueListenableBuilder<bool>(
          valueListenable: _contentTreeOpen,
          builder: (context, contentTreeOpen, _) => Row(
            children: [
              DTButton.toggle(
                icon: PhosphorIconsThin.sidebar,
                iconToggled: PhosphorIconsFill.sidebar,
                isToggled: !isMobile && contentTreeOpen,
                highlightToggled: false,
                semanticLabel: 'Toggle menu',
                onPressed: () {
                  if (isMobile) {
                    context.read<DSScaffoldController>().selectDrawerSection(
                      DTShowcasePage.categoryTreeDrawerSectionKey,
                    );
                    Scaffold.of(context).openDrawer();
                  } else {
                    _contentTreeOpen.value = !_contentTreeOpen.value;
                  }
                },
                inputSize: DTInputSize.normal,
              ),
              const SizedBox(width: 12),
              Text(
                current.category == current.title
                    ? current.title
                    : '${current.category} · ${current.title}',
                style: dt.text.bodyStrong,
              ),
            ],
          ),
        );
      },
    );
  }

  Widget _buildPages() => ValueListenableBuilder<int>(
    valueListenable: _selectedLeafIndex,
    builder: (context, selectedLeafIndex, _) => IndexedStack(
      index: selectedLeafIndex,
      children: [for (final leaf in _leaves) _LeafPage(child: leaf.page)],
    ),
  );

  /// The showcase's own category tree as a real slide-out [Drawer] —
  /// contributed as a second section of the main drawer (see
  /// [DTShowcasePage.categoryTreeDrawerSectionKey]) rather than a docked sidebar, since mobile
  /// has no room for one. Same `DTMenuDrawer` shell/registration pattern as
  /// Cloud's own folder-tree mobile drawer (`_CloudDrawerSidebar`).
  Widget _buildCategoryTreeDrawer() {
    return DTMenuDrawer(
      header: _buildSidebarHeader(),
      content: _buildCategoryNavList(closeDrawerOnSelect: true),
      footer: const SizedBox.shrink(),
    );
  }

  /// The showcase's own category sidebar (docked, collapsible) beside the
  /// page content — the in-content counterpart to the reference app's
  /// folder-tree panel. The toolbar/header sits at the top of the content
  /// column, beside the sidebar (not spanning above it), so the sidebar
  /// runs the full height of the card. Wrapped in [DSPageWrapper] the same
  /// way `CloudLayoutBuilder._CloudDesktopLayout` wraps its own
  /// sidebar/content `Row`, so this gets the same standard page padding
  /// every other page gets instead of hand-rolling it.
  Widget _buildContentWithSidebar(BuildContext context, CoporTheme dt) {
    final isMobile = context.isMobile;
    return DSPageWrapper(
      isMobile: isMobile,
      scrollable: false,
      // Same as `coporPagePadding` but with the bottom inset zeroed out —
      // that reserved 20px below the whole sidebar/content `Row` is what
      // left a gap between the scrollable content and the card's bottom
      // edge even after `_LeafPage`/the divider stopped adding their own.
      // Top/left/right keep the standard page padding.
      padding: EdgeInsets.fromLTRB(
        coporPagePadding.left,
        coporPagePadding.top,
        coporPagePadding.right,
        0,
      ),
      children: [
        Expanded(
          child: Row(
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              // No docked sidebar on mobile — there's no room beside the
              // content at that width; the tree lives in the main drawer
              // instead (see `_buildCategoryTreeDrawer`).
              if (!isMobile)
                ValueListenableBuilder<bool>(
                  valueListenable: _contentTreeOpen,
                  builder: (context, contentTreeOpen, _) => Row(
                    crossAxisAlignment: CrossAxisAlignment.stretch,
                    mainAxisSize: MainAxisSize.min,
                    children: [
                      ClipRect(
                        child: AnimatedAlign(
                          duration: const Duration(milliseconds: 250),
                          curve: Curves.easeInOut,
                          alignment: Alignment.centerLeft,
                          widthFactor: contentTreeOpen ? 1 : 0,
                          child: SizedBox(
                            width: _kSidebarWidth,
                            child: Column(
                              crossAxisAlignment: CrossAxisAlignment.stretch,
                              children: [
                                _buildSidebarHeader(),
                                const SizedBox(height: 8),
                                Expanded(child: _buildCategoryNavList()),
                              ],
                            ),
                          ),
                        ),
                      ),
                      if (contentTreeOpen)
                        Padding(
                          padding: EdgeInsets.only(bottom: coporPageMargins.left),
                          child: const DTDivider.vertical(height: double.infinity, padding: 12),
                        ),
                    ],
                  ),
                ),
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.stretch,
                  children: [
                    _buildContentToolbar(context, dt),
                    SizedBox(height: 10),
                    const DTDivider.subtle(height: 0),
                    Expanded(child: _buildPages()),
                  ],
                ),
              ),
            ],
          ),
        ),
      ],
    );
  }

  /// Page content: the collapsible category sidebar beside the selected
  /// page, with its own toolbar/header at the top of the content column
  /// (not spanning above the sidebar) — this (and the app bar's title and
  /// theme-toggle action) is genuinely all that differs from any other
  /// page. `DSScaffold` itself supplies the chrome card, app-bar height,
  /// and desktop/tablet/mobile layout switch, same as it does for every
  /// page.
  Widget _buildContent(BuildContext context) {
    final dt = CoporTheme.of(context);
    return _buildContentWithSidebar(context, dt);
  }

  @override
  Widget build(BuildContext context) {
    final setup = DSScaffoldSetup(
      appBar: const DSAppBarShell(),
      leading: widget.leading,
      title: _title,
      actions: _actions,
      drawer: _drawer,
      rail: widget.rail,
      endDrawer: _endDrawer,
      bottomNavBar: widget.bottomNavBar,
      child: Builder(builder: _buildContent),
    );

    if (!widget.standalone) return setup;

    return DSScaffoldProviders(child: DSScaffold(child: setup));
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Leaf page scaffold
// ─────────────────────────────────────────────────────────────────────────────

/// Renders a single selected leaf's showcase widget.
class _LeafPage extends StatelessWidget {
  final Widget child;

  const _LeafPage({required this.child});

  @override
  Widget build(BuildContext context) {
    // Sits unpadded in its parent so the scroll/clip bounds run flush from
    // the toolbar divider to the card's bottom edge. Only horizontal margins
    // go through the padding below; no vertical padding, so content starts
    // right at the divider and ends right at the card edge with no dead
    // whitespace — the trailing `SizedBox` below is the only breathing room,
    // and it scrolls away with the content.
    return SingleChildScrollView(
      padding: coporPageMargins,
      child: Center(
        child: ConstrainedBox(
          constraints: const BoxConstraints(maxWidth: coporMaxContentWidth),
          child: SizedBox(
            width: double.infinity,
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.stretch,
              children: [child, const SizedBox(height: 40)],
            ),
          ),
        ),
      ),
    );
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Foundations — Color Tokens
// ─────────────────────────────────────────────────────────────────────────────

class _ColorTokens extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    final c = CoporColors.of(context);
    final groups = <(String, List<(String, Color)>)>[
      (
        'Primary',
        [
          ('primary', c.primary),
          ('primaryContainer', c.primaryContainer),
          ('onPrimaryContainer', c.onPrimaryContainer),
          ('primaryBorder', c.primaryBorder),
          ('primaryHovered', c.primaryHovered),
          ('primaryPressed', c.primaryPressed),
        ],
      ),
      (
        'Secondary',
        [
          ('secondary', c.secondary),
          ('secondaryContainer', c.secondaryContainer),
          ('onSecondaryContainer', c.onSecondaryContainer),
          ('secondaryBorder', c.secondaryBorder),
          ('secondaryHovered', c.secondaryHovered),
          ('secondaryPressed', c.secondaryPressed),
        ],
      ),
      (
        'Tertiary',
        [
          ('tertiary', c.tertiary),
          ('tertiaryContainer', c.tertiaryContainer),
          ('onTertiaryContainer', c.onTertiaryContainer),
          ('tertiaryBorder', c.tertiaryBorder),
          ('tertiaryHovered', c.tertiaryHovered),
          ('tertiaryPressed', c.tertiaryPressed),
        ],
      ),
      (
        'Success',
        [
          ('success', c.success),
          ('successContainer', c.successContainer),
          ('onSuccessContainer', c.onSuccessContainer),
          ('successBorder', c.successBorder),
          ('successHovered', c.successHovered),
          ('successPressed', c.successPressed),
        ],
      ),
      (
        'Error',
        [
          ('error', c.error),
          ('errorContainer', c.errorContainer),
          ('onErrorContainer', c.onErrorContainer),
          ('errorBorder', c.errorBorder),
          ('errorHovered', c.errorHovered),
          ('errorPressed', c.errorPressed),
        ],
      ),
      ('Outline', [('outline', c.outline), ('outlineSubtle', c.outlineSubtle)]),
      ('Shadow & Scrim', [('shadow', c.shadow), ('scrim', c.scrim)]),
      (
        'Surface',
        [
          ('surface', c.surface),
          ('surfaceBackground', c.surfaceBackground),
          ('surfaceContainer', c.surfaceContainer),
          ('surfaceHovered', c.surfaceHovered),
          ('surfacePressed', c.surfacePressed),
        ],
      ),
      ('On-Surface', [('onSurface', c.onSurface), ('onSurfaceSubtle', c.onSurfaceSubtle)]),
    ];

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: groups.map((group) {
        final (groupName, tokens) = group;
        return Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Padding(
              padding: const EdgeInsets.only(top: 12, bottom: 8),
              child: Text(groupName, style: CoporTheme.of(context).text.columnHeader),
            ),
            Wrap(
              spacing: 8,
              runSpacing: 8,
              children: tokens.map((t) {
                final (name, color) = t;
                return _ColorSwatch(name: name, color: color);
              }).toList(),
            ),
          ],
        );
      }).toList(),
    );
  }
}

class _ColorSwatch extends StatelessWidget {
  final String name;
  final Color color;

  const _ColorSwatch({required this.name, required this.color});

  @override
  Widget build(BuildContext context) {
    final dt = CoporTheme.of(context);
    return Column(
      children: [
        Container(
          width: 72,
          height: 44,
          decoration: BoxDecoration(
            color: color,
            border: Border.all(color: dt.colors.outline),
            borderRadius: BorderRadius.circular(6),
          ),
        ),
        const SizedBox(height: 4),
        SizedBox(
          width: 72,
          child: Text(
            name,
            style: dt.text.chipLabel.copyWith(color: dt.colors.onSurfaceSubtle),
            textAlign: TextAlign.center,
            maxLines: 2,
            overflow: TextOverflow.ellipsis,
          ),
        ),
      ],
    );
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Foundations — Typography
// ─────────────────────────────────────────────────────────────────────────────

class _Typography extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    final dt = CoporTheme.of(context);
    final styles = [
      ('heroTitle', dt.text.heroTitle, 'Hero Title'),
      ('pageTitle', dt.text.pageTitle, 'Page Title'),
      ('sectionTitle', dt.text.sectionTitle, 'Section Title'),
      ('columnHeader', dt.text.columnHeader, 'Column Header'),
      ('bodyStrong', dt.text.bodyStrong, 'Body Strong'),
      ('body', dt.text.body, 'Body'),
      ('bodyLight', dt.text.bodyLight, 'Body Light'),
      ('bodySecondary', dt.text.bodySecondary, 'Body Secondary'),
      ('labelDefault', dt.text.labelDefault, 'Label Default'),
      ('chipLabel', dt.text.chipLabel, 'Chip Label'),
      ('buttonLabel', dt.text.buttonLabel, 'Button Label'),
      ('compactDefault', dt.text.compactDefault, 'Compact Default'),
      ('compactActive', dt.text.compactActive, 'Compact Active'),
      ('avatarInitials', dt.text.avatarInitials, 'AB'),
    ];

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: styles.map((s) {
        final (name, style, sample) = s;
        return Padding(
          padding: const EdgeInsets.symmetric(vertical: 4),
          child: Row(
            children: [
              SizedBox(
                width: 150,
                child: Text(
                  name,
                  style: dt.text.chipLabel.copyWith(color: dt.colors.onSurfaceSubtle),
                ),
              ),
              Expanded(child: Text(sample, style: style)),
            ],
          ),
        );
      }).toList(),
    );
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Foundations — Icons
// ─────────────────────────────────────────────────────────────────────────────

class _Icons extends StatelessWidget {
  const _Icons();

  static const _samples = [
    ('Regular.plus', PhosphorIconsRegular.plus),
    ('Fill.pen', PhosphorIconsFill.pen),
    ('Fill.trash', PhosphorIconsFill.trash),
    ('Fill.copy', PhosphorIconsFill.copy),
    ('Thin.caretDown', PhosphorIconsThin.caretDown),
    ('Thin.magnifyingGlass', PhosphorIconsThin.magnifyingGlass),
    ('Fill.bell', PhosphorIconsFill.bell),
    ('Fill.user', PhosphorIconsFill.user),
    ('Regular.check', PhosphorIconsRegular.check),
    ('Regular.x', PhosphorIconsRegular.x),
  ];

  @override
  Widget build(BuildContext context) {
    final dt = CoporTheme.of(context);
    return Wrap(
      spacing: 16,
      runSpacing: 12,
      children: _samples.map((s) {
        final (name, icon) = s;
        return _LabelledWidget(
          label: name,
          child: Icon(icon, size: 20, color: dt.colors.onSurface),
        );
      }).toList(),
    );
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Buttons — DTButton
// ─────────────────────────────────────────────────────────────────────────────

class _ButtonsShowcase extends StatefulWidget {
  const _ButtonsShowcase();

  @override
  State<_ButtonsShowcase> createState() => _ButtonsShowcaseState();
}

class _ButtonsShowcaseState extends State<_ButtonsShowcase> {
  final Map<String, bool> _t = {};

  bool _get(String k, {bool def = false}) => _t[k] ?? def;

  void _flip(String k, {bool def = false}) => setState(() => _t[k] = !_get(k, def: def));

  @override
  Widget build(BuildContext context) {
    final dt = CoporTheme.of(context);

    Widget subHead(String s) => Padding(
      padding: const EdgeInsets.only(top: 20, bottom: 12),
      child: Text(s, style: dt.text.bodyStrong),
    );

    final variants = <(String, Widget Function(String, IconData?))>[
      (
        'DTButton.primary',
        (l, ic) => DTButton.primary(
          label: l,
          icon: ic,
          semanticLabel: l.isEmpty ? 'primary' : l,
          onPressed: () {},
        ),
      ),
      (
        'DTButton.secondary',
        (l, ic) => DTButton.secondary(
          label: l,
          icon: ic,
          semanticLabel: l.isEmpty ? 'secondary' : l,
          onPressed: () {},
        ),
      ),
      (
        'DTButton.tertiary',
        (l, ic) => DTButton.tertiary(
          label: l,
          icon: ic,
          semanticLabel: l.isEmpty ? 'tertiary' : l,
          onPressed: () {},
        ),
      ),
      (
        'DTButton.positive',
        (l, ic) => DTButton.positive(
          label: l,
          icon: ic,
          semanticLabel: l.isEmpty ? 'positive' : l,
          onPressed: () {},
        ),
      ),
      (
        'DTButton.surface',
        (l, ic) => DTButton.surface(
          label: l,
          icon: ic,
          semanticLabel: l.isEmpty ? 'surface' : l,
          onPressed: () {},
        ),
      ),
      (
        'DTButton.negative',
        (l, ic) => DTButton.negative(
          label: l,
          icon: ic,
          semanticLabel: l.isEmpty ? 'negative' : l,
          onPressed: () {},
        ),
      ),
      (
        'DTButton.floating',
        (l, ic) => DTButton.floating(
          label: l,
          icon: ic,
          semanticLabel: l.isEmpty ? 'floating' : l,
          onPressed: () {},
        ),
      ),
    ];

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        subHead('Label variants — label · icon + label · icon only'),
        ...variants.map((entry) {
          final (name, build) = entry;
          return _ButtonGroup(
            title: name,
            children: [
              _LabelledWidget(label: 'label only', child: build('Label', null)),
              _LabelledWidget(label: 'icon + label', child: build('Label', Icons.add)),
              _LabelledWidget(label: 'icon only', child: build('', Icons.add)),
            ],
          );
        }),
        subHead('DTButton.toggle — all DTInputSize tiers'),
        _ButtonGroup(
          title: 'DTButton.toggle',
          children: DTInputSize.values
              .expand(
                (size) => [
                  _LabelledWidget(
                    label: '${size.name}\ninactive',
                    child: DTButton.toggle(
                      icon: Icons.star,
                      semanticLabel: 'Toggle',
                      isToggled: _get('tog_${size.name}_off'),
                      onPressed: () => _flip('tog_${size.name}_off'),
                      inputSize: size,
                    ),
                  ),
                  _LabelledWidget(
                    label: '${size.name}\nactive',
                    child: DTButton.toggle(
                      icon: Icons.star,
                      semanticLabel: 'Toggle',
                      isToggled: _get('tog_${size.name}_on', def: true),
                      onPressed: () => _flip('tog_${size.name}_on', def: true),
                      inputSize: size,
                    ),
                  ),
                ],
              )
              .toList(),
        ),
      ],
    );
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Buttons — DTCommonButtons
// ─────────────────────────────────────────────────────────────────────────────

class _CommonButtonsShowcase extends StatefulWidget {
  const _CommonButtonsShowcase();

  @override
  State<_CommonButtonsShowcase> createState() => _CommonButtonsShowcaseState();
}

class _CommonButtonsShowcaseState extends State<_CommonButtonsShowcase> {
  bool _infoActive = false;

  @override
  Widget build(BuildContext context) {
    return _ButtonGroup(
      title: 'DTCommonButtons',
      children: [
        _LabelledWidget(
          label: 'info\n${_infoActive ? 'active' : 'inactive'}',
          child: DTCommonButtons.info(
            isActive: _infoActive,
            semanticLabel: 'Help',
            onPressed: () => setState(() => _infoActive = !_infoActive),
          ),
        ),
        _LabelledWidget(
          label: "copy\nvalue: 'hello'",
          child: DTCommonButtons.copy(value: 'hello', semanticLabel: 'Copy', onCopied: () {}),
        ),
        _LabelledWidget(
          label: 'edit',
          child: DTCommonButtons.edit(semanticLabel: 'Edit', onPressed: () {}),
        ),
        _LabelledWidget(
          label: 'delete',
          child: DTCommonButtons.delete(semanticLabel: 'Delete', onPressed: () {}),
        ),
        _LabelledWidget(
          label: 'theme\n(light)',
          child: DTCommonButtons.theme(isDark: false, onPressed: () {}),
        ),
        _LabelledWidget(
          label: 'theme\n(dark)',
          child: DTCommonButtons.theme(isDark: true, onPressed: () {}),
        ),
      ],
    );
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Buttons — DTActionFooter
// ─────────────────────────────────────────────────────────────────────────────

class _ActionFooters extends StatelessWidget {
  const _ActionFooters();

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        _propLabel(context, 'DTActionFooter.single — one button'),
        ClipRRect(
          borderRadius: BorderRadius.circular(8),
          child: DTActionFooter.single(label: 'Close', onPressed: () {}, safeArea: false),
        ),
        const SizedBox(height: 16),
        _propLabel(context, 'DTActionFooter.dual — cancel + confirm'),
        ClipRRect(
          borderRadius: BorderRadius.circular(8),
          child: DTActionFooter.dual(
            leadingLabel: 'Delete',
            trailingLabel: 'Save',
            onLeading: () {},
            onTrailing: () {},
            safeArea: false,
          ),
        ),
      ],
    );
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Display — DTAnimatedChevron
// ─────────────────────────────────────────────────────────────────────────────

class _AnimatedChevrons extends StatefulWidget {
  const _AnimatedChevrons();

  @override
  State<_AnimatedChevrons> createState() => _AnimatedChevronsState();
}

class _AnimatedChevronsState extends State<_AnimatedChevrons> {
  bool _open = false;

  @override
  Widget build(BuildContext context) {
    final dc = CoporColors.of(context);
    return Wrap(
      spacing: 24,
      runSpacing: 12,
      crossAxisAlignment: WrapCrossAlignment.center,
      children: [
        _LabelledWidget(label: 'isOpen: false', child: const DTAnimatedChevron(isOpen: false)),
        _LabelledWidget(label: 'isOpen: true', child: const DTAnimatedChevron(isOpen: true)),
        _LabelledWidget(
          label: 'size: 20\nopenColor: primary',
          child: DTAnimatedChevron(isOpen: _open, size: 20, openColor: dc.primary),
        ),
        _LabelledWidget(
          label: 'tap to toggle',
          child: GestureDetector(
            onTap: () => setState(() => _open = !_open),
            child: DTAnimatedChevron(isOpen: _open, size: 16),
          ),
        ),
      ],
    );
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Display — DTAvatar
// ─────────────────────────────────────────────────────────────────────────────

class _Avatars extends StatelessWidget {
  const _Avatars();

  @override
  Widget build(BuildContext context) {
    return Wrap(
      spacing: 24,
      runSpacing: 16,
      crossAxisAlignment: WrapCrossAlignment.start,
      children: [
        _LabelledWidget(
          label: 'default\n(radius 24)',
          child: DTAvatar(userFullName: 'Ana Kovač', picture: ''),
        ),
        _LabelledWidget(
          label: 'radius: 16',
          child: DTAvatar(userFullName: 'Marko P', picture: '', radius: 16),
        ),
        _LabelledWidget(
          label: 'radius: 32',
          child: DTAvatar(userFullName: 'Boris L', picture: '', radius: 32),
        ),
        _LabelledWidget(
          label: 'withActivity\nisActive: true',
          child: DTAvatar.withActivity(userFullName: 'Sara M', picture: '', isActive: true),
        ),
        _LabelledWidget(
          label: 'withActivity\nisActive: false',
          child: DTAvatar.withActivity(userFullName: 'Jan K', picture: '', isActive: false),
        ),
      ],
    );
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Display — DTBadge
// ─────────────────────────────────────────────────────────────────────────────

class _Badges extends StatelessWidget {
  const _Badges();

  @override
  Widget build(BuildContext context) {
    return Wrap(
      spacing: 24,
      runSpacing: 12,
      crossAxisAlignment: WrapCrossAlignment.center,
      children: [
        _LabelledWidget(label: 'count: 0\n(hidden)', child: const DTBadge(count: 0)),
        _LabelledWidget(label: 'count: 1', child: const DTBadge(count: 1)),
        _LabelledWidget(label: 'count: 9', child: const DTBadge(count: 9)),
        _LabelledWidget(label: 'count: 99', child: const DTBadge(count: 99)),
        _LabelledWidget(
          label: 'on icon\n(Stack)',
          child: Stack(
            clipBehavior: Clip.none,
            children: [
              Icon(
                Icons.notifications_outlined,
                size: 24,
                color: CoporTheme.of(context).colors.onSurface,
              ),
              const Positioned(top: -6, right: -10, child: DTBadge(count: 5)),
            ],
          ),
        ),
      ],
    );
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Display — DTCard
// ─────────────────────────────────────────────────────────────────────────────

class _TappableCards extends StatelessWidget {
  const _TappableCards();

  @override
  Widget build(BuildContext context) {
    final dt = CoporTheme.of(context);
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        _propLabel(context, 'DTCard.tap — tappable (hover + press states)'),
        DTCard.tap(
          onTap: () {},
          child: Padding(
            padding: const EdgeInsets.all(16),
            child: Text('Tap me', style: dt.text.body),
          ),
        ),
        _propLabel(context, 'DTCard — plain (no interaction)'),
        DTCard(
          child: Padding(
            padding: const EdgeInsets.all(16),
            child: Text('Plain card — no onTap', style: dt.text.body),
          ),
        ),
      ],
    );
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Display — DTDivider
// ─────────────────────────────────────────────────────────────────────────────

class _Dividers extends StatelessWidget {
  const _Dividers();

  @override
  Widget build(BuildContext context) {
    final dt = CoporTheme.of(context);
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        _propLabel(context, 'DTDivider()  — normal'),
        const DTDivider(),
        _propLabel(context, 'DTDivider.subtle()'),
        const DTDivider.subtle(),
        _propLabel(context, 'alignment: asymmetricTop'),
        const DTDivider(alignment: DTDividerAlignment.asymmetricTop),
        _propLabel(context, 'alignment: asymmetricBottom'),
        const DTDivider(alignment: DTDividerAlignment.asymmetricBottom),
        _propLabel(context, 'DTDivider.vertical()  — in Row'),
        Row(
          children: [
            Text('Left', style: dt.text.body),
            const DTDivider.vertical(),
            Text('Right', style: dt.text.body),
          ],
        ),
      ],
    );
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Display — DTEntityHeader
// ─────────────────────────────────────────────────────────────────────────────

class _EntityHeaders extends StatelessWidget {
  const _EntityHeaders();

  @override
  Widget build(BuildContext context) {
    final avatar = DTAvatar(userFullName: 'Maria Weber', picture: '', radius: 20);
    final chips = [
      DTInfoChip.primary(icon: Icons.badge_outlined, label: 'Admin'),
      DTInfoChip.success(icon: Icons.check, label: 'Active'),
    ];
    final infoRows = [
      DTEntityHeaderInfoRow(icon: Icons.email_outlined, label: 'weber@example.com'),
      DTEntityHeaderInfoRow(icon: Icons.phone_outlined, label: '+49 30 123456'),
    ];

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        _propLabel(context, 'DTEntityHeader.small'),
        DTEntityHeader.small(
          avatar: avatar,
          title: 'Maria Weber',
          chips: chips,
          infoRows: infoRows,
        ),
        const SizedBox(height: 16),
        _propLabel(context, 'DTEntityHeader.mobile'),
        DTEntityHeader.mobile(
          avatar: avatar,
          title: 'Maria Weber',
          chips: chips,
          infoRows: infoRows,
        ),
        const SizedBox(height: 16),
        _propLabel(context, 'DTEntityHeader.large'),
        DTEntityHeader.large(
          avatar: DTAvatar(userFullName: 'Maria Weber', picture: '', radius: 40),
          title: 'Maria Weber',
          chips: chips,
        ),
      ],
    );
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Display — DTExpandableSection
// ─────────────────────────────────────────────────────────────────────────────

class _ExpandableSections extends StatelessWidget {
  const _ExpandableSections();

  @override
  Widget build(BuildContext context) {
    final dt = CoporTheme.of(context);
    return Column(
      children: [
        DTExpandableSection(
          title: 'Collapsed by default (initiallyExpanded: false)',
          child: Text('Content is hidden until the header is tapped.', style: dt.text.body),
        ),
        const SizedBox(height: 8),
        DTExpandableSection(
          title: 'Expanded by default (initiallyExpanded: true)',
          initiallyExpanded: true,
          child: Text('This section opens immediately on first render.', style: dt.text.body),
        ),
      ],
    );
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Display — DTInfoChip
// ─────────────────────────────────────────────────────────────────────────────

class _InfoChips extends StatelessWidget {
  const _InfoChips();

  @override
  Widget build(BuildContext context) {
    return Wrap(
      spacing: 8,
      runSpacing: 8,
      children: [
        _LabelledWidget(
          label: 'surface',
          child: DTInfoChip.surface(icon: Icons.info_outline, label: 'Surface'),
        ),
        _LabelledWidget(
          label: 'primary',
          child: DTInfoChip.primary(icon: Icons.star, label: 'Primary'),
        ),
        _LabelledWidget(
          label: 'secondary',
          child: DTInfoChip.secondary(icon: Icons.star, label: 'Secondary'),
        ),
        _LabelledWidget(
          label: 'tertiary',
          child: DTInfoChip.tertiary(icon: Icons.star, label: 'Tertiary'),
        ),
        _LabelledWidget(
          label: 'success',
          child: DTInfoChip.success(icon: Icons.check_circle, label: 'Success'),
        ),
        _LabelledWidget(
          label: 'error',
          child: DTInfoChip.error(icon: Icons.error, label: 'Error'),
        ),
      ],
    );
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Display — DTInfoRow
// ─────────────────────────────────────────────────────────────────────────────

class _InfoRows extends StatelessWidget {
  const _InfoRows();

  @override
  Widget build(BuildContext context) {
    return const Column(
      children: [
        DTInfoRow(icon: Icons.email_outlined, label: 'user@example.com'),
        SizedBox(height: 8),
        DTInfoRow(icon: Icons.phone_outlined, label: '+49 123 456 7890'),
        SizedBox(height: 8),
        DTInfoRow(icon: Icons.location_on_outlined, label: 'Berlin, Germany'),
      ],
    );
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Display — DTRingLoader
// ─────────────────────────────────────────────────────────────────────────────

class _RingLoaders extends StatelessWidget {
  const _RingLoaders();

  @override
  Widget build(BuildContext context) {
    return const Wrap(
      spacing: 24,
      runSpacing: 16,
      crossAxisAlignment: WrapCrossAlignment.center,
      children: [
        _LabelledWidget(
          label: 'DTRingLoader.page\n(size: 45, stroke: 4)',
          child: DTRingLoader.page(),
        ),
        _LabelledWidget(
          label: 'DTRingLoader.inline\n(size: 20, stroke: 3)',
          child: DTRingLoader.inline(),
        ),
        _LabelledWidget(
          label: 'custom\n(size: 64, stroke: 6)',
          child: DTRingLoader(size: 64, strokeWidth: 6),
        ),
      ],
    );
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Inputs — DTCheckbox
// ─────────────────────────────────────────────────────────────────────────────

class _CheckboxShowcase extends StatefulWidget {
  const _CheckboxShowcase();

  @override
  State<_CheckboxShowcase> createState() => _CheckboxShowcaseState();
}

class _CheckboxShowcaseState extends State<_CheckboxShowcase> {
  bool _a = false;
  bool _b = true;

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        DTCheckbox(
          value: _a,
          onChanged: (v) => setState(() => _a = v ?? false),
          label: 'Unchecked (tap to toggle)',
        ),
        DTCheckbox(
          value: _b,
          onChanged: (v) => setState(() => _b = v ?? true),
          label: 'Checked (tap to toggle)',
        ),
        DTCheckbox(value: false, onChanged: (_) {}, label: 'Disabled', disabled: true),
      ],
    );
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Inputs — DTContractSwitch
// ─────────────────────────────────────────────────────────────────────────────

class _ContractSwitchShowcase extends StatefulWidget {
  const _ContractSwitchShowcase();

  @override
  State<_ContractSwitchShowcase> createState() => _ContractSwitchShowcaseState();
}

class _ContractSwitchShowcaseState extends State<_ContractSwitchShowcase> {
  bool _a = false;
  bool _b = true;

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        DTContractSwitch(
          value: _a,
          onChanged: (v) => setState(() => _a = v),
          label: 'Contract accepted (tap to toggle)',
          onDownload: () {},
          downloadTooltip: 'Download contract',
        ),
        DTContractSwitch(
          value: _b,
          onChanged: (v) => setState(() => _b = v),
          label: 'Contract accepted (starts true)',
          onDownload: () {},
          downloadTooltip: 'Download contract',
        ),
        DTContractSwitch(
          value: false,
          onChanged: (_) {},
          label: 'With error text',
          onDownload: () {},
          errorText: 'You must accept the contract',
        ),
      ],
    );
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Inputs — DTDateInput
// ─────────────────────────────────────────────────────────────────────────────

class _DateFields extends HookWidget {
  const _DateFields();

  @override
  Widget build(BuildContext context) {
    final ctrl1 = useTextEditingController();
    final date1 = useState(DateTime.now());
    final ctrl2 = useTextEditingController();
    final date2 = useState(DateTime.now());

    return Column(
      children: [
        DTDateInput(
          controller: ctrl1,
          selectedDate: date1.value,
          onDateSelected: (d) => date1.value = d,
          onClear: () => date1.value = DateTime.now(),
          label: 'Standard date field',
          required: 'Please select a date',
        ),
        DTDateInput.compact(
          controller: ctrl2,
          selectedDate: date2.value,
          onDateSelected: (d) => date2.value = d,
          onClear: () => date2.value = DateTime.now(),
          label: 'Compact variant',
        ),
      ],
    );
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Inputs — DTCoporForm / DTFullFormLayout
// ─────────────────────────────────────────────────────────────────────────────

class _CoporFormShowcase extends StatelessWidget {
  const _CoporFormShowcase();

  @override
  Widget build(BuildContext context) {
    final dt = CoporTheme.of(context);
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          'DTCoporForm and DTFullFormLayout are full-page form layouts wrapping '
          'FloatingContainerLayout with cancel/save chrome.',
          style: dt.text.bodySecondary,
        ),
        const SizedBox(height: 12),
        Wrap(
          spacing: 12,
          runSpacing: 12,
          children: [
            DTButton.surface(
              label: 'DTCoporForm (create)',
              semanticLabel: 'Open DTCoporForm in create mode',
              onPressed: () => _openCoporForm(context, id: null),
            ),
            DTButton.surface(
              label: 'DTCoporForm (edit)',
              semanticLabel: 'Open DTCoporForm in edit mode',
              onPressed: () => _openCoporForm(context, id: 'existing-id'),
            ),
            DTButton.surface(
              label: 'DTFullFormLayout',
              semanticLabel: 'Open DTFullFormLayout',
              onPressed: () => _openFullForm(context),
            ),
          ],
        ),
      ],
    );
  }

  void _openCoporForm(BuildContext context, {required String? id}) {
    final formKey = GlobalKey<FormState>();
    showDialog<void>(
      context: context,
      builder: (ctx) => Dialog(
        insetPadding: EdgeInsets.zero,
        child: SizedBox(
          width: 480,
          height: 400,
          child: DTCoporForm(
            id: id,
            createTitle: 'Create Item',
            editTitle: 'Edit Item',
            formKey: formKey,
            saveLabel: 'Save',
            cancelLabel: 'Cancel',
            onSubmit: () => Navigator.of(ctx).pop(),
            onCancel: () => Navigator.of(ctx).pop(),
            formContent: Padding(
              padding: const EdgeInsets.all(16),
              child: Text('Form content goes here.', style: CoporTheme.of(context).text.body),
            ),
          ),
        ),
      ),
    );
  }

  void _openFullForm(BuildContext context) {
    final formKey = GlobalKey<FormState>();
    showDialog<void>(
      context: context,
      builder: (ctx) => Dialog(
        insetPadding: EdgeInsets.zero,
        child: SizedBox(
          width: 480,
          height: 400,
          child: DTFullFormLayout(
            id: null,
            createTitle: 'Create Item',
            editTitle: 'Edit Item',
            formKey: formKey,
            saveLabel: 'Save',
            cancelLabel: 'Cancel',
            onSubmit: () => Navigator.of(ctx).pop(),
            onCancel: () => Navigator.of(ctx).pop(),
            formContent: Padding(
              padding: const EdgeInsets.all(16),
              child: Text('Form content goes here.', style: CoporTheme.of(context).text.body),
            ),
          ),
        ),
      ),
    );
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Inputs — DTDropdown (single)
// ─────────────────────────────────────────────────────────────────────────────

class _FormDropdowns extends HookWidget {
  const _FormDropdowns();

  static const _items = [
    DTOption(value: 'a', label: 'Option A'),
    DTOption(value: 'b', label: 'Option B'),
    DTOption(value: 'c', label: 'Option C'),
    DTOption(value: 'd', label: 'Option D'),
  ];

  static const _allOptions = [
    DTOption(value: 'a', label: 'Option A'),
    DTOption(value: 'b', label: 'Option B'),
    DTOption(value: 'c', label: 'Option C'),
    DTOption(value: 'd', label: 'Option D'),
    DTOption(value: 'e', label: 'Option E'),
  ];

  static Future<List<DTOption<String>>> _fakeRemoteSearch(String query, int offset) async {
    await Future.delayed(const Duration(milliseconds: 500));
    return _allOptions.where((o) => o.label.toLowerCase().contains(query.toLowerCase())).toList();
  }

  @override
  Widget build(BuildContext context) {
    final single = useState<String?>(null);
    final asyncSingle = useState<String?>(null);

    return Column(
      children: [
        DTDropdown<String>.single(
          value: single.value,
          items: _items,
          onChanged: (v) => single.value = v,
          label: 'Single-select dropdown',
          placeholder: '– Select an option –',
        ),
        DTDropdown<String>.single(
          value: single.value,
          items: _items,
          onChanged: (v) => single.value = v,
          label: 'With search (enableSearch: true)',
          placeholder: '– Type to search –',
          enableSearch: true,
        ),
        DTDropdown<String>.single(
          value: asyncSingle.value,
          items: const [],
          // seed with the currently-selected option(s) when editing
          onChanged: (v) => asyncSingle.value = v,
          label: 'With async search (onSearch)',
          placeholder: '– Type to search remotely –',
          onSearch: _fakeRemoteSearch,
        ),
        DTDropdown<String>.single(
          value: single.value,
          items: _items,
          onChanged: (v) => single.value = v,
          label: 'Required field',
          placeholder: '– Select an option –',
          required: 'Please select an option',
        ),
      ],
    );
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Inputs — DTDropdown (multi)
// ─────────────────────────────────────────────────────────────────────────────

class _CheckboxMultiselects extends HookWidget {
  const _CheckboxMultiselects();

  static const _items = <DTOption<String>>[
    DTOption(value: 'mon', label: 'Monday'),
    DTOption(value: 'tue', label: 'Tuesday'),
    DTOption(value: 'wed', label: 'Wednesday'),
    DTOption(value: 'thu', label: 'Thursday'),
    DTOption(value: 'fri', label: 'Friday'),
  ];

  @override
  Widget build(BuildContext context) {
    final selected = useState<List<String>>([]);

    return Column(
      children: [
        DTDropdown<String>.multi(
          selectedValues: selected.value,
          items: _items,
          onChanged: (v) => selected.value = v,
          label: 'Multi-select dropdown',
          placeholder: '– Select days –',
          selectAllLabel: 'All days',
        ),
        DTDropdown<String>.multi(
          selectedValues: selected.value,
          items: _items,
          onChanged: (v) => selected.value = v,
          label: 'Required multi-select',
          placeholder: '– Required –',
          required: 'Please select at least one day',
          selectAllLabel: 'All days',
        ),
        DTDropdown<String>.multi(
          selectedValues: selected.value,
          items: _items,
          onChanged: (v) => selected.value = v,
          label: 'With search (enableSearch: true)',
          placeholder: '– Select days –',
          enableSearch: true,
        ),
      ],
    );
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Inputs — DTDropdown (chips)
// ─────────────────────────────────────────────────────────────────────────────

class _ChipsDropdownShowcase extends StatefulWidget {
  const _ChipsDropdownShowcase();

  @override
  State<_ChipsDropdownShowcase> createState() => _ChipsDropdownShowcaseState();
}

class _ChipsDropdownShowcaseState extends State<_ChipsDropdownShowcase> {
  static const _items = <DTOption<String>>[
    DTOption(value: 'flutter', label: 'Flutter'),
    DTOption(value: 'dart', label: 'Dart'),
    DTOption(value: 'android', label: 'Android'),
    DTOption(value: 'ios', label: 'iOS'),
    DTOption(value: 'web', label: 'Web'),
  ];

  List<String> _a = [];
  List<String> _b = [];

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        _propLabel(context, 'Standalone'),
        DTDropdown<String>.chips(
          label: 'Technologies',
          inputLabel: 'Select technology',
          placeholder: '– Select technologies –',
          selectedValues: _a,
          items: _items,
          onChanged: (v) => setState(() => _a = v),
        ),
        _propLabel(context, 'With search'),
        DTDropdown<String>.chips(
          label: 'Technologies',
          inputLabel: 'Search technologies',
          placeholder: '– Type to search –',
          selectedValues: _a,
          items: _items,
          onChanged: (v) => setState(() => _a = v),
          enableSearch: true,
        ),
        _propLabel(context, 'With action'),
        DTDropdown<String>.chips(
          label: 'Technologies',
          inputLabel: 'Select technology',
          placeholder: '– Select technologies –',
          selectedValues: _b,
          items: _items,
          onChanged: (v) => setState(() => _b = v),
          actionIcon: Icons.edit_outlined,
          onAction: () {},
        ),
      ],
    );
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Inputs — DTDynamicPhoneList
// ─────────────────────────────────────────────────────────────────────────────

class _PhoneLists extends StatelessWidget {
  const _PhoneLists();

  @override
  Widget build(BuildContext context) {
    return DTDynamicPhoneList(
      initialItems: const [
        DTPhoneEntry(phoneNumber: '+49 30 123456', type: DTPhoneType.work),
        DTPhoneEntry(phoneNumber: '+49 172 9876543', type: DTPhoneType.mobile),
      ],
      onChanged: (_) {},
    );
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Inputs — DTInputDecorator
// ─────────────────────────────────────────────────────────────────────────────

class _InputDecorators extends HookWidget {
  const _InputDecorators();

  @override
  Widget build(BuildContext context) {
    final dt = CoporTheme.of(context);
    return Column(
      children: [
        DTInputDecorator(
          label: 'Standard field',
          child: SizedBox(
            height: 50,
            width: double.infinity,
            child: Center(child: Text('Content', style: CoporTextStyles.of(context).bodyLight)),
          ),
        ),
        const SizedBox(height: 12),
        DTInputDecorator.withHelp(
          label: 'Field with help tooltip',
          helpContent: Text(
            'Tap the ? icon to toggle this help text.',
            style: dt.text.bodySecondary,
          ),
          child: SizedBox(
            height: 50,
            width: double.infinity,
            child: Center(child: Text('Content', style: CoporTextStyles.of(context).bodyLight)),
          ),
        ),
        const SizedBox(height: 12),
        DTInputDecorator.withAction(
          label: 'Field with action button',
          actionIcon: Icons.open_in_new,
          onAction: () {},
          child: SizedBox(
            height: 50,
            width: double.infinity,
            child: Center(child: Text('Content', style: CoporTextStyles.of(context).bodyLight)),
          ),
        ),
      ],
    );
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Inputs — DTInputField
// ─────────────────────────────────────────────────────────────────────────────

class _InputFields extends HookWidget {
  const _InputFields();

  @override
  Widget build(BuildContext context) {
    final ctrl = useTextEditingController();
    return Column(
      children: [
        DTInputField(controller: ctrl, label: 'Standard text field'),
        DTInputField(controller: ctrl, label: 'Required field', required: 'This field is required'),
        DTInputField(controller: ctrl, label: 'Multiline (minLines: 3)', minLines: 3, maxLines: 6),
        DTInputField(
          controller: ctrl,
          label: 'Email keyboard',
          keyboardType: TextInputType.emailAddress,
        ),
        DTInputField(
          controller: ctrl,
          label: 'With error text',
          errorText: 'This value is invalid',
        ),
        DTInputField(controller: ctrl, label: 'Max 50 chars', maxLength: 50),
      ],
    );
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Inputs — DTLanguageButton
// ─────────────────────────────────────────────────────────────────────────────

class _LanguageButtons extends HookWidget {
  const _LanguageButtons();

  static const _items = [
    DTLanguageItem(code: 'en', name: 'English', flagCode: 'gb'),
    DTLanguageItem(code: 'de', name: 'German', flagCode: 'de'),
    DTLanguageItem(code: 'fr', name: 'French', flagCode: 'fr'),
    DTLanguageItem(code: 'es', name: 'Spanish', flagCode: 'es'),
  ];

  @override
  Widget build(BuildContext context) {
    final selected = useState(_items.first);

    return Wrap(
      spacing: 24,
      runSpacing: 12,
      crossAxisAlignment: WrapCrossAlignment.start,
      children: [
        _LabelledWidget(
          label: 'DTLanguageButton\n(full)',
          child: DTLanguageButton(
            items: _items,
            selected: selected.value,
            onChanged: (l) => selected.value = l,
          ),
        ),
        _LabelledWidget(
          label: 'DTLanguageButton.compact\n(flag only)',
          child: DTLanguageButton.compact(
            items: _items,
            selected: selected.value,
            onChanged: (l) => selected.value = l,
          ),
        ),
      ],
    );
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Inputs — DTPasswordField
// ─────────────────────────────────────────────────────────────────────────────

class _PasswordFields extends HookWidget {
  const _PasswordFields();

  @override
  Widget build(BuildContext context) {
    final ctrl = useTextEditingController();
    return Column(
      children: [
        DTPasswordField(controller: ctrl, label: 'Password'),
        DTPasswordField(
          controller: ctrl,
          label: 'Required password',
          required: 'Password is required',
        ),
      ],
    );
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Inputs — DTPhoneInput
// ─────────────────────────────────────────────────────────────────────────────

class _PhoneInputShowcase extends HookWidget {
  const _PhoneInputShowcase();

  @override
  Widget build(BuildContext context) {
    final ctrl1 = useTextEditingController();
    final type1 = useState(DTPhoneType.mobile);
    final ctrl2 = useTextEditingController();
    final type2 = useState(DTPhoneType.work);

    return Column(
      children: [
        _propLabel(context, 'Basic (no remove)'),
        DTPhoneInput(
          controller: ctrl1,
          type: type1.value,
          onTypeChanged: (t) => type1.value = t ?? DTPhoneType.mobile,
        ),
        _propLabel(context, 'Required + with remove button'),
        DTPhoneInput(
          controller: ctrl2,
          type: type2.value,
          onTypeChanged: (t) => type2.value = t ?? DTPhoneType.work,
          required: 'Phone is required',
          onRemove: () {},
        ),
      ],
    );
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Inputs — DTSearchBar
// ─────────────────────────────────────────────────────────────────────────────

class _SearchBarShowcase extends HookWidget {
  const _SearchBarShowcase();

  @override
  Widget build(BuildContext context) {
    final ctrl = useTextEditingController();
    return DTSearchBar(title: 'Search…', controller: ctrl, onSearchChanged: (_) {});
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// ─────────────────────────────────────────────────────────────────────────────
// Inputs — DTSegmentedButton
// ─────────────────────────────────────────────────────────────────────────────

class _SegmentedButtonShowcase extends StatefulWidget {
  const _SegmentedButtonShowcase();

  @override
  State<_SegmentedButtonShowcase> createState() => _SegmentedButtonShowcaseState();
}

class _SegmentedButtonShowcaseState extends State<_SegmentedButtonShowcase> {
  Set<String> _selected = {'a'};

  @override
  Widget build(BuildContext context) {
    return DTSegmentedButton<String>(
      selected: _selected,
      onSelectionChanged: (v) => setState(() => _selected = v),
      segments: const [
        ButtonSegment(value: 'a', label: Text('Option A')),
        ButtonSegment(value: 'b', label: Text('Option B')),
        ButtonSegment(value: 'c', label: Text('Option C')),
      ],
    );
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Inputs — DTSwitchInput
// ─────────────────────────────────────────────────────────────────────────────

class _SwitchInputs extends StatefulWidget {
  const _SwitchInputs();

  @override
  State<_SwitchInputs> createState() => _SwitchInputsState();
}

class _SwitchInputsState extends State<_SwitchInputs> {
  bool _a = false;
  bool _b = true;

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        DTSwitchInput(
          value: _a,
          onChanged: (v) => setState(() => _a = v),
          label: 'Off by default (tap to toggle)',
        ),
        DTSwitchInput(
          value: _b,
          onChanged: (v) => setState(() => _b = v),
          label: 'On by default (tap to toggle)',
        ),
        DTSwitchInput(value: false, onChanged: (_) {}, label: 'Disabled', disabled: true),
        DTSwitchInput(
          value: _a,
          onChanged: (v) => setState(() => _a = v),
          label: 'With help content',
          helpContent: const Text('This is some helpful information about what this switch does.'),
        ),
        DTSwitchInput(
          value: false,
          onChanged: (_) {},
          label: 'With help and error',
          errorText: 'You must accept the terms',
          helpContent: const Text('This is some helpful information about what this switch does.'),
        ),
      ],
    );
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Inputs — DTTagDropdown
// ─────────────────────────────────────────────────────────────────────────────

class _TagDropdownShowcase extends StatefulWidget {
  const _TagDropdownShowcase();

  @override
  State<_TagDropdownShowcase> createState() => _TagDropdownShowcaseState();
}

class _TagDropdownShowcaseState extends State<_TagDropdownShowcase> {
  static const _items = [
    DTTag(id: '1', name: 'Flutter', color: 4, isPrivate: false),
    DTTag(id: '2', name: 'Dart', color: 2, isPrivate: false),
    DTTag(id: '3', name: 'Mobile', color: 5, isPrivate: false),
    DTTag(id: '4', name: 'Private', color: 6, isPrivate: true),
  ];

  List<DTTag> _selected = [];

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        _propLabel(context, 'Without onAction'),
        DTTagDropdown(
          label: 'Tags',
          searchLabel: 'Select tags',
          selectedValues: _selected,
          items: _items,
          onChanged: (tags) => setState(() => _selected = tags),
        ),
        _propLabel(context, 'With onAction (wraps in DTInputDecorator.withAction)'),
        DTTagDropdown(
          label: 'Tags',
          searchLabel: 'Select tags',
          selectedValues: _selected,
          items: _items,
          onChanged: (tags) => setState(() => _selected = tags),
          onAction: () {},
        ),
      ],
    );
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Feedback — DTBanner
// ─────────────────────────────────────────────────────────────────────────────

class _BannerShowcase extends StatelessWidget {
  const _BannerShowcase();

  @override
  Widget build(BuildContext context) {
    return Column(
      spacing: 12,
      children: [
        DTBanner.error(message: 'Something went wrong. Please try again.'),
        DTBanner.warning(message: 'This action may have side effects.'),
        DTBanner.success(message: 'Changes saved successfully.'),
        DTBanner.info(message: 'Your session will expire in 10 minutes.'),
        _propLabel(context, 'With onDismiss'),
        DTBanner.error(message: 'Error with dismiss button.', onDismiss: () {}),
        DTBanner.success(message: 'Success with dismiss button.', onDismiss: () {}),
      ],
    );
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Feedback — DTDialog
// ─────────────────────────────────────────────────────────────────────────────

class _DialogShowcase extends StatelessWidget {
  const _DialogShowcase();

  @override
  Widget build(BuildContext context) {
    return Wrap(
      spacing: 12,
      runSpacing: 12,
      children: [
        DTButton.surface(
          label: 'showConfirm',
          semanticLabel: 'Open confirm dialog',
          onPressed: () => DTDialog.showConfirm(
            context,
            title: 'Confirm action',
            content: 'Are you sure you want to proceed?',
            cancelLabel: 'Cancel',
            confirmLabel: 'Confirm',
          ),
        ),
        DTButton.surface(
          label: 'showConfirm (delete)',
          semanticLabel: 'Open delete dialog',
          onPressed: () => DTDialog.showConfirm(
            context,
            title: 'Delete item?',
            content: 'This cannot be undone.',
            cancelLabel: 'Cancel',
            confirmLabel: 'Delete',
          ),
        ),
        DTButton.surface(
          label: 'DTDialog.show (custom)',
          semanticLabel: 'Open custom dialog',
          onPressed: () => DTDialog.show<void>(
            context,
            builder: (ctx) => Padding(
              padding: const EdgeInsets.all(24),
              child: Text(
                'Custom dialog content via DTDialog.show(builder: ...).',
                style: CoporTheme.of(context).text.body,
              ),
            ),
          ),
        ),
      ],
    );
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Feedback — DTNotificationCard
// ─────────────────────────────────────────────────────────────────────────────

class _NotificationCardShowcase extends StatelessWidget {
  const _NotificationCardShowcase();

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        _propLabel(context, 'dismissProgress: 0.0 (just appeared)'),
        DTNotificationCard(
          title: 'Ana Kovač',
          message: 'Hey, did you see the new schedule?',
          dismissProgress: 0.0,
          avatar: DTAvatar(userFullName: 'Ana Kovač', picture: '', radius: 16),
        ),
        const SizedBox(height: 8),
        _propLabel(context, 'dismissProgress: 0.6 (auto-dismissing)'),
        DTNotificationCard(
          title: 'Marko Perić',
          message: 'The meeting has been rescheduled to 3 PM.',
          dismissProgress: 0.6,
        ),
        const SizedBox(height: 12),
        _propLabel(context, 'DTDismissButton'),
        DTDismissButton(onPressed: () {}),
      ],
    );
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Feedback — DTTopLoadingBar
// ─────────────────────────────────────────────────────────────────────────────

class _TopLoadingBarShowcase extends HookWidget {
  const _TopLoadingBarShowcase();

  @override
  Widget build(BuildContext context) {
    final isLoading = useState(true);
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        DTTopLoadingBar(isLoading: isLoading.value),
        const SizedBox(height: 12),
        DTButton.surface(
          label: isLoading.value ? 'Stop loading' : 'Start loading',
          semanticLabel: 'Toggle loading bar',
          onPressed: () => isLoading.value = !isLoading.value,
        ),
      ],
    );
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Navigation — DTAppBar
// ─────────────────────────────────────────────────────────────────────────────

class _AppBarShowcase extends StatelessWidget {
  const _AppBarShowcase();

  @override
  Widget build(BuildContext context) {
    final dt = CoporTheme.of(context);
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          'DTAppBar is a PreferredSizeWidget with: title, leading, actions, isMobile, maxWidth.',
          style: dt.text.bodySecondary,
        ),
        const SizedBox(height: 12),
        _propLabel(context, 'Desktop (isMobile: false)'),
        SizedBox(
          height: 60,
          child: Material(
            color: dt.colors.surface,
            child: DTAppBar(
              title: 'Page Title',
              actions: [
                DTButton.surface(
                  icon: Icons.search,
                  label: '',
                  semanticLabel: 'Search',
                  onPressed: () {},
                ),
              ],
              isMobile: false,
            ),
          ),
        ),
        const SizedBox(height: 12),
        _propLabel(context, 'Mobile (isMobile: true)'),
        SizedBox(
          height: 56,
          child: Material(
            color: dt.colors.surface,
            child: DTAppBar(
              title: 'Page Title',
              leading: DTButton.surface(
                icon: Icons.arrow_back,
                label: '',
                semanticLabel: 'Back',
                onPressed: () {},
              ),
              actions: [
                DTButton.surface(
                  icon: Icons.more_vert,
                  label: '',
                  semanticLabel: 'More',
                  onPressed: () {},
                ),
              ],
              isMobile: true,
            ),
          ),
        ),
      ],
    );
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Navigation — DTMenuDrawer
// ─────────────────────────────────────────────────────────────────────────────

class _MenuDrawerShowcase extends StatelessWidget {
  const _MenuDrawerShowcase();

  @override
  Widget build(BuildContext context) {
    final dt = CoporTheme.of(context);
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          'DTMenuDrawer wraps the app drawer with header / content / footer slots.',
          style: dt.text.bodySecondary,
        ),
        const SizedBox(height: 12),
        DTButton.surface(
          label: 'Open DTMenuDrawer preview',
          semanticLabel: 'Open menu drawer preview',
          onPressed: () => showDialog<void>(
            context: context,
            builder: (ctx) => Dialog(
              insetPadding: EdgeInsets.zero,
              child: SizedBox(
                width: 280,
                height: 480,
                child: DTMenuDrawer(
                  header: Row(
                    children: [
                      DTAvatar(userFullName: 'Anna M', picture: ''),
                      const SizedBox(width: 8),
                      Expanded(child: Text('Anna Müller', style: dt.text.bodyStrong)),
                    ],
                  ),
                  content: Column(
                    children: [
                      DTListTile.toggle(
                        icon: Icons.home_outlined,
                        label: 'Dashboard',
                        isToggled: true,
                        onPressed: () {},
                      ),
                      DTListTile.toggle(
                        icon: Icons.people_outlined,
                        label: 'Contacts',
                        isToggled: false,
                        onPressed: () {},
                      ),
                      DTListTile.toggle(
                        icon: Icons.calendar_today_outlined,
                        label: 'Calendar',
                        isToggled: false,
                        onPressed: () {},
                      ),
                    ],
                  ),
                  footer: DTListTile.toggle(
                    icon: Icons.settings_outlined,
                    label: 'Settings',
                    isToggled: false,
                    onPressed: () {},
                  ),
                ),
              ),
            ),
          ),
        ),
      ],
    );
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Navigation — DTListTile (expandable)
// ─────────────────────────────────────────────────────────────────────────────

class _MenuItemShowcase extends StatelessWidget {
  const _MenuItemShowcase();

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        DTListTile.toggle(
          icon: Icons.home_outlined,
          label: 'Dashboard',
          isToggled: false,
          onPressed: () {},
        ),
        DTListTile.toggle(
          icon: Icons.people_outlined,
          label: 'People',
          isToggled: true,
          onPressed: () {},
        ),
        DTListTile.expandable(
          icon: Icons.settings_outlined,
          label: 'Settings (expandable)',
          children: [
            DTListTile.toggle(
              icon: Icons.palette_outlined,
              label: 'Theme',
              isToggled: false,
              onPressed: () {},
            ),
            DTListTile.toggle(
              icon: Icons.lock_outlined,
              label: 'Security',
              isToggled: false,
              onPressed: () {},
            ),
          ],
        ),
      ],
    );
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Navigation — DTModalAppBar
// ─────────────────────────────────────────────────────────────────────────────

class _ModalAppBarShowcase extends StatelessWidget {
  const _ModalAppBarShowcase();

  @override
  Widget build(BuildContext context) {
    final dt = CoporTheme.of(context);
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        _propLabel(context, 'Standard'),
        SizedBox(
          height: 56,
          child: Material(
            color: dt.colors.surface,
            child: DTModalAppBar(
              title: 'Edit Record',
              cancelLabel: 'Cancel',
              proceedLabel: 'Save',
              onBack: () {},
              onProceed: () {},
            ),
          ),
        ),
        const SizedBox(height: 12),
        _propLabel(context, 'With leadingExtra'),
        SizedBox(
          height: 56,
          child: Material(
            color: dt.colors.surface,
            child: DTModalAppBar(
              title: 'Create Record',
              cancelLabel: 'Cancel',
              proceedLabel: 'Create',
              onBack: () {},
              onProceed: () {},
              leadingExtra: DTButton.surface(
                icon: Icons.delete_outline,
                label: '',
                semanticLabel: 'Delete draft',
                onPressed: () {},
              ),
            ),
          ),
        ),
      ],
    );
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Navigation — DTNavBar
// ─────────────────────────────────────────────────────────────────────────────

class _NavBarShowcase extends StatefulWidget {
  const _NavBarShowcase();

  @override
  State<_NavBarShowcase> createState() => _NavBarShowcaseState();
}

class _NavBarShowcaseState extends State<_NavBarShowcase> {
  int _sel = 0;

  List<DTNavBarItem> _items(int count) => [
    DTNavBarItem(
      icon: Icons.home_outlined,
      label: 'Home',
      count: 0,
      selected: _sel == 0,
      onTap: () => setState(() => _sel = 0),
    ),
    DTNavBarItem(
      icon: Icons.people_outlined,
      label: 'People',
      count: 3,
      selected: _sel == 1,
      onTap: () => setState(() => _sel = 1),
    ),
    DTNavBarItem(
      icon: Icons.calendar_today_outlined,
      label: 'Calendar',
      count: 0,
      selected: _sel == 2,
      onTap: () => setState(() => _sel = 2),
    ),
    if (count > 3)
      DTNavBarItem(
        icon: Icons.notifications_outlined,
        label: 'Alerts',
        count: 5,
        selected: _sel == 3,
        onTap: () => setState(() => _sel = 3),
      ),
  ];

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        _propLabel(context, 'DTNavBar — desktop (isMobile: false)'),
        DTNavBar(items: _items(4), isMobile: false),
        const SizedBox(height: 16),
        _propLabel(context, 'DTNavBar — mobile (isMobile: true)'),
        DTNavBar(items: _items(3), isMobile: true),
      ],
    );
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Navigation — DTTabBar
// ─────────────────────────────────────────────────────────────────────────────

class _TabBarShowcase extends HookWidget {
  const _TabBarShowcase();

  @override
  Widget build(BuildContext context) {
    final ctrl = useTabController(initialLength: 3);
    return DTTabBar(
      controller: ctrl,
      tabs: const [
        Tab(text: 'First'),
        Tab(text: 'Second'),
        Tab(text: 'Third'),
      ],
    );
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Layout — DTDraggableScrollableSheet
// ─────────────────────────────────────────────────────────────────────────────

class _DraggableSheetShowcase extends StatelessWidget {
  const _DraggableSheetShowcase();

  @override
  Widget build(BuildContext context) {
    final dt = CoporTheme.of(context);
    return DTButton.surface(
      label: 'Open sheet',
      semanticLabel: 'Open draggable scrollable sheet',
      onPressed: () => showModalBottomSheet<void>(
        context: context,
        isScrollControlled: true,
        backgroundColor: Colors.transparent,
        builder: (_) => DTDraggableScrollableSheet(
          footer: DTActionFooter.dual(
            leadingLabel: 'Cancel',
            trailingLabel: 'Apply',
            onLeading: () => Navigator.of(context).pop(),
            onTrailing: () => Navigator.of(context).pop(),
          ),
          contentBuilder: (ctx, scrollController) => ListView(
            controller: scrollController,
            padding: const EdgeInsets.all(16),
            children: List.generate(
              12,
              (i) => Padding(
                padding: const EdgeInsets.symmetric(vertical: 8),
                child: Text('Item ${i + 1}', style: dt.text.body),
              ),
            ),
          ),
        ),
      ),
    );
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Layout — DTResponsiveModalLayout
// ─────────────────────────────────────────────────────────────────────────────

class _ResponsiveModalShowcase extends StatelessWidget {
  const _ResponsiveModalShowcase();

  @override
  Widget build(BuildContext context) {
    final dt = CoporTheme.of(context);
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          'DTResponsiveModalLayout wraps a child in the standard edit-form chrome '
          '(modal app bar on mobile, side panel on desktop).',
          style: dt.text.bodySecondary,
        ),
        const SizedBox(height: 12),
        DTButton.surface(
          label: 'Open modal preview',
          semanticLabel: 'Open responsive modal layout preview',
          onPressed: () => showDialog<void>(
            context: context,
            builder: (ctx) => Dialog(
              insetPadding: EdgeInsets.zero,
              child: SizedBox(
                width: 480,
                height: 560,
                child: DTResponsiveModalLayout(
                  onClose: () => Navigator.of(ctx).pop(),
                  child: Padding(
                    padding: const EdgeInsets.all(24),
                    child: Text('Form content goes here.', style: dt.text.body),
                  ),
                ),
              ),
            ),
          ),
        ),
      ],
    );
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Layout — DTSnapScrollView
// ─────────────────────────────────────────────────────────────────────────────

class _SnapScrollViewShowcase extends StatelessWidget {
  const _SnapScrollViewShowcase();

  @override
  Widget build(BuildContext context) {
    final dt = CoporTheme.of(context);
    return SizedBox(
      height: 260,
      child: DTSnapScrollView(
        header: Padding(
          padding: const EdgeInsets.all(16),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text('Snap Header', style: dt.text.sectionTitle),
              Text(
                'Scroll down — header snaps away; scroll up — it snaps back.',
                style: dt.text.bodySecondary,
              ),
            ],
          ),
        ),
        body: ListView.builder(
          itemCount: 10,
          itemBuilder: (_, i) => Padding(
            padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
            child: Text('Row ${i + 1}', style: dt.text.body),
          ),
        ),
      ),
    );
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Layout — DTStepContent
// ─────────────────────────────────────────────────────────────────────────────

class _StepContentShowcase extends StatefulWidget {
  const _StepContentShowcase();

  @override
  State<_StepContentShowcase> createState() => _StepContentShowcaseState();
}

class _StepContentShowcaseState extends State<_StepContentShowcase> {
  int _step = 0;
  static const _content = [
    'Step 1 — Personal Information\nFill in your name and date of birth.',
    'Step 2 — Contact Details\nProvide your email address and phone number.',
    'Step 3 — Review & Submit\nCheck your details and confirm the form.',
  ];

  @override
  Widget build(BuildContext context) {
    final dt = CoporTheme.of(context);
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Row(
          children: [
            DTButton.surface(
              icon: Icons.arrow_back,
              label: 'Prev',
              semanticLabel: 'Previous step',
              enabled: _step > 0,
              onPressed: () => setState(() => _step--),
            ),
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 12),
              child: Text('${_step + 1} / ${_content.length}', style: dt.text.body),
            ),
            DTButton.surface(
              icon: Icons.arrow_forward,
              label: 'Next',
              semanticLabel: 'Next step',
              enabled: _step < _content.length - 1,
              onPressed: () => setState(() => _step++),
            ),
          ],
        ),
        const SizedBox(height: 8),
        DTStepContent(
          stepIndex: _step,
          height: 100,
          child: Padding(
            padding: const EdgeInsets.all(16),
            child: Text(_content[_step], style: dt.text.body),
          ),
        ),
      ],
    );
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Data — shared sample data
// ─────────────────────────────────────────────────────────────────────────────

const _kTableLabels = DTTableLabels(
  noDataFound: 'No data found',
  published: 'Published',
  unpublished: 'Unpublished',
  draft: 'Draft',
  copy: 'Copy',
  copyToClipboard: 'Copied!',
  todo: 'To Do',
  started: 'Started',
  halfway: 'Halfway',
  almostDone: 'Almost Done',
  finished: 'Finished',
  normal: 'Normal',
  high: 'High',
  urgent: 'Urgent',
  trueLabel: 'Yes',
  falseLabel: 'No',
  currentPeriodLabel: 'Current Year',
);

List<DTColumnHeader> _sampleColumns() => [
  DTColumnHeader(name: 'Name', key: 'name', sortKey: 'name'),
  DTColumnHeader(name: 'Status', key: 'status'),
  DTColumnHeader(name: 'Date', key: 'date'),
  DTColumnHeader(name: 'Priority', key: 'priority'),
];

List<List<Widget>> _sampleRows() => [
  [
    const DTTextCell(text: 'Alice Smith'),
    const DTPublishStatusCell(publishStatus: DTPublishStatus.published),
    const DTDateCell(date: '2024-03-15'),
    const DTPriorityCell(priority: DTPriority.normal),
  ],
  [
    const DTTextCell(text: 'Bob Johnson'),
    const DTPublishStatusCell(publishStatus: DTPublishStatus.draft),
    const DTDateCell(date: '2024-05-22'),
    const DTPriorityCell(priority: DTPriority.high),
  ],
  [
    const DTTextCell(text: 'Carol Williams'),
    const DTPublishStatusCell(publishStatus: DTPublishStatus.unpublished),
    const DTDateCell(date: '2024-01-10'),
    const DTPriorityCell(priority: DTPriority.urgent),
  ],
];

// ─────────────────────────────────────────────────────────────────────────────
// Data — DTTableDesktop
// ─────────────────────────────────────────────────────────────────────────────

class _DynamicTableShowcase extends StatelessWidget {
  const _DynamicTableShowcase();

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      height: 220,
      child: Column(
        children: [
          DTTable(
            headers: _sampleColumns(),
            rows: _sampleRows(),
            noData: const Center(child: Text('No data')),
            labels: _kTableLabels,
            isMobile: false,
          ),
        ],
      ),
    );
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Data — DTTable
// ─────────────────────────────────────────────────────────────────────────────

class _TableViewShowcase extends StatelessWidget {
  const _TableViewShowcase();

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        _propLabel(context, 'DTTable — desktop (isMobile: false)'),
        SizedBox(
          height: 220,
          child: Column(
            children: [
              DTTable(
                headers: _sampleColumns(),
                rows: _sampleRows(),
                noData: const Center(child: Text('No data')),
                labels: _kTableLabels,
                isMobile: false,
              ),
            ],
          ),
        ),
        const SizedBox(height: 16),
        _propLabel(context, 'DTTable — mobile (isMobile: true)'),
        SizedBox(
          height: 320,
          child: Column(
            children: [
              DTTable(
                headers: _sampleColumns(),
                rows: _sampleRows(),
                noData: const Center(child: Text('No data')),
                labels: _kTableLabels,
                isMobile: true,
              ),
            ],
          ),
        ),
      ],
    );
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Data — DTTableMobile
// ─────────────────────────────────────────────────────────────────────────────

class _TableCardsShowcase extends StatelessWidget {
  const _TableCardsShowcase();

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      height: 320,
      child: Column(
        children: [
          DTTable(
            headers: _sampleColumns(),
            rows: _sampleRows(),
            noData: const Center(child: Text('No data')),
            labels: _kTableLabels,
            isMobile: true,
          ),
        ],
      ),
    );
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Data — Table Cells
// ─────────────────────────────────────────────────────────────────────────────

class _TableCellsShowcase extends StatelessWidget {
  const _TableCellsShowcase();

  @override
  Widget build(BuildContext context) {
    return DTTableLabelsProvider(
      labels: _kTableLabels,
      child: Wrap(
        spacing: 16,
        runSpacing: 16,
        crossAxisAlignment: WrapCrossAlignment.start,
        children: [
          _LabelledWidget(
            label: 'DTTextCell',
            child: const DTTextCell(text: 'Sample text'),
          ),
          _LabelledWidget(
            label: 'DTColorCell\n(color: 4 = blue)',
            child: const DTColorCell(color: 4),
          ),
          _LabelledWidget(
            label: 'DTPublishStatusCell\npublished',
            child: const DTPublishStatusCell(publishStatus: DTPublishStatus.published),
          ),
          _LabelledWidget(
            label: 'draft',
            child: const DTPublishStatusCell(publishStatus: DTPublishStatus.draft),
          ),
          _LabelledWidget(
            label: 'unpublished',
            child: const DTPublishStatusCell(publishStatus: DTPublishStatus.unpublished),
          ),
          _LabelledWidget(
            label: 'DTPriorityCell\nnormal',
            child: const DTPriorityCell(priority: DTPriority.normal),
          ),
          _LabelledWidget(
            label: 'high',
            child: const DTPriorityCell(priority: DTPriority.high),
          ),
          _LabelledWidget(
            label: 'urgent',
            child: const DTPriorityCell(priority: DTPriority.urgent),
          ),
          _LabelledWidget(
            label: 'DTProgressCell\nstarted',
            child: const DTProgressCell(progress: DTProgress.started),
          ),
          _LabelledWidget(
            label: 'finished',
            child: const DTProgressCell(progress: DTProgress.finished),
          ),
          _LabelledWidget(
            label: 'DTCheckedCell\ntrue',
            child: const DTCheckedCell(isChecked: true),
          ),
          _LabelledWidget(label: 'false', child: const DTCheckedCell(isChecked: false)),
          _LabelledWidget(
            label: 'DTCopyableTextCell',
            child: DTCopyableTextCell(copyText: 'copy me', onCopied: () {}),
          ),
          _LabelledWidget(
            label: 'DTHiddenTextCell',
            child: const DTHiddenTextCell(hiddenText: 'secret value'),
          ),
          _LabelledWidget(
            label: 'DTFeaturedCell\ntrue',
            child: const DTFeaturedCell(isFeatured: true),
          ),
          _LabelledWidget(
            label: 'DTActionCell',
            child: DTActionCell(
              children: [
                DTCommonButtons.edit(semanticLabel: 'Edit', onPressed: () {}),
                DTCommonButtons.delete(semanticLabel: 'Delete', onPressed: () {}),
              ],
            ),
          ),
          _LabelledWidget(
            label: 'DTDateCell\n(ISO string)',
            child: const DTDateCell(date: '2024-06-15'),
          ),
        ],
      ),
    );
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Shared helpers
// ─────────────────────────────────────────────────────────────────────────────

class _ButtonGroup extends StatelessWidget {
  final String title;
  final List<Widget> children;

  const _ButtonGroup({required this.title, required this.children});

  @override
  Widget build(BuildContext context) {
    final dt = CoporTheme.of(context);
    return Padding(
      padding: const EdgeInsets.only(bottom: 16),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(title, style: dt.text.chipLabel.copyWith(color: dt.colors.onSurfaceSubtle)),
          const SizedBox(height: 8),
          Wrap(
            spacing: 16,
            runSpacing: 12,
            crossAxisAlignment: WrapCrossAlignment.start,
            children: children,
          ),
        ],
      ),
    );
  }
}

class _LabelledWidget extends StatelessWidget {
  final String label;
  final Widget child;

  const _LabelledWidget({required this.label, required this.child});

  @override
  Widget build(BuildContext context) {
    final dt = CoporTheme.of(context);
    return Column(
      mainAxisAlignment: MainAxisAlignment.spaceBetween,
      children: [
        SizedBox(
          height: 36,
          child: Text(
            label,
            style: dt.text.chipLabel.copyWith(color: dt.colors.onSurfaceSubtle),
            textAlign: TextAlign.center,
          ),
        ),
        const SizedBox(height: 8),
        child,
      ],
    );
  }
}

Widget _propLabel(BuildContext context, String text) {
  final dt = CoporTheme.of(context);
  return Padding(
    padding: const EdgeInsets.only(bottom: 6),
    child: Text(text, style: dt.text.chipLabel.copyWith(color: dt.colors.onSurfaceSubtle)),
  );
}
