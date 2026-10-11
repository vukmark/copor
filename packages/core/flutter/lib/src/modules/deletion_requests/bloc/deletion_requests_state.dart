import 'package:copor_core/src/bloc/utils/bloc_state.dart';
import 'package:copor_core/src/error/failure.dart';

const _noChange = Object();

final class DeletionRequestsState extends BaseState<void> {
  const DeletionRequestsState._({super.result, super.isLoading, super.isUpdated, super.failure});

  const DeletionRequestsState.initial() : this._();

  const DeletionRequestsState.loading() : this._(isLoading: true);

  const DeletionRequestsState.requested() : this._(isUpdated: true);

  const DeletionRequestsState.failure({required Failure failure}) : this._(failure: failure);

  @override
  DeletionRequestsState copyWith({
    Result<void>? result,
    bool? isLoading,
    bool? isUpdated,
    Object? failure = _noChange,
  }) {
    return DeletionRequestsState._(
      result: result ?? this.result,
      isLoading: isLoading ?? this.isLoading,
      isUpdated: isUpdated ?? this.isUpdated,
      failure: identical(failure, _noChange) ? this.failure : failure as Failure?,
    );
  }

  @override
  List<Object?> get props => [result, isLoading, isUpdated, failure];
}
