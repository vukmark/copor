import 'package:copor_core/src/bloc/global_blocs/app_scaffold_bloc/app_scaffold_cubit.dart';
import 'package:copor_core/src/bloc/global_blocs/authorization_bloc/authorization_bloc.dart';
import 'package:copor_core/src/bloc/global_blocs/authorization_bloc/authorization_state.dart';
import 'package:copor_core/src/bloc/global_blocs/translation_bloc/translation_bloc.dart';
import 'package:copor_core/src/bloc/global_blocs/translation_bloc/translation_state.dart';
import 'package:copor_core/src/bloc/utils/bloc_factory.dart';
import 'package:copor_core/src/bloc/utils/bloc_listeners.dart';
import 'package:copor_core/src/bloc/utils/bloc_reactions.dart';
import 'package:copor_core/src/bloc/utils/generic_bloc_listener.dart';
import 'package:copor_core/src/config/router/helper_pages/no_animation_page.dart';
import 'package:copor_core/src/config/router/routes.dart';
import 'package:copor_core/src/modules/login/login/config/login_keys.dart';
import 'package:copor_core/src/modules/login/login/data/model/translation/login_translation.dart';
import 'package:copor_core/src/modules/login/login/presentation/login_page.dart';
import 'package:copor_core/src/modules/login/registration/bloc/contract/contract_bloc.dart';
import 'package:copor_core/src/modules/login/registration/bloc/registration_status_cubit.dart';
import 'package:copor_core/src/modules/login/registration/bloc/utils/registration_bloc_factory.dart';
import 'package:copor_core/src/modules/login/registration/bloc/contract/contract_state.dart';
import 'package:copor_core/src/modules/login/registration/bloc/contract/utils/contract_event_dispatcher.dart';
import 'package:flutter/widgets.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:go_router/go_router.dart';

import '../../../../bloc/global_blocs/notification_counter_bloc/config/notification_counter_dependency_injection.dart';

GoRoute createLoginRoute() {
  return GoRoute(
    path: AppRoutes.login,
    pageBuilder: (context, state) {
      return NoAnimationPage(
        key: state.pageKey,
        child: MultiBlocProvider(
          providers: _loginProviders(),
          child: MultiBlocListener(
            listeners: _loginListeners(),
            child: const _LoginLoadingCleanup(child: LoginPage()),
          ),
        ),
      );
    },
  );
}

List<BlocProvider> _loginProviders() => [
  BlocProvider<TranslationBloc<LoginPageTranslation>>(
    create: (context) => BlocFactory.translation.initializeLoginPageTranslationBloc(context),
  ),
  BlocProvider<ContractBloc>.value(value: getIt<ContractBloc>()),
  BlocProvider<RegistrationStatusCubit>(
    create: (_) => RegistrationBlocFactory.initializeStatusCubit(),
  ),
];

List<BlocListener> _loginListeners() => [
  LanguageChangeListener(
    additionalLogic: (context, _) => BlocReactions.login.getLoginPageTranslation(context),
  ),
  createStandardListener<
    TranslationBloc<LoginPageTranslation>,
    TranslationState<LoginPageTranslation>
  >(
    loadingKey: LoginKeys.loadingLoginPageTranslation,
    failureKey: LoginKeys.failureLoginPageTranslation,
    warningKey: LoginKeys.warningLoginPageTranslation,
  ),
  FailureListener<AuthorizationBloc, AuthorizationState>(failureKey: LoginKeys.failureLogin),
  BlocListener<ContractBloc, ContractState>(
    listenWhen: (previous, current) => previous.result != current.result && current.result != null,
    listener: (context, state) {
      final contract = state.result?.data;
      if (contract != null) {
        ContractEventDispatcher.contract.openContract(contract);
      }
    },
  ),
];

class _LoginLoadingCleanup extends StatefulWidget {
  final Widget child;

  const _LoginLoadingCleanup({required this.child});

  @override
  State<_LoginLoadingCleanup> createState() => _LoginLoadingCleanupState();
}

class _LoginLoadingCleanupState extends State<_LoginLoadingCleanup> {
  late AppScaffoldCubit _appScaffoldCubit;

  @override
  void didChangeDependencies() {
    super.didChangeDependencies();
    _appScaffoldCubit = context.read<AppScaffoldCubit>();
  }

  @override
  void dispose() {
    _appScaffoldCubit.removeLoadingSource(LoginKeys.loadingLoginPageTranslation);
    super.dispose();
  }

  @override
  Widget build(BuildContext context) => widget.child;
}
