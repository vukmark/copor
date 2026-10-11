import 'package:copor_theme/copor_theme.dart';
import 'dart:async';
import 'package:copor_core/src/bloc/utils/bloc_context_extensions.dart';
import 'package:copor_core/src/components/copor_avatar.dart';
import 'package:copor_core/src/data/model/translation/common_translation.dart';
import 'package:copor_vu_meet/src/data/model/chat_info/chat_info_model.dart';
import 'package:copor_vu_meet/src/helpers/call_navigation.dart';
import 'package:copor_vu_meet/src/data/model/vu_meet_video_call/call_notification_model.dart';
import 'package:copor_vu_meet/src/presentation/components/call/active_call_banner.dart';
import 'package:copor_vu_meet/src/presentation/components/call/call_ring_controller.dart';
import 'package:copor_vu_meet/src/logic/call/call_bloc.dart';
import 'package:copor_vu_meet/src/logic/call/call_event.dart';
import 'package:copor_vu_meet/src/logic/call/call_state.dart';
import 'package:copor_vu_meet/src/logic/chat/chat_info/chat_info_bloc.dart';
import 'package:copor_vu_meet/src/logic/chat/chat_info/chat_info_state.dart';
import 'package:copor_vu_meet/src/config/callkit_service.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_callkit_incoming/flutter_callkit_incoming.dart';

import 'package:copor_core/src/config/dependency_injection.dart';

enum OutgoingCallState { ringing, answered, declined, failed }

class OutgoingCallPage extends StatefulWidget {
  final String chatId;

  const OutgoingCallPage({super.key, required this.chatId});

  @override
  _OutgoingCallPageState createState() => _OutgoingCallPageState();
}

class _OutgoingCallPageState extends State<OutgoingCallPage> {
  // Null means "still ringing" — the actual "Calling..." text is derived from
  // translations at build time since a BuildContext isn't available here yet.
  String? _statusMessage;
  bool _showRetryOptions = false;
  final _ring = CallRingController();
  bool _isVideo = true;

  @override
  void initState() {
    super.initState();
    SystemChrome.setEnabledSystemUIMode(SystemUiMode.immersiveSticky);
    _ring.start();
    final callState = getIt<CallBloc>().state;
    if (callState is CallOutgoing) _isVideo = callState.isVideo;
    if (callState is CallConnected) _isVideo = callState.isVideo;
  }

  void _handleHangUp() {
    if (!mounted) return;
    // This button is only reachable while still ringing (before CallConnected
    // navigates away) — canceling here still tells the backend/recipient the
    // same thing a natural ring timeout would (they missed the call), but
    // isManualCancel keeps the caller's own screen from claiming "didn't
    // answer" for something the caller did themselves.
    getIt<CallBloc>().add(const CallTimedOut(isManualCancel: true));
  }

  void _handleCancel() {
    if (!mounted) return;
    getIt<CallBloc>().add(CallReset());
    goToChatFromCall(widget.chatId);
  }

  void _handleCallAgain() {
    if (!mounted) return;
    setState(() {
      _showRetryOptions = false;
      _statusMessage = null;
    });
    _ring.start();
    getIt<CallBloc>().add(CallStartOngoing(chatId: widget.chatId, isVideo: _isVideo));
  }

  void _showRetryOptionsWith(String message) {
    _ring.stop();
    setState(() {
      _statusMessage = message;
      _showRetryOptions = true;
    });
  }

  void _cleanup() {
    _ring.stop();
  }

  @override
  void dispose() {
    _cleanup();
    unawaited(SystemChrome.setEnabledSystemUIMode(SystemUiMode.edgeToEdge));
    super.dispose();
  }

  Future<void> _showSystemCallStarted(ChatInfoModel chatInfo) async {
    final notificationData = CallNotificationModel(
      chatId: widget.chatId,
      callerName: chatInfo.name,
      hasVideo: _isVideo,
      avatar: chatInfo.chatPicture,
    );
    try {
      await FlutterCallkitIncoming.startCall(getCallKitParams(notificationData));
    } catch (_) {}
  }

