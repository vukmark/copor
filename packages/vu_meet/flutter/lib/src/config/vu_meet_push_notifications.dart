import 'dart:async';

import 'package:copor_core/src/bloc/global_blocs/app_scaffold_bloc/app_scaffold_cubit.dart';
import 'package:copor_core/src/bloc/global_blocs/authorization_bloc/authorization_bloc.dart';
import 'package:copor_core/src/bloc/global_blocs/notification_counter_bloc/utils/notification_counter_bloc_event_dispatcher.dart';
import 'package:copor_core/src/bloc/global_blocs/web_socket_bloc/web_socket_bloc.dart';
import 'package:copor_core/src/bloc/global_blocs/web_socket_bloc/web_socket_state.dart';
import 'package:copor_core/src/components/scaffold/notification_destinations.dart';
import 'package:copor_core/src/config/dependency_injection.dart';
import 'package:copor_core/src/config/push_notification_options.dart';
import 'package:copor_vu_meet/src/config/callkit_service.dart';
import 'package:copor_vu_meet/src/data/model/vu_meet_video_call/call_notification_model.dart';
import 'package:copor_vu_meet/src/logic/call/call_bloc.dart';
import 'package:copor_vu_meet/src/logic/call/call_event.dart';
import 'package:copor_vu_meet/src/logic/call/call_state.dart';
import 'package:copor_vu_meet/src/logic/call/declined_calls_cubit.dart';
import 'package:copor_vu_meet/src/logic/chat/chat_list/chat_list_bloc.dart';
import 'package:copor_vu_meet/src/logic/chat/chat_list/chat_list_event.dart';
import 'package:copor_vu_meet/src/logic/chat/selected_chat/selected_chat_cubit.dart';
import 'package:copor_vu_meet/src/presentation/components/call/incoming_call_screen.dart';
import 'package:copor_vu_meet/src/presentation/components/call/talkie_jitsi.dart';
import 'package:copor_core/src/utils/initials_avatar_generator.dart';
import 'package:copor_core/src/utils/push_notification/notification_service.dart';
import 'package:copor_scaffold/copor_scaffold.dart' show DSNotification;
import 'package:dio/dio.dart';
import 'package:firebase_messaging/firebase_messaging.dart';
import 'package:flutter/foundation.dart';
import 'package:flutter_callkit_incoming/flutter_callkit_incoming.dart';
import 'package:flutter_local_notifications/flutter_local_notifications.dart';
import 'package:jitsi_meet_flutter_sdk/jitsi_meet_flutter_sdk.dart';

/// VuMeet's call signals and chat pushes. A call signal has the same payload
/// whether it arrives as an FCM push (app in the background or closed) or as
/// a WebSocket message (app open and connected), see `VuMeetWebSocket` on the
/// server.
abstract final class VuMeetPushNotifications {
  static const String INCOMING_CALL = 'incoming_call';
  static const String DECLINE_CALL = 'decline_call';
  static const String CALL_ACCEPTED = 'call_accepted';
  static const String TERMINATE_CALL = 'terminate_call';

  static StreamSubscription<WebSocketState>? _callSignalSub;

  static bool isValidIncomingCall(String? messageType) {
    return PushNotificationHelper.isNativeCallSupportedOnThisPlatform() &&
        (messageType == INCOMING_CALL ||
            messageType == DECLINE_CALL ||
            messageType == CALL_ACCEPTED);
  }

  static Future<void> onPushNotificationsInit() async {
    if (PushNotificationHelper.isNativeCallSupportedOnThisPlatform()) {
      await getIt<CallKitService>().init();
    }
    _initCallSignaling();
  }

  /// Live call signaling over the WebSocket - independent of push notification
  /// permission/token state, so an incoming call still rings while the app is
  /// foregrounded and connected even if FCM delivery is denied, delayed, or lost.
  static void _initCallSignaling() {
    _callSignalSub?.cancel();
    _callSignalSub = getIt<WebSocketBloc>().stream.listen((wsState) {
      if (wsState is! WebSocketMessageReceived) return;

      final eventType = wsState.message.event;
      if (eventType != 'PRIVATE_CALL' && eventType != 'GROUP_CALL') return;

      handleCallData(wsState.message.payload);
    });
  }

  static Future<bool> handleForegroundPush(RemoteMessage message) async {
    if (await handleCallData(message.data)) return true;

    final notification = message.notification;
    final chatId = message.data['chatId'] as String?;
    if (chatId == null || chatId.isEmpty || notification == null) return false;

    final authToken = getIt<AuthorizationBloc>().state.result?.data.authToken ?? '';
    if (authToken.isEmpty) return true;
    if (kIsWeb) return true;
    final webSocketState = getIt<WebSocketBloc>().state;
    final isWebSocketAvailable =
        webSocketState is WebSocketConnected || webSocketState is WebSocketMessageReceived;
    if (isWebSocketAvailable) return true;

    final activeChatId = getIt<SelectedChatCubit>().state;
    if (chatId == activeChatId) return true;

    await NotificationService.showLocalNotification(
      id: (message.messageId ?? chatId).hashCode,
      title: notification.title ?? '',
      body: notification.body ?? '',
    );

    final dsNotification = DSNotification(
      id: chatId,
      title: notification.title ?? '',
      body: notification.body ?? '',
      imageUrl: null,
      unreadCount: 1,
    );
    final scaffoldCubit = getIt<AppScaffoldCubit>();
    scaffoldCubit.addNotification(dsNotification);
    scaffoldCubit.addToInbox(dsNotification);
    scaffoldCubit.incrementBadgeCount(NotificationDestinations.bell.key);
    getIt<ChatListBloc>().add(const GetChatList(filterByName: '', showLoading: false));
    NotificationCounterDispatcher.notificationCounter.getNotificationsCount();
    return true;
  }

