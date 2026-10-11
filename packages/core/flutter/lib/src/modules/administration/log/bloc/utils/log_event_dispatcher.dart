import 'package:copor_core/src/modules/administration/language/data/model/language_model.dart';
import 'package:copor_core/src/modules/administration/log/bloc/log_list/log_list_bloc.dart';
import 'package:copor_core/src/modules/administration/log/bloc/log_list/log_list_event.dart';
import 'package:copor_core/src/modules/administration/log/data/model/translation/log_translation.dart';
import 'package:copor_core/src/modules/administration/log/data/model/translation/log_type_translation.dart';
import 'package:copor_core/src/bloc/global_blocs/translation_bloc/translation_bloc.dart';
import 'package:copor_core/src/bloc/global_blocs/translation_bloc/translation_event.dart';

class LogBlocEventDispatcher {
  static _Translation translation = _Translation();
  static _Log log = _Log();
}

class _Translation {
  void getLogTranslation(TranslationBloc<LogPageTranslation> bloc, LanguageModel language) {
    bloc.add(
      GetTranslationEvent<LogPageTranslation>(
        namespace: LogPageTranslation.namespaceStatic,
        languageModel: language,
        constructor: (translationStringList) =>
            LogPageTranslation(translationStringList: translationStringList),
      ),
    );
  }

  void getLogTypeTranslation(TranslationBloc<LogTypeTranslation> bloc, LanguageModel language) {
    bloc.add(
      GetTranslationEvent<LogTypeTranslation>(
        namespace: 'log_type',
        languageModel: language,
        constructor: (translationStringList) =>
            LogTypeTranslation(translationStringList: translationStringList),
      ),
    );
  }
}

class _Log {
  void getLogList(LogListBloc bloc) {
    bloc.add(GetLogList());
  }
}
