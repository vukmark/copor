import 'package:copor_core/src/bloc/utils/bloc_state.dart';
import 'package:copor_core/src/data/model/filter/data/model/filter_dto/filter_list_dto.dart';
import 'package:copor_core/src/error/failure.dart';
import 'package:copor_core/src/modules/administration/region_city/data/model/region_city_model.dart';

final class RegionCityListState extends BaseState<List<RegionCityModel>> {
  final FilterListDTO filterList;

  const RegionCityListState._({
    super.result,
    super.isLoading,
    super.isUpdated,
    super.failure,
    required this.filterList,
  });

  const RegionCityListState.initial()
    : this._(
        result: null,
        filterList: const FilterListDTO(filterList: [], offset: "", limit: ""),
      );

  @override
  RegionCityListState copyWith({
    Result<List<RegionCityModel>>? result,
    bool? isLoading,
    bool? isUpdated,
    Failure? failure,
    FilterListDTO? filterList,
  }) {
    return RegionCityListState._(
      result: result ?? this.result,
      isLoading: isLoading ?? this.isLoading,
      isUpdated: isUpdated ?? this.isUpdated,
      failure: failure,
      filterList: filterList ?? this.filterList,
    );
  }

  @override
  List<Object?> get props => [result, isLoading, isUpdated, failure, filterList];
}
