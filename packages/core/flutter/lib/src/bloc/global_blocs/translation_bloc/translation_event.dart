import 'package:copor_core/src/modules/administration/language/data/model/language_model.dart';
import 'package:copor_core/src/data/model/translation/translation_model.dart';
import 'package:copor_core/src/utils/typedef.dart';
import 'package:equatable/equatable.dart';

sealed class TranslationEvent extends Equatable {
  const TranslationEvent();

  @override
  List<Object?> get props => [];
}

class GetTranslationEvent<T extends TranslationModel> extends TranslationEvent {
  final String namespace;
  final LanguageModel languageModel;
  final TranslationConstructor<T> constructor;

  const GetTranslationEvent({
    required this.namespace,
    required this.languageModel,
    required this.constructor,
  });
}
