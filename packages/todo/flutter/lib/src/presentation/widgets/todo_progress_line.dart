import 'package:flutter/material.dart';

class TodoProgressLine extends StatelessWidget {
  final String label;
  final String progress;

  const TodoProgressLine({super.key, required this.label, required this.progress});

  double get _value => switch (progress.toUpperCase()) {
    'TO_DO' => 0.05,
    'STARTED' => 0.25,
    'HALF_WAY' => 0.5,
    'ALMOST_DONE' => 0.75,
    'FINISHED' => 1,
    _ => 0,
  };

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final value = _value;

    return Semantics(
      label: label,
      value: '${(value * 100).round()}%',
      child: SizedBox(
        width: double.infinity,
        child: Column(
          mainAxisSize: MainAxisSize.min,
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              label,
              maxLines: 1,
              overflow: TextOverflow.ellipsis,
              style: theme.textTheme.bodySmall,
            ),
            const SizedBox(height: 4),
            LinearProgressIndicator(
              value: value,
              minHeight: 6,
              borderRadius: BorderRadius.circular(3),
              color: theme.colorScheme.primary,
              backgroundColor: theme.colorScheme.surfaceContainerHighest,
            ),
          ],
        ),
      ),
    );
  }
}
