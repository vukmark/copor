import 'package:copor_core/src/modules/administration/language/bloc/language_bloc.dart';
import 'package:copor_core/src/modules/administration/language/config/language_bloc_event_dispatcher.dart';
import 'package:copor_core/src/modules/administration/language/data/model/translation/language_translation.dart';
import 'package:copor_core/src/bloc/global_blocs/translation_bloc/translation_bloc.dart';
import 'package:copor_core/src/bloc/utils/bloc_context_extensions.dart';
import 'package:flutter/material.dart';

import 'package:copor_core/src/config/dependency_injection.dart';

class LanguageBlocFactory {
  static _LanguageTranslation translation = _LanguageTranslation();

  static LanguageBloc initializeLanguageBloc() {
    final bloc = getIt<LanguageBloc>();
    LanguageBlocEventDispatcher.language.getLanguage(bloc);
    return bloc;
  }
}

class _LanguageTranslation {
  TranslationBloc<LanguagePageTranslation> initializeLanguagePageTranslationBloc(
    BuildContext context,
  ) {
    final bloc = getIt<TranslationBloc<LanguagePageTranslation>>();
    LanguageBlocEventDispatcher.translation.getLanguageTranslation(
      bloc,
      context.config.currentLanguage,
    );
    return bloc;
  }
}
