import 'package:copor_core/src/core/system/device_service.dart';
import 'package:copor_core/src/data/model/filter/bloc/filter_state.dart';
import 'package:copor_core/src/data/model/translation/common_translation.dart';
import 'package:copor_core/src/utils/typedef.dart';
import 'package:copor_theme/copor_theme.dart';
import 'package:flutter/material.dart';

class AdministrationToolbar extends StatelessWidget {
  final TextEditingController searchController;
  final ValueChanged<String> onSearchChanged;
  final VoidCallback? onAdd;
  final VoidCallback? onFilter;
  final VoidCallback onSort;
  final CommonTranslation translation;
  final FilterState filterState;

  const AdministrationToolbar({
    super.key,
    required this.searchController,
    required this.onSearchChanged,
    required this.onAdd,
    required this.onFilter,
    required this.onSort,
    required this.translation,
    required this.filterState,
  });

  @override
  Widget build(BuildContext context) {
    final addCallback = onAdd;
    final filterCallback = onFilter;
    final isFilterButtonVisible = filterState.filters.any((f) => f.type == FilterType.IN);
    final isSortButtonVisible = filterState.filters.any((f) => f.type == FilterType.SORT);

    if (context.isMobile) {
      return Row(
        mainAxisSize: MainAxisSize.max,
        children: [
          Row(
            children: [
              if (isFilterButtonVisible && filterCallback != null) ...[
                DTButton.surface(
                  icon: DTIcons.filter,
                  label: '',
                  semanticLabel: translation.FILTER_BY,
                  onPressed: filterCallback,
                  inputSize: DTInputSize.compact,
                ),
                const SizedBox(width: 8),
              ],
              if (isSortButtonVisible) ...[
                DTButton.surface(
                  icon: DTIcons.sort,
                  label: '',
                  semanticLabel: translation.SORT_BY,
                  onPressed: onSort,
                  inputSize: DTInputSize.compact,
                ),
                const SizedBox(width: 8),
              ],
            ],
          ),
          Expanded(
            child: DTSearchBar(
              title: translation.SEARCH,
              controller: searchController,
              onSearchChanged: onSearchChanged,
            ),
          ),
          if (addCallback != null) ...[
            const SizedBox(width: 8),
            DTButton.primary(
              icon: DTIcons.add,
              label: '',
              semanticLabel: translation.ADD,
              onPressed: addCallback,
              inputSize: DTInputSize.compact,
            ),
          ],
        ],
      );
    }

    return Row(
      children: [
        if (isFilterButtonVisible && filterCallback != null) ...[
          DTButton.surface(
            icon: DTIcons.filter,
            label: translation.FILTER_BY,
            onPressed: filterCallback,
          ),
          const SizedBox(width: 8),
        ],
        Expanded(
          child: DTSearchBar(
            title: translation.SEARCH,
            controller: searchController,
            onSearchChanged: onSearchChanged,
          ),
        ),
        if (addCallback != null) ...[
          const SizedBox(width: 8),
          DTButton.primary(icon: DTIcons.add, label: translation.ADD, onPressed: addCallback),
        ],
      ],
    );
  }
}
