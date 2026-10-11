import 'package:copor_core/src/data/model/filter/data/model/filter_dto/filter_list_dto.dart';
import 'package:copor_todo/src/data/model/todo_model.dart';
import 'package:copor_core/src/error/failure.dart';
import 'package:copor_core/src/bloc/utils/bloc_state.dart';

const _noChange = Object();

final class TodoListState extends BaseState<List<TodoModel>> {
  final FilterListDTO filterList;
  final bool isDeleted;
  final bool isInitialized;

  const TodoListState._({
    super.result,
    super.isLoading,
    super.isUpdated,
    super.failure,
    required this.filterList,
    this.isDeleted = false,
    required this.isInitialized,
  });

  const TodoListState.initial()
    : this._(
        result: null,
        filterList: const FilterListDTO(filterList: [], offset: "", limit: ""),
        isInitialized: false,
      );

  const TodoListState.loading({
    required Result<List<TodoModel>>? result,
    required FilterListDTO filterList,
    required bool isInitialized,
  }) : this._(
         result: result,
         isLoading: true,
         filterList: filterList,
         isInitialized: isInitialized,
       );

  const TodoListState.fetched({
    required Result<List<TodoModel>>? result,
    required FilterListDTO filterList,
    required bool isInitialized,
  }) : this._(result: result, filterList: filterList, isInitialized: isInitialized);

  const TodoListState.failure({
    required Failure failure,
    required Result<List<TodoModel>>? result,
    required FilterListDTO filterList,
    required bool isInitialized,
  }) : this._(
         result: result,
         failure: failure,
         filterList: filterList,
         isInitialized: isInitialized,
       );

  @override
  TodoListState copyWith({
    Result<List<TodoModel>>? result,
    bool? isLoading,
    bool? isUpdated,
    Object? failure = _noChange,
    FilterListDTO? filterList,
    String? searchQuery,
    bool? isDeleted,
    bool? isInitialized,
  }) {
    return TodoListState._(
      result: result ?? this.result,
      isLoading: isLoading ?? this.isLoading,
      isUpdated: isUpdated ?? this.isUpdated,
      failure: identical(failure, _noChange) ? this.failure : failure as Failure?,
      filterList: filterList ?? this.filterList,
      isDeleted: isDeleted ?? this.isDeleted,
      isInitialized: isInitialized ?? this.isInitialized,
    );
  }

  @override
  List<Object?> get props => [
    result,
    isLoading,
    isUpdated,
    failure,
    filterList,
    isDeleted,
    isInitialized,
  ];
}
