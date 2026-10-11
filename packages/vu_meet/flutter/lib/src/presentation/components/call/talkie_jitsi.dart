import 'dart:async';

import 'package:copor_core/src/bloc/global_blocs/navigation_bloc/navigation_bloc.dart';
import 'package:copor_core/src/bloc/utils/bloc_context_extensions.dart';
import 'package:copor_core/src/modules/my_account/data/model/account_info_model.dart';
import 'package:copor_vu_meet/src/config/talkie_jitsi_options.dart';
import 'package:copor_vu_meet/src/config/vu_meet_routes.dart';
import 'package:copor_vu_meet/src/helpers/call_navigation.dart';
import 'package:copor_vu_meet/src/logic/call/call_bloc.dart';
import 'package:copor_vu_meet/src/logic/call/call_event.dart';
import 'package:copor_vu_meet/src/logic/call/call_state.dart';
import 'package:copor_scaffold/copor_scaffold.dart';
import 'package:flutter/material.dart';
import 'package:flutter_callkit_incoming/flutter_callkit_incoming.dart';
import 'package:jitsi_meet_flutter_sdk/jitsi_meet_flutter_sdk.dart';
import 'package:permission_handler/permission_handler.dart';

import 'package:copor_core/src/config/dependency_injection.dart';

/// The Jitsi SDK's `hangUp()`/event stream is scoped to a single native
/// platform session, not to any particular Dart `JitsiMeet()` instance — so
/// this flag can be set from outside the widget that joined the call (e.g. by
/// [NotificationService] when a push tells us the other participant ended the
/// call) and still be observed by the [TalkieJitsiEventHandler] instance that
/// is actually driving `readyToClose`.
class JitsiCallSignal {
  static bool _endedByRemote = false;
  static Duration? _duration;

  // [duration] is the exact duration the OTHER side reported when they hung
  // up (from the push payload) — passing it through lets readyToClose show
  // the same number on this screen instead of timing its own teardown, which
  // lags a few seconds behind and would otherwise show a different value.
  static void markEndedByRemote({Duration? duration}) {
    _endedByRemote = true;
    _duration = duration;
  }

  static ({bool endedByRemote, Duration? duration}) consumeEndedByRemote() {
    final result = (endedByRemote: _endedByRemote, duration: _duration);
    _endedByRemote = false;
    _duration = null;
    return result;
  }
}

class TalkieJitsi {
  final JitsiMeet jitsiMeet;
  final AccountInfoModel currentUser;
  final String chatId;
  final BuildContext context;
  final bool isVideo;

  TalkieJitsi({
    required this.chatId,
    required this.currentUser,
    required this.jitsiMeet,
    required this.context,
    this.isVideo = true,
  });

  static JitsiMeetConferenceOptions _getJitsiMeetOptions(
    String chatId,
    AccountInfoModel currentUser, {
    required bool isVideo,
  }) {
    final options = _getTalkieJitsiOptions(chatId, currentUser, isVideo: isVideo);
    return JitsiMeetConferenceOptions(
      room: options.room,
      featureFlags: options.featureFlags,
      configOverrides: options.configOverrides,
      userInfo: options.userInfo,
      serverURL: options.serverURL,
    );
  }

  static TalkieJitsiOptions _getTalkieJitsiOptions(
    String chatId,
    AccountInfoModel currentUser, {
    required bool isVideo,
  }) {
    final userInfo = JitsiMeetUserInfo(
      displayName: '${currentUser.firstName} ${currentUser.lastName}',
      email: currentUser.email,
    );
    return TalkieJitsiOptions(chatId, userInfo, isVideo: isVideo);
  }

  /// Joins meeting only if permissions are granted
  Future<void> join() async {
    final hasPermissions = await requestJitsiPermissions(context);
    if (!hasPermissions) {
      print("Cannot join meeting: permissions not granted.");
      return;
    }

    final jitsiMeetA = JitsiMeet();
    await jitsiMeetA.join(
      _getJitsiMeetOptions(chatId, currentUser, isVideo: isVideo),
      TalkieJitsiEventHandler(jitsiMeet: jitsiMeetA, chatId: chatId).getListeners(),
    );
  }
}

