import 'package:copor_todo/src/logic/to_do_list/todo_list_event.dart';
import 'package:copor_todo/src/logic/to_do_list/todo_list_state.dart';
import 'package:copor_todo/src/data/repository/todo_repository.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

class TodoListBloc extends Bloc<TodoListEvent, TodoListState> {
  final TodoRepository _todoRepository;

  TodoListBloc({required TodoRepository todoRepository})
    : _todoRepository = todoRepository,
      super(const TodoListState.initial()) {
    on<GetTodoList>(_onGetTodoList);
    on<DeleteTodo>(_onDeleteTodo);
  }

  Future<void> _onGetTodoList(GetTodoList event, Emitter<TodoListState> emit) async {
    emit(
      state.copyWith(
        isLoading: true,
        isDeleted: false,
        filterList: event.filterList,
        failure: null,
      ),
    );

    final result = await _todoRepository.getTodoList(event.filterList);

    result.fold(
      (failure) {
        emit(state.copyWith(failure: failure, isLoading: false));
      },
      (success) {
        emit(state.copyWith(result: success, isLoading: false, failure: null));
      },
    );
  }

  Future<void> _onDeleteTodo(DeleteTodo event, Emitter<TodoListState> emit) async {
    emit(state.copyWith(isLoading: true, failure: null, isDeleted: false));
    final deleteResult = await _todoRepository.deleteTodo(event.todoId, event.todoType);

    await deleteResult.fold(
      (failure) async {
        emit(state.copyWith(failure: failure, isLoading: false, isDeleted: false));
      },
      (_) async {
        final listResult = await _todoRepository.getTodoList(state.filterList);

        listResult.fold(
          (failure) {
            emit(state.copyWith(failure: failure, isLoading: false, isDeleted: false));
          },
          (success) {
            emit(state.copyWith(result: success, isLoading: false, isDeleted: true, failure: null));
          },
        );
      },
    );
  }
}
