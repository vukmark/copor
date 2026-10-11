import 'package:copor_core/src/data/model/translation/translation_model.dart';
import 'package:copor_core/src/error/failure.dart';
import 'package:copor_core/src/bloc/utils/bloc_state.dart';

final class TranslationState<T extends TranslationModel> extends BaseState<T> {
  const TranslationState._({super.result, super.isLoading, super.isUpdated, super.failure});

  const TranslationState.initial() : this._(result: null);
  const TranslationState.loading({required Result<T>? result})
    : this._(result: result, isLoading: true);
  const TranslationState.fetched({required Result<T> result}) : this._(result: result);
  const TranslationState.failure({required Failure failure, required Result<T>? result})
    : this._(result: result, failure: failure);

  @override
  TranslationState<T> copyWith({
    Result<T>? result,
    bool? isLoading,
    bool? isUpdated,
    Failure? failure,
  }) {
    return TranslationState<T>._(
      result: result ?? this.result,
      isLoading: isLoading ?? this.isLoading,
      isUpdated: isUpdated ?? this.isUpdated,
      failure: failure ?? this.failure,
    );
  }
}
