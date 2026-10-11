import 'package:copor_theme/src/theme/extensions/copor_colors.dart';
import 'package:copor_theme/src/theme/tokens/spacing.dart';
import 'package:flutter/material.dart';
import 'package:flutter_hooks/flutter_hooks.dart';

const _kAnimDuration = Duration(milliseconds: 160);
const _kMarginBottom = 12.0;
const _kBorderRadius = coporBorderRadius;

enum _DTCardVariant { plain, tappable }

class DTCard extends HookWidget {
  final Widget child;
  final VoidCallback? onTap;
  final _DTCardVariant _variant;

  const DTCard({
    super.key,
    required this.child,
  })  : _variant = _DTCardVariant.plain,
        onTap = null;

  const DTCard.tap({
    super.key,
    required this.child,
    required VoidCallback this.onTap,
  }) : _variant = _DTCardVariant.tappable;

  @override
  Widget build(BuildContext context) {
    final dc = CoporColors.of(context);
    final hovered = useState(false);
    final pressed = useState(false);

    final isTappable = _variant == _DTCardVariant.tappable;

    final borderColor = hovered.value ? dc.primaryBorder : dc.outlineSubtle;
    final bgColor = hovered.value ? dc.primaryContainer.withValues(alpha: 0.08) : Colors.transparent;

    final card = AnimatedContainer(
      duration: _kAnimDuration,
      curve: Curves.easeOut,
      margin: const EdgeInsets.only(bottom: _kMarginBottom),
      decoration: BoxDecoration(
        border: Border.all(color: borderColor, width: 1),
        borderRadius: BorderRadius.circular(_kBorderRadius),
        color: bgColor,
      ),
      clipBehavior: Clip.antiAlias,
      child: isTappable
          ? InkWell(
              onTap: onTap,
              onHighlightChanged: (v) => pressed.value = v,
              splashColor: dc.primaryPressed.withValues(alpha: 0.15),
              highlightColor: dc.primaryPressed.withValues(alpha: 0.08),
              borderRadius: BorderRadius.circular(_kBorderRadius),
              child: child,
            )
          : child,
    );

    if (!isTappable) return card;

    return MouseRegion(
      onEnter: (_) => hovered.value = true,
      onExit: (_) {
        hovered.value = false;
        pressed.value = false;
      },
      cursor: SystemMouseCursors.click,
      child: card,
    );
  }
}
