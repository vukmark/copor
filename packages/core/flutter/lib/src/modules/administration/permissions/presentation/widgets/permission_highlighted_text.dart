import 'package:copor_core/src/components/highlighted_text.dart';
import 'package:flutter/material.dart';

class PermissionHighlightedText extends StatelessWidget {
  final String text;
  final String searchQuery;
  final TextStyle style;
  final int maxLines;

  const PermissionHighlightedText({
    super.key,
    required this.text,
    required this.searchQuery,
    required this.style,
    required this.maxLines,
  });

  @override
  Widget build(BuildContext context) {
    return CoporHighlightedText(
      text: text,
      searchQuery: searchQuery,
      style: style,
      maxLines: maxLines,
    );
  }
}
