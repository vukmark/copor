import 'package:copor_core/src/bloc/global_blocs/navigation_bloc/navigation_bloc.dart';
import 'package:copor_core/src/utils/typedef.dart';
import 'package:copor_theme/copor_theme.dart';
import 'package:copor_core/src/bloc/global_blocs/translation_bloc/translation_bloc.dart';
import 'package:copor_core/src/bloc/utils/bloc_context_extensions.dart';
import 'package:copor_core/src/bloc/utils/bloc_event_dispatcher.dart';
import 'package:copor_core/src/bloc/utils/bloc_state_conditions.dart';
import 'package:copor_core/src/config/dependency_injection.dart';
import 'package:copor_core/src/config/dispatcher.dart';
import 'package:copor_core/src/config/router/routes.dart';
import 'package:copor_core/src/data/model/translation/common_translation.dart';
import 'package:copor_core/src/components/scaffold/drawer/menu_icons.dart';
import 'package:copor_core/src/core/module/copor_module.dart';
import 'package:copor_core/src/core/module/app_modules.dart';
import 'package:copor_core/src/modules/administration/feature_flags/bloc/menu/menu_bloc.dart';
import 'package:copor_core/src/modules/administration/feature_flags/data/model/feature_model.dart';
import 'package:copor_scaffold/copor_scaffold.dart';
import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_hooks/flutter_hooks.dart';
import 'package:copor_core/src/components/app_logo.dart';
import 'package:url_launcher/url_launcher.dart';

const _kHeaderPaddingH = 16.0;
const _kHeaderPaddingV = 10.0;
const _kAvatarRadius = 26.0;
const _kLogoHeight = 14.0;
const _kLogoWidth = 38.0;

class AppMenuDrawer extends StatelessWidget {
  const AppMenuDrawer({super.key});

  @override
  Widget build(BuildContext context) {
    return DTMenuDrawer(
      header: const AppDrawerHeader(),
      content: const AppDrawerNavigation(),
      footer: const AppDrawerFooter(),
    );
  }
}

// ─── Header ───────────────────────────────────────────────────────────────────

class AppDrawerHeader extends HookWidget {
  final bool closeOnNavigate;

  const AppDrawerHeader({super.key, this.closeOnNavigate = true});

