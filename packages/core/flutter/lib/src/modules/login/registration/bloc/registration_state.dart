import 'package:copor_core/src/bloc/utils/bloc_state.dart';
import 'package:copor_core/src/error/failure.dart';

final class RegistrationState extends BaseState<void> {
  const RegistrationState._({super.result, super.isLoading, super.isUpdated, super.failure});

  const RegistrationState.initial() : this._();

  const RegistrationState.loading() : this._(isLoading: true);

  const RegistrationState.success() : this._(isUpdated: true);

  const RegistrationState.failure({required Failure failure}) : this._(failure: failure);

  @override
  RegistrationState copyWith({
    Result<void>? result,
    bool? isLoading,
    bool? isUpdated,
    Failure? failure,
  }) {
    return RegistrationState._(
      result: result ?? this.result,
      isLoading: isLoading ?? this.isLoading,
      isUpdated: isUpdated ?? this.isUpdated,
      failure: failure ?? this.failure,
    );
  }
}
