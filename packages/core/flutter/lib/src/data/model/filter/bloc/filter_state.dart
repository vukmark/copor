import 'package:copor_core/src/bloc/utils/bloc_state.dart';
import 'package:copor_core/src/data/model/filter/data/model/filter_model/filter_model.dart';
import 'package:copor_core/src/data/model/filter/data/model/filter_utils/applied_filter_group.dart';
import 'package:copor_core/src/error/failure.dart';
import 'package:copor_core/src/utils/typedef.dart';

final class FilterState extends BaseState<List<FilterModel>> {
  final Map<String, dynamic> appliedFilters;
  final String module;
  final bool showDesktopSort;
  final String? defaultSortKey;
  final String? defaultSortDir;

  const FilterState._({
    super.result,
    super.isLoading,
    super.isUpdated,
    super.failure,
    required this.appliedFilters,
    this.module = '',
    this.showDesktopSort = false,
    this.defaultSortKey,
    this.defaultSortDir,
  });

  const FilterState.initial()
    : this._(
        appliedFilters: const {},
        module: '',
        showDesktopSort: false,
        defaultSortKey: null,
        defaultSortDir: null,
      );

  @override
  FilterState copyWith({
    Result<List<FilterModel>>? result,
    bool? isLoading,
    bool? isUpdated,
    Failure? failure,
    Map<String, dynamic>? appliedFilters,
    String? module,
    bool? showDesktopSort,
    String? defaultSortKey,
    String? defaultSortDir,
  }) {
    return FilterState._(
      result: result ?? this.result,
      isLoading: isLoading ?? this.isLoading,
      isUpdated: isUpdated ?? this.isUpdated,
      failure: failure,
      appliedFilters: appliedFilters ?? this.appliedFilters,
      module: module ?? this.module,
      showDesktopSort: showDesktopSort ?? this.showDesktopSort,
      defaultSortKey: defaultSortKey ?? this.defaultSortKey,
      defaultSortDir: defaultSortDir ?? this.defaultSortDir,
    );
  }

  List<FilterModel> get filters => result?.data ?? [];

  List<AppliedFilterGroup> get appliedInFilters {
    final inFilters = filters.where((f) => f.type == FilterType.IN);

    final groups = <AppliedFilterGroup>[];

    for (final filter in inFilters) {
      final selectedValues = appliedFilters[filter.name.value] as List?;
      if (selectedValues == null || selectedValues.isEmpty) continue;

      final translatedValues = (filter.values ?? [])
          .where((v) => selectedValues.contains(v.value))
          .map((v) => v.translation)
          .toList();

      if (translatedValues.isEmpty) continue;

      groups.add(AppliedFilterGroup(label: filter.name.translation, values: translatedValues));
    }

    return groups;
  }

  @override
  List<Object?> get props => [
    result,
    isLoading,
    isUpdated,
    failure,
    appliedFilters,
    showDesktopSort,
    defaultSortKey,
    defaultSortDir,
  ];
}
