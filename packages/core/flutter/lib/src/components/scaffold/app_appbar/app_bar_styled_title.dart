import 'package:flutter/material.dart';

class AppBarStyledTitle extends StatelessWidget {
  final String title;

  const AppBarStyledTitle({super.key, required this.title});

  @override
  Widget build(BuildContext context) {
    return Text(
      title,
      semanticsLabel: "YOU ARE CURRENTLY ON THE $title PAGE",
      style: Theme.of(
        context,
      ).textTheme.titleMedium?.copyWith(color: Theme.of(context).colorScheme.onSurface),
    );
  }
}
