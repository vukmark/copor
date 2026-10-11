import 'dart:async';
import 'package:copor_vu_meet/src/data/model/vu_meet_video_call/call_notification_model.dart';
import 'package:copor_core/src/bloc/global_blocs/authorization_bloc/authorization_bloc.dart';
import 'package:copor_vu_meet/src/helpers/call_navigation.dart';
import 'package:copor_vu_meet/src/logic/call/call_bloc.dart';
import 'package:copor_vu_meet/src/logic/call/call_event.dart' as CoporCallEvent;
import 'package:copor_vu_meet/src/logic/call/declined_calls_cubit.dart';
import 'package:flutter_callkit_incoming/entities/android_params.dart';
import 'package:flutter_callkit_incoming/entities/call_event.dart';
import 'package:flutter_callkit_incoming/entities/call_kit_params.dart';
import 'package:flutter_callkit_incoming/entities/ios_params.dart';
import 'package:flutter_callkit_incoming/entities/notification_params.dart';
import 'package:flutter_callkit_incoming/flutter_callkit_incoming.dart';
import 'package:flutter/foundation.dart';
import 'package:copor_core/src/config/dependency_injection.dart';

class CallKitService {
  StreamSubscription? _callKitSubscription;
  StreamSubscription? _pendingAcceptAuthSubscription;

  Future<void> init() async {
    /// ////////////////////////////////////////////////////////////////////////////
    /// if (kIsWeb) return; /// THIS IS ADDED TO REMOVE ERROR FROM CONSOLE
    /// NOT SURE IF IT WILL CAUSE ERRORS ON MOBILE
    /// ////////////////////////////////////////////////////////////////////////////
    if (kIsWeb) return;
    _callKitSubscription?.cancel();
    _callKitSubscription = FlutterCallkitIncoming.onEvent.listen(_handleCallKitEvent);
    await _reconcileMissedAccept();
  }

  void dispose() {
    _callKitSubscription?.cancel();
    _callKitSubscription = null;
    _pendingAcceptAuthSubscription?.cancel();
    _pendingAcceptAuthSubscription = null;
  }

  /// The native Accept tap is handled by a plain Android BroadcastReceiver and
  /// doesn't need the Flutter engine running, so on cold start the engine can
  /// finish booting after the tap already happened and miss the onEvent for it.
  /// The plugin still persists accepted calls natively, so recover here.
  Future<void> _reconcileMissedAccept() async {
    final activeCalls = await FlutterCallkitIncoming.activeCalls();
    if (activeCalls is! List) return;

    for (final call in activeCalls) {
      if (call is Map && call['isAccepted'] == true) {
        _handleAcceptedCallData(call['extra']);
      }
    }
  }

  void _handleAcceptedCallData(dynamic callData) {
    if (callData == null) return;
    final notification = CallNotificationModel.fromJson(callData['notificationData']);

    if (getIt<AuthorizationBloc>().state.result != null) {
      _navigateToAcceptedCall(notification);
      return;
    }

    // On a cold start, the Flutter engine can still be restoring the session
    // when the accepted call is reconciled. Navigating before auth is ready
    // gets bounced to the login screen by appRedirect and the chat is lost,
    // so wait for the first authenticated state before navigating.
    _pendingAcceptAuthSubscription?.cancel();
    _pendingAcceptAuthSubscription = getIt<AuthorizationBloc>().stream.listen((state) {
      if (state.result == null) return;
      _pendingAcceptAuthSubscription?.cancel();
      _pendingAcceptAuthSubscription = null;
      _navigateToAcceptedCall(notification);
    });
  }

  void _navigateToAcceptedCall(CallNotificationModel notification) {
    getIt<CallBloc>().add(
      CoporCallEvent.CallAnswered(chatId: notification.chatId, isVideo: notification.hasVideo),
    );
    goToChatFromCall(notification.chatId);
  }

  Future<void> _handleCallKitEvent(CallEvent? event) async {
    if (event == null) return;

    switch (event.event) {
      case Event.actionCallAccept:
        _handleAcceptedCallData(event.body['extra']);
        break;
      case Event.actionCallDecline:
        final callData = event.body['extra'];
        if (callData != null) {
          final notification = CallNotificationModel.fromJson(callData['notificationData']);
          final callBloc = getIt<CallBloc>();
          callBloc.add(
            CoporCallEvent.CallDeclined(
              chatId: notification.chatId,
              numberOfDeclinedCalls: getIt<DeclinedCallsCubit>().state,
            ),
          );
        }
        break;
      case Event.actionCallEnded:
        break;
      case Event.actionCallTimeout:
        break;
      default:
        break;
    }
  }

  Future<void> showCallNotification(CallNotificationModel data) async {
    if (kIsWeb) return;
    final params = getCallKitParams(data);
    await FlutterCallkitIncoming.showCallkitIncoming(params);
  }
}

// The backend always resolves `avatar` to a real, fetchable http(s) URL — either
// the user's actual photo, or a server-generated colored-initials avatar when
// there isn't one — since the native CallKit UI fetches this itself and has no
// concept of "no picture, show initials" the way CoporAvatar does locally.
CallKitParams getCallKitParams(CallNotificationModel data) {
  return CallKitParams(
    id: data.chatId,
    nameCaller: data.callerName,
    appName: 'Copor',
    avatar: data.avatar,
    handle: data.chatId,
    type: (data.hasVideo) ? 1 : 0,
    duration: 30000,
    textAccept: 'Accept',
    textDecline: 'Decline',
    // The plugin's own auto missed-call detection only fires from its internal
    // duration timer, which doesn't cover the caller cancelling early — a
    // custom notification is shown instead (see firebaseMessagingBackgroundHandler)
    // that reliably fires whenever the backend actually reports a timeout, so
    // the native one is disabled here to avoid duplicate/inconsistent behavior.
    missedCallNotification: const NotificationParams(showNotification: false),
    extra: <String, dynamic>{'notificationData': data.toJson()},
    android: const AndroidParams(
      isCustomNotification: true,
      isShowLogo: false,
      ringtonePath: 'system_ringtone_default',
    ),
    ios: const IOSParams(
      iconName: 'CallKitIcon',
      handleType: 'generic',
      supportsVideo: true,
      maximumCallGroups: 2,
      maximumCallsPerCallGroup: 1,
      audioSessionMode: 'videoChat',
      ringtonePath: 'system_ringtone_default',
    ),
  );
}
