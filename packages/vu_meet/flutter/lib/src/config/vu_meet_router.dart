import 'package:copor_core/src/bloc/global_blocs/app_scaffold_bloc/app_scaffold_cubit.dart';
import 'package:copor_core/src/bloc/global_blocs/navigation_bloc/navigation_bloc.dart';
import 'package:copor_core/src/bloc/global_blocs/translation_bloc/translation_bloc.dart';
import 'package:copor_core/src/bloc/global_blocs/translation_bloc/translation_state.dart';
import 'package:copor_core/src/bloc/utils/bloc_listeners.dart';
import 'package:copor_core/src/bloc/utils/generic_bloc_listener.dart';
import 'package:copor_core/src/config/dependency_injection.dart';
import 'package:copor_scaffold/copor_scaffold.dart' show DSBanner;
import 'package:copor_core/src/config/router/helper_pages/no_animation_page.dart';
import 'package:copor_core/src/config/router/utils/scope_builder.dart';
import 'package:copor_vu_meet/src/logic/utils/vu_meet_bloc_factory.dart';
import 'package:copor_vu_meet/src/logic/utils/vu_meet_bloc_reactions.dart';
import 'package:copor_vu_meet/src/config/scopes/vu_meet_page_scope.dart';
import 'package:copor_vu_meet/src/config/vu_meet_keys.dart';
import 'package:copor_vu_meet/src/config/vu_meet_routes.dart';
import 'package:copor_vu_meet/src/data/model/translation/vu_meet_translation.dart';
import 'package:copor_vu_meet/src/logic/chat/chat_list/chat_list_bloc.dart';
import 'package:copor_vu_meet/src/logic/chat/chat_list/chat_list_state.dart';
import 'package:copor_vu_meet/src/logic/chat/selected_chat/selected_chat_cubit.dart';
import 'package:copor_vu_meet/src/presentation/vu_meet_module_root.dart';
import 'package:copor_vu_meet/src/presentation/pages/call_summary/call_summary_page.dart';
import 'package:copor_vu_meet/src/presentation/pages/outgoing_call/outgoing_call_page.dart';
import 'package:copor_vu_meet/src/presentation/components/chat/chat_container.dart';
import 'package:copor_vu_meet/src/presentation/components/chat/chat_info.dart';
import 'package:copor_core/src/utils/global_keys.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_hooks/flutter_hooks.dart';
import 'package:go_router/go_router.dart';

StatefulShellBranch createVuMeetRoute() {
  return StatefulShellBranch(
    routes: [
      ShellRoute(
        builder: (context, state, child) => MultiBlocProvider(
          providers: _vuMeetProviders(),
          child: MultiBlocListener(listeners: _vuMeetListeners(), child: child),
        ),
        routes: [
          ShellRoute(
            builder: (context, state, child) => VuMeetPageScope(
              id: VuMeetPageScope.vuMeetPageScopeString,
              child: VuMeetModuleRoot(chatContent: child),
            ),
            routes: [
              GoRoute(
                path: VuMeetRoutes.vuMeet,
                pageBuilder: (context, state) =>
                    NoAnimationPage(key: state.pageKey, child: const _NoChatSelected()),
              ),
              GoRoute(
                path: VuMeetRoutes.vu_meet_chat,
                pageBuilder: (context, state) {
                  final String id = state.pathParameters['id']!;
                  return NoAnimationPage(
                    key: ValueKey('vu_meet_chat_page_$id'),
                    child: VuMeetPageScope(
                      id: id,
                      child: _ChatContent(chatId: id),
                    ),
                  );
                },
                routes: [
                  GoRoute(
                    path: VuMeetRoutes.relative_call,
                    parentNavigatorKey: rootNavigatorKey,
                    pageBuilder: (context, state) {
                      final String id = state.pathParameters['id']!;
                      return NoAnimationPage(
                        child: VuMeetPageScope(
                          id: id,
                          child: OutgoingCallPage(chatId: id),
                        ),
                      );
                    },
                  ),
                  GoRoute(
                    path: VuMeetRoutes.relative_call_summary,
                    parentNavigatorKey: rootNavigatorKey,
                    pageBuilder: (context, state) {
                      final String id = state.pathParameters['id']!;
                      final int seconds = int.tryParse(state.pathParameters['seconds'] ?? '') ?? 0;
                      return NoAnimationPage(
                        child: VuMeetPageScope(
                          id: id,
                          child: CallSummaryPage(
                            chatId: id,
                            duration: Duration(seconds: seconds),
                          ),
                        ),
                      );
                    },
                  ),
                  GoRoute(
                    path: VuMeetRoutes.relative_info,
                    pageBuilder: (context, state) {
                      final String id = state.pathParameters['id']!;
                      return NoAnimationPage(
                        child: VuMeetPageScope(
                          id: id,
                          child: SafeArea(child: ChatInfo(chatId: id)),
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

List<BlocProvider> _vuMeetProviders() => [
  BlocProvider<TranslationBloc<VuMeetPageTranslation>>(
    create: (context) => VuMeetBlocFactory.translation.initializeVuMeetTranslationBloc(context),
  ),
];

List<BlocListener> _vuMeetListeners() => [
  createStandardListener<
    TranslationBloc<VuMeetPageTranslation>,
    TranslationState<VuMeetPageTranslation>
  >(
    loadingKey: VuMeetKeys.vuMeetLoadingTranslation,
    failureKey: VuMeetKeys.vuMeetFailureView,
    warningKey: VuMeetKeys.vuMeetWarning,
  ),
  LanguageChangeListener(
    additionalLogic: (context, _) {
      VuMeetBlocReactions.vuMeet.getVuMeetPageTranslation(context);
    },
  ),
  createStandardListener<ChatListBloc, ChatListState>(
    loadingKey: VuMeetKeys.vuMeetLoadingChatList,
    failureKey: VuMeetKeys.vuMeetFailureView,
    warningKey: VuMeetKeys.vuMeetWarning,
    additionalLogic: (context, state) {
      if (state is ChatCreationSuccessState) {
        goToPage(VuMeetRoutes.getChatUri(state.newChatId));
      }
      if (state is RemovedFromGroupChatState) {
        final translations = context
            .read<TranslationBloc<VuMeetPageTranslation>>()
            .state
            .ensuredData;

        getIt<AppScaffoldCubit>().addBanner(
          DSBanner.warning(
            '${translations.REMOVED_FROM_GROUP_NOTIFICATION}: ${state.chatName}',
            source: 'removed_from_group_chat',
          ),
        );

        if (getIt<SelectedChatCubit>().state == state.chatId) {
          goToPage(VuMeetRoutes.vuMeet);
        }
      }
    },
  ),
];

class _NoChatSelected extends HookWidget {
  const _NoChatSelected();

  @override
  Widget build(BuildContext context) {
    useEffect(() {
      getIt<SelectedChatCubit>().clearChat();
      return null;
    }, []);
    return const SizedBox.shrink();
  }
}

class _ChatContent extends HookWidget {
  final String chatId;

  const _ChatContent({required this.chatId});

  @override
  Widget build(BuildContext context) {
    useEffect(() {
      getIt<SelectedChatCubit>().selectChat(chatId);
      return () => BlocScopeRegistry.dispose(chatId);
    }, [chatId]);

    return BlocBuilder<
      TranslationBloc<VuMeetPageTranslation>,
      TranslationState<VuMeetPageTranslation>
    >(
      builder: (context, state) {
        if (state.result == null) return const SizedBox.shrink();
        return ChatContainer(key: ValueKey(chatId), translation: state.ensuredData, chatId: chatId);
      },
    );
  }
}
