import 'package:copor_todo/src/logic/to_do_form/to_do_form_event.dart';
import 'package:copor_todo/src/logic/to_do_form/to_do_form_state.dart';
import 'package:copor_todo/src/data/repository/todo_repository.dart';
import 'package:copor_core/src/utils/typedef.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

class TodoFormBloc extends Bloc<TodoFormEvent, TodoFormState> {
  final TodoRepository _todoRepository;

  TodoFormBloc({required TodoRepository todoRepository})
    : _todoRepository = todoRepository,
      super(TodoFormState.initial()) {
    on<GetTodo>(_onGetTodo);
    on<CreateTodo>(_onCreateTodo);
    on<UpdateTodo>(_onUpdateTodo);
    on<RegisterValidationAndSubmitCallback>((event, emit) {
      emit(state.copyWith(onValidateAndSubmit: event.onValidateAndSubmit));
    });

    on<SaveButtonPressed>((event, emit) {
      state.onValidateAndSubmit?.call();
    });
  }

  Future<void> _onGetTodo(GetTodo event, Emitter<TodoFormState> emit) async {
    emit(const TodoFormState.loading(result: null));
    final result = await _todoRepository.getTodo(event.todoId, event.todoType);
    result.fold(
      (failure) {
        emit(state.copyWith(failure: failure, isLoading: false));
      },
      (success) {
        emit(state.copyWith(result: success, isLoading: false));
      },
    );
  }

  Future<void> _onCreateTodo(CreateTodo event, Emitter<TodoFormState> emit) async {
    emit(TodoFormState.loading(result: state.result));
    final result = await _todoRepository.createTodo(
      event.todoToCreate,
      attachments: event.attachments,
    );
    result.fold(
      (failure) {
        emit(state.copyWith(failure: failure, isLoading: false));
      },
      (_) {
        emit(state.copyWith(isUpdated: true, isLoading: false, actionType: ActionType.create));
      },
    );
  }

  Future<void> _onUpdateTodo(UpdateTodo event, Emitter<TodoFormState> emit) async {
    emit(TodoFormState.loading(result: state.result));
    final result = await _todoRepository.updateTodo(event.todoToUpdate);
    result.fold(
      (failure) {
        emit(state.copyWith(failure: failure, isLoading: false));
      },
      (_) {
        emit(state.copyWith(isUpdated: true, isLoading: false, actionType: ActionType.update));
      },
    );
  }

}