  /// Returns true if [data] was a call event and has been handled.
  static Future<bool> handleCallData(Map<String, dynamic> data) async {
    if (data['type'] == INCOMING_CALL) {
      IncomingCallOverlay.show(CallNotificationModel.fromJson(data));
      return true;
    }

    if (data['type'] == DECLINE_CALL) {
      getIt<DeclinedCallsCubit>().setNumberOfDeclinedCalls(
        int.parse(data['numberOfDeclinedCalls']),
      );
      return true;
    }
    if (data['type'] == CALL_ACCEPTED && getIt<CallBloc>().state is CallOutgoing) {
      getIt<CallBloc>().add(CallAnsweredReceived());
      return true;
    }

    if (data['type'] == TERMINATE_CALL ||
        data['type'] == 'end_call' ||
        data['type'] == 'timeout_call') {
      IncomingCallOverlay.dismiss();

      final callBloc = getIt<CallBloc>();

      if (callBloc.state is CallConnected) {
        final chatId = data['chatId'] as String?;
        final chats = getIt<ChatListBloc>().state.result?.data;
        final isGroupChat = chats?.any((c) => c.id == chatId && !c.isPrivate) ?? false;

        if (isGroupChat) return true;

        final durationSeconds = int.tryParse(data['durationSeconds'] ?? '');
        JitsiCallSignal.markEndedByRemote(
          duration: durationSeconds != null ? Duration(seconds: durationSeconds) : null,
        );
        try {
          await JitsiMeet().hangUp();
        } catch (_) {}
        return true;
      }

      final declinerName = data['type'] == TERMINATE_CALL ? data['declinerName'] as String? : null;
      callBloc.add(CallDeclinedReceived(declinerName: declinerName));
      try {
        await FlutterCallkitIncoming.endCall(data['chatId']);
      } catch (_) {}
      return true;
    }

    return false;
  }

  /// Rings the native call UI, ends it, or shows a missed call while the app
  /// is in the background or closed.
  static Future<bool> handleBackgroundPush(RemoteMessage message) async {
    final type = message.data['type'] as String?;
    var handled = false;

    if (isValidIncomingCall(type)) {
      handled = true;
      final notification = CallNotificationModel.fromJson(message.data);
      try {
        final callKit = getIt<CallKitService>();
        await callKit.showCallNotification(notification);
      } catch (error) {
        // Native CallKit/Telecom registration can fail entirely on some devices/emulators
        // (e.g. android.software.telecom unsupported) - fall back to a plain local
        // notification so an incoming call is never completely silent.
        debugPrint('🚨 CallKit incoming-call notification failed, falling back: $error');
        await _showIncomingCallFallbackNotification(notification);
      }
    }

    if (type == 'end_call' || type == 'timeout_call') {
      handled = true;
      try {
        await FlutterCallkitIncoming.endCall(message.data['chatId']);
      } catch (_) {}
    }

    if (type == 'timeout_call') {
      final callerName = message.data['callerName'] as String? ?? '';
      final chatId = message.data['chatId'] as String? ?? '';
      final avatarUrl = message.data['avatar'] as String? ?? '';
      try {
        await flutterLocalNotificationsPlugin.show(
          chatId.hashCode,
          'Missed call',
          callerName.isNotEmpty ? 'Missed call from $callerName' : 'You missed a call',
          NotificationDetails(
            android: AndroidNotificationDetails(
              androidNotificationChannel.id,
              androidNotificationChannel.name,
              channelDescription: androidNotificationChannel.description,
              importance: Importance.high,
              priority: Priority.high,
              largeIcon: await _resolveNotificationLargeIcon(avatarUrl, callerName),
            ),
            iOS: const DarwinNotificationDetails(),
          ),
        );
      } catch (_) {}
    }

    return handled;
  }

  static Future<void> _showIncomingCallFallbackNotification(
    CallNotificationModel notification,
  ) async {
    try {
      await flutterLocalNotificationsPlugin.show(
        notification.chatId.hashCode,
        'Incoming call',
        '${notification.callerName} is calling',
        NotificationDetails(
          android: AndroidNotificationDetails(
            androidNotificationChannel.id,
            androidNotificationChannel.name,
            channelDescription: androidNotificationChannel.description,
            importance: Importance.high,
            priority: Priority.high,
            largeIcon: await _resolveNotificationLargeIcon(
              notification.avatar,
              notification.callerName,
            ),
          ),
          iOS: const DarwinNotificationDetails(),
        ),
      );
    } catch (_) {}
  }

  static Future<AndroidBitmap<Object>?> _resolveNotificationLargeIcon(
    String avatarUrl,
    String callerName,
  ) async {
    if (avatarUrl.isNotEmpty) {
      try {
        final response = await Dio().get<List<int>>(
          avatarUrl,
          options: Options(responseType: ResponseType.bytes),
        );
        final bytes = response.data;
        if (bytes != null) {
          return ByteArrayAndroidBitmap(Uint8List.fromList(bytes));
        }
      } catch (_) {
        // Fall through to the generated initials avatar below.
      }
    }

    try {
      return ByteArrayAndroidBitmap(await InitialsAvatarGenerator.generate(callerName));
    } catch (_) {
      return null;
    }
  }
}
