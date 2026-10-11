import 'package:copor_core/src/bloc/utils/bloc_state.dart';
import 'package:copor_core/src/components/password_validation/data/model/password_policy_model.dart';
import 'package:copor_core/src/error/failure.dart';

final class PasswordValidationState extends BaseState<void> {
  final Set<String> violations;
  final PasswordPolicyModel? policy;

  /// Set when the policy could not be fetched. Local evaluation is impossible,
  /// so the field stops blocking and the server's own validators — which run on
  /// every submit endpoint regardless — become the only gate.
  final bool policyUnavailable;

  const PasswordValidationState._({
    super.result,
    super.isLoading,
    super.isUpdated,
    super.failure,
    this.violations = const {},
    this.policy,
    this.policyUnavailable = false,
  });

  const PasswordValidationState.initial() : this._(result: null, isUpdated: true);

  const PasswordValidationState.loading() : this._(result: null, isLoading: true);

  const PasswordValidationState.fetched({
    Set<String> violations = const {},
    PasswordPolicyModel? policy,
    bool policyUnavailable = false,
  }) : this._(
         result: null,
         isUpdated: true,
         violations: violations,
         policy: policy,
         policyUnavailable: policyUnavailable,
       );

  const PasswordValidationState.failure({required Failure failure})
    : this._(result: null, failure: failure);

  bool get hasPolicy => policy != null;

  /// False while the policy is still in flight — with nothing to evaluate
  /// against a password cannot yet be called valid.
  bool get isValid {
    if (!isUpdated || failure != null) return false;
    if (!hasPolicy) return policyUnavailable;
    return violations.isEmpty;
  }

  @override
  PasswordValidationState copyWith({
    Result<void>? result,
    bool? isLoading,
    bool? isUpdated,
    Failure? failure,
    Set<String>? violations,
    PasswordPolicyModel? policy,
    bool? policyUnavailable,
    bool clearFailure = false,
  }) {
    return PasswordValidationState._(
      result: result ?? this.result,
      isLoading: isLoading ?? this.isLoading,
      isUpdated: isUpdated ?? this.isUpdated,
      failure: clearFailure ? null : (failure ?? this.failure),
      violations: violations ?? this.violations,
      policy: policy ?? this.policy,
      policyUnavailable: policyUnavailable ?? this.policyUnavailable,
    );
  }

  @override
  List<Object?> get props => [
    result,
    isLoading,
    isUpdated,
    failure,
    violations,
    policy,
    policyUnavailable,
  ];
}
