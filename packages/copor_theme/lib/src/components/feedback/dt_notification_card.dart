import 'package:copor_theme/src/theme/extensions/copor_theme.dart';
import 'package:copor_theme/src/theme/tokens/spacing.dart';
import 'package:copor_theme/src/utils/phosphor_icons.dart';
import 'package:flutter/material.dart';

/// A chat-message notification card used in the notification queue overlay.
///
/// Pure UI — all state (progress, dismiss timer) is owned by the caller.
class DTNotificationCard extends StatelessWidget {
  /// Primary line — typically the sender's name.
  final String title;

  /// Secondary line — the message preview.
  final String message;

  /// Optional leading avatar widget (e.g. a [CircleAvatar] with a network image).
  final Widget? avatar;

  /// Maximum number of lines shown for the message preview.
  final int messageMaxLines;

  /// Auto-dismiss progress from `0.0` (just appeared) to `1.0` (about to
  /// dismiss). Null hides the progress bar entirely — for contexts with no
  /// auto-dismiss timer, e.g. the notification inbox.
  final double? dismissProgress;

  /// Colour of the progress bar. Defaults to the theme primary colour when null.
  final Color? progressColor;

  /// Outline + drop shadow, matching the floating look the queue toast needs
  /// to stand out over page content. Off by default for contexts already
  /// inside their own card/panel, e.g. the notification inbox.
  final bool border;

  /// When set, the card is tappable with the same hover/press feedback as
  /// [DTListTile] (matching the inbox row it replaced).
  final VoidCallback? onPressed;

  const DTNotificationCard({
    super.key,
    required this.title,
    required this.message,
    this.avatar,
    this.messageMaxLines = 2,
    this.dismissProgress,
    this.progressColor,
    this.border = true,
    this.onPressed,
  });

  @override
  Widget build(BuildContext context) {
    final dt = CoporTheme.of(context);
    final shape = RoundedRectangleBorder(borderRadius: BorderRadius.all(radius));

    final content = Column(
      mainAxisSize: MainAxisSize.min,
      children: [
        if (dismissProgress != null)
          LinearProgressIndicator(
            value: dismissProgress,
            backgroundColor: dt.colors.surfaceContainer,
            color: progressColor ?? dt.colors.primary,
            minHeight: 6,
          ),
        Padding(
          padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 10),
          child: Row(
            children: [
              if (avatar != null) ...[avatar!, const SizedBox(width: 10)],
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  mainAxisSize: MainAxisSize.min,
                  children: [
                    Text(
                      title,
                      style: dt.text.columnHeader,
                      maxLines: 1,
                      overflow: TextOverflow.ellipsis,
                    ),
                    const SizedBox(height: 2),
                    Text(
                      message,
                      style: dt.text.tableCell,
                      maxLines: messageMaxLines,
                      overflow: TextOverflow.ellipsis,
                    ),
                  ],
                ),
              ),
            ],
          ),
        ),
      ],
    );

    return Container(
      decoration: ShapeDecoration(
        color: dt.colors.surface,
        shape: border ? shape.copyWith(side: BorderSide(color: dt.colors.outlineSubtle)) : shape,
        shadows: border ? coporDropShadow(context) : null,
      ),
      clipBehavior: Clip.hardEdge,
      child: onPressed == null
          ? content
          : Material(
              color: Colors.transparent,
              child: InkWell(
                onTap: onPressed,
                customBorder: shape,
                hoverColor: Colors.transparent,
                child: content,
              ),
            ),
    );
  }
}

/// A small dismiss button used to close notifications and banners.
/// Rounded on the top-right and bottom-left corners; sharp on the other two.
class DTDismissButton extends StatelessWidget {
  final VoidCallback onPressed;

  const DTDismissButton({super.key, required this.onPressed});

  @override
  Widget build(BuildContext context) {
    final dt = CoporTheme.of(context);
    return SizedBox(
      width: 28,
      height: 28,
      child: Material(
        color: dt.colors.surfaceContainer,
        shape: RoundedRectangleBorder(
          side: BorderSide(color: dt.colors.outline),
          borderRadius: const BorderRadius.only(
            topRight: Radius.circular(coporBorderRadius),
            bottomLeft: Radius.circular(coporBorderRadius),
            topLeft: Radius.circular(coporBorderRadius - 5),
            bottomRight: Radius.circular(coporBorderRadius - 5),
          ),
        ),
        clipBehavior: Clip.hardEdge,
        child: InkWell(
          onTap: onPressed,
          child: Center(
            child: Icon(PhosphorIconsThin.x, size: 12, color: dt.colors.onSurface),
          ),
        ),
      ),
    );
  }
}
