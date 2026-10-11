import 'package:copor_core/src/bloc/global_blocs/translation_bloc/translation_bloc.dart';
import 'package:copor_core/src/bloc/global_blocs/translation_bloc/translation_event.dart';
import 'package:copor_core/src/modules/administration/language/data/model/language_model.dart';
import 'package:copor_contacts/src/data/model/translation/contact_translation.dart';

class ContactBlocEventDispatcher {
  static _Translation translation = _Translation();
}

class _Translation {
  void getContactTranslation(TranslationBloc<ContactPageTranslation> bloc, LanguageModel language) {
    bloc.add(
      GetTranslationEvent<ContactPageTranslation>(
        namespace: ContactPageTranslation.namespaceStatic,
        languageModel: language,
        constructor: (translationStringList) =>
            ContactPageTranslation(translationStringList: translationStringList),
      ),
    );
  }
}
