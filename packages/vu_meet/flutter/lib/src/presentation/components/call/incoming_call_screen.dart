import 'dart:async';
import 'package:copor_core/src/bloc/utils/bloc_context_extensions.dart';
import 'package:copor_core/src/components/copor_avatar.dart';
import 'package:copor_core/src/config/dependency_injection.dart';
import 'package:copor_vu_meet/src/data/model/vu_meet_video_call/call_notification_model.dart';
import 'package:copor_vu_meet/src/helpers/call_navigation.dart';
import 'package:copor_vu_meet/src/logic/call/call_bloc.dart';
import 'package:copor_vu_meet/src/logic/call/call_event.dart';
import 'package:copor_vu_meet/src/logic/call/declined_calls_cubit.dart';
import 'package:copor_vu_meet/src/presentation/components/call/active_call_banner.dart';
import 'package:copor_vu_meet/src/presentation/components/call/call_ring_controller.dart';
import 'package:copor_core/src/utils/global_keys.dart';
import 'package:copor_theme/copor_theme.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';

class IncomingCallOverlay {
  static bool _isShowing = false;

  static void show(CallNotificationModel notification) {
    if (_isShowing) return;
    final navigator = rootNavigatorKey.currentState;
    if (navigator == null) return;

    _isShowing = true;
    navigator
        .push(
          MaterialPageRoute(
            fullscreenDialog: true,
            builder: (_) => IncomingCallScreen(notification: notification),
          ),
        )
        .then((_) => _isShowing = false);
  }

  static void dismiss() {
    if (!_isShowing) return;
    rootNavigatorKey.currentState?.maybePop();
  }
}

class IncomingCallScreen extends StatefulWidget {
  final CallNotificationModel notification;

  const IncomingCallScreen({super.key, required this.notification});

  @override
  State<IncomingCallScreen> createState() => _IncomingCallScreenState();
}

class _IncomingCallScreenState extends State<IncomingCallScreen> {
  final _ring = CallRingController();

  @override
  void initState() {
    super.initState();
    SystemChrome.setEnabledSystemUIMode(SystemUiMode.immersiveSticky);
    _ring.start();
  }

  @override
  void dispose() {
    _ring.stop();
    unawaited(SystemChrome.setEnabledSystemUIMode(SystemUiMode.edgeToEdge));
    super.dispose();
  }

  void _handleDecline() {
    Navigator.of(context).maybePop();
    getIt<CallBloc>().add(
      CallDeclined(
        chatId: widget.notification.chatId,
        numberOfDeclinedCalls: getIt<DeclinedCallsCubit>().state,
      ),
    );
  }

  void _handleAnswer() {
    getIt<CallBloc>().add(
      CallAnswered(chatId: widget.notification.chatId, isVideo: widget.notification.hasVideo),
    );
    // Join while this screen (and its context) is still mounted — the actual
    // Jitsi conference-joined event drives navigation back to the chat.
    returnToCall(context, widget.notification.chatId, isVideo: widget.notification.hasVideo);
    Navigator.of(context).maybePop();
    goToChatFromCall(widget.notification.chatId);
  }

  @override
  Widget build(BuildContext context) {
    final translations = context.getState.commonTranslation.ensuredData;
    return Scaffold(
      body: SafeArea(
        child: Center(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              const Spacer(flex: 2),
              CoporAvatar(
                radius: 60,
                fontSize: Theme.of(context).textTheme.displayMedium?.fontSize,
                picture: widget.notification.avatar,
                userFullName: widget.notification.callerName,
              ),
              const SizedBox(height: 20),
              Text(
                widget.notification.callerName,
                style: TextStyle(
                  fontSize: Theme.of(context).textTheme.headlineMedium?.fontSize,
                  fontWeight: FontWeight.bold,
                ),
              ),
              const SizedBox(height: 10),
              Text(
                translations.INCOMING_CALL_STATUS,
                style: TextStyle(
                  color: Colors.grey[400],
                  fontSize: Theme.of(context).textTheme.titleMedium?.fontSize,
                ),
              ),
              const Spacer(flex: 3),
              Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  _buildOptionButton(
                    onTap: _handleDecline,
                    color: Colors.red,
                    icon: DTIcons.callEnd,
                    label: translations.DECLINE,
                  ),
                  const SizedBox(width: 60),
                  _buildOptionButton(
                    onTap: _handleAnswer,
                    color: Colors.green,
                    icon: widget.notification.hasVideo ? DTIcons.videoCall : DTIcons.phone,
                    label: translations.ANSWER,
                  ),
                ],
              ),
              const SizedBox(height: 60),
            ],
          ),
        ),
      ),
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
