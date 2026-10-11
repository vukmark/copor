import 'package:copor_core/src/error/failure.dart';
import 'package:copor_core/src/modules/administration/state/data/model/state_model.dart';
import 'package:copor_core/src/bloc/utils/bloc_state.dart';

final class StateListState extends BaseState<List<StateModel>> {
  final bool isDeleted;

  const StateListState._({
    super.result,
    super.isLoading,
    super.isUpdated,
    super.failure,
    this.isDeleted = false,
  });

  const StateListState.initial() : this._(result: null);
  const StateListState.loading({required Result<List<StateModel>>? result})
    : this._(result: result, isLoading: true);
  const StateListState.fetched({required Result<List<StateModel>>? result})
    : this._(result: result);
  const StateListState.failure({
    required Failure failure,
    required Result<List<StateModel>>? result,
  }) : this._(result: result, failure: failure);

  @override
  StateListState copyWith({
    Result<List<StateModel>>? result,
    bool? isLoading,
    bool? isUpdated,
    Failure? failure,
    StateModel? selectedState,
    bool? isDeleted,
  }) {
    return StateListState._(
      result: result ?? this.result,
      isLoading: isLoading ?? this.isLoading,
      isUpdated: isUpdated ?? this.isUpdated,
      failure: failure ?? this.failure,
      isDeleted: isDeleted ?? this.isDeleted,
    );
  }

  @override
  List<Object?> get props => [result, isLoading, isUpdated, failure, isDeleted];
}
