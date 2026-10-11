import 'package:copor_core/src/error/failure.dart';
import 'package:copor_core/src/modules/administration/role/data/model/role_model.dart';
import 'package:copor_core/src/bloc/utils/bloc_state.dart';
import 'package:copor_core/src/utils/typedef.dart';

final class RoleFormState extends BaseState<RoleModel> {
  final ActionType? actionType;
  final void Function()? onValidateAndSubmit;

  const RoleFormState._({
    super.result,
    super.isLoading,
    super.isUpdated,
    super.failure,
    this.actionType,
    this.onValidateAndSubmit,
  });

  const RoleFormState.initial() : this._(result: null);
  const RoleFormState.loading({required Result<RoleModel>? result})
    : this._(result: result, isLoading: true);
  const RoleFormState.fetched({required Result<RoleModel> result}) : this._(result: result);
  const RoleFormState.failure({required Failure failure, required Result<RoleModel>? result})
    : this._(result: result, failure: failure);

  @override
  RoleFormState copyWith({
    Result<RoleModel>? result,
    bool? isLoading,
    bool? isUpdated,
    Failure? failure,
    ActionType? actionType,
    void Function()? onValidateAndSubmit,
  }) {
    return RoleFormState._(
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
