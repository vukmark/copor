import 'package:copor_core/src/modules/administration/language/data/model/language_model.dart';
import 'package:copor_core/src/error/failure.dart';
import 'package:copor_core/src/bloc/utils/bloc_state.dart';

final class LanguageListState extends BaseState<List<LanguageModel>> {
  const LanguageListState._({super.result, super.isLoading, super.isUpdated, super.failure});

  const LanguageListState.initial() : this._(result: null);
  const LanguageListState.loading({required Result<List<LanguageModel>>? result})
    : this._(result: result, isLoading: true);
  const LanguageListState.fetched({required Result<List<LanguageModel>> result})
    : this._(result: result);
  const LanguageListState.failure({
    required Failure failure,
    required Result<List<LanguageModel>>? result,
  }) : this._(result: result, failure: failure);

  @override
  LanguageListState copyWith({
    Result<List<LanguageModel>>? result,
    bool? isLoading,
    bool? isUpdated,
    Failure? failure,
  }) {
    return LanguageListState._(
      result: result ?? this.result,
      isLoading: isLoading ?? this.isLoading,
      isUpdated: isUpdated ?? this.isUpdated,
      failure: failure ?? this.failure,
    );
  }
}
