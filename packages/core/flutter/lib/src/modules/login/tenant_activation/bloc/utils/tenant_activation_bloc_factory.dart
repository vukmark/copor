import 'package:copor_core/src/modules/login/registration/data/model/translation/registration_translation.dart';
import 'package:copor_core/src/bloc/global_blocs/translation_bloc/translation_bloc.dart';
import 'package:copor_core/src/bloc/utils/bloc_context_extensions.dart';
import 'package:copor_core/src/modules/login/tenant_activation/bloc/utils/tenant_activation_bloc_event_dispatcher.dart';
import 'package:flutter/cupertino.dart';

import 'package:copor_core/src/config/dependency_injection.dart';

class ActivationBlocFactory {
  static _ActivationTranslation translation = _ActivationTranslation();
}

class _ActivationTranslation {
  TranslationBloc<RegistrationPageTranslation> initializeActivationPageTranslationBloc(
    BuildContext context,
  ) {
    final bloc = getIt<TranslationBloc<RegistrationPageTranslation>>();
    ActivationBlocEventDispatcher.translation.getActivationTranslation(
      bloc,
      context.config.currentLanguage,
    );
    return bloc;
  }
}
