import 'package:copor_core/src/data/model/authorization/authorization_tokens_model.dart';
import 'package:copor_core/src/error/failure.dart';
import 'package:copor_core/src/bloc/utils/bloc_state.dart';

final class AuthorizationState extends BaseState<AuthorizationTokensModel> {
  final void Function()? onValidateAndSubmit;
  const AuthorizationState._({
    super.result,
    super.isLoading,
    super.isUpdated,
    super.failure,
    this.onValidateAndSubmit,
  });

  const AuthorizationState.initial() : this._(result: null);
  const AuthorizationState.loading({required Result<AuthorizationTokensModel>? result})
    : this._(result: result, isLoading: true);
  const AuthorizationState.unauthenticated() : this._(result: null, isLoading: false);
  const AuthorizationState.authenticated({required Result<AuthorizationTokensModel> result})
    : this._(result: result, isLoading: false);
  const AuthorizationState.failure({
    required Failure failure,
    required Result<AuthorizationTokensModel>? result,
  }) : this._(result: result, failure: failure);

  @override
  AuthorizationState copyWith({
    Result<AuthorizationTokensModel>? result,
    bool? isLoading,
    bool? isUpdated,
    Failure? failure,
    void Function()? onValidateAndSubmit,
  }) {
    return AuthorizationState._(
      result: result ?? this.result,
      isLoading: isLoading ?? this.isLoading,
      isUpdated: isUpdated ?? this.isUpdated,
      failure: failure ?? this.failure,
      onValidateAndSubmit: onValidateAndSubmit ?? this.onValidateAndSubmit,
    );
  }

  @override
  List<Object?> get props => [result, isLoading, isUpdated, failure, onValidateAndSubmit];
}
