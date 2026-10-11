import 'package:copor_core/src/error/failure.dart';
import 'package:copor_core/src/modules/administration/state/data/model/state_model.dart';
import 'package:copor_core/src/bloc/utils/bloc_state.dart';
import 'package:copor_core/src/utils/typedef.dart';

final class StateFormState extends BaseState<StateModel> {
  final ActionType? actionType;

  const StateFormState._({
    super.result,
    super.isLoading,
    super.isUpdated,
    super.failure,
    this.actionType,
  });

  const StateFormState.initial() : this._(result: null);
  const StateFormState.loading({required Result<StateModel>? result})
    : this._(result: result, isLoading: true);
  const StateFormState.fetched({required Result<StateModel>? result}) : this._(result: result);
  const StateFormState.failure({required Failure failure, required Result<StateModel>? result})
    : this._(result: result, failure: failure);

  @override
  StateFormState copyWith({
    Result<StateModel>? result,
    bool? isLoading,
    bool? isUpdated,
    Failure? failure,
    ActionType? actionType,
  }) {
    return StateFormState._(
      result: result ?? this.result,
      isLoading: isLoading ?? this.isLoading,
      isUpdated: isUpdated ?? this.isUpdated,
      failure: failure ?? this.failure,
      actionType: actionType ?? this.actionType,
    );
  }

  @override
  List<Object?> get props => [result, isLoading, isUpdated, failure, actionType];
}
