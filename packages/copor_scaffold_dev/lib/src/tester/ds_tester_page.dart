import 'package:copor_scaffold/copor_scaffold.dart';
import 'package:copor_scaffold/src/utils/ds_device_extensions.dart';
import 'package:copor_theme/copor_theme.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import '../shared/dt_dev_notifications_panel.dart';

class DSScaffoldTesterPage extends StatelessWidget {
  final bool standalone;

  final Widget? leading;

  final List<Widget>? extraActions;

  final Widget? drawer;

  final Widget? rail;
  final Widget? bottomNavBar;

  /// Overrides the notifications end-drawer section's content. Defaults to
  /// a bare-bones panel reading the same `DSNotificationCubit` inbox — a
  /// host app should pass its own real notifications panel here (the same
  /// one it shows on every other page) so this page exercises the actual
  /// production UI instead of a simplified stand-in.
  final Widget? notificationsPanel;

  final ValueChanged<bool>? onDarkModeChanged;

  final List<Widget> extraChildren;

  const DSScaffoldTesterPage({
    super.key,
    this.standalone = false,
    this.leading,
    this.extraActions,
    this.drawer,
    this.rail,
    this.bottomNavBar,
    this.notificationsPanel,
    this.onDarkModeChanged,
    this.extraChildren = const [],
  });

  @override
  Widget build(BuildContext context) {
    final setup = _TesterSetup(page: this);

    if (!standalone) return setup;

    return DSScaffoldProviders(child: DSScaffold(child: setup));
  }
}

class _TesterSetup extends StatefulWidget {
  final DSScaffoldTesterPage page;
  const _TesterSetup({required this.page});

  @override
  State<_TesterSetup> createState() => _TesterSetupState();
}

class _TesterSetupState extends State<_TesterSetup> {
  static const _kSettingsSectionKey = 'settings';

  late final Widget _title;
  late final List<Widget> _actions;
  late final Widget _endDrawer;
  late final Widget _floatingActionButton;

