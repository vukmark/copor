import 'package:copor_core/src/bloc/global_blocs/translation_bloc/translation_bloc.dart';
import 'package:copor_core/src/bloc/global_blocs/translation_bloc/translation_state.dart';
import 'package:copor_core/src/bloc/utils/bloc_factory.dart';
import 'package:copor_core/src/bloc/utils/bloc_listeners.dart';
import 'package:copor_core/src/bloc/utils/bloc_reactions.dart';
import 'package:copor_core/src/bloc/utils/generic_bloc_listener.dart';
import 'package:copor_core/src/config/router/helper_pages/no_animation_page.dart';
import 'package:copor_core/src/config/dependency_injection.dart';
import 'package:copor_core/src/config/router/routes.dart';
import 'package:copor_core/src/modules/login/forgot_password/bloc/forgot_password_bloc.dart';
import 'package:copor_core/src/modules/login/forgot_password/bloc/forgot_password_state.dart';
import 'package:copor_core/src/modules/login/forgot_password/config/forgot_password_keys.dart';
import 'package:copor_core/src/modules/login/forgot_password/presentation/forgot_password_page.dart';
import 'package:copor_core/src/modules/login/login/data/model/translation/login_translation.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:go_router/go_router.dart';

GoRoute createForgotPasswordRoute() {
  return GoRoute(
    path: AppRoutes.forgotPassword,
    pageBuilder: (context, state) {
      return NoAnimationPage(
        key: state.pageKey,
        child: MultiBlocProvider(
          providers: _forgotPasswordProviders(),
          child: MultiBlocListener(
            listeners: _forgotPasswordListeners(),
            child: const ForgotPasswordPage(),
          ),
        ),
      );
    },
  );
}

List<BlocProvider> _forgotPasswordProviders() => [
  BlocProvider<TranslationBloc<LoginPageTranslation>>(
    create: (context) => BlocFactory.translation.initializeLoginPageTranslationBloc(context),
  ),
  BlocProvider<ForgotPasswordBloc>(create: (context) => getIt<ForgotPasswordBloc>()),
];

List<BlocListener> _forgotPasswordListeners() => [
  LanguageChangeListener(
    additionalLogic: (context, _) => BlocReactions.login.getLoginPageTranslation(context),
  ),
  createStandardListener<
    TranslationBloc<LoginPageTranslation>,
    TranslationState<LoginPageTranslation>
  >(
    loadingKey: ForgotPasswordKeys.forgotPasswordLoadingView,
    failureKey: ForgotPasswordKeys.forgotPasswordErrorView,
    warningKey: ForgotPasswordKeys.forgotPasswordWarningView,
  ),
  LoadingListener<ForgotPasswordBloc, ForgotPasswordState>(loadingKey: 'password_reset_loading'),
  FailureListener<ForgotPasswordBloc, ForgotPasswordState>(
    failureKey: ForgotPasswordKeys.forgotPasswordRequestFailure,
  ),
];
