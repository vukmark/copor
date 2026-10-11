import 'package:copor_theme/copor_theme.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import '../banner/ds_banner_overlay.dart';
import '../end_drawer/ds_end_drawer_cubit.dart';
import '../end_drawer/ds_end_drawer_sync.dart';
import '../end_drawer/ds_end_drawer_transition.dart';
import '../loading/ds_loading_cubit.dart';
import '../loading/ds_loading_overlays.dart';
import '../loading/ds_loading_state.dart';
import '../model/ds_scaffold_config.dart';
import '../notification/ds_notification_queue.dart';
import 'ds_chrome_card.dart';
import 'ds_chrome_cubit.dart';
import 'ds_chrome_state.dart';
import 'ds_floating_content_bounds.dart';

class _SizedAppBar extends StatelessWidget implements PreferredSizeWidget {
  final Widget child;
  final double height;
  const _SizedAppBar(this.child, {required this.height});

  @override
  Widget build(BuildContext context) => child;

  @override
  Size get preferredSize => Size.fromHeight(height);
}

class DSScaffold extends StatelessWidget {
  final Widget child;
  final DSScaffoldConfig config;

  const DSScaffold({
    super.key,
    required this.child,
    this.config = const DSScaffoldConfig(),
  });

  @override
  Widget build(BuildContext context) {
    final backgroundColor = CoporTheme.of(context).colors.surfaceBackground;
    final backgroundBrightness = ThemeData.estimateBrightnessForColor(
      backgroundColor,
    );
    final foregroundBrightness = backgroundBrightness == Brightness.dark
        ? Brightness.light
        : Brightness.dark;

    return AnnotatedRegion<SystemUiOverlayStyle>(
      value: SystemUiOverlayStyle(
        statusBarColor: Colors.transparent,
        statusBarIconBrightness: foregroundBrightness,
        statusBarBrightness: backgroundBrightness,
        systemNavigationBarColor: backgroundColor,
        systemNavigationBarIconBrightness: foregroundBrightness,
      ),
      child: ColoredBox(
        color: backgroundColor,
        child: Overlay.wrap(
          clipBehavior: Clip.none,
          child: Builder(builder: _buildAdaptiveLayout),
        ),
      ),
    );
  }

  Widget _buildLoadingCard(BuildContext context, DSLoadingState loadingState) {
    return DSChromeCard(
      child: Stack(
        clipBehavior: Clip.none,
        children: [
          child,
          DSLoadingOverlays(
            isPageLoading: loadingState.isPageLoading,
            isLoading: loadingState.isLoading,
            showDebugOverlay: config.showLoadingDebugOverlay,
            loadingSources: loadingState.loadingSources,
          ),
        ],
      ),
    );
  }

  Widget _buildFloatingOverlayLayer(
    BuildContext context,
    DSChromeState chromeState, {
    Widget? endDrawerPopover,
    bool mobileFabPlacement = false,
    bool constrainBannerWidth = false,
  }) {
    final fab = chromeState.floatingActionButton;
    final banner = DSBannerOverlay(config: config);
    return DSFloatingContentBounds(
      margin: coporPageBottomMargin,
      child: Stack(
        clipBehavior: Clip.none,
        children: [
          const DSNotificationQueue(),
          if (fab != null)
            mobileFabPlacement
                ? Positioned(bottom: 16, right: 16, child: fab)
                : Align(alignment: AlignmentGeometry.bottomEnd, child: fab),
          if (constrainBannerWidth)
            Padding(
              padding: EdgeInsets.all(coporDesktopEdgeMargin),
              child: Center(
                child: ConstrainedBox(
                  constraints: const BoxConstraints(
                    maxWidth: coporMaxContentWidth,
                  ),
                  child: banner,
                ),
              ),
            )
          else
            banner,
          if (endDrawerPopover != null) endDrawerPopover,
        ],
      ),
    );
  }

  Widget _buildEndDrawerCard(BuildContext context, Widget endDrawer) {
    final cubit = context.read<DSEndDrawerCubit>();
    return TapRegion(
      groupId: cubit.endDrawerGroupId,
      onTapOutside: (_) => cubit.closeDrawer(),
      child: DSChromeCard(
        child: ConstrainedBox(
          constraints: const BoxConstraints(maxWidth: 340),
          child: endDrawer,
        ),
      ),
    );
  }

