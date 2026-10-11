import 'package:copor_vu_meet/src/data/model/vu_meet_message/vu_meet_message_model.dart';
import 'package:copor_vu_meet/src/data/model/translation/vu_meet_translation.dart';
import 'package:copor_theme/copor_theme.dart';
import 'package:flutter/material.dart';

class CallEventNotification extends StatelessWidget {
  final VuMeetMessageItemModel message;
  final VuMeetPageTranslation translations;

  const CallEventNotification({super.key, required this.message, required this.translations});

  @override
  Widget build(BuildContext context) {
    final dt = CoporTheme.of(context);
    final label = _buildLabel();
    if (label == null) return const SizedBox.shrink();

    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 10),
      child: Center(
        child: Row(
          mainAxisSize: MainAxisSize.min,
          children: [
            Icon(_icon(), size: 14, color: dt.colors.onSurfaceSubtle),
            const SizedBox(width: 6),
            Text(
              '$label · ${message.timeCreated}',
              style: dt.text.bodySecondary.copyWith(color: dt.colors.onSurfaceSubtle),
            ),
          ],
        ),
      ),
    );
  }

  String? _buildLabel() {
    switch (message.messageContent) {
      case 'CALL_ACCEPTED':
        return translations.CALL_ACCEPTED;
      case 'END_CALL':
        return translations.CALL_ENDED_NOTIFICATION;
      case 'TIMEOUT_CALL':
        // Message is attributed to the callee, so isOwn is true for the callee (who missed
        // the call) and false for the caller (who sees the callee's name in senderName).
        return message.isOwn
            ? translations.MISSED_CALL_NOTIFICATION
            : '${message.senderName} ${translations.DID_NOT_ANSWER_NOTIFICATION}';
      case 'DECLINE_CALL':
        return translations.CALL_DECLINED_NOTIFICATION;
      default:
        return null;
    }
  }

  IconData _icon() {
    switch (message.messageContent) {
      case 'END_CALL':
        return DTIcons.callEnd;
      case 'DECLINE_CALL':
      case 'TIMEOUT_CALL':
        return DTIcons.phone;
      default:
        return DTIcons.videoCall;
    }
  }
}