  @override
  Widget build(BuildContext context) {
    final translationState = context.watch<TranslationBloc<CommonTranslation>>().state;
    final accountInfoState = context.watchState.accountInfo;
    final isHovered = useState(false);

    if (translationState.isInitial ||
        translationState.isLoading ||
        accountInfoState.isInitial ||
        accountInfoState.isLoading) {
      return const AppDrawerHeaderPlaceholder();
    }

    final translation = translationState.ensuredData;
    final accountInfo = accountInfoState.ensuredData;
    final dt = CoporTheme.of(context);
    final fullName = '${accountInfo.firstName} ${accountInfo.lastName}';

    void onTap() {
      if (closeOnNavigate && Scaffold.of(context).isDrawerOpen) Scaffold.of(context).closeDrawer();
      goToPage(AppRoutes.myAccount);
    }

    return InkWell(
      onTap: onTap,
      onHover: (value) => isHovered.value = value,
      mouseCursor: SystemMouseCursors.click,
      hoverColor: CoporColors.of(context).primary.withValues(alpha: 0.06),
      borderRadius: BorderRadius.all(radius),
      child: Padding(
        padding: const EdgeInsets.symmetric(
          horizontal: _kHeaderPaddingH,
          vertical: _kHeaderPaddingV,
        ),
        child: Row(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            DTAvatar(
              userFullName: fullName,
              picture: accountInfo.picture ?? '',
              radius: _kAvatarRadius,
              hovered: isHovered.value,
            ),
            const SizedBox(width: 14),
            Flexible(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  const SizedBox(height: 6),
                  Row(
                    children: [
                      Text(translation.WELCOME_TO, style: dt.text.bodySecondary),
                      const SizedBox(width: 4),
                      Padding(
                        padding: const EdgeInsets.only(top: 2),
                        child: const AppLogoSvg(
                          height: _kLogoHeight,
                          width: _kLogoWidth,
                        ),
                      ),
                    ],
                  ),
                  const SizedBox(height: 3),
                  Text(
                    fullName,
                    style: dt.text.sectionTitle,
                    overflow: TextOverflow.ellipsis,
                    maxLines: 1,
                  ),

                  if (accountInfo.roleType == UserRole.admin.roleName) ...[
                    const SizedBox(height: 5),
                    Text('Admin', style: dt.text.bodySecondary),
                  ],
                  if (accountInfo.specialRoles != null && accountInfo.specialRoles!.isNotEmpty) ...[
                    const SizedBox(height: 5),
                    Text(accountInfo.specialRoles!.join('\n'), style: dt.text.bodySecondary),
                  ],
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}

class AppDrawerHeaderPlaceholder extends StatelessWidget {
  const AppDrawerHeaderPlaceholder({super.key});

  @override
  Widget build(BuildContext context) {
    final dt = CoporTheme.of(context);

    return Visibility(
      visible: false,
      maintainAnimation: true,
      maintainSize: true,
      maintainState: true,
      child: Padding(
        padding: const EdgeInsets.symmetric(
          horizontal: _kHeaderPaddingH,
          vertical: _kHeaderPaddingV,
        ),
        child: Row(
          children: [
            const DTAvatar(userFullName: 'Firstname Lastname', picture: '', radius: _kAvatarRadius),
            const SizedBox(width: 14),
            Flexible(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  const SizedBox(height: 6),
                  Row(
                    children: [
                      Text('Welcome to', style: dt.text.bodySecondary),
                      const SizedBox(width: 4),
                      Padding(
                        padding: const EdgeInsets.only(top: 2),
                        child: const AppLogoSvg(
                          height: _kLogoHeight,
                          width: _kLogoWidth,
                        ),
                      ),
                    ],
                  ),
                  const SizedBox(height: 3),
                  Text(
                    'Firstname Lastname',
                    style: dt.text.sectionTitle,
                    overflow: TextOverflow.ellipsis,
                    maxLines: 1,
                  ),
                  const SizedBox(height: 5),
                  Text('Super Admin', style: dt.text.bodySecondary),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}

// ─── Navigation ───────────────────────────────────────────────────────────────

/// True if [item] or any of its descendants is the currently selected route.
/// The bottom-nav entry for a menu [route] — modules attach their badge dot
/// and on-open action there, and the drawer honours them too.
ModuleNavEntry? _navEntryFor(String route) =>
    AppRoutes.bottomNavBarItems.where((entry) => entry.route == route).firstOrNull;

bool _groupContainsSelectedRoute(MenuItemModel item, String selectedRoute) {
  if (item.route != null && selectedRoute.startsWith(item.route!)) return true;
  return item.children.any((child) => _groupContainsSelectedRoute(child, selectedRoute));
}

String? _findSelectedMenuRoute(List<MenuItemModel> items, String selectedRoute) {
  for (final item in items) {
    final childRoute = _findSelectedMenuRoute(item.children, selectedRoute);
    if (childRoute != null) return childRoute;

    if (item.route != null && selectedRoute.startsWith(item.route!)) return item.route;
  }

  return null;
}

bool _shouldKeepSelectedMenuRoute(String route) {
  return route.startsWith('/profile/') || route.startsWith('/administration/');
}

class AppDrawerNavigation extends HookWidget {
  final bool closeOnNavigate;

  const AppDrawerNavigation({super.key, this.closeOnNavigate = true});

  @override
  Widget build(BuildContext context) {
    final menuState = context.watch<MenuBloc>().state;
    final selectedRoute = context.watchState.navigation.selectedRoute;
    // Groups the user has explicitly expanded/collapsed by hand, keyed by
    // label — overrides the "auto-expand the group holding the selected
    // route" default so a manual toggle sticks even if it disagrees with
    // the current route.
    final manuallyToggled = useState<Map<String, bool>>({});
    final lastSelectedMenuRoute = useRef<String?>(null);
    final badges = context.select<DSBadgeCubit, Map<String, int>>((cubit) => cubit.state.badgeCounts);
    final isLoading = BlocStateConditions.hasInitialStates([menuState]);
    final translationState = context.watch<TranslationBloc<CommonTranslation>>().state;
    final translation = translationState.isInitial || translationState.isLoading
        ? null
        : translationState.ensuredData;

    if (isLoading) return const SizedBox.shrink();

    final menuList = menuState.ensuredData.menuList;
    final matchedMenuRoute = _findSelectedMenuRoute(menuList, selectedRoute);
    if (matchedMenuRoute != null) lastSelectedMenuRoute.value = matchedMenuRoute;
    final effectiveSelectedRoute =
        matchedMenuRoute == null && _shouldKeepSelectedMenuRoute(selectedRoute)
        ? lastSelectedMenuRoute.value ?? selectedRoute
        : selectedRoute;

    void closeAndGo(String route, {bool? isExternalLink}) {
      if (isExternalLink == true) {
        final Uri urlRoute = Uri.parse(route);
        launchUrl(urlRoute);
        if (Scaffold.of(context).isDrawerOpen) Scaffold.of(context).closeDrawer();
        return;
      }

      _navEntryFor(route)?.onOpen?.call();
      if (closeOnNavigate && Scaffold.of(context).isDrawerOpen) Scaffold.of(context).closeDrawer();
      goToPage(route);
    }

    DTListTile buildItem(MenuItemModel item) {
      if (item.children.isNotEmpty) {
        // Auto-expand the group holding the current page in addition to
        // whatever the user has manually opened by hand.
        final isOpen =
            _groupContainsSelectedRoute(item, effectiveSelectedRoute) ||
            (manuallyToggled.value[item.label] ?? false);

        return DTListTile.expandable(
          icon: menuIcon(item.icon),
          label: item.label,
          border: false,
          isExpanded: isOpen,
          onExpandedChanged: (open) =>
              manuallyToggled.value = {...manuallyToggled.value, item.label: open},
          children: item.children.map(buildItem).toList(),
        );
      }

      final route = item.route;
      final navEntry = route == null ? null : _navEntryFor(route);
      final showNotificationDot =
          navEntry != null &&
          navEntry.showNotificationDot &&
          (badges[navEntry.badgeKey] ?? 0) > 0;

      return DTListTile.toggle(
        icon: menuIcon(item.icon),
        label: item.label,
        trailing: showNotificationDot ? const _DrawerNotificationDot() : null,
        border: false,
        isToggled: route != null && effectiveSelectedRoute.startsWith(route),
        onPressed: route != null
            ? () => closeAndGo(route, isExternalLink: item.isExternalLink)
            : () {},
      );
    }

    final items = <Widget>[
      ...menuList.map(buildItem),
      if (kDebugMode) ...[
        DTListTile.expandable(
          icon: PhosphorIconsThin.bug,
          label: 'Dev',
          border: false,
          children: [
            if (translation != null)
              for (final module in AppModules.enabled)
                for (final link in module.devMenuLinks)
                  DTListTile.toggle(
                    icon: link.icon,
                    label: link.labelBuilder(translation),
                    border: false,
                    isToggled: selectedRoute == link.route,
                    onPressed: () => closeAndGo(link.route),
                  ),
            DTListTile.toggle(
              icon: PhosphorIconsThin.palette,
              label: 'DT Showcase',
              border: false,
              isToggled: selectedRoute == AppRoutes.dtShowcase,
              onPressed: () => closeAndGo(AppRoutes.dtShowcase),
            ),
            DTListTile.toggle(
              icon: PhosphorIconsThin.squaresFour,
              label: 'Scaffold Tester',
              border: false,
              isToggled: selectedRoute == AppRoutes.scaffoldTester,
              onPressed: () => closeAndGo(AppRoutes.scaffoldTester),
            ),
          ],
        ),
      ],
    ];

    return ListView(children: items);
  }
}

// ─── Footer ───────────────────────────────────────────────────────────────────

class AppDrawerFooter extends StatelessWidget {
  final bool closeOnNavigate;

  const AppDrawerFooter({super.key, this.closeOnNavigate = true});

  @override
  Widget build(BuildContext context) {
    final translationState = context.watch<TranslationBloc<CommonTranslation>>().state;
    // `Visibility(maintainSize: true)`, not `SizedBox.shrink()` — reserves
    // the same footer height while translations load, matching
    // `AppDrawerHeaderPlaceholder` above. Collapsing to zero height here
    // (unlike the header) left no room for the divider above it, so About/
    // Logout popped in and shifted the whole rail/drawer layout once
    // translations finished loading.
    if (translationState.isInitial || translationState.isLoading) {
      return const AppDrawerFooterPlaceholder();
    }

    final translation = translationState.ensuredData;

    return Row(
      mainAxisAlignment: MainAxisAlignment.spaceBetween,
      children: [
        for (final module in AppModules.enabled)
          for (final link in module.drawerFooterLinks)
            DTButton.surface(
              icon: link.icon,
              label: link.labelBuilder(translation),
              onPressed: () {
                if (closeOnNavigate && Scaffold.of(context).isDrawerOpen) {
                  Scaffold.of(context).closeDrawer();
                }
                goToPage(link.route);
              },
            ),
        DTButton.surface(
          icon: PhosphorIconsThin.signOut,
          label: translation.LOGOUT,
          onPressed: () {
            if (closeOnNavigate) Scaffold.of(context).closeDrawer();
            getIt<Dispatcher>().go(AppRoutes.login);
            BlocEventDispatcher.authorization.logout(
              context.getBloc.authorization,
              context.getBloc.accountInfo,
              context.getBloc.webSocket,
            );
          },
        ),
      ],
    );
  }
}

class _DrawerNotificationDot extends StatelessWidget {
  const _DrawerNotificationDot();

  @override
  Widget build(BuildContext context) {
    return Container(
      width: 8,
      height: 8,
      decoration: BoxDecoration(color: CoporColors.of(context).primary, shape: BoxShape.circle),
    );
  }
}

class AppDrawerFooterPlaceholder extends StatelessWidget {
  const AppDrawerFooterPlaceholder({super.key});

  @override
  Widget build(BuildContext context) {
    return Visibility(
      visible: false,
      maintainAnimation: true,
      maintainSize: true,
      maintainState: true,
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          DTButton.primary(icon: PhosphorIconsThin.info, label: 'About', onPressed: () {}),
          DTButton.surface(
            icon: PhosphorIconsThin.signOut,
            label: 'Logout',
            onPressed: () {},
          ),
        ],
      ),
    );
  }
}