  @override
  Widget build(BuildContext context) {
    final translations = context.getState.commonTranslation.ensuredData;
    return BlocBuilder<ChatInfoBloc, ChatInfoState>(
      builder: (context, chatInfoState) {
        if (chatInfoState.result == null) {
          return const Center(child: CircularProgressIndicator());
        }
        final selectedChat = chatInfoState.ensuredData;
        return MultiBlocListener(
          listeners: [
            BlocListener<CallBloc, CallState>(
              listenWhen: (_, curr) => curr is CallConnected,
              listener: (context, _) {
                _ring.stop();
                _showSystemCallStarted(selectedChat);
                // Join while this screen (and its context) is still mounted —
                // the actual Jitsi conference-joined event drives navigation
                // back to the chat.
                returnToCall(context, widget.chatId, isVideo: _isVideo);
                goToChatFromCall(widget.chatId);
              },
            ),
            BlocListener<CallBloc, CallState>(
              listenWhen: (_, curr) => curr is CallFinished,
              listener: (_, state) {
                final finished = state as CallFinished;
                if (finished.declinedByOther) {
                  _showRetryOptionsWith(translations.CALL_DECLINED);
                } else if (finished.noAnswer) {
                  _showRetryOptionsWith('${selectedChat.name} ${translations.DIDNT_ANSWER}');
                } else {
                  _ring.stop();
                  goToChatFromCall(widget.chatId);
                }
              },
            ),
            BlocListener<CallBloc, CallState>(
              listenWhen: (_, curr) => curr is CallFailure,
              listener: (context, state) {
                _ring.stop();
                goToChatFromCall(widget.chatId);
                ScaffoldMessenger.of(
                  context,
                ).showSnackBar(SnackBar(content: Text((state as CallFailure).message)));
              },
            ),
          ],
          child: Scaffold(
            body: SafeArea(
              child: Center(
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    const Spacer(flex: 2),
                    CoporAvatar(
                      radius: 60,
                      fontSize: Theme.of(context).textTheme.displayMedium?.fontSize,
                      picture: selectedChat.chatPicture,
                      userFullName: selectedChat.name,
                    ),
                    const SizedBox(height: 20),
                    Text(
                      selectedChat.name,
                      style: TextStyle(
                        fontSize: Theme.of(context).textTheme.headlineMedium?.fontSize,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                    const SizedBox(height: 10),
                    Text(
                      _statusMessage ?? translations.CALLING,
                      style: TextStyle(
                        color: Colors.grey[400],
                        fontSize: Theme.of(context).textTheme.titleMedium?.fontSize,
                      ),
                    ),
                    const Spacer(flex: 3),
                    _showRetryOptions
                        ? _buildRetryOptions(context, translations)
                        : _buildHangUpButton(context, translations),
                    const SizedBox(height: 60),
                  ],
                ),
              ),
            ),
          ),
        );
      },
    );
  }

  Widget _buildHangUpButton(BuildContext context, CommonTranslation translations) {
    return _buildOptionButton(
      onTap: _handleHangUp,
      color: Colors.red,
      icon: DTIcons.callEnd,
      label: translations.CANCEL,
    );
  }

  Widget _buildRetryOptions(BuildContext context, CommonTranslation translations) {
    return Row(
      mainAxisAlignment: MainAxisAlignment.center,
      children: [
        _buildOptionButton(
          onTap: _handleCancel,
          color: Colors.red,
          icon: DTIcons.callEnd,
          label: translations.CANCEL,
        ),
        const SizedBox(width: 60),
        _buildOptionButton(
          onTap: _handleCallAgain,
          color: Colors.green,
          icon: _isVideo ? DTIcons.videoCall : DTIcons.phone,
          label: translations.CALL_AGAIN,
        ),
      ],
    );
  }

  Widget _buildOptionButton({
    required VoidCallback onTap,
    required Color color,
    required IconData icon,
    required String label,
  }) {
    return Column(
      children: [
        InkWell(
          onTap: onTap,
          borderRadius: BorderRadius.circular(40),
          child: Container(
            width: 80,
            height: 80,
            decoration: BoxDecoration(shape: BoxShape.circle, color: color),
            child: Semantics(
              label: label,
              child: Icon(icon, color: Colors.white, size: 40),
            ),
          ),
        ),
        const SizedBox(height: 8),
        Text(label, style: TextStyle(color: Colors.grey[400])),
      ],
    );
  }
}