  @override
  void initState() {
    super.initState();
    _title = IgnorePointer(
      // Same icon as the "Scaffold Tester" entry in the app's dev menu
      // (AppDrawerNavigation's Dev submenu).
      child: DTButton.floating(
        icon: PhosphorIconsThin.squaresFour,
        label: 'Scaffold Tester',
        border: false,
        onPressed: () {},
      ),
    );
    _actions = [
      Builder(
        builder: (ctx) => DSEndDrawerAnchor(
          child: DSNotificationButton(
            destination: DSNotificationDestination.bell,
            border: !ctx.isMobile,
            onPressed: () => ctx
                .read<DSScaffoldController>()
                .showEndDrawerSection(DSNotificationDestination.bell.key),
          ),
        ),
      ),
      Builder(
        builder: (ctx) => DTButton.floating(
          icon: PhosphorIconsThin.gear,
          label: '',
          semanticLabel: 'Settings',
          border: !ctx.isMobile,
          onPressed: () => ctx
              .read<DSScaffoldController>()
              .showEndDrawerSection(_kSettingsSectionKey),
        ),
      ),
      ...?widget.page.extraActions,
    ];
    // Same DSEndDrawerHost every real page's end drawer uses — content
    // swaps entirely based on which button (bell vs. gear) called
    // showEndDrawerSection, no tab switcher. Notifications is registered
    // under the same key the app's own bell button uses
    // (DSNotificationDestination.bell.key), matching ScaffoldUpdater's
    // built-in end-drawer section on real pages.
    _endDrawer = DSEndDrawerHost(
      sections: [
        DSEndDrawerSection(
          key: DSNotificationDestination.bell.key,
          child:
              widget.page.notificationsPanel ?? const DTDevNotificationsPanel(),
        ),
        DSEndDrawerSection(
          key: _kSettingsSectionKey,
          child: _TesterSettingsPanel(
            onDarkModeChanged: widget.page.onDarkModeChanged,
          ),
        ),
      ],
    );
    _floatingActionButton = Builder(
      builder: (ctx) => DTButton.floating(
        icon: PhosphorIconsThin.arrowCounterClockwise,
        label: 'Reset scaffold',
        onPressed: () => ctx.read<DSScaffoldController>().resetRuntimeState(),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return DSScaffoldSetup(
      appBar: const DSAppBarShell(),
      leading: widget.page.leading,
      title: _title,
      actions: _actions,
      drawer: widget.page.drawer,
      rail: widget.page.rail,
      endDrawer: _endDrawer,
      bottomNavBar: widget.page.bottomNavBar,
      floatingActionButton: _floatingActionButton,
      child: _TesterBody(page: widget.page),
    );
  }
}

class _TesterBody extends StatelessWidget {
  final DSScaffoldTesterPage page;
  const _TesterBody({required this.page});

  @override
  Widget build(BuildContext context) {
    return DSPageWrapper(
      isMobile: context.isMobile,
      scrollable: true,
      children: [
        const _ScaffoldStateViewer(),
        const SizedBox(height: 32),

        _FieldSection(
          field: 'Loading Sources',
          note: 'request → top bar | page → ring overlay',
          children: [
            BlocBuilder<DSLoadingCubit, DSLoadingState>(
              buildWhen: (prev, curr) =>
                  prev.loadingSources.any((s) => s.key == 'api_call') !=
                  curr.loadingSources.any((s) => s.key == 'api_call'),
              builder: (context, state) {
                final isActive = state.loadingSources.any(
                  (s) => s.key == 'api_call',
                );
                return DTButton.toggle(
                  label: 'Add API call"',
                  labelToggled: 'Remove API call',
                  isToggled: isActive,
                  onPressed: () => isActive
                      ? context.read<DSLoadingCubit>().removeLoadingSource(
                          'api_call',
                        )
                      : context.read<DSLoadingCubit>().addLoadingSource(
                          const DSLoadingSource.request('api_call'),
                        ),
                );
              },
            ),
            _TesterButton('Simulate 2s load', () {
              context.read<DSLoadingCubit>().addLoadingSource(
                const DSLoadingSource.page('tester_page'),
              );
              Future.delayed(
                const Duration(seconds: 2),
                () => context.read<DSLoadingCubit>().removeLoadingSource(
                  'tester_page',
                ),
              );
            }, variant: _TesterButtonVariant.surface),
          ],
        ),

        _FieldSection(
          field: 'Banners',
          note: 'Error - Warning - Info - Success',
          children: [
            _TesterButton(
              'Add 500',
              () => context.read<DSBannerCubit>().addBanner(
                const DSBanner.error(
                  'Internal server error occurred.',
                  source: 'tester_500',
                ),
              ),
              variant: _TesterButtonVariant.negative,
            ),
            _TesterButton(
              'Add 404',
              () => context.read<DSBannerCubit>().addBanner(
                const DSBanner.error(
                  'The requested resource was not found.',
                  source: 'tester_404',
                ),
              ),
              variant: _TesterButtonVariant.negative,
            ),
            _TesterButton(
              'Add 401',
              () => context.read<DSBannerCubit>().addBanner(
                const DSBanner.error(
                  'You are not authorised to perform this action.',
                  source: 'tester_401',
                ),
              ),
              variant: _TesterButtonVariant.negative,
            ),
            _TesterButton(
              'Add No internet',
              () => context.read<DSBannerCubit>().addBanner(
                const DSBanner.error(
                  'No internet connection.',
                  source: 'tester_offline',
                ),
              ),
              variant: _TesterButtonVariant.negative,
            ),
            _TesterButton(
              'Add Long message',
              () => context.read<DSBannerCubit>().addBanner(
                const DSBanner.error(
                  'Something went wrong while processing your request. '
                  'Please try again later or contact support if the problem persists.',
                  source: 'tester_long',
                ),
              ),
              variant: _TesterButtonVariant.negative,
            ),
            _TesterButton(
              'Add warning',
              () => context.read<DSBannerCubit>().addBanner(
                const DSBanner.warning(
                  'Sample warning message.',
                  source: 'tester_warn',
                ),
              ),
              variant: _TesterButtonVariant.secondary,
            ),
            _TesterButton('Add multiple warnings (3)', () {
              final cubit = context.read<DSBannerCubit>();
              cubit.addBanner(
                const DSBanner.warning('Warning A', source: 'warn_a'),
              );
              cubit.addBanner(
                const DSBanner.warning('Warning B', source: 'warn_b'),
              );
              cubit.addBanner(
                const DSBanner.warning('Warning C', source: 'warn_c'),
              );
            }, variant: _TesterButtonVariant.secondary),
            DTButton.positive(
              label: 'Add Success',
              onPressed: () => context.read<DSBannerCubit>().addBanner(
                const DSBanner.success(
                  'Operation completed successfully.',
                  source: 'tester_success',
                ),
              ),
            ),
            DTButton.primary(
              label: 'Add Info',
              onPressed: () => context.read<DSBannerCubit>().addBanner(
                const DSBanner.info(
                  'Here is some useful information.',
                  source: 'tester_info',
                ),
              ),
            ),
            _TesterButton(
              'Clear all banners',
              () => context.read<DSBannerCubit>().clearBanners(),
              variant: _TesterButtonVariant.surface,
            ),
          ],
        ),

        _FieldSection(
          field: 'Notification',
          note: 'Notification + Badge',
          children: [
            _TesterButton('VuMeet msg', () {
              final badgeCubit = context.read<DSBadgeCubit>();
              badgeCubit.incrementBadgeCount(
                DSNotificationDestination.bell.key,
              );
              badgeCubit.incrementBadgeCount('vu_meet');
              _notify(
                context,
                title: 'Alice',
                body: 'Hey, are you free tomorrow?',
              );
            }, variant: _TesterButtonVariant.tertiary),
            _TesterButton('Desk notification', () {
              final badgeCubit = context.read<DSBadgeCubit>();
              badgeCubit.incrementBadgeCount(
                DSNotificationDestination.bell.key,
              );
              badgeCubit.incrementBadgeCount('desk');
              _notify(
                context,
                title: 'Desk',
                body: 'You have a new desk notification.',
              );
            }, variant: _TesterButtonVariant.tertiary),
            _TesterButton('General update', () {
              context.read<DSBadgeCubit>().incrementBadgeCount(
                DSNotificationDestination.bell.key,
              );
              _notify(
                context,
                title: 'System',
                body: 'A general update is available.',
              );
            }, variant: _TesterButtonVariant.tertiary),
            _TesterButton('Clear all', () {
              context.read<DSNotificationCubit>().clearNotificationList();
              context.read<DSNotificationCubit>().clearInbox();
              context.read<DSBadgeCubit>().clearAllBadgeCounts();
            }, variant: _TesterButtonVariant.surface),
          ],
        ),

        ...page.extraChildren,
        const SizedBox(height: 8),
      ],
    );
  }

  void _notify(
    BuildContext context, {
    required String title,
    required String body,
  }) {
    final notification = DSNotification(
      id: '${title.hashCode}_${DateTime.now().millisecondsSinceEpoch}',
      title: title,
      body: body,
    );
    final cubit = context.read<DSNotificationCubit>();
    cubit.addNotification(notification);
    cubit.addToInbox(notification);
  }
}

class _ScaffoldStateViewer extends StatelessWidget {
  const _ScaffoldStateViewer();

  @override
  Widget build(BuildContext context) {
    final loadingState = context.watch<DSLoadingCubit>().state;
    final bannerState = context.watch<DSBannerCubit>().state;
    final notificationState = context.watch<DSNotificationCubit>().state;
    final badgeState = context.watch<DSBadgeCubit>().state;
    final dt = CoporTheme.of(context);

    final requestSources = loadingState.loadingSources
        .where((s) => s.type == DSLoadingSourceType.request)
        .map((s) => s.key)
        .join(', ');
    final pageSources = loadingState.loadingSources
        .where((s) => s.type == DSLoadingSourceType.page)
        .map((s) => s.key)
        .join(', ');

    return Container(
      width: double.infinity,
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: dt.colors.surfaceContainer,
        border: Border.all(color: dt.colors.outline),
        borderRadius: BorderRadius.circular(coporBorderRadius),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text('Scaffold state', style: dt.text.columnHeader),
          const SizedBox(height: 12),
          _StateRow('isLoading', loadingState.isLoading.toString()),
          _StateRow(
            'loadingSources (req)',
            requestSources.isEmpty ? '—' : requestSources,
          ),
          _StateRow('isPageLoading', loadingState.isPageLoading.toString()),
          _StateRow(
            'loadingSources (page)',
            pageSources.isEmpty ? '—' : pageSources,
          ),
          _StateRow('banner', bannerState.banner?.type.name ?? '—'),
          _StateRow(
            'notificationList',
            notificationState.notificationList.isEmpty
                ? '—'
                : '${notificationState.notificationList.length} queued',
          ),
          _StateRow(
            'badgeCounts',
            badgeState.badgeCounts.isEmpty
                ? '—'
                : badgeState.badgeCounts.entries
                      .map((e) => '${e.key}: ${e.value}')
                      .join(', '),
          ),
        ],
      ),
    );
  }
}

class _StateRow extends StatelessWidget {
  final String label;
  final String value;

  const _StateRow(this.label, this.value);

  @override
  Widget build(BuildContext context) {
    final dt = CoporTheme.of(context);
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 2),
      child: Row(
        children: [
          SizedBox(
            width: 220,
            child: Text(
              label,
              style: dt.text.tableCell.copyWith(
                color: dt.colors.onSurfaceSubtle,
              ),
            ),
          ),
          Flexible(child: Text(value, style: dt.text.tableCell)),
        ],
      ),
    );
  }
}

class _FieldSection extends StatelessWidget {
  final String field;
  final String? note;
  final List<Widget> children;

  const _FieldSection({required this.field, required this.children, this.note});

  @override
  Widget build(BuildContext context) {
    final dt = CoporTheme.of(context);
    return Padding(
      padding: const EdgeInsets.only(bottom: 20),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Padding(
            padding: const EdgeInsets.only(bottom: 8),
            child: Row(
              children: [
                Text(field, style: dt.text.columnHeader),
                if (note != null) ...[
                  const SizedBox(width: 8),
                  Text(
                    note!,
                    style: dt.text.tableCell.copyWith(
                      color: dt.colors.onSurfaceSubtle,
                    ),
                  ),
                ],
              ],
            ),
          ),
          Wrap(spacing: 8, runSpacing: 8, children: children),
        ],
      ),
    );
  }
}

