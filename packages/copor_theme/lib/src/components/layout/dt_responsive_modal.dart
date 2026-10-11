import 'package:copor_theme/src/theme/extensions/copor_colors.dart';
import 'package:copor_theme/src/theme/tokens/spacing.dart';
import 'package:copor_theme/src/utils/escape_dismiss_registry.dart';
import 'package:flutter/material.dart';

const _kModalMaxWidth = 500.0;
const _kModalMaxHeight = 640.0;
const _kModalBorderRadius = 8.0;

class DTResponsiveModalLayout extends StatelessWidget {
  final Widget child;
  final VoidCallback onClose;
  final double? height;

  const DTResponsiveModalLayout({
    super.key,
    required this.child,
    required this.onClose,
    this.height,
  });

  @override
  Widget build(BuildContext context) {
    return LayoutBuilder(
      builder: (context, constraints) {
        final bool isSmallScreen = constraints.maxWidth < kMobileBreakpoint;

        final Widget content = FocusScope(autofocus: true, child: child);

        if (isSmallScreen) {
          return content;
        }

        return EscapeDismissable(
          onDismiss: onClose,
          child: Focus(
            autofocus: true,
            child: Stack(
              children: [
                Positioned.fill(
                  child: GestureDetector(
                    onTap: onClose,
                    behavior: HitTestBehavior.translucent,
                    child: const ColoredBox(color: Colors.transparent),
                  ),
                ),
                Center(
                  child: Container(
                    constraints: BoxConstraints(
                      maxWidth: _kModalMaxWidth,
                      maxHeight: height ?? _kModalMaxHeight,
                    ),
                    decoration: BoxDecoration(
                      color: CoporColors.of(context).surface,
                      borderRadius: BorderRadius.circular(_kModalBorderRadius),
                      border: Border.all(
                        color: CoporColors.of(context).outline,
                      ),
                      boxShadow: coporDropShadow(context),
                    ),
                    child: Material(
                      color: Colors.transparent,
                      borderRadius: BorderRadius.circular(_kModalBorderRadius),
                      child: content,
                    ),
                  ),
                ),
              ],
            ),
          ),
        );
      },
    );
  }
}
