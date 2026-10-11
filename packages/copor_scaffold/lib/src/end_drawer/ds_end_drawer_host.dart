import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'ds_end_drawer_cubit.dart';
import 'ds_end_drawer_section.dart';

/// Renders whichever [DSEndDrawerSection] is currently selected — nothing
/// else. Content swaps entirely based on which button opened the end
/// drawer (each caller calls `DSScaffoldController.showEndDrawerSection`
/// right before/instead of opening it), so there's never more than one
/// section's content visible — no tab switcher.
class DSEndDrawerHost extends StatelessWidget {
  final List<DSEndDrawerSection> sections;

  const DSEndDrawerHost({super.key, required this.sections});

  @override
  Widget build(BuildContext context) {
    assert(sections.isNotEmpty, 'DSEndDrawerHost needs at least one section');

    final selectedKey = context
        .watch<DSEndDrawerCubit>()
        .state
        .endDrawerSelectedSectionKey;
    final selected = sections.firstWhere(
      (section) => section.key == selectedKey,
      orElse: () => sections.first,
    );

    return selected.child;
  }
}
