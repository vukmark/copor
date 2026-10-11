import 'package:copor_vu_meet/src/data/model/translation/vu_meet_translation.dart';
import 'package:copor_vu_meet/src/logic/message/vu_meet_message/vu_meet_message_bloc.dart';
import 'package:copor_vu_meet/src/logic/message/vu_meet_message/vu_meet_message_state.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

/// How long the typing indicator takes to fade out into an arriving message
/// bubble, and how long a new message bubble takes to fade in when it
/// replaces a live typing indicator. Kept in sync so the crossfade reads as
/// one continuous transition rather than two separately-timed animations.
const typingToMessageCrossfadeDuration = Duration(milliseconds: 250);

class TypingIndicator extends StatelessWidget {
  final VuMeetPageTranslation translations;
  final String chatId;

  const TypingIndicator({super.key, required this.chatId, required this.translations});

  @override
  Widget build(BuildContext context) {
    return BlocBuilder<VuMeetMessageBloc, VuMeetMessageState>(
      builder: (context, state) {
        final isTyping =
            state.typingStatusModel?.chatId == chatId && state.typingStatusModel?.isTyping == true;
        // A message that just replaced this chat's typing indicator is still
        // fading out here — crossfade instead of the usual instant collapse
        // (e.g. on a plain 2s inactivity timeout, which stays instant).
        final isCrossfading = state.justArrivedMessageId != null;

        return AnimatedOpacity(
          opacity: isTyping ? 1 : 0,
          duration: isCrossfading ? typingToMessageCrossfadeDuration : Duration.zero,
          child: isTyping || isCrossfading
              ? Padding(
                  padding: const EdgeInsets.only(left: 4.0),
                  child: Row(
                    children: [
                      Text(
                        "${state.typingStatusModel?.userName} ${translations.TYPING}",
                        style: TextStyle(
                          fontStyle: FontStyle.italic,
                          fontWeight: FontWeight.bold,
                          color: Theme.of(context).colorScheme.primary,
                          fontSize: Theme.of(context).textTheme.bodyMedium?.fontSize,
                        ),
                      ),
                    ],
                  ),
                )
              : const SizedBox.shrink(),
        );
      },
    );
  }
}
