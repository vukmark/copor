import 'package:copor_core/src/bloc/global_blocs/config_bloc/config_bloc.dart';
import 'package:copor_core/src/bloc/global_blocs/config_bloc/config_state.dart';
import 'package:copor_core/src/bloc/global_blocs/translation_bloc/translation_bloc.dart';
import 'package:copor_core/src/bloc/global_blocs/translation_bloc/translation_state.dart';
import 'package:copor_core/src/bloc/utils/bloc_context_extensions.dart';
import 'package:copor_core/src/bloc/utils/bloc_reactions.dart';
import 'package:copor_contacts/src/bloc/contact_bloc.dart';
import 'package:copor_contacts/src/bloc/contact_state.dart';
import 'package:copor_contacts/src/bloc/utils/contact_bloc_factory.dart';
import 'package:copor_contacts/src/bloc/utils/contact_bloc_reactions.dart';
import 'package:copor_contacts/src/config/contact_keys.dart';
import 'package:copor_contacts/src/data/model/translation/contact_translation.dart';
import 'package:copor_contacts/src/presentation/contact_page/contact_page.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:go_router/go_router.dart';
import 'package:copor_contacts/src/config/contact_routes.dart';
import 'package:copor_scaffold/copor_scaffold.dart' show DSBanner;
import 'package:copor_core/src/config/router/helper_pages/no_animation_page.dart';

StatefulShellBranch createContactRoute() {
  return StatefulShellBranch(
    routes: [
      StatefulShellRoute.indexedStack(
        key: GlobalKey<StatefulNavigationShellState>(debugLabel: 'ContactShell'),
        builder: (context, state, navigationShell) {
          return MultiBlocProvider(
            providers: _createBlocProviders(context),
            child: MultiBlocListener(
              listeners: _createBlocListeners(context),
              child: navigationShell,
            ),
          );
        },
        branches: [
          StatefulShellBranch(
            navigatorKey: GlobalKey<NavigatorState>(debugLabel: 'ContactBranchNavigator'),
            routes: [
              GoRoute(
                path: ContactRoutes.contacts,
                pageBuilder: (context, state) {
                  return const NoAnimationPage(
                    key: ValueKey('page_wrapper_contact_list'),
                    child: ContactPage(key: ValueKey('contact_page_contact_list')),
                  );
                },
                routes: [
                  GoRoute(
                    path: ':id',
                    pageBuilder: (context, state) {
                      final id = state.pathParameters['id'];

                      return NoAnimationPage(
                        key: ValueKey('page_wrapper_contact_detail_$id'),
                        child: ContactPage(
                          key: ValueKey('contact_page_contact_detail_$id'),
                          contactId: id,
                        ),
                      );
                    },
                  ),
                ],
              ),
            ],
          ),
        ],
      ),
    ],
  );
}

List<BlocProvider> _createBlocProviders(BuildContext context) {
  return [
    BlocProvider<TranslationBloc<ContactPageTranslation>>(
      create: (_) => ContactBlocFactory.initializeContactTranslationBloc(context),
    ),
    BlocProvider<ContactBloc>(create: (_) => ContactBlocFactory.createBloc(context)),
  ];
}

List<BlocListener> _createBlocListeners(BuildContext context) {
  return [
    BlocListener<TranslationBloc<ContactPageTranslation>, TranslationState<ContactPageTranslation>>(
      listener: (context, translationState) {
        BlocReactions.common.addPageLoadingToScaffold(
          context,
          translationState,
          ContactKeys.contactLoadingTranslationKey,
        );
        BlocReactions.common.addFailureToScaffold(
          context,
          translationState,
          ContactKeys.contactFailureKey,
        );
      },
    ),
    BlocListener<ConfigBloc, ConfigState>(
      listenWhen: (previous, current) =>
          previous.result?.data.language != current.result?.data.language,
      listener: (context, configState) {
        ContactBlocReactions.contact.getContactPageTranslation(context);
      },
    ),
    BlocListener<ContactBloc, ContactState>(
      listenWhen: (previous, current) => previous.listFailure != current.listFailure,
      listener: (context, state) {
        final scaffoldCubit = context.getBloc.appScaffold;
        if (state.listFailure != null) {
          scaffoldCubit.addBanner(
            DSBanner.error(state.listFailure!.message, source: 'contact_list_failure'),
          );
        }
      },
    ),
    BlocListener<ContactBloc, ContactState>(
      listenWhen: (previous, current) => previous.detailFailure != current.detailFailure,
      listener: (context, state) {
        final scaffoldCubit = context.getBloc.appScaffold;
        if (state.detailFailure != null) {
          scaffoldCubit.addBanner(
            DSBanner.error(state.detailFailure!.message, source: 'contact_detail_failure'),
          );
        }
      },
    ),
  ];
}
