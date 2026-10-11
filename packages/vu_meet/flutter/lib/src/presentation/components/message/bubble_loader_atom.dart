import 'package:flutter/material.dart';

class BubbleLoaderAtom extends StatelessWidget {
  final BorderRadius? borderRadius;

  const BubbleLoaderAtom({super.key, this.borderRadius});

  @override
  Widget build(BuildContext context) {
    return Container(
      width: 150,
      height: 150,
      decoration: BoxDecoration(
        color: Theme.of(context).colorScheme.surfaceContainerHighest.withValues(alpha: 0.5),
        borderRadius: borderRadius ?? BorderRadius.circular(12),
      ),
      child: Center(child: SizedBox(width: 24, height: 24, child: Container())),
    );
  }
}
