import 'package:copor_theme/src/utils/dt_icons.dart';
import 'package:flutter/material.dart';

const _kDefaultSize = 13.0;
const _kDefaultDuration = Duration(milliseconds: 220);

class DTAnimatedChevron extends StatelessWidget {
  final bool isOpen;
  final double size;
  final Color? color;
  final Color? openColor;
  final Duration duration;

  const DTAnimatedChevron({
    super.key,
    required this.isOpen,
    this.size = _kDefaultSize,
    this.color,
    this.openColor,
    this.duration = _kDefaultDuration,
  });

  @override
  Widget build(BuildContext context) {
    return AnimatedRotation(
      turns: isOpen ? 0.5 : 0.0,
      duration: duration,
      curve: Curves.easeInOut,
      child: Icon(
        DTIcons.chevronDown,
        size: size,
        color: isOpen && openColor != null ? openColor : color,
      ),
    );
  }
}
