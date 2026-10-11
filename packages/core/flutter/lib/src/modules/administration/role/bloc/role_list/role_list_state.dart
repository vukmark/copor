import 'package:copor_core/src/data/model/filter/data/model/filter_dto/filter_list_dto.dart';
import 'package:copor_core/src/error/failure.dart';
import 'package:copor_core/src/modules/administration/role/data/model/role_model.dart';
import 'package:copor_core/src/bloc/utils/bloc_state.dart';

final class RoleListState extends BaseState<List<RoleModel>> {
  final bool isDeleted;
  final FilterListDTO filterList;

  const RoleListState._({
    super.result,
    super.isLoading,
    super.isUpdated,
    super.failure,
    this.isDeleted = false,
    required this.filterList,
  });

  const RoleListState.initial()
    : this._(
        result: null,
        filterList: const FilterListDTO(filterList: [], offset: "", limit: ""),
      );

  @override
  RoleListState copyWith({
    Result<List<RoleModel>>? result,
    bool? isLoading,
    bool? isUpdated,
    Failure? failure,
    bool? isDeleted,
    FilterListDTO? filterList,
  }) {
    return RoleListState._(
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
