import 'package:flutter/material.dart';

class DSFloatingContentBounds extends StatelessWidget {
  final double margin;
  final Widget child;

  const DSFloatingContentBounds({
    super.key,
    required this.margin,
    required this.child,
  });

  @override
  Widget build(BuildContext context) {
    return Padding(padding: EdgeInsets.all(margin), child: child);
  }
}
