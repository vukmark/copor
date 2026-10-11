import 'package:copor_core/src/error/failure.dart';
import 'package:copor_core/src/bloc/utils/bloc_state.dart';
import 'package:copor_core/src/modules/administration/log/data/model/log_info_model.dart';
import 'package:copor_core/src/utils/typedef.dart';

final class LogInfoState extends BaseState<LogInfoModel> {
  final ActionType? actionType;

  const LogInfoState._({
    super.result,
    super.isLoading,
    super.isUpdated,
    super.failure,
    this.actionType,
  });

  const LogInfoState.initial() : this._(result: null, isUpdated: false);

  const LogInfoState.loading({required Result<LogInfoModel>? result})
    : this._(result: result, isLoading: true);

  const LogInfoState.fetched({required Result<LogInfoModel>? result}) : this._(result: result);

  const LogInfoState.failure({required Failure failure, required Result<LogInfoModel>? result})
    : this._(result: result, failure: failure);

  @override
  LogInfoState copyWith({
    Result<LogInfoModel>? result,
    bool? isLoading,
    bool? isUpdated,
    Failure? failure,
    ActionType? actionType,
  }) {
    return LogInfoState._(
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
