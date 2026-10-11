import 'package:copor_core/src/bloc/global_blocs/authorization_bloc/authorization_bloc.dart';
import 'package:copor_core/src/bloc/global_blocs/authorization_bloc/authorization_event.dart';
import 'package:copor_core/src/bloc/global_blocs/authorization_bloc/authorization_state.dart';
import 'package:copor_core/src/bloc/global_blocs/translation_bloc/translation_bloc.dart';
import 'package:copor_core/src/bloc/global_blocs/translation_bloc/translation_event.dart';
import 'package:copor_core/src/bloc/utils/bloc_context_extensions.dart';
import 'package:copor_core/src/config/dispatcher.dart';
import 'package:copor_core/src/config/router/helper_pages/no_animation_page.dart';
import 'package:copor_core/src/config/router/routes.dart';
import 'package:copor_core/src/modules/forms/bloc/copor_form_bloc.dart';
import 'package:copor_core/src/modules/forms/bloc/copor_form_state.dart';
import 'package:copor_core/src/modules/login/contract_sign/data/model/translation/contract_sign_translation.dart';
import 'package:copor_core/src/modules/login/contract_sign/presentation/contract_sign_page.dart';
import 'package:copor_core/src/modules/login/registration/bloc/contract/contract_bloc.dart';
import 'package:copor_core/src/modules/login/registration/bloc/contract/contract_state.dart';
import 'package:copor_core/src/modules/login/registration/bloc/contract/utils/contract_event_dispatcher.dart';
import 'package:copor_scaffold/copor_scaffold.dart' show DSBanner;
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:go_router/go_router.dart';

import '../../../../config/dependency_injection.dart';

StatefulShellBranch createContractSignRoute() {
  return StatefulShellBranch(
    routes: [
      StatefulShellRoute.indexedStack(
        builder: (context, state, child) {
          return MultiBlocProvider(
            providers: [
              BlocProvider(create: (_) => getIt<CoporFormBloc>()),
              BlocProvider(create: (_) => getIt<ContractBloc>()),
              BlocProvider<TranslationBloc<ContractSignPageTranslation>>(
                create: (context) => getIt<TranslationBloc<ContractSignPageTranslation>>()
                  ..add(
                    GetTranslationEvent<ContractSignPageTranslation>(
                      namespace: ContractSignPageTranslation.namespaceStatic,
                      languageModel: context.config.currentLanguage,
                      constructor: (translationStringList) =>
                          ContractSignPageTranslation(translationStringList: translationStringList),
                    ),
                  ),
              ),
            ],
            child: MultiBlocListener(
              listeners: [
                BlocListener<ContractBloc, ContractState>(
                  listenWhen: (previous, current) =>
                      previous.result != current.result && current.result != null,
                  listener: (context, state) {
                    final contract = state.result?.data;
                    if (contract != null) {
                      ContractEventDispatcher.contract.openContract(contract);
                    }
                  },
                ),
                BlocListener<AuthorizationBloc, AuthorizationState>(
                  listenWhen: (previous, current) =>
                      previous.result != null && current.result == null,
                  listener: (context, state) {
                    getIt<Dispatcher>().go(AppRoutes.login);
                  },
                ),
                BlocListener<CoporFormBloc, CoporFormState>(
                  listenWhen: (previous, current) =>
                      previous.isUpdated != current.isUpdated && current.isUpdated == true,
                  listener: (context, state) {
                    context.read<AuthorizationBloc>().add(ClearRedirect());
                    getIt<GoRouter>().refresh();
                    context.getBloc.appScaffold.addBanner(
                      DSBanner.success(
                        context.getState.commonTranslation.ensuredData.CONTRACTS_SIGNED_SUCCESS,
                        source: 'contract_sign_success',
                      ),
                    );
                  },
                ),
              ],
              child: child,
            ),
          );
        },
        branches: [
          StatefulShellBranch(
            routes: [
              GoRoute(
                path: AppRoutes.contractSign,
                pageBuilder: (context, state) {
                  return NoAnimationPage(key: state.pageKey, child: const ContractSignPage());
                },
              ),
            ],
          ),
        ],
      ),
    ],
  );
}
