import 'package:copor_core/src/config/dependency_injection.dart';
import 'package:copor_core/src/modules/administration/log/bloc/log_list/log_list_bloc.dart';
import 'package:copor_core/src/modules/administration/log/bloc/utils/log_event_dispatcher.dart';
import 'package:copor_core/src/modules/administration/log/data/model/translation/log_translation.dart';
import 'package:copor_core/src/modules/administration/log/data/model/translation/log_type_translation.dart';
import 'package:copor_core/src/bloc/global_blocs/translation_bloc/translation_bloc.dart';
import 'package:copor_core/src/bloc/utils/bloc_context_extensions.dart';
import 'package:flutter/material.dart';

class LogBlocFactory {
  static _LogTranslation translation = _LogTranslation();

  static LogListBloc initializeLogListBloc(BuildContext context) {
    final bloc = getIt<LogListBloc>();
    LogBlocEventDispatcher.log.getLogList(bloc);
    return bloc;
  }
}

class _LogTranslation {
  TranslationBloc<LogPageTranslation> initializeLogPageTranslationBloc(BuildContext context) {
    final bloc = getIt<TranslationBloc<LogPageTranslation>>();
    LogBlocEventDispatcher.translation.getLogTranslation(bloc, context.config.currentLanguage);
    return bloc;
  }

  TranslationBloc<LogTypeTranslation> initializeLogTypePageTranslationBloc(BuildContext context) {
    final bloc = getIt<TranslationBloc<LogTypeTranslation>>();
    LogBlocEventDispatcher.translation.getLogTypeTranslation(bloc, context.config.currentLanguage);
    return bloc;
  }
}