  Widget _buildEndDrawerAlignedPopover(
    BuildContext context,
    Widget? endDrawer,
    bool isOpen,
  ) {
    if (endDrawer == null) return const SizedBox.shrink();
    // Pinned top-to-bottom (not `Align`, which only shrink-wraps to the
    // child's intrinsic height) so content inside gets the full height of
    // the floating content window — already inset by the chrome padding,
    // since this sits inside `DSFloatingContentBounds`'s padded `Stack` —
    // to expand into, the same way `Drawer` already gives full screen
    // height on mobile.
    return Positioned(
      top: 0,
      right: 0,
      bottom: 0,
      child: DSEndDrawerTransition(
        isOpen: isOpen,
        child: _buildEndDrawerCard(context, endDrawer),
      ),
    );
  }

  Widget _buildAdaptiveLayout(BuildContext context) {
    final chromeState = context.watch<DSChromeCubit>().state;
    final width = MediaQuery.sizeOf(context).width;

    if (width < kMobileBreakpoint) return _buildMobile(context);
    if (chromeState.isEmptyScaffold) {
      return _buildEmptyScaffoldLayout(context, chromeState);
    }

    final rail = chromeState.rail;
    if (width >= kTabletBreakpoint && rail != null) {
      return _buildDesktop(context, rail);
    }
    return _buildTablet(context);
  }

