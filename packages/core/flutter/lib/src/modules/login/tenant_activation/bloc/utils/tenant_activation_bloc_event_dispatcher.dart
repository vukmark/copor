import 'package:copor_core/src/modules/login/registration/data/model/translation/registration_translation.dart';
import 'package:copor_core/src/modules/administration/language/data/model/language_model.dart';
import 'package:copor_core/src/bloc/global_blocs/translation_bloc/translation_bloc.dart';
import 'package:copor_core/src/bloc/global_blocs/translation_bloc/translation_event.dart';

class ActivationBlocEventDispatcher {
  static _Translation translation = _Translation();
}

class _Translation {
  void getActivationTranslation(
    TranslationBloc<RegistrationPageTranslation> bloc,
    LanguageModel language,
  ) {
    bloc.add(
      GetTranslationEvent<RegistrationPageTranslation>(
        namespace: RegistrationPageTranslation.namespaceStatic,
        languageModel: language,
        constructor: (translationStringList) =>
            RegistrationPageTranslation(translationStringList: translationStringList),
      ),
    );
  }
}