enum _TesterButtonVariant { surface, negative, secondary, tertiary }

class _TesterButton extends StatelessWidget {
  final String label;
  final VoidCallback onPressed;
  final _TesterButtonVariant variant;

  const _TesterButton(
    this.label,
    this.onPressed, {
    this.variant = _TesterButtonVariant.surface,
  });

  @override
  Widget build(BuildContext context) => switch (variant) {
    _TesterButtonVariant.surface => DTButton.surface(
      label: label,
      onPressed: onPressed,
    ),
    _TesterButtonVariant.negative => DTButton.negative(
      label: label,
      onPressed: onPressed,
    ),
    _TesterButtonVariant.secondary => DTButton.secondary(
      label: label,
      onPressed: onPressed,
    ),
    _TesterButtonVariant.tertiary => DTButton.tertiary(
      label: label,
      onPressed: onPressed,
    ),
  };
}

const _kTesterLanguages = [
  DTLanguageItem(code: 'en', name: 'English', flagCode: 'GB'),
  DTLanguageItem(code: 'sr', name: 'Srpski', flagCode: 'RS'),
  DTLanguageItem(code: 'de', name: 'Deutsch', flagCode: 'DE'),
];

class _TesterSettingsPanel extends StatefulWidget {
  final ValueChanged<bool>? onDarkModeChanged;

  const _TesterSettingsPanel({required this.onDarkModeChanged});

  @override
  State<_TesterSettingsPanel> createState() => _TesterSettingsPanelState();
}

class _TesterSettingsPanelState extends State<_TesterSettingsPanel> {
  DTLanguageItem _selectedLanguage = _kTesterLanguages.first;

  @override
  Widget build(BuildContext context) {
    final dt = CoporTheme.of(context);
    final isDark = Theme.of(context).brightness == Brightness.dark;

    return Padding(
      padding: const EdgeInsets.all(16),
      child: Column(
        mainAxisSize: MainAxisSize.min,
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text('Settings', style: dt.text.sectionTitle),
          const SizedBox(height: 16),
          Text('Theme', style: dt.text.columnHeader),
          const SizedBox(height: 4),
          DTSwitchInput(
            label: 'Dark mode',
            value: isDark,
            onChanged: widget.onDarkModeChanged ?? (_) {},
          ),
          const SizedBox(height: 16),
          Text('Language', style: dt.text.columnHeader),
          const SizedBox(height: 4),
          DTLanguageButton(
            items: _kTesterLanguages,
            selected: _selectedLanguage,
            onChanged: (item) => setState(() => _selectedLanguage = item),
            groupId: context.read<DSEndDrawerCubit>().endDrawerGroupId,
          ),
        ],
      ),
    );
  }
}
