import 'package:copor_core/src/data/model/config/config_model.dart';
import 'package:copor_core/src/error/failure.dart';
import 'package:copor_core/src/bloc/utils/bloc_state.dart';

final class ConfigState extends BaseState<ConfigModel> {
  const ConfigState._({super.result, super.isLoading, super.isUpdated, super.failure});

  const ConfigState.initial() : this._(result: null);
  const ConfigState.loading({required Result<ConfigModel>? result})
    : this._(result: result, isLoading: true);
  const ConfigState.fetched({required Result<ConfigModel> result}) : this._(result: result);
  const ConfigState.failure({required Failure failure, required Result<ConfigModel>? result})
    : this._(result: result, failure: failure);

  @override
  ConfigState copyWith({
    Result<ConfigModel>? result,
    bool? isLoading,
    bool? isUpdated,
    Failure? failure,
  }) {
    return ConfigState._(
      result: result ?? this.result,
      isLoading: isLoading ?? this.isLoading,
      isUpdated: isUpdated ?? this.isUpdated,
      failure: failure ?? this.failure,
    );
  }
}
