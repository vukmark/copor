import 'package:flutter/material.dart';

class ColorDisplay extends StatelessWidget {
  const ColorDisplay({
    super.key,
    required this.color,
    this.size = 32.0,
    this.shape = BoxShape.rectangle,
    this.cornerRadius = 4.0,
    this.border,
    this.onTap,
  });

  final Color color;
  final double size;
  final BoxShape shape;
  final double cornerRadius;
  final Border? border;
  final VoidCallback? onTap;

  @override
  Widget build(BuildContext context) {
    final double luminance = color.computeLuminance();
    Color borderColor;

    const double lightThreshold = 0.85;
    const double darkThreshold = 0.2;

    if (luminance > lightThreshold) {
      borderColor = Colors.grey.shade800;
    } else if (luminance < darkThreshold) {
      borderColor = Colors.white;
    } else {
      borderColor = color;
    }

    final effectiveBorder = border ?? Border.all(color: borderColor, width: 1.0);

    return GestureDetector(
      onTap: onTap,
      child: Container(
        width: size,
        height: size,
        decoration: BoxDecoration(
          color: color,
          shape: shape,
          borderRadius: shape == BoxShape.rectangle ? BorderRadius.circular(cornerRadius) : null,
          border: effectiveBorder,
        ),
      ),
    );
  }
}
