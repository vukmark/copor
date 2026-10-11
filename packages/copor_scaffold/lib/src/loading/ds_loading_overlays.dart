import 'package:copor_theme/copor_theme.dart';
import 'package:flutter/material.dart';
import 'ds_loading_debug_bubble.dart';
import 'ds_loading_source.dart';

class DSLoadingOverlays extends StatelessWidget {
  final bool isPageLoading;
  final bool isLoading;
  final bool showDebugOverlay;
  final Set<DSLoadingSource> loadingSources;

  const DSLoadingOverlays({
    super.key,
    required this.isPageLoading,
    required this.isLoading,
    required this.showDebugOverlay,
    required this.loadingSources,
  });

  @override
  Widget build(BuildContext context) {
    final dt = CoporTheme.of(context);

    return Stack(
      clipBehavior: Clip.none,
      children: [
        AnimatedSwitcher(
          duration: const Duration(milliseconds: 200),
          transitionBuilder: (child, animation) {
            final opacity =
                child.key == const ValueKey('page_loading') &&
                    animation.status != AnimationStatus.reverse
                ? 1.0
                : animation.value;
            return Opacity(opacity: opacity, child: child);
          },
          child: isPageLoading
              ? ColoredBox(
                  key: const ValueKey('page_loading'),
                  color: dt.colors.surface,
                  child: const Center(child: DTRingLoader.page()),
                )
              : const SizedBox.shrink(key: ValueKey('_idle')),
        ),

        AnimatedSwitcher(
          duration: const Duration(milliseconds: 200),
          child: isLoading && !isPageLoading
              ? Stack(
                  key: const ValueKey('request_loading'),
                  children: [
                    ModalBarrier(
                      color: dt.colors.surface.withAlpha(140),
                      dismissible: false,
                    ),
                    const Center(child: DTRingLoader.page()),
                  ],
                )
              : const SizedBox.shrink(key: ValueKey('_request_idle')),
        ),

        if (showDebugOverlay)
          Positioned(
            left: 8,
            bottom: 8,
            child: DSLoadingDebugBubble(loadingSources: loadingSources),
          ),
      ],
    );
  }
}
