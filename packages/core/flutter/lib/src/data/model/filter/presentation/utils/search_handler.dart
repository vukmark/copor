import 'package:copor_core/src/data/model/filter/bloc/filter_bloc.dart';
import 'package:copor_core/src/data/model/filter/bloc/filter_event.dart';
import 'package:copor_core/src/data/model/filter/data/model/filter_model/filter_model.dart';
import 'package:copor_core/src/data/model/filter/data/model/filter_utils/filter_name.dart';
import 'package:copor_core/src/utils/typedef.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

typedef SearchHandler = ({TextEditingController controller, void Function(String) onSearchChanged});

SearchHandler setupSearchHandler(BuildContext context) {
  final filterBloc = context.read<FilterBloc>();
  final filterState = filterBloc.state;

  final searchFilter = filterState.filters.firstWhere(
    (f) => f.name.value == 'SEARCH',
    orElse: () => FilterModel(
      name: FilterName(value: 'SEARCH', translation: ''),
      type: FilterType.SEARCH,
    ),
  );

  final filterKey = searchFilter.name.value;
  final currentSearch = filterState.appliedFilters[filterKey] as String? ?? '';

  final controller = TextEditingController(text: currentSearch);
  controller.selection = TextSelection.fromPosition(TextPosition(offset: controller.text.length));

  void onSearchChanged(String value) {
    filterBloc.add(SearchQueryChanged(query: value, filterKey: filterKey));
  }

  return (controller: controller, onSearchChanged: onSearchChanged);
}

Map<String, SearchHandler> setupSearchHandlers(BuildContext context) {
  final filterBloc = context.read<FilterBloc>();
  final filterState = filterBloc.state;
  final searchHandlers = <String, SearchHandler>{};

  final searchFilters = filterState.filters.where((f) => f.type == FilterType.SEARCH);

  for (final filter in searchFilters) {
    final filterKey = filter.name.value;
    final currentSearchValue = filterState.appliedFilters[filterKey] as String? ?? '';

    final controller = TextEditingController(text: currentSearchValue);
    controller.selection = TextSelection.fromPosition(TextPosition(offset: controller.text.length));

    void onSearchChanged(String value) {
      filterBloc.add(SearchQueryChanged(query: value, filterKey: filterKey));
    }

    searchHandlers[filterKey] = (controller: controller, onSearchChanged: onSearchChanged);
  }

  return searchHandlers;
}
