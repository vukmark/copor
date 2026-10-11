import 'package:copor_vu_meet/src/logic/vu_meet_ui/vu_meet_ui_bloc.dart';
import 'package:copor_vu_meet/src/logic/vu_meet_ui/vu_meet_ui_event.dart';
import 'package:copor_vu_meet/src/data/model/translation/vu_meet_translation.dart';
import 'package:copor_theme/copor_theme.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

class EmptyChatListMessage extends StatelessWidget {
  final VuMeetPageTranslation translations;

  const EmptyChatListMessage({super.key, required this.translations});

  @override
  Widget build(BuildContext context) {
    return Center(
      child: Padding(
        padding: const EdgeInsets.all(24),
        child: DTEmptyState(
          icon: DTIcons.emptyChat,
          title: translations.CREATE_YOUR_FIRST_CHAT,
          subtitle: translations.START_A_CONVERSATION_AND_CONNECT_WITH_OTHERS,
          ctaLabel: translations.CREATE_CHAT,
          ctaIcon: PhosphorIconsThin.plus,
          onCta: () => context.read<VuMeetUiBloc>().add(ShowCreateChatScreen()),
        ),
      ),
    );
  }
}
