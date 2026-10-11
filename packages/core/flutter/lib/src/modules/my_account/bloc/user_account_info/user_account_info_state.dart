import 'package:copor_core/src/bloc/utils/bloc_state.dart';
import 'package:copor_core/src/error/failure.dart';
import 'package:copor_core/src/modules/my_account/data/model/account_info_model.dart';

final class UserAccountInfoState extends BaseState<AccountInfoModel> {
  final void Function()? onValidateAndSubmit;

  const UserAccountInfoState._({
    super.result,
    super.isLoading = false,
    super.isUpdated = false,
    super.failure,
    this.onValidateAndSubmit,
  });

  const UserAccountInfoState.initial() : this._();

  @override
  UserAccountInfoState copyWith({
    Result<AccountInfoModel>? result,
    bool? isLoading,
    bool? isUpdated,
    Failure? failure,
    void Function()? onValidateAndSubmit,
  }) {
    return UserAccountInfoState._(
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
