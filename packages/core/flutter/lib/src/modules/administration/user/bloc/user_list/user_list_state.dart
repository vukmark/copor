import 'package:copor_core/src/data/model/filter/data/model/filter_dto/filter_list_dto.dart';
import 'package:copor_core/src/error/failure.dart';
import 'package:copor_core/src/modules/administration/user/data/model/user_model.dart';
import 'package:copor_core/src/bloc/utils/bloc_state.dart';

final class UserListState extends BaseState<List<UserModel>> {
  final bool isDeleted;
  final FilterListDTO filterList;

  const UserListState._({
    super.result,
    super.isLoading,
    super.isUpdated,
    super.failure,
    this.isDeleted = false,
    required this.filterList,
  });

  const UserListState.initial()
    : this._(
        result: null,
        filterList: const FilterListDTO(filterList: [], offset: "", limit: ""),
      );
  const UserListState.loading({required Result<List<UserModel>>? result, filterList})
    : this._(
        result: result,
        isLoading: true,
        filterList: const FilterListDTO(filterList: [], offset: "", limit: ""),
      );
  const UserListState.fetched({required Result<List<UserModel>>? result})
    : this._(
        result: result,
        filterList: const FilterListDTO(filterList: [], offset: "", limit: ""),
      );
  const UserListState.failure({
    required Failure failure,
    required Result<List<UserModel>>? result,
    filterList,
  }) : this._(
         result: result,
         failure: failure,
         filterList: const FilterListDTO(filterList: [], offset: "", limit: ""),
       );

  @override
  UserListState copyWith({
    Result<List<UserModel>>? result,
    bool? isLoading,
    bool? isUpdated,
    Failure? failure,
    UserModel? selectedUser,
    FilterListDTO? filterList,
    bool? isDeleted,
  }) {
    return UserListState._(
      result: result ?? this.result,
      isLoading: isLoading ?? this.isLoading,
      isUpdated: isUpdated ?? this.isUpdated,
      failure: failure ?? this.failure,
      isDeleted: isDeleted ?? this.isDeleted,
      filterList: filterList ?? this.filterList,
    );
  }

  @override
  List<Object?> get props => [result, isLoading, isUpdated, failure, isDeleted, filterList];
}
