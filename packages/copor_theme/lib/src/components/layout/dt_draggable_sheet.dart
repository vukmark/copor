import 'package:copor_theme/src/theme/extensions/copor_colors.dart';
import 'package:copor_theme/src/theme/tokens/spacing.dart';
import 'package:flutter/material.dart';

const _kDragHandleWidth = 36.0;
const _kDragHandleHeight = 4.0;
const _kDragHandleRadius = 2.0;
const _kDragHandlePaddingV = 12.0;

/// A standardised DT bottom-sheet body built on [DraggableScrollableSheet].
///
/// Provides the rounded-top [Material] card, drag handle, scrollable content
/// area, and an optional [footer] separated by a divider.
class DTDraggableScrollableSheet extends StatelessWidget {
  final Widget Function(BuildContext context, ScrollController scrollController) contentBuilder;
  final Widget? footer;
  final double initialSize;
  final double maxSize;
  final double minSize;

  const DTDraggableScrollableSheet({
    super.key,
    required this.contentBuilder,
    this.footer,
    this.initialSize = 0.6,
    this.maxSize = 0.85,
    this.minSize = 0.25,
  });

  static Future<T?> show<T>(
    BuildContext context, {
    required Widget Function(BuildContext, ScrollController) contentBuilder,
    Widget? footer,
    double initialSize = 0.6,
    double maxSize = 0.85,
    double minSize = 0.25,
    bool useRootNavigator = false,
  }) {
    return showModalBottomSheet<T>(
      context: context,
      isScrollControlled: true,
      useRootNavigator: useRootNavigator,
      backgroundColor: Colors.transparent,
      barrierColor: coporBarrierColor(context),
      builder: (_) => DTDraggableScrollableSheet(
        initialSize: initialSize,
        maxSize: maxSize,
        minSize: minSize,
        footer: footer,
        contentBuilder: contentBuilder,
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    final dc = CoporColors.of(context);

    return DraggableScrollableSheet(
      expand: false,
      initialChildSize: initialSize,
      maxChildSize: maxSize,
      minChildSize: minSize,
      builder: (context, scrollController) => Material(
        color: dc.surface,
        borderRadius: const BorderRadius.vertical(top: radius),
        clipBehavior: Clip.antiAlias,
        child: Column(
          children: [
            _DTDragHandle(color: dc.outlineSubtle),
            Expanded(child: contentBuilder(context, scrollController)),
            if (footer != null) ...[
              Divider(height: 1, thickness: 1, color: dc.outlineSubtle),
              footer!,
            ],
          ],
        ),
      ),
    );
  }
}

class _DTDragHandle extends StatelessWidget {
  final Color color;

  const _DTDragHandle({required this.color});

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: _kDragHandlePaddingV),
      child: Container(
        width: _kDragHandleWidth,
        height: _kDragHandleHeight,
        decoration: BoxDecoration(
          color: color,
          borderRadius: BorderRadius.circular(_kDragHandleRadius),
        ),
      ),
    );
  }
}
