import 'package:copor_core/src/bloc/utils/bloc_state.dart';
import 'package:copor_core/src/error/failure.dart';

final class ForgotPasswordState extends BaseState<void> {
  const ForgotPasswordState._({super.result, super.isLoading, super.isUpdated, super.failure});

  const ForgotPasswordState.initial() : this._();

  const ForgotPasswordState.loading() : this._(isLoading: true);

  const ForgotPasswordState.success() : this._(isUpdated: true);

  const ForgotPasswordState.failure({required Failure failure}) : this._(failure: failure);

  @override
  ForgotPasswordState copyWith({
    Result<void>? result,
    bool? isLoading,
    bool? isUpdated,
    Failure? failure,
  }) {
    return ForgotPasswordState._(
      result: result ?? this.result,
      isLoading: isLoading ?? this.isLoading,
      isUpdated: isUpdated ?? this.isUpdated,
      failure: failure ?? this.failure,
    );
  }
}
