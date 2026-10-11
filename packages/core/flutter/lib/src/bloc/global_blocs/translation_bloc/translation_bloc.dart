import 'package:bloc/bloc.dart';
import 'package:bloc_concurrency/bloc_concurrency.dart';
import 'package:copor_core/src/data/model/translation/translation_model.dart';
import 'package:copor_core/src/data/repository_impl/translation/translation_repository.dart';
import 'package:copor_core/src/bloc/global_blocs/translation_bloc/translation_state.dart';
import 'translation_event.dart';

import 'dart:async';

class TranslationBloc<T extends TranslationModel>
    extends Bloc<TranslationEvent, TranslationState<T>> {
  final TranslationRepository _translationRepository;

  TranslationBloc({required TranslationRepository translationRepository})
    : _translationRepository = translationRepository,
      super(TranslationState.initial()) {
    on<GetTranslationEvent<T>>(_onGetTranslation, transformer: restartable());
  }

  Future<void> _onGetTranslation(
    GetTranslationEvent<T> event,
    Emitter<TranslationState<T>> emit,
  ) async {
    emit(TranslationState.loading(result: state.result));
    final result = await _translationRepository.getTranslation<T>(
      event.namespace,
      event.languageModel,
      event.constructor,
    );

    result.fold(
      (failure) {
        emit(TranslationState.failure(failure: failure, result: state.result));
      },
      (translationResult) {
        emit(TranslationState.fetched(result: translationResult));
      },
    );
  }
}
