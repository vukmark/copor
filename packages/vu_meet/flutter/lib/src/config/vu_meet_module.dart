import 'package:copor_core/src/core/module/module_preference_section.dart';
import 'package:copor_core/src/bloc/global_blocs/navigation_bloc/navigation_bloc.dart';
import 'package:copor_theme/copor_theme.dart';
import 'package:copor_core/src/components/scaffold/notification_destinations.dart';
import 'package:copor_core/src/config/dependency_injection.dart';
import 'package:copor_core/src/core/module/copor_module.dart';
import 'package:copor_core/src/core/system/device_service.dart';
import 'package:copor_vu_meet/src/config/vu_meet_dependency_injection.dart'
    as vu_meet_di;
import 'package:copor_vu_meet/src/config/vu_meet_push_notifications.dart';
import 'package:copor_vu_meet/src/config/vu_meet_router.dart';
import 'package:copor_vu_meet/src/config/vu_meet_routes.dart';
import 'package:copor_vu_meet/src/data/repository_impl/chat_list/chat_list_repository.dart';
import 'package:copor_vu_meet/src/logic/chat/chat_list/chat_list_bloc.dart';
import 'package:copor_vu_meet/src/logic/chat/chat_list/chat_list_event.dart';
import 'package:copor_vu_meet/src/logic/chat/selected_chat/selected_chat_cubit.dart';
import 'package:copor_vu_meet/src/logic/message/vu_meet_message/vu_meet_message_bloc.dart';
import 'package:copor_vu_meet/src/logic/message/vu_meet_message/vu_meet_message_event.dart';
import 'package:copor_vu_meet/src/logic/utils/vu_meet_bloc_factory.dart';
import 'package:copor_vu_meet/src/logic/call/call_bloc.dart';
import 'package:copor_vu_meet/src/logic/call/call_state.dart';
import 'package:copor_vu_meet/src/presentation/components/call/active_call_banner.dart';
import 'package:copor_vu_meet/src/presentation/components/call/title_or_return_to_call_pill.dart';
import 'package:copor_vu_meet/src/presentation/vu_meet_scaffold.dart';
import 'package:copor_scaffold/copor_scaffold.dart' show DSEmptyScaffold;
import 'package:firebase_messaging/firebase_messaging.dart';
import 'package:flutter/widgets.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:go_router/go_router.dart';
import 'package:provider/single_child_widget.dart';

class VuMeetModule extends CoporModule {
  const VuMeetModule();

  static const String moduleName = 'vu_meet';

  @override
  String get name => moduleName;

  @override
  List<ModulePreferenceSection> get preferenceSections => const [
    ModulePreferenceSection(
      titleKey: 'VU_MEET_NOTIFICATIONS',
      helpOnKey: 'VU_MEET_NOTIFICATIONS_ON',
      helpOffKey: 'VU_MEET_NOTIFICATIONS_OFF',
      order: 10,
      toggles: [
        ModulePreferenceToggle(
          preferenceKey: 'vu_meet.messagePushNotifications',
          labelKey: 'VU_MEET_MESSAGE_PUSH',
        ),
      ],
    ),
  ];

  @override
  Future<void> registerDependencies() => vu_meet_di.init();

  @override
  List<StatefulShellBranch> get routeBranches => [createVuMeetRoute()];

  @override
  List<String> get alwaysAccessibleRoutes => const [VuMeetRoutes.vuMeet];

  @override
  List<ModuleNavEntry> get navEntries => [
    ModuleNavEntry(
      route: VuMeetRoutes.vuMeet,
      icon: PhosphorIconsThin.chatCentered,
      selectedIcon: PhosphorIconsThin.chatCentered,
      labelBuilder: (t) => t.VU_MEET,
      order: 20,
      badgeKey: NotificationDestinations.vuMeet.key,
      showNotificationDot: true,
    ),
  ];

  @override
  Object? pageScaffold(BuildContext context, GoRouterState state, String path) {
    // On mobile a chat (and its info page) is full screen, without app chrome.
    if (context.isMobile && path.startsWith('/vu-meet/') && path != VuMeetRoutes.vuMeet) {
      return const DSEmptyScaffold();
    }
    switch (path) {
      case VuMeetRoutes.vuMeet:
      case VuMeetRoutes.vu_meet_chat:
      case VuMeetRoutes.vu_meet_chat_info:
        return VuMeetScaffold(state);
    }
    return null;
  }

  @override
  List<SingleChildWidget> globalProviders(BuildContext context) => [
    BlocProvider(lazy: false, create: (_) => VuMeetBlocFactory.initializeChatListBloc()),
  ];

  @override
  Future<void> onLogout() async {
    await getIt<ChatListRepository>().clearLocalCache();
    getIt<ChatListBloc>().add(const ResetChatList());
    getIt<SelectedChatCubit>().clearChat();
    getIt<VuMeetMessageBloc>().add(const SelectChatForMessages(null));
  }

  // Chat notifications in the inbox are keyed by the chat id (no prefix).
  @override
  bool openInboxNotification(String notificationId) {
    if (notificationId.contains(':')) return false;
    _openChat(notificationId);
    return true;
  }

  @override
  bool openPushNotification(Map<String, dynamic> data) {
    // Incoming calls are handled by CallKit, not by opening a page.
    if (data['type'] == 'incoming_call') return true;

    final chatId = data['chatId'] as String?;
    if (chatId == null || chatId.isEmpty) return false;
    _openChat(chatId);
    return true;
  }

  void _openChat(String chatId) {
    getIt<SelectedChatCubit>().selectChat(chatId);
    goToPage(VuMeetRoutes.getChatUri(chatId));
  }

  @override
  Future<void> onPushNotificationsInit() => VuMeetPushNotifications.onPushNotificationsInit();

  @override
  Future<bool> handleForegroundPush(RemoteMessage message) =>
      VuMeetPushNotifications.handleForegroundPush(message);

  @override
  Future<bool> handleBackgroundPush(RemoteMessage message) =>
      VuMeetPushNotifications.handleBackgroundPush(message);

  // Joins the Jitsi room the moment CallBloc reports a connected call, regardless
  // of which page is mounted — tying it to one screen's lifecycle (e.g. only when
  // the chat screen is mounted) made auto-join miss the recipient's accept.
  @override
  List<SingleChildWidget> scaffoldListeners() => [
    BlocListener<CallBloc, CallState>(
      bloc: getIt<CallBloc>(),
      listenWhen: (prev, curr) => curr is CallConnected,
      listener: (context, state) =>
          returnToCall(context, (state as CallConnected).chatId, isVideo: state.isVideo),
    ),
  ];

  @override
  Widget wrapAppBarTitle(Widget title) => TitleOrReturnToCallPill(title: title);
}
