import 'package:copor_core/src/data/model/filter/data/model/filter_dto/filter_list_dto.dart';
import 'package:copor_core/src/error/failure.dart';
import 'package:copor_core/src/modules/administration/country/data/model/country_model.dart';
import 'package:copor_core/src/bloc/utils/bloc_state.dart';

final class CountryListState extends BaseState<List<CountryModel>> {
  final bool isDeleted;

  ///When getting a country list, filterList is sent as payload
  final FilterListDTO filterList;

  const CountryListState._({
    super.result,
    super.isLoading,
    super.isUpdated,
    super.failure,
    this.isDeleted = false,
    required this.filterList,
  });

  const CountryListState.initial()
    : this._(
        result: null,
        filterList: const FilterListDTO(filterList: [], offset: "", limit: ""),
      );

  @override
  CountryListState copyWith({
    Result<List<CountryModel>>? result,
    bool? isLoading,
    bool? isUpdated,
    Failure? failure,
    bool? isDeleted,
    FilterListDTO? filterList,
  }) {
    return CountryListState._(
      result: result ?? this.result,
      isLoading: isLoading ?? this.isLoading,
      isUpdated: isUpdated ?? this.isUpdated,
      failure: failure,
      isDeleted: isDeleted ?? this.isDeleted,
      filterList: filterList ?? this.filterList,
    );
  }

  @override
  List<Object?> get props => [result, isLoading, isUpdated, failure, isDeleted, filterList];
}
