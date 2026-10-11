import 'package:copor_core/src/data/model/filter/data/model/filter_utils/applied_filter_group.dart';
import 'package:copor_core/src/data/model/translation/common_translation.dart';
import 'package:copor_theme/copor_theme.dart';
import 'package:flutter/material.dart';

class AppliedFilters extends StatelessWidget {
  final List<AppliedFilterGroup> appliedFilters;
  final CommonTranslation translation;

  const AppliedFilters({super.key, required this.appliedFilters, required this.translation});

  static const double _spacing = 8;

  @override
  Widget build(BuildContext context) {
    if (appliedFilters.isEmpty) return const SizedBox.shrink();

    final chips = appliedFilters.expand(
      (group) => group.values.map((value) => '${group.label}: $value'),
    );

    return DTInputDecorator(
      label: translation.APPLIED_FILTERS,
      child: Wrap(
        spacing: _spacing,
        runSpacing: _spacing,
        children: chips.map((label) => DTInfoChip.surface(label: label)).toList(),
      ),
    );
  }
}
