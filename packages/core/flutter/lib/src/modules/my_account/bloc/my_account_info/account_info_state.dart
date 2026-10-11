import 'package:copor_core/src/error/failure.dart';
import 'package:copor_core/src/modules/my_account/data/model/account_info_model.dart';
import 'package:copor_core/src/bloc/utils/bloc_state.dart';

final class AccountInfoState extends BaseState<AccountInfoModel> {
  final void Function()? onValidateAndSubmit;

  const AccountInfoState._({
    super.result,
    super.isLoading = false,
    super.isUpdated = false,
    super.failure,
    this.onValidateAndSubmit,
  });

  const AccountInfoState.initial() : this._();

  @override
  AccountInfoState copyWith({
    Result<AccountInfoModel>? result,
    bool? isLoading,
    bool? isUpdated,
    Failure? failure,
    bool setFailureToNull = false,
    void Function()? onValidateAndSubmit,
  }) {
    return AccountInfoState._(
      result: result ?? this.result,
      isLoading: isLoading ?? this.isLoading,
      isUpdated: isUpdated ?? this.isUpdated,
      failure: setFailureToNull ? null : failure ?? this.failure,
      onValidateAndSubmit: onValidateAndSubmit ?? this.onValidateAndSubmit,
    );
  }

  @override
  List<Object?> get props => [result, isLoading, isUpdated, failure, onValidateAndSubmit];
}