  Widget _buildDesktop(BuildContext context, Widget rail) {
    return ColoredBox(
      color: CoporTheme.of(context).colors.surfaceBackground,
      child: Center(
        child: Padding(
          padding: EdgeInsets.all(coporDesktopEdgeMargin),
          child: Row(
            mainAxisSize: MainAxisSize.min,
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              DSChromeCard(child: rail),
              const SizedBox(width: coporDesktopChromeGap),
              SizedBox(
                width: coporMaxContentWidth,
                child: _buildDesktopScaffold(context),
              ),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildDesktopScaffold(BuildContext context) {
    final chromeState = context.watch<DSChromeCubit>().state;
    final loadingState = context.watch<DSLoadingCubit>().state;
    final isEndDrawerOpen =
        context.watch<DSEndDrawerCubit>().state.isEndDrawerOpen;
    final dt = CoporTheme.of(context);

    return SafeArea(
      child: DTChromeMetrics(
        appBarContentHeight: config.desktopAppBarHeight,
        bottomNavBarContentHeight: config.desktopBottomNavBarHeight,
        child: Scaffold(
          backgroundColor: dt.colors.surfaceBackground,
          drawer: chromeState.drawer,
          body: _buildRegularBody(
            context,
            chromeState,
            loadingState,
            wrapInMaxWidthContainer: false,
            endDrawerPopover: _buildEndDrawerAlignedPopover(
              context,
              chromeState.endDrawer,
              isEndDrawerOpen,
            ),
          ),
        ),
      ),
    );
  }

  Widget _buildRegularBody(
    BuildContext context,
    DSChromeState chromeState,
    DSLoadingState loadingState, {
    required bool wrapInMaxWidthContainer,
    Widget? endDrawerPopover,
  }) {
    final body = Column(
      crossAxisAlignment: CrossAxisAlignment.stretch,
      children: [
        if (chromeState.appBar != null) ...[
          SizedBox(
            height: config.desktopAppBarHeight,
            child: chromeState.appBar,
          ),
          const SizedBox(height: coporDesktopChromeGap),
        ],
        Expanded(
          child: Stack(
            clipBehavior: Clip.none,
            children: [
              _buildLoadingCard(context, loadingState),
              _buildFloatingOverlayLayer(
                context,
                chromeState,
                endDrawerPopover: endDrawerPopover,
              ),
            ],
          ),
        ),
        if (chromeState.bottomNavBar != null) ...[
          const SizedBox(height: coporDesktopChromeGap),
          DSChromeCard(child: chromeState.bottomNavBar!),
        ],
      ],
    );

    if (!wrapInMaxWidthContainer) return body;

    return Center(
      child: Padding(
        padding: const EdgeInsets.all(coporDesktopEdgeMargin),
        child: SizedBox(width: coporMaxContentWidth, child: body),
      ),
    );
  }

  Widget _buildTablet(BuildContext context) {
    final chromeState = context.watch<DSChromeCubit>().state;
    final loadingState = context.watch<DSLoadingCubit>().state;
    final dt = CoporTheme.of(context);

    return SafeArea(
      child: DTChromeMetrics(
        appBarContentHeight: config.desktopAppBarHeight,
        bottomNavBarContentHeight: config.desktopBottomNavBarHeight,
        child: DSEndDrawerSync(
          builder: (context, scaffoldKey) => Scaffold(
            key: scaffoldKey,
            backgroundColor: dt.colors.surfaceBackground,
            drawer: chromeState.drawer,
            endDrawer: _buildEndDrawerPanel(context, chromeState.endDrawer),
            onEndDrawerChanged: (isOpen) =>
                _handleEndDrawerChanged(context, isOpen),
            body: _buildRegularBody(
              context,
              chromeState,
              loadingState,
              wrapInMaxWidthContainer: true,
            ),
          ),
        ),
      ),
    );
  }

  Widget? _buildEndDrawerPanel(BuildContext context, Widget? endDrawer) {
    if (endDrawer == null) return null;
    final dt = CoporTheme.of(context);
    return Drawer(
      width: 340,
      backgroundColor: dt.colors.surface,
      shadowColor: Colors.transparent,
      elevation: 0,
      shape: const RoundedRectangleBorder(
        borderRadius: BorderRadius.only(topLeft: radius, bottomLeft: radius),
      ),
      child: endDrawer,
    );
  }

  void _handleEndDrawerChanged(BuildContext context, bool isOpen) {
    if (!isOpen) {
      context.read<DSEndDrawerCubit>().closeDrawer();
    }
  }

  Widget _buildEmptyScaffoldLayout(
    BuildContext context,
    DSChromeState chromeState,
  ) {
    final dt = CoporTheme.of(context);
    final isEndDrawerOpen =
        context.watch<DSEndDrawerCubit>().state.isEndDrawerOpen;
    return SafeArea(
      child: DTChromeMetrics(
        appBarContentHeight: config.desktopAppBarHeight,
        bottomNavBarContentHeight: config.desktopBottomNavBarHeight,
        child: Scaffold(
          backgroundColor: dt.colors.surfaceBackground,
          body: Stack(
            clipBehavior: Clip.none,
            children: [
              Padding(
                padding: EdgeInsets.all(coporDesktopEdgeMargin),
                child: child,
              ),
              _buildFloatingOverlayLayer(
                context,
                chromeState,
                constrainBannerWidth: true,
                endDrawerPopover: _buildEndDrawerAlignedPopover(
                  context,
                  chromeState.endDrawer,
                  isEndDrawerOpen,
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildMobile(BuildContext context) {
    return GestureDetector(
      behavior: HitTestBehavior.translucent,
      onTap: () => FocusManager.instance.primaryFocus?.unfocus(),
      child: _buildMobileScaffold(context),
    );
  }

  Widget _buildMobileScaffold(BuildContext context) {
    final chromeState = context.watch<DSChromeCubit>().state;
    final loadingState = context.watch<DSLoadingCubit>().state;
    final dt = CoporTheme.of(context);
    final mq = MediaQuery.of(context);

    final appBar = chromeState.isEmptyScaffold
        ? null
        : _SizedAppBar(
            chromeState.appBar ?? const SizedBox.shrink(),
            height: config.mobileAppBarHeight,
          );
    final appBarHeight = appBar?.preferredSize.height ?? 0;

    return SafeArea(
      bottom: chromeState.bottomNavBar == null,
      child: DTChromeMetrics(
        appBarContentHeight: config.mobileAppBarHeight,
        bottomNavBarContentHeight: config.mobileBottomNavBarHeight,
        child: DSEndDrawerSync(
          builder: (context, scaffoldKey) => Scaffold(
            key: scaffoldKey,
            backgroundColor: dt.colors.surfaceBackground,
            extendBodyBehindAppBar: false,
            appBar: appBar,
            drawer: chromeState.drawer ?? const SizedBox.shrink(),
            endDrawer: _buildEndDrawerPanel(context, chromeState.endDrawer),
            onEndDrawerChanged: (isOpen) =>
                _handleEndDrawerChanged(context, isOpen),
            bottomNavigationBar: chromeState.bottomNavBar == null
                ? null
                : SafeArea(top: false, child: chromeState.bottomNavBar!),
            body: Stack(
              clipBehavior: Clip.none,
              children: [
                MediaQuery(
                  data: mq.copyWith(
                    padding: mq.padding.copyWith(top: appBarHeight),
                  ),
                  child: child,
                ),
                DSLoadingOverlays(
                  isPageLoading: loadingState.isPageLoading,
                  isLoading: loadingState.isLoading,
                  showDebugOverlay: config.showLoadingDebugOverlay,
                  loadingSources: loadingState.loadingSources,
                ),
                _buildFloatingOverlayLayer(
                  context,
                  chromeState,
                  mobileFabPlacement: true,
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