Future<bool> requestJitsiPermissions(BuildContext context) async {
  Map<Permission, PermissionStatus> statuses = await [
    Permission.camera,
    Permission.microphone,
  ].request();

  bool cameraGranted = statuses[Permission.camera] == PermissionStatus.granted;
  bool micGranted = statuses[Permission.microphone] == PermissionStatus.granted;

  if (cameraGranted && micGranted) {
    print("Camera and Microphone permissions granted.");
    return true;
  }

  print("Camera and/or Microphone permissions denied.");

  bool permanentlyDenied =
      await Permission.camera.isPermanentlyDenied ||
      await Permission.microphone.isPermanentlyDenied;

  if (permanentlyDenied) {
    // Show dialog explaining what to do
    await showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: const Text("Permissions Required"),
        content: const Text(
          "Camera and microphone access is needed for video calls. "
          "Please enable them in your phone settings.",
        ),
        actions: [
          TextButton(onPressed: () => Navigator.pop(context), child: const Text("Cancel")),
          TextButton(
            onPressed: () async {
              Navigator.pop(context);
              await openAppSettings();

              // Wait a bit, then recheck permissions when user returns
              Future.delayed(const Duration(seconds: 1), () async {
                final rechecked = await _checkPermissions();
                if (!context.mounted) return;
                if (rechecked) {
                  // If granted after returning, show success toast/snack
                  context.getBloc.appScaffold.addBanner(
                    DSBanner.success(
                      "Permissions granted — you can start the call now.",
                      source: 'jitsi_permissions',
                    ),
                  );
                } else {
                  context.getBloc.appScaffold.addBanner(
                    DSBanner.error("Permissions still denied.", source: 'jitsi_permissions'),
                  );
                }
              });
            },
            child: const Text("Open Settings"),
          ),
        ],
      ),
    );

    return false;
  } else {
    // Just denied (not permanently)
    context.getBloc.appScaffold.addBanner(
      DSBanner.error(
        "Camera and microphone permissions are required.",
        source: 'jitsi_permissions',
      ),
    );
  }

  return false;
}

/// Helper to recheck permissions quickly
Future<bool> _checkPermissions() async {
  final camera = await Permission.camera.status;
  final mic = await Permission.microphone.status;
  return camera == PermissionStatus.granted && mic == PermissionStatus.granted;
}

class TalkieJitsiEventHandler {
  final List<String> _participants = [];
  final String chatId;
  final JitsiMeet jitsiMeet;
  DateTime? _connectedAt;
  bool _endedByRemote = false;
  Timer? _emptyRoomFallbackTimer;

  TalkieJitsiEventHandler({required this.jitsiMeet, required this.chatId});
  JitsiMeetEventListener getListeners() {
    return JitsiMeetEventListener(
      conferenceJoined: (url) {
        debugPrint("ttt: conference joined, url: $url");
        _connectedAt = DateTime.now();
        goToChatFromCall(chatId);
      },
      conferenceTerminated: (url, error) {
        // readyToClose is the SDK's authoritative "safe to navigate away now"
        // signal for a terminated conference — acting here too would race it
        // and risk a double navigation, so this is just diagnostic logging.
        debugPrint("ttt: conference terminated, url: $url");
      },
      conferenceWillJoin: (url) {
        debugPrint("ttt: conference will join, url: $url");
      },
      participantJoined: (email, name, role, participantId) {
        debugPrint("ttt: participant joined, id: $participantId");
        if (participantId != null) {
          _participants.add(participantId);
        }
        debugPrint("ttt: _participants after join: ${_participants.toString()}");
      },
      participantLeft: (participantId) {
        debugPrint("ttt: participant left: $participantId");
        if (participantId != null) {
          _participants.remove(participantId);
        }

        jitsiMeet.retrieveParticipantsInfo();
        debugPrint(_participants.toString());
      },
      participantsInfoRetrieved: (String info) {
        debugPrint('ttt: info retrived $info');

        int count = RegExp(r'\{').allMatches(info).length;
        // The other participant left the room. Jitsi's own signaling notices
        // this almost instantly — well before the backend's END_CALL push
        // (which carries the authoritative duration) can arrive over our own
        // HTTP + FCM round trip — so hanging up immediately here would win
        // that race every time and leave us falling back to a locally-timed
        // duration that never matches the other screen. Instead this is only
        // a safety net: give the push a real chance to drive the hangup (with
        // the correct duration) first, and only take over if it never shows up.
        if (count <= 1 && _emptyRoomFallbackTimer == null) {
          _emptyRoomFallbackTimer = Timer(const Duration(seconds: 6), () {
            _endedByRemote = true;
            jitsiMeet.hangUp();
          });
        }
      },
      readyToClose: () async {
        debugPrint("ttt: ready to close");
        _emptyRoomFallbackTimer?.cancel();
        try {
          await FlutterCallkitIncoming.endCall(chatId);
        } catch (_) {}

        final callBloc = getIt<CallBloc>();
        final wasConnected = callBloc.state is CallConnected;
        final remoteSignal = JitsiCallSignal.consumeEndedByRemote();
        final endedByRemote = _endedByRemote || remoteSignal.endedByRemote;
        final localDuration = _connectedAt != null
            ? DateTime.now().difference(_connectedAt!)
            : Duration.zero;

        if (!wasConnected) {
          callBloc.add(CallCancelled(duration: localDuration));
          goToChatFromCall(chatId);
          return;
        }

        // Only tell the backend the call ended if I'm the one who ended it —
        // if the other side already left, they've already reported that.
        if (endedByRemote) {
          callBloc.add(CallReset());
        } else {
          callBloc.add(CallCancelled(duration: localDuration));
        }

        // Prefer the duration the other side actually reported (computed the
        // moment they hung up) over timing our own teardown here, which lags
        // behind and would otherwise show a different number on each screen.
        final duration = remoteSignal.duration ?? localDuration;
        goToPage(VuMeetRoutes.getCallSummaryUri(chatId, duration));
      },
    );
  }
}
