import 'package:copor_core/src/error/failure.dart';
import 'package:copor_core/src/modules/administration/user/data/model/user_model.dart';
import 'package:copor_core/src/bloc/utils/bloc_state.dart';
import 'package:copor_core/src/utils/typedef.dart';

final class UserFormState extends BaseState<UserModel> {
  final ActionType? actionType;

  const UserFormState._({
    super.result,
    super.isLoading,
    super.isUpdated,
    super.failure,
    this.actionType,
  });

  const UserFormState.initial() : this._(result: null);
  const UserFormState.loading({required Result<UserModel>? result})
    : this._(result: result, isLoading: true);
  const UserFormState.fetched({required Result<UserModel>? result}) : this._(result: result);
  const UserFormState.failure({required Failure failure, required Result<UserModel>? result})
    : this._(result: result, failure: failure);

  @override
  UserFormState copyWith({
    Result<UserModel>? result,
    bool? isLoading,
    bool? isUpdated,
    Failure? failure,
    ActionType? actionType,
  }) {
    return UserFormState._(
      result: result ?? this.result,
      isLoading: isLoading ?? this.isLoading,
      isUpdated: isUpdated ?? this.isUpdated,
      failure: failure ?? this.failure,
      actionType: actionType ?? this.actionType,
    );
  }

  @override
  List<Object?> get props => [result, isLoading, isUpdated, failure, actionType];
}
