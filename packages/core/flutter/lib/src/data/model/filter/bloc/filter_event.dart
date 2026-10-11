import 'package:copor_core/src/data/model/filter/data/model/filter_model/filter_model.dart';
import 'package:equatable/equatable.dart';

abstract class FilterEvent extends Equatable {
  const FilterEvent();

  @override
  List<Object?> get props => [];
}

class LoadFilters extends FilterEvent {
  final String endpoint;
  final bool forceReload;

  const LoadFilters(this.endpoint, {this.forceReload = false});

  @override
  List<Object?> get props => [endpoint, forceReload];
}

class ApplyFilters extends FilterEvent {
  final Map<String, dynamic> selectedFilters;

  const ApplyFilters(this.selectedFilters);

  @override
  List<Object?> get props => [selectedFilters];
}

class SetDefaultSort extends FilterEvent {
  final String? defaultSortKey;
  final String? defaultSortDir;

  const SetDefaultSort({this.defaultSortKey, this.defaultSortDir});

  @override
  List<Object?> get props => [defaultSortKey, defaultSortDir];
}

class ClearFiltersWithoutSearch extends FilterEvent {}

class ClearFilters extends FilterEvent {}

class SearchQueryChanged extends FilterEvent {
  final String query;
  final String filterKey;
  const SearchQueryChanged({required this.query, required this.filterKey});
}

class ToggleDesktopSort extends FilterEvent {}

class LoadStaticFilters extends FilterEvent {
  final List<FilterModel> filters;
  final String module;

  const LoadStaticFilters({required this.filters, required this.module});

  @override
  List<Object?> get props => [filters, module];
}
