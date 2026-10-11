import 'package:copor_theme/copor_theme.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';

enum _DTBannerType { error, warning, success, info }

/// A floating banner displayed at the bottom of the content area.
///
/// Use the factory constructors [DTBanner.error], [DTBanner.warning],
/// and [DTBanner.success] for standard variants.
///
/// The banner background continuously pulses to draw attention.
class DTBanner extends StatefulWidget {
  final String message;
  final VoidCallback? onDismiss;
  final IconData? icon;
  final String? copiableData;

  /// Internal field to determine default colors/icons.
  final _DTBannerType type;

  const DTBanner._({
    super.key,
    required this.message,
    required this.type,
    this.onDismiss,
    this.icon,
    this.copiableData,
  });

  /// Red variant for errors.
  factory DTBanner.error({
    Key? key,
    required String message,
    VoidCallback? onDismiss,
  }) => DTBanner._(
    key: key,
    message: message,
    onDismiss: onDismiss,
    type: _DTBannerType.error,
    icon: PhosphorIconsThin.warningCircle,
  );

  /// Yellow/Orange variant using secondary colors for warnings.
  factory DTBanner.warning({
    Key? key,
    required String message,
    VoidCallback? onDismiss,
  }) => DTBanner._(
    key: key,
    message: message,
    onDismiss: onDismiss,
    type: _DTBannerType.warning,
    icon: PhosphorIconsThin.warning,
  );

  /// Green variant for success actions.
  factory DTBanner.success({
    Key? key,
    required String message,
    VoidCallback? onDismiss,
    String? copiableData,
  }) => DTBanner._(
    key: key,
    message: message,
    onDismiss: onDismiss,
    type: _DTBannerType.success,
    icon: PhosphorIconsThin.checkCircle,
    copiableData: copiableData,
  );

  /// Blue/primary variant for neutral informational messages.
  factory DTBanner.info({
    Key? key,
    required String message,
    VoidCallback? onDismiss,
  }) => DTBanner._(
    key: key,
    message: message,
    onDismiss: onDismiss,
    type: _DTBannerType.info,
    icon: PhosphorIconsThin.info,
  );

  @override
  State<DTBanner> createState() => _DTBannerState();
}

class _DTBannerState extends State<DTBanner>
    with SingleTickerProviderStateMixin {
  late final AnimationController _controller;

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(
      vsync: this,
      duration: const Duration(milliseconds: 900),
    )..repeat(reverse: true);
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final dt = CoporTheme.of(context);

    // Resolve colors based on type
    final Color defaultBg;
    final Color defaultFg;
    final Color defaultBorder;

    switch (widget.type) {
      case _DTBannerType.error:
        defaultBg = dt.colors.errorContainer;
        defaultFg = dt.colors.onErrorContainer;
        defaultBorder = dt.colors.errorBorder;
        break;
      case _DTBannerType.warning:
        defaultBg = dt.colors.secondaryContainer;
        defaultFg = dt.colors.onSecondaryContainer;
        defaultBorder = dt.colors.secondaryBorder;
        break;
      case _DTBannerType.success:
        defaultBg = dt.colors.successContainer;
        defaultFg = dt.colors.onSuccessContainer;
        defaultBorder = dt.colors.successBorder;
        break;
      case _DTBannerType.info:
        defaultBg = dt.colors.primaryContainer;
        defaultFg = dt.colors.onPrimaryContainer;
        defaultBorder = dt.colors.primaryBorder;
        break;
    }

    final fg = defaultFg;
    final pulsedBg = Color.lerp(defaultBg, defaultBorder, 0.6)!;

    return Container(
      clipBehavior: Clip.hardEdge,
      decoration: BoxDecoration(
        color: dt.colors.surface,
        borderRadius: BorderRadius.all(radius),
        boxShadow: coporDropShadow(context),
        border: Border.all(
            color: defaultBorder,
            width: 2
        ),
      ),
      child: AnimatedBuilder(
        animation: _controller,
        builder: (context, child) {
          final animatedColor = Color.lerp(
            defaultBg,
            pulsedBg,
            _controller.value,
          )!;
          return Container(
            decoration: BoxDecoration(color: animatedColor),
            child: child,
          );
        },
        child: Padding(
          padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
          child: Row(
            children: [
              if (widget.icon != null) ...[
                Icon(widget.icon, color: fg, size: 20),
                const SizedBox(width: 12),
              ],
              Expanded(
                child: Row(
                  children: [
                    Flexible(
                      child: Text(
                        widget.message,
                        style: dt.text.bodyLarge.copyWith(color: fg),
                        maxLines: 3,
                        overflow: TextOverflow.ellipsis,
                      ),
                    ),
                    if (widget.copiableData != null) ...[
                      const SizedBox(width: 4),
                      Flexible(
                        child: SelectableText(
                          widget.copiableData!,
                          style: dt.text.bodyStrong.copyWith(color: fg),
                        ),
                      ),
                    ],
                  ],
                ),
              ),
              if (widget.copiableData != null) ...[
                DTButton.positive(
                  onPressed: () => Clipboard.setData(
                      ClipboardData(text: widget.copiableData!)),
                  label: '',
                  border: false,
                  icon: PhosphorIconsThin.copy,
                ),
              ],
              if (widget.onDismiss != null) ...[
                switch (widget.type) {
                  _DTBannerType.error => DTButton.negative(
                    onPressed: widget.onDismiss!,
                    label: '',
                    border: false,
                    icon: PhosphorIconsThin.x,
                  ),
                  _DTBannerType.warning => DTButton.secondary(
                    onPressed: widget.onDismiss!,
                    label: '',
                    border: false,
                    icon: PhosphorIconsThin.x,
                  ),
                  _DTBannerType.success => DTButton.positive(
                    onPressed: widget.onDismiss!,
                    label: '',
                    border: false,
                    icon: PhosphorIconsThin.x,
                  ),
                  _DTBannerType.info => DTButton.primary(
                    onPressed: widget.onDismiss!,
                    label: '',
                    border: false,
                    icon: PhosphorIconsThin.x,
                  ),
                },
              ],
            ],
          ),
        ),
      ),
    );
  }
}