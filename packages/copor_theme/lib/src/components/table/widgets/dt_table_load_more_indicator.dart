import 'package:copor_theme/src/components/display/dt_ring_loader.dart';
import 'package:flutter/material.dart';

const double _kLoadMoreHeight = 56.0;
const Duration _kLoadMoreAnimationDuration = Duration(milliseconds: 200);

/// Fading, height-animated pagination indicator shown at the end of a
/// [DTTableDesktop]/[DTTableMobile] list while the next page is loading.
class DTTableLoadMoreIndicator extends StatelessWidget {
  final bool isLoadingMore;

  const DTTableLoadMoreIndicator({super.key, required this.isLoadingMore});

  @override
  Widget build(BuildContext context) {
    return AnimatedSize(
      duration: _kLoadMoreAnimationDuration,
      child: SizedBox(
        height: isLoadingMore ? _kLoadMoreHeight : 0,
        child: Center(
          child: AnimatedOpacity(
            duration: _kLoadMoreAnimationDuration,
            opacity: isLoadingMore ? 1 : 0,
            child: const DTRingLoader.inline(),
          ),
        ),
      ),
    );
  }
}
