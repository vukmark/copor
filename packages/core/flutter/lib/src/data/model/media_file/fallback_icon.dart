import 'package:flutter/material.dart';
import 'mime_type.dart';

class FallbackIcon extends StatelessWidget {
  final MimeType type;
  final double size;
  final String? label;

  const FallbackIcon({super.key, required this.type, required this.size, this.label});

  @override
  Widget build(BuildContext context) {
    return Container(
      width: size,
      height: size,
      padding: const EdgeInsets.all(4),
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Icon(type.icon, size: size * 0.4),
          if (label != null) ...[
            const SizedBox(height: 4),
            Text(
              label!,
              style: const TextStyle(fontSize: 10),
              maxLines: 1,
              overflow: TextOverflow.ellipsis,
            ),
          ],
        ],
      ),
    );
  }
}
