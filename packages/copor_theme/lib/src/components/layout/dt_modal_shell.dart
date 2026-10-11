import 'package:copor_theme/src/components/display/dt_ring_loader.dart';
import 'package:copor_theme/src/theme/extensions/copor_colors.dart';
import 'package:copor_theme/src/theme/tokens/spacing.dart';
import 'package:copor_theme/src/utils/escape_dismiss_registry.dart';
import 'package:flutter/material.dart';

const double kDTModalDefaultHeight = 600.0;

/// Standard outer shell for modal pages and dialogs.
///
/// **Desktop**: a centered floating card with a fixed [desktopHeight], scrim
/// background, rounded corners, and drop shadow — matching `DSPageWrapper.floating`
/// (in `copor_scaffold`) with `isModal: true`.
///
/// **Mobile**: full-screen surface fill with top SafeArea, no app-bar chrome.
///
/// In both cases [builder] receives a finite height constraint, so
/// [FloatingContainerLayout] with [FloatingContainerActionPosition.bottom]
/// can pin its action row to the bottom.
///
/// Pass [isLoading] while initial data is being fetched — a centered
/// [DTRingLoader] is shown instead of the built content at the same dimensions.
/// [builder] is only called when [isLoading] is false, so callers can safely
/// access ensured-data inside it without guarding.
class DTModalShell extends StatelessWidget {
  final bool isMobile;
  final WidgetBuilder builder;
  final bool isLoading;
  final double desktopHeight;
  final bool dismissOnScrimTap;
  final VoidCallback? onDismiss;

  const DTModalShell({
    super.key,
    required this.isMobile,
    required this.builder,
    this.isLoading = false,
    this.desktopHeight = kDTModalDefaultHeight,
    this.dismissOnScrimTap = true,
    this.onDismiss,
  });

  static Future<T?> show<T>(
    BuildContext context, {
    required bool isMobile,
    required WidgetBuilder builder,
    bool isLoading = false,
    double desktopHeight = kDTModalDefaultHeight,
    bool dismissOnScrimTap = true,
    VoidCallback? onDismiss,
  }) {
    return showGeneralDialog<T>(
      context: context,
      useRootNavigator: true,
      barrierDismissible: dismissOnScrimTap,
      barrierColor: coporBarrierColor(context),
      barrierLabel: '',
      transitionDuration: const Duration(milliseconds: 200),
      transitionBuilder: (_, animation, __, child) =>
          FadeTransition(opacity: animation, child: child),
      pageBuilder: (_, __, ___) => DTModalShell(
        isMobile: isMobile,
        builder: builder,
        isLoading: isLoading,
        desktopHeight: desktopHeight,
        dismissOnScrimTap: dismissOnScrimTap,
        onDismiss: onDismiss,
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    final content = isMobile ? _buildMobile(context) : _buildDesktop(context);
    if (!dismissOnScrimTap) return content;

    return EscapeDismissable(
      onDismiss: onDismiss ?? () => Navigator.of(context, rootNavigator: true).maybePop(),
      child: Focus(autofocus: true, child: content),
    );
  }

  Widget _buildMobile(BuildContext context) {
    return SafeArea(
      top: true,
      bottom: false,
      child: Material(
        color: CoporColors.of(context).surface,
        child: SizedBox.expand(
          child: Padding(
            padding: coporFloatingFormPadding.copyWith(
              bottom:
                  coporFloatingFormPadding.bottom +
                  MediaQuery.viewInsetsOf(context).bottom,
            ),
            child: isLoading
                ? const Center(child: DTRingLoader())
                : builder(context),
          ),
        ),
      ),
    );
  }

  Widget _buildDesktop(BuildContext context) {
    final colors = CoporColors.of(context);
    return Stack(
      children: [
        if (dismissOnScrimTap)
          Positioned.fill(
            child: GestureDetector(
              behavior: HitTestBehavior.translucent,
              onTap:
                  onDismiss ??
                  () => Navigator.of(context, rootNavigator: true).maybePop(),
            ),
          ),
        SafeArea(
          top: true,
          bottom: false,
          child: Padding(
            padding: coporPageMargins,
            child: Center(
              child: Container(
                margin: const EdgeInsets.only(bottom: coporPageBottomMargin),
                constraints: const BoxConstraints(
                  maxWidth: coporCompactContentWidth,
                ),
                decoration: BoxDecoration(
                  color: colors.surface,
                  border: Border.all(color: colors.outlineSubtle),
                  borderRadius: const BorderRadius.all(
                    Radius.circular(coporBorderRadius),
                  ),
                  boxShadow: coporDropShadow(context),
                ),
                child: ClipRRect(
                  borderRadius: const BorderRadius.all(
                    Radius.circular(coporBorderRadius),
                  ),
                  child: Material(
                    color: Colors.transparent,
                    child: Padding(
                      padding: coporFloatingFormPadding,
                      child: SizedBox(
                        height: desktopHeight,
                        child: isLoading
                            ? const Center(child: DTRingLoader())
                            : builder(context),
                      ),
                    ),
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
