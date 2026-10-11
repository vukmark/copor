import 'package:flutter/material.dart';
import '../badge/ds_badge_cubit.dart';
import '../banner/ds_banner.dart';
import '../banner/ds_banner_cubit.dart';
import '../drawer/ds_drawer_cubit.dart';
import '../end_drawer/ds_end_drawer_cubit.dart';
import '../loading/ds_loading_cubit.dart';
import '../loading/ds_loading_source.dart';
import '../notification/ds_notification.dart';
import '../notification/ds_notification_cubit.dart';
import 'ds_chrome_cubit.dart';

/// Imperative facade over the six scaffold cubits. Preserves the single
/// combined API the scaffold used to expose as one cubit, while each concern
/// underneath is a separately watchable/testable cubit.
class DSScaffoldController {
  const DSScaffoldController({
    required this.chromeCubit,
    required this.loadingCubit,
    required this.bannerCubit,
    required this.notificationCubit,
    required this.badgeCubit,
    required this.endDrawerCubit,
    required this.drawerCubit,
  });

  final DSChromeCubit chromeCubit;
  final DSLoadingCubit loadingCubit;
  final DSBannerCubit bannerCubit;
  final DSNotificationCubit notificationCubit;
  final DSBadgeCubit badgeCubit;
  final DSEndDrawerCubit endDrawerCubit;
  final DSDrawerCubit drawerCubit;

  // Loading
  void addLoadingSource(DSLoadingSource source) => loadingCubit.addLoadingSource(source);
  void addRequestLoading(String key) => loadingCubit.addRequestLoading(key);
  void addPageLoading(String key) => loadingCubit.addPageLoading(key);
  Future<void> removeLoadingSource(String key) => loadingCubit.removeLoadingSource(key);
  void clearLoadingSources() => loadingCubit.clearLoadingSources();

  // Banners
  void addBanner(DSBanner banner) => bannerCubit.addBanner(banner);
  void removeBanner() => bannerCubit.removeBanner();
  void clearBanners() => bannerCubit.clearBanners();
  void notifyRouteChanged(String route) => bannerCubit.notifyRouteChanged(route);

  // Notifications / inbox
  void addNotification(DSNotification notification) =>
      notificationCubit.addNotification(notification);
  void clearNotificationList() => notificationCubit.clearNotificationList();
  void addToInbox(DSNotification notification) => notificationCubit.addToInbox(notification);
  void removeFromInbox(String id) => notificationCubit.removeFromInbox(id);
  void removeInboxCluster(String id) {
    final removedCount = notificationCubit.state.inbox
        .where((notification) => notification.id == id)
        .length;
    if (removedCount == 0) return;

    notificationCubit.removeFromInbox(id);
    badgeCubit.decrementBadgeCount(DSNotificationDestination.bell.key, removedCount);
  }

  void clearInbox() => notificationCubit.clearInbox();

  // Badges
  void setBadgeCount(String destinationKey, int count) =>
      badgeCubit.setBadgeCount(destinationKey, count);
  void incrementBadgeCount(String destinationKey, [int by = 1]) =>
      badgeCubit.incrementBadgeCount(destinationKey, by);
  void decrementBadgeCount(String destinationKey, [int by = 1]) =>
      badgeCubit.decrementBadgeCount(destinationKey, by);
  void clearBadgeCount(String destinationKey) => badgeCubit.clearBadgeCount(destinationKey);
  void clearAllBadgeCounts() => badgeCubit.clearAllBadgeCounts();

  // End drawer
  void openEndDrawer() {
    if (endDrawerCubit.state.isEndDrawerOpen) return;
    endDrawerCubit.openDrawer();
  }

  void closeEndDrawer() => endDrawerCubit.closeDrawer();

  void toggleEndDrawer() =>
      endDrawerCubit.state.isEndDrawerOpen ? closeEndDrawer() : openEndDrawer();

  void showEndDrawerSection(String key) {
    final drawerState = endDrawerCubit.state;
    if (drawerState.isEndDrawerOpen && drawerState.endDrawerSelectedSectionKey == key) {
      closeEndDrawer();
      return;
    }
    endDrawerCubit.selectSection(key);
    openEndDrawer();
  }

  // Main drawer section (open/close is the real `Scaffold`'s own drawer
  // state — call `Scaffold.of(context).openDrawer()` separately).
  void selectDrawerSection(String key) => drawerCubit.selectSection(key);

  // Chrome slots
  void clearAppBar() => chromeCubit.clearAppBar();
  void clearDrawer() => chromeCubit.clearDrawer();
  void clearRail() => chromeCubit.clearRail();

  void clearEndDrawer() {
    chromeCubit.clearEndDrawer();
    endDrawerCubit.closeDrawer();
  }

  void clearBottomNavBar() => chromeCubit.clearBottomNavBar();
  void clearLeading() => chromeCubit.clearLeading();
  void clearTitle() => chromeCubit.clearTitle();
  void clearActions() => chromeCubit.clearActions();
  void clearFloatingActionButton() => chromeCubit.clearFloatingActionButton();

  void configureEmptyScaffold() => chromeCubit.configureEmptyScaffold();

  void configureScaffold({
    Widget? appBar,
    Widget? drawer,
    Widget? rail,
    Widget? endDrawer,
    bool isEmptyScaffold = false,
    Widget? bottomNavBar,
    Widget? leading,
    Widget? title,
    List<Widget>? actions,
    Widget? floatingActionButton,
  }) => chromeCubit.configureScaffold(
    appBar: appBar,
    drawer: drawer,
    rail: rail,
    endDrawer: endDrawer,
    isEmptyScaffold: isEmptyScaffold,
    bottomNavBar: bottomNavBar,
    leading: leading,
    title: title,
    actions: actions,
    floatingActionButton: floatingActionButton,
  );

  void updateAppBar({
    Widget? appBar,
    Widget? drawer,
    Widget? rail,
    Widget? endDrawer,
    Widget? bottomNavBar,
    Widget? leading,
    Widget? title,
    List<Widget>? actions,
    Widget? floatingActionButton,
    Set<DSLoadingSource>? loadingSources,
    DSBanner? banner,
  }) {
    chromeCubit.updateChrome(
      appBar: appBar,
      drawer: drawer,
      rail: rail,
      endDrawer: endDrawer,
      bottomNavBar: bottomNavBar,
      leading: leading,
      title: title,
      actions: actions,
      floatingActionButton: floatingActionButton,
    );
    if (loadingSources != null) {
      loadingCubit.replaceLoadingSources(loadingSources);
    }
    if (banner != null) bannerCubit.addBanner(banner);
  }

  // Cross-cutting resets
  void resetScaffold() {
    chromeCubit.reset();
    loadingCubit.clearLoadingSources();
    bannerCubit.clearBanners();
    notificationCubit.clearNotificationList();
    notificationCubit.clearInbox();
    badgeCubit.clearAllBadgeCounts();
    endDrawerCubit.reset();
    drawerCubit.reset();
  }

  void resetRuntimeState() {
    loadingCubit.clearLoadingSources();
    notificationCubit.clearNotificationList();
    notificationCubit.clearInbox();
    badgeCubit.clearAllBadgeCounts();
    bannerCubit.clearBanners();
  }
}
