import 'package:copor_core/src/core/system/device_service.dart';
import 'package:copor_vu_meet/src/logic/vu_meet_ui/vu_meet_ui_bloc.dart';
import 'package:copor_vu_meet/src/logic/vu_meet_ui/vu_meet_ui_event.dart';
import 'package:copor_vu_meet/src/data/model/translation/vu_meet_translation.dart';
import 'package:copor_vu_meet/src/logic/chat/selected_chat/selected_chat_cubit.dart';
import 'package:copor_vu_meet/src/presentation/components/chat/vu_meet_chats_and_users.dart';
import 'package:copor_scaffold/copor_scaffold.dart';
import 'package:copor_theme/copor_theme.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

class VuMeetLayoutBuilder extends StatelessWidget {
  final VuMeetPageTranslation translation;
  final Widget chatContent;

  const VuMeetLayoutBuilder({super.key, required this.translation, required this.chatContent});

  @override
  Widget build(BuildContext context) {
    final isMobile = context.isMobile;
    final hasChatOpen = context.watch<SelectedChatCubit>().state != null;

    if (isMobile) {
      return DSPageWrapper(
        isMobile: true,
        children: [
          Expanded(
            child: hasChatOpen ? chatContent : VuMeetChatsAndUsers(translation: translation),
          ),
        ],
      );
    }

    return DSPageWrapper(
      isMobile: false,
      children: [
        Expanded(
          child: Row(
            children: [
              ConstrainedBox(
                constraints: const BoxConstraints(minWidth: 220, maxWidth: 340),
                child: VuMeetChatsAndUsers(translation: translation),
              ),
              DTDivider.vertical(height: double.infinity, padding: 20),
              Expanded(child: hasChatOpen ? chatContent : _emptyState(context)),
            ],
          ),
        ),
      ],
    );
  }

  Widget _emptyState(BuildContext context) {
    return Center(
      child: DTEmptyState(
        icon: DTIcons.emptyChat,
        title: translation.SELECT_A_CHAT_TO_SEE_MESSAGES,
        subtitle: translation.SELECT_A_CHAT_TO_SEE_MESSAGES,
        ctaLabel: translation.CREATE_CHAT,
        ctaIcon: DTIcons.newChat,
        onCta: () => context.read<VuMeetUiBloc>().add(ShowCreateChatScreen()),
      ),
    );
  }
}
