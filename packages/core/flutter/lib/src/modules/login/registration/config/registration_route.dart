import 'package:copor_core/src/bloc/global_blocs/translation_bloc/translation_bloc.dart';
import 'package:copor_core/src/bloc/global_blocs/translation_bloc/translation_state.dart';
import 'package:copor_core/src/bloc/utils/bloc_listeners.dart';
import 'package:copor_core/src/bloc/utils/generic_bloc_listener.dart';
import 'package:copor_core/src/config/router/helper_pages/no_animation_page.dart';
import 'package:copor_core/src/config/router/routes.dart';
import 'package:copor_core/src/modules/login/registration/bloc/registration_bloc.dart';
import 'package:copor_core/src/modules/login/registration/bloc/registration_state.dart';
import 'package:copor_core/src/modules/login/registration/bloc/utils/registration_bloc_factory.dart';
import 'package:copor_core/src/modules/login/registration/config/registration_keys.dart';
import 'package:copor_core/src/modules/login/registration/data/model/translation/registration_translation.dart';
import 'package:copor_core/src/modules/login/registration/presentation/registration_page.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:get_it/get_it.dart';
import 'package:go_router/go_router.dart';

GoRoute createRegistrationRoute() {
  return GoRoute(
    path: AppRoutes.registration,
    pageBuilder: (context, state) {
      return NoAnimationPage(
        key: state.pageKey,
        child: MultiBlocProvider(
          providers: _registrationProviders(),
          child: MultiBlocListener(
            listeners: _registrationListeners(),
            child: const RegistrationPage(),
          ),
        ),
      );
    },
  );
}

List<BlocProvider> _registrationProviders() => [
  BlocProvider<TranslationBloc<RegistrationPageTranslation>>(
    create: RegistrationBlocFactory.initializeTranslationBloc,
  ),
  BlocProvider<RegistrationBloc>(create: (_) => GetIt.instance<RegistrationBloc>()),
];

List<BlocListener> _registrationListeners() => [
  createStandardListener<
    TranslationBloc<RegistrationPageTranslation>,
    TranslationState<RegistrationPageTranslation>
  >(
    loadingKey: RegistrationKeys.registrationLoadingView,
    failureKey: RegistrationKeys.registrationErrorView,
    warningKey: RegistrationKeys.registrationWarningView,
  ),
  LoadingListener<RegistrationBloc, RegistrationState>(
    loadingKey: RegistrationKeys.registrationRequestLoading,
  ),
  // Backend validation errors (e-mail in use, weak password, wrong code, ...) as banners.
  FailureListener<RegistrationBloc, RegistrationState>(
    failureKey: RegistrationKeys.registrationRequestFailure,
  ),
];
