import 'package:bloc/bloc.dart';
import 'package:copor_core/src/components/password_validation/bloc/password_validation_event.dart';
import 'package:copor_core/src/components/password_validation/bloc/password_validation_state.dart';
import 'package:copor_core/src/components/password_validation/data/model/password_validation_model.dart';
import 'package:copor_core/src/components/password_validation/data/repository/password_validation_repository.dart';
import 'package:copor_core/src/components/password_validation/domain/password_policy_evaluator.dart';

class PasswordValidationBloc extends Bloc<PasswordValidationEvent, PasswordValidationState> {
  final PasswordValidationRepository passwordValidationRepository;
  final PasswordPolicyEvaluator _evaluator = const PasswordPolicyEvaluator();

  PasswordValidationModel _lastInput = PasswordValidationModel.empty();

  PasswordValidationBloc({required this.passwordValidationRepository})
    : super(const PasswordValidationState.initial()) {
    on<ResetPasswordValidation>(_onReset);
    on<LoadPasswordPolicy>(_onLoadPolicy);
    on<ValidatePassword>(_onValidatePassword);
  }

  void _onReset(ResetPasswordValidation event, Emitter<PasswordValidationState> emit) {
    _lastInput = PasswordValidationModel.empty();
    emit(
      PasswordValidationState.fetched(
        policy: state.policy,
        policyUnavailable: state.policyUnavailable,
      ),
    );
  }

  Future<void> _onLoadPolicy(
    LoadPasswordPolicy event,
    Emitter<PasswordValidationState> emit,
  ) async {
    if (state.hasPolicy && !event.force) return;

    final result = await passwordValidationRepository.getPolicy();

    result.fold(
      (failure) => emit(state.copyWith(policyUnavailable: true, isUpdated: true)),
      (policy) => emit(
        state.copyWith(
          policy: policy,
          policyUnavailable: false,
          isUpdated: true,
          clearFailure: true,
          violations: _evaluator.evaluate(policy, _lastInput),
        ),
      ),
    );
  }

  void _onValidatePassword(ValidatePassword event, Emitter<PasswordValidationState> emit) {
    _lastInput = event.body;

    final policy = state.policy;
    if (policy == null) {
      add(const LoadPasswordPolicy());
      return;
    }

    emit(
      state.copyWith(
        isUpdated: true,
        clearFailure: true,
        violations: _evaluator.evaluate(policy, event.body),
      ),
    );
  }
}
