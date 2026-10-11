import 'package:copor_core/src/error/failure.dart';
import 'package:copor_core/src/modules/administration/log/data/model/log_model.dart';
import 'package:copor_core/src/bloc/utils/bloc_state.dart';

final class LogListState extends BaseState<List<LogModel>> {
  const LogListState._({super.result, super.isLoading = false, super.isUpdated, super.failure});

  const LogListState.initial() : this._(result: null);

  const LogListState.loading({required Result<List<LogModel>>? result})
    : this._(result: result, isLoading: true);

  const LogListState.fetched({required Result<List<LogModel>>? result}) : this._(result: result);

  const LogListState.failure({required Failure failure, required Result<List<LogModel>>? result})
    : this._(result: result, failure: failure);

  @override
  LogListState copyWith({
    Result<List<LogModel>>? result,
    bool? isLoading,
    bool? isUpdated,
    Failure? failure,
  }) {
    return LogListState._(
      result: result ?? this.result,
      isLoading: isLoading ?? this.isLoading,
      isUpdated: isUpdated ?? this.isUpdated,
      failure: failure ?? this.failure,
    );
  }

  @override
  List<Object?> get props => [result, isLoading, isUpdated, failure];
}
