import 'package:copor_core/src/bloc/global_blocs/translation_bloc/translation_bloc.dart';
import 'package:copor_core/src/bloc/global_blocs/translation_bloc/translation_state.dart';
import 'package:copor_core/src/bloc/utils/guarded_bloc_builder.dart';
import 'package:copor_core/src/components/responsive_edit_wrapper.dart';
import 'package:copor_core/src/modules/administration/log/bloc/log_info/log_info_bloc.dart';
import 'package:copor_core/src/modules/administration/log/bloc/log_info/log_info_state.dart';
import 'package:copor_core/src/modules/administration/log/bloc/utils/log_bloc_factory.dart';
import 'package:copor_core/src/modules/administration/log/bloc/utils/log_info_bloc_factory.dart';
import 'package:copor_core/src/modules/administration/log/data/model/translation/log_translation.dart';
import 'package:copor_core/src/modules/administration/log/presentation/log_info_view.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_hooks/flutter_hooks.dart';

class LogInfoPage extends HookWidget {
  final String id;

  const LogInfoPage({super.key, required this.id});

  @override
  Widget build(BuildContext context) {
    return BlocProvider<TranslationBloc<LogPageTranslation>>(
      create: (context) => LogBlocFactory.translation.initializeLogPageTranslationBloc(context),
      child:
          GuardedBlocBuilder<
            TranslationBloc<LogPageTranslation>,
            TranslationState<LogPageTranslation>
          >(
            builder: (context, translationState) {
              return ResponsiveEditWrapper(
                child: LogInfoView(translation: translationState.ensuredData, id: id),
              );
            },
          ),
    );
  }
}

class LogInfoView extends HookWidget {
  final String id;
  final LogPageTranslation translation;

  const LogInfoView({super.key, required this.translation, required this.id});

  @override
  Widget build(BuildContext context) {
    return BlocProvider<LogInfoBloc>(
      create: (_) => LogInfoBlocFactory.initializeLogInfoBloc(id),
      child: GuardedBlocBuilder<LogInfoBloc, LogInfoState>(
        builder: (context, logInfoState) {
          return LogInfoViewContent(translation: translation, logData: logInfoState.ensuredData);
        },
      ),
    );
  }
}
