import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'ds_drawer_cubit.dart';
import 'ds_drawer_section.dart';

/// Renders whichever [DSDrawerSection] is currently selected — nothing
/// else. Unlike the end drawer (which stays open while switching between
/// sections via visible tabs), the main drawer swaps content entirely based
/// on which button opened it (the main-menu hamburger vs. a page's own
/// sidebar toggle): each caller selects its section right before calling
/// `Scaffold.of(context).openDrawer()`, so there's never more than one
/// section's content visible at a time.
class DSDrawerHost extends StatelessWidget {
  final List<DSDrawerSection> sections;

  const DSDrawerHost({super.key, required this.sections});

  @override
  Widget build(BuildContext context) {
    assert(sections.isNotEmpty, 'DSDrawerHost needs at least one section');

    final selectedKey = context.watch<DSDrawerCubit>().state.drawerSelectedSectionKey;
    final selected = sections.firstWhere(
      (section) => section.key == selectedKey,
      orElse: () => sections.first,
    );

    return selected.child;
  }
}
