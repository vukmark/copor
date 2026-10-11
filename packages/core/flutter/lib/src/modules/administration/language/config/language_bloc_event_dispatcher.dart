import 'package:copor_core/src/modules/administration/language/bloc/language_bloc.dart';
import 'package:copor_core/src/modules/administration/language/bloc/language_event.dart';
import 'package:copor_core/src/modules/administration/language/data/model/language_model.dart';
import 'package:copor_core/src/modules/administration/language/data/model/translation/language_translation.dart';
import 'package:copor_core/src/bloc/global_blocs/translation_bloc/translation_bloc.dart';
import 'package:copor_core/src/bloc/global_blocs/translation_bloc/translation_event.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_hooks/flutter_hooks.dart';

class LanguageBlocEventDispatcher {
  static _Translation translation = _Translation();
  static _Language language = _Language();
  static _Hook hook = _Hook();
}

class _Translation {
  void getLanguageTranslation(
    TranslationBloc<LanguagePageTranslation> bloc,
    LanguageModel language,
  ) {
    bloc.add(
      GetTranslationEvent<LanguagePageTranslation>(
        namespace: LanguagePageTranslation.namespaceStatic,
        languageModel: language,
        constructor: (translationStringList) =>
            LanguagePageTranslation(translationStringList: translationStringList),
      ),
    );
  }
}

class _Language {
  void getLanguage(LanguageBloc bloc) {
    bloc.add(GetLanguage());
  }
}

class _Hook {
  void getLanguageList() {
    final context = useContext();

    useEffect(() {
      LanguageBlocEventDispatcher.language.getLanguage(context.read<LanguageBloc>());
      return null;
    }, []);
  }
}
