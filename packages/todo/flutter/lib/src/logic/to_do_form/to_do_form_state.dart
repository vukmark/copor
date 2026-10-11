import 'package:copor_core/src/error/failure.dart';
import 'package:copor_todo/src/data/model/todo_model.dart';
import 'package:copor_core/src/bloc/utils/bloc_state.dart';
import 'package:copor_core/src/utils/typedef.dart';

final class TodoFormState extends BaseState<TodoModel> {
  final ActionType? actionType;
  final void Function()? onValidateAndSubmit;

  const TodoFormState._({
    super.result,
    super.isLoading,
    super.isUpdated,
    super.failure,
    this.actionType,
    this.onValidateAndSubmit,
  });

  const TodoFormState.initial() : this._(result: null);
  const TodoFormState.loading({required Result<TodoModel>? result})
    : this._(result: result, isLoading: true);
  const TodoFormState.fetched({required Result<TodoModel>? result}) : this._(result: result);
  const TodoFormState.failure({required Failure failure, required Result<TodoModel>? result})
    : this._(result: result, failure: failure);

  @override
  TodoFormState copyWith({
    Result<TodoModel>? result,
    bool? isLoading,
    bool? isUpdated,
    Failure? failure,
    ActionType? actionType,
    void Function()? onValidateAndSubmit,
  }) {
    return TodoFormState._(
      result: result ?? this.result,
      isLoading: isLoading ?? this.isLoading,
      isUpdated: isUpdated ?? this.isUpdated,
      failure: failure ?? this.failure,
      actionType: actionType ?? this.actionType,
      onValidateAndSubmit: onValidateAndSubmit ?? this.onValidateAndSubmit,
    );
  }

  @override
  List<Object?> get props => [
    result,
    isLoading,
    isUpdated,
    failure,
    actionType,
    onValidateAndSubmit,
  ];
}
