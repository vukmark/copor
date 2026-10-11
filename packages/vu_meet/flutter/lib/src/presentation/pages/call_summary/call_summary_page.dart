import 'package:copor_core/src/bloc/utils/bloc_context_extensions.dart';
import 'package:copor_core/src/components/copor_avatar.dart';
import 'package:copor_core/src/data/model/translation/common_translation.dart';
import 'package:copor_vu_meet/src/helpers/call_navigation.dart';
import 'package:copor_vu_meet/src/logic/chat/chat_info/chat_info_bloc.dart';
import 'package:copor_vu_meet/src/logic/chat/chat_info/chat_info_state.dart';
import 'package:copor_vu_meet/src/logic/utils/vu_meet_bloc_event_dispatcher.dart';
import 'package:copor_theme/copor_theme.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_hooks/flutter_hooks.dart';

/// Shown instead of a raw notification when the OTHER participant ends an
/// already-connected call, so the person left behind sees who they were
/// talking to and how long the call lasted, with an explicit way out.
class CallSummaryPage extends HookWidget {
  final String chatId;
  final Duration duration;

  const CallSummaryPage({super.key, required this.chatId, required this.duration});

  @override
  Widget build(BuildContext context) {
    useEffect(() {
      VuMeetDispatcher.chatInfo.getChatInfo(chatId);
      return null;
    }, [chatId]);

    return BlocBuilder<ChatInfoBloc, ChatInfoState>(
      builder: (context, chatInfoState) {
        if (chatInfoState.result == null) {
          return const Center(child: CircularProgressIndicator());
        }
        final selectedChat = chatInfoState.ensuredData;
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
                    '${translations.CALL_ENDED_LABEL} · ${_formatDuration(duration)}',
                    style: TextStyle(
                      color: Colors.grey[400],
                      fontSize: Theme.of(context).textTheme.titleMedium?.fontSize,
                    ),
                  ),
                  const Spacer(flex: 3),
                  _buildExitButton(context, translations),
                  const SizedBox(height: 60),
                ],
              ),
            ),
          ),
        );
      },
    );
  }

  String _formatDuration(Duration duration) {
    final minutes = duration.inMinutes.remainder(60).toString().padLeft(2, '0');
    final seconds = duration.inSeconds.remainder(60).toString().padLeft(2, '0');
    return '$minutes:$seconds';
  }

  Widget _buildExitButton(BuildContext context, CommonTranslation translations) {
    return InkWell(
      onTap: () => goToChatFromCall(chatId),
      borderRadius: BorderRadius.circular(40),
      child: Container(
        width: 80,
        height: 80,
        decoration: const BoxDecoration(shape: BoxShape.circle, color: Colors.red),
        child: Semantics(
          label: translations.ACCESSIBILITY_HANG_UP,
          child: Icon(DTIcons.callEnd, color: Colors.white, size: 40),
        ),
      ),
    );
  }
}
