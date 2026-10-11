import 'package:copor_core/src/data/model/server_health/server_health_model.dart';
import 'package:copor_core/src/error/failure.dart';
import 'package:copor_core/src/bloc/utils/bloc_state.dart';

final class ServerHealthState extends BaseState<ServerHealthModel> {
  const ServerHealthState._({super.result, super.isLoading, super.isUpdated, super.failure});

  const ServerHealthState.initial() : this._(result: null);
  const ServerHealthState.loading({required Result<ServerHealthModel>? result})
    : this._(result: result, isLoading: true);
  const ServerHealthState.fetched({required Result<ServerHealthModel> result})
    : this._(result: result);
  const ServerHealthState.failure({
    required Failure failure,
    required Result<ServerHealthModel>? result,
  }) : this._(result: result, failure: failure);

  @override
  ServerHealthState copyWith({
    Result<ServerHealthModel>? result,
    bool? isLoading,
    bool? isUpdated,
    Failure? failure,
  }) {
    return ServerHealthState._(
      result: result ?? this.result,
      isLoading: isLoading ?? this.isLoading,
      isUpdated: isUpdated ?? this.isUpdated,
      failure: failure ?? this.failure,
    );
  }
}
