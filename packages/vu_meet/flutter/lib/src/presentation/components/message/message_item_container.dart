import 'package:copor_core/src/components/presence_avatar.dart';
import 'package:copor_vu_meet/src/data/model/vu_meet_message/vu_meet_message_model.dart';
import 'package:copor_vu_meet/src/data/model/translation/vu_meet_translation.dart';
import 'package:copor_vu_meet/src/presentation/components/message/call_event_notification.dart';
import 'package:copor_vu_meet/src/presentation/components/message/image_message_bubble.dart';
import 'package:copor_vu_meet/src/presentation/components/message/message_seen_status.dart';
import 'package:copor_vu_meet/src/presentation/components/message/text_message_bubble.dart';
import 'package:copor_theme/copor_theme.dart';
import 'package:flutter/material.dart';

class MessageItemContainer extends StatelessWidget {
  final VuMeetMessageItemModel message;
  final bool isPrivate;
  final VuMeetPageTranslation translations;
  final VoidCallback onToggle;
  final bool isTimestampVisible;
  final bool isLatestMessage;

  const MessageItemContainer({
    super.key,
    required this.message,
    required this.isPrivate,
    required this.translations,
    required this.onToggle,
    required this.isTimestampVisible,
    required this.isLatestMessage,
  });

  @override
  Widget build(BuildContext context) {
    if (message.messageStatus == VuMeetMessageType.callEvent) {
      return CallEventNotification(message: message, translations: translations);
    }

    final isOwn = message.isOwn;
    final dt = CoporTheme.of(context);
    // Seen status is disabled for group chats for now: message.seen is
    // a single shared boolean per message, flipped true the moment ANY ONE
    // recipient opens the chat — not per-recipient. Showing a checkmark
    // that means "seen by 1 of N" as if it meant "seen by everyone" would
    // be actively misleading, so it's hidden entirely outside 1:1 chats
    // until proper per-recipient seen tracking exists.
    final showSeenStatus = isOwn && isLatestMessage && isPrivate;

    final bubble = message.messageStatus == VuMeetMessageType.file
        ? ImageMessageBubble(message: message, translations: translations)
        : GestureDetector(
            onTap: onToggle,
            child: TextMessageBubble(message: message),
          );

    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 2),
      child: Column(
        mainAxisSize: MainAxisSize.min,
        crossAxisAlignment: isOwn ? CrossAxisAlignment.end : CrossAxisAlignment.start,
        children: [
          if (!isOwn && !isPrivate && message.isFirstFromUser)
            Padding(
              padding: const EdgeInsets.only(bottom: 4.0, top: 10),
              child: Row(
                mainAxisSize: MainAxisSize.min,
                children: [
                  PresenceAvatar(
                    userId: message.senderId,
                    userFullName: message.senderName,
                    picture: message.senderPicture,
                    radius: 11,
                  ),
                  const SizedBox(width: 6),
                  Text(message.senderName, style: dt.text.bodySecondary),
                ],
              ),
            ),

          Row(mainAxisSize: MainAxisSize.min, children: [bubble]),
          if (isTimestampVisible)
            Padding(
              padding: EdgeInsets.only(
                top: 4,
                left: isOwn || isPrivate ? 4 : 34,
                right: isOwn ? 4 : 0,
              ),
              child: Row(
                mainAxisSize: MainAxisSize.min,
                children: [
                  if (isTimestampVisible)
                    Opacity(
                      opacity: 0.5,
                      child: Text(message.timeCreated, style: dt.text.bodySecondary),
                    ),
                  if (isTimestampVisible) const SizedBox(width: 8),
                  if (showSeenStatus)
                    MessageSeenStatus(isSeen: message.isSeen, isSending: message.isSending),
                ],
              ),
            ),

          if (!isTimestampVisible && showSeenStatus)
            MessageSeenStatus(isSeen: message.isSeen, isSending: message.isSending),
        ],
      ),
    );
  }
}
