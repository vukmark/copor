import 'package:copor_theme/copor_theme.dart';
import 'package:flutter/material.dart';

class MessageSeenStatus extends StatelessWidget {
  final bool isSeen;
  final bool isSending;

  const MessageSeenStatus({super.key, required this.isSeen, required this.isSending});

  @override
  Widget build(BuildContext context) {
    final dc = CoporColors.of(context);

    final IconData icon;
    final Color color;

    if (isSending) {
      icon = PhosphorIconsThin.checks;
      color = Colors.transparent;
    } else {
      icon = PhosphorIconsThin.checks;
      color = isSeen ? dc.primary : dc.onSurfaceSubtle;
    }

    return Icon(icon, size: 15, color: color);
  }
}
