import 'package:copor_theme/copor_theme.dart';
import 'package:flutter/material.dart';

class CoporHighlightedText extends StatelessWidget {
  final String text;
  final String searchQuery;
  final TextStyle style;
  final int maxLines;

  const CoporHighlightedText({
    super.key,
    required this.text,
    required this.searchQuery,
    required this.style,
    required this.maxLines,
  });

  @override
  Widget build(BuildContext context) {
    return Text.rich(
      TextSpan(style: style, children: _buildSpans(context)),
      maxLines: maxLines,
      overflow: TextOverflow.ellipsis,
    );
  }

  List<TextSpan> _buildSpans(BuildContext context) {
    final query = searchQuery.trim();
    if (query.isEmpty) return [TextSpan(text: text)];

    final normalizedText = text.toLowerCase();
    final normalizedQuery = query.toLowerCase();
    final spans = <TextSpan>[];
    var start = 0;

    while (start < text.length) {
      final matchIndex = normalizedText.indexOf(normalizedQuery, start);
      if (matchIndex < 0) {
        spans.add(TextSpan(text: text.substring(start)));
        break;
      }

      if (matchIndex > start) {
        spans.add(TextSpan(text: text.substring(start, matchIndex)));
      }

      final matchEnd = matchIndex + query.length;
      spans.add(
        TextSpan(
          text: text.substring(matchIndex, matchEnd),
          style: style.copyWith(
            backgroundColor: CoporColors.of(context).primary.withValues(alpha: 0.2),
            fontWeight: FontWeight.w700,
          ),
        ),
      );
      start = matchEnd;
    }

    return spans;
  }
}
