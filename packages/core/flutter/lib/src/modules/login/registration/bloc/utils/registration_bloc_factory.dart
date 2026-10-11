import 'package:copor_core/src/bloc/global_blocs/translation_bloc/translation_bloc.dart';
import 'package:copor_core/src/bloc/global_blocs/translation_bloc/translation_event.dart';
import 'package:copor_core/src/bloc/utils/bloc_context_extensions.dart';
import 'package:copor_core/src/modules/login/registration/bloc/registration_status_cubit.dart';
import 'package:copor_core/src/modules/login/registration/data/model/translation/registration_translation.dart';
import 'package:flutter/material.dart';
import 'package:get_it/get_it.dart';

class RegistrationBlocFactory {
  static TranslationBloc<RegistrationPageTranslation> initializeTranslationBloc(
    BuildContext context,
  ) {
    return GetIt.instance<TranslationBloc<RegistrationPageTranslation>>()..add(
      GetTranslationEvent<RegistrationPageTranslation>(
        namespace: RegistrationPageTranslation.namespaceStatic,
        languageModel: context.config.currentLanguage,
        constructor: (translationStringList) =>
            RegistrationPageTranslation(translationStringList: translationStringList),
      ),
    );
  }

  static RegistrationStatusCubit initializeStatusCubit() {
    return GetIt.instance<RegistrationStatusCubit>()..load();
  }
}
