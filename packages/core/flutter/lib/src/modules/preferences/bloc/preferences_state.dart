import 'package:copor_core/src/modules/preferences/data/model/preferences_model.dart';
import 'package:copor_core/src/error/failure.dart';
import 'package:copor_core/src/bloc/utils/bloc_state.dart';

final class PreferencesState extends BaseState<PreferencesModel> {
  const PreferencesState._({super.result, super.isLoading, super.isUpdated, super.failure});

  PreferencesState.initial() : this._(result: Result(data: PreferencesModel.defaultPreferences()));

  const PreferencesState.loading({required Result<PreferencesModel>? result})
    : this._(result: result, isLoading: true);
  const PreferencesState.fetched({required Result<PreferencesModel> result})
    : this._(result: result);
  const PreferencesState.failure({
    required Failure failure,
    required Result<PreferencesModel>? result,
  }) : this._(result: result, failure: failure);

  @override
  PreferencesState copyWith({
    Result<PreferencesModel>? result,
    bool? isLoading,
    bool? isUpdated,
    Failure? failure,
  }) {
    return PreferencesState._(
      result: result ?? this.result,
      isLoading: isLoading ?? this.isLoading,
      isUpdated: isUpdated ?? this.isUpdated,
      failure: failure ?? this.failure,
    );
  }

  @override
  List<Object?> get props => [result, isLoading, isUpdated, failure];
}
