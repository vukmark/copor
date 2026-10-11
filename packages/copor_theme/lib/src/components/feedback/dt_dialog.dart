import 'package:copor_theme/src/components/buttons/dt_action_footer.dart';
import 'package:copor_theme/src/theme/extensions/copor_colors.dart';
import 'package:copor_theme/src/theme/extensions/copor_text_theme.dart';
import 'package:copor_theme/src/theme/tokens/spacing.dart';
import 'package:copor_theme/src/utils/escape_dismiss_registry.dart';
import 'package:flutter/material.dart';

/// A standardised DT dialog card with optional footer.
///
/// Use [DTDialog.show] to present it. Use [DTDialog] directly only when you
/// need to embed the card in a custom [showDialog] call (e.g. with extra
/// [BlocProvider]s).
///
/// Pass [footerBuilder] to add an action row below a divider. The callback
/// receives the card's border radius so the footer can round its own bottom
/// corners to match — pass that value to [DTActionFooter]'s `bottomRadius`
/// and set `safeArea: false`.
class DTDialog extends StatelessWidget {
  final Widget child;
  final Widget Function(double borderRadius)? footerBuilder;
  final double maxWidth;

  /// Whether Escape should close this dialog. Mirrors the `barrierDismissible`
  /// value passed to [showDialog] so keyboard and pointer dismissal stay consistent.
  final bool dismissible;

  const DTDialog({
    super.key,
    required this.child,
    this.footerBuilder,
    this.maxWidth = coporCompactContentWidth,
    this.dismissible = true,
  });

  static Future<T?> show<T>(
    BuildContext context, {
    required Widget Function(BuildContext ctx) builder,
    Widget Function(double borderRadius)? footerBuilder,
    double maxWidth = coporCompactContentWidth,
    bool barrierDismissible = false,
  }) {
    return showDialog<T>(
      context: context,
      barrierDismissible: barrierDismissible,
      barrierColor: coporBarrierColor(context),
      builder: (ctx) => DTDialog(
        maxWidth: maxWidth,
        footerBuilder: footerBuilder,
        dismissible: barrierDismissible,
        child: builder(ctx),
      ),
    );
  }

  /// Generic confirmation dialog. All strings are required — the DT module is
  /// UI-only and has no access to app translations.
  static Future<bool?> showConfirm(
    BuildContext context, {
    required String title,
    required String content,
    required String cancelLabel,
    required String confirmLabel,
  }) {
    return showDialog<bool>(
      context: context,
      barrierColor: coporBarrierColor(context),
      barrierDismissible: true,
      builder: (ctx) => DTDialog(
        maxWidth: 360,
        footerBuilder: (_) => DTActionFooter.dual(
          leadingLabel: cancelLabel,
          trailingLabel: confirmLabel,
          onLeading: () => Navigator.of(ctx).pop(false),
          onTrailing: () => Navigator.of(ctx).pop(true),
          bottomRadius: coporBorderRadius,
          safeArea: false,
        ),
        child: Builder(
          builder: (innerCtx) {
            final text = CoporTextStyles.of(innerCtx);
            return Padding(
              padding: const EdgeInsets.fromLTRB(24, 24, 24, 20),
              child: Column(
                mainAxisSize: MainAxisSize.min,
                crossAxisAlignment: CrossAxisAlignment.center,
                children: [
                  Text(title, style: text.bodyStrong),
                  const SizedBox(height: 12),
                  Text(
                    content,
                    style: text.bodyLight,
                    softWrap: true,
                    overflow: TextOverflow.visible,
                  ),
                ],
              ),
            );
          },
        ),
      ),
    );
  }

  /// Delete confirmation dialog — cancel (neutral, left) + delete (destructive, right).
  static Future<bool?> showDelete(
    BuildContext context, {
    required String title,
    required String content,
    required String cancelLabel,
    required String deleteLabel,
  }) {
    return showDialog<bool>(
      context: context,
      barrierColor: coporBarrierColor(context),
      barrierDismissible: true,
      builder: (ctx) => DTDialog(
        maxWidth: 360,
        footerBuilder: (_) => DTActionFooter.delete(
          cancelLabel: cancelLabel,
          deleteLabel: deleteLabel,
          onCancel: () => Navigator.of(ctx).pop(false),
          onDelete: () => Navigator.of(ctx).pop(true),
          bottomRadius: coporBorderRadius,
          safeArea: false,
        ),
        child: Builder(
          builder: (innerCtx) {
            final text = CoporTextStyles.of(innerCtx);
            return Padding(
              padding: const EdgeInsets.fromLTRB(24, 24, 24, 20),
              child: Column(
                mainAxisSize: MainAxisSize.min,
                crossAxisAlignment: CrossAxisAlignment.center,
                children: [
                  Text(title, style: text.bodyStrong),
                  const SizedBox(height: 12),
                  Text(content, style: text.bodyLight, softWrap: true, overflow: TextOverflow.visible),
                ],
              ),
            );
          },
        ),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    final dc = CoporColors.of(context);
    const r = coporBorderRadius;

    final footer = footerBuilder?.call(r);

    final card = ConstrainedBox(
      constraints: BoxConstraints(maxWidth: maxWidth),
      child: Container(
        decoration: BoxDecoration(
          color: dc.surface,
          border: Border.all(color: dc.outline),
          borderRadius: BorderRadius.circular(r),
          boxShadow: coporDropShadow(context),
        ),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            child,
            if (footer != null) ...[Divider(height: 1, color: dc.outlineSubtle), footer],
          ],
        ),
      ),
    );

    return Dialog(
      insetPadding: EdgeInsets.zero,
      backgroundColor: Colors.transparent,
      surfaceTintColor: Colors.transparent,
      shadowColor: Colors.transparent,
      elevation: 0,
      child: dismissible
          ? EscapeDismissable(
              onDismiss: () => Navigator.of(context).maybePop(),
              child: Focus(autofocus: true, child: card),
            )
          : card,
    );
  }
}
