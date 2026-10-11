import 'package:copor_core/src/core/system/device_service.dart';
import 'package:copor_vu_meet/src/data/model/vu_meet_message/vu_meet_message_model.dart';
import 'package:copor_vu_meet/src/presentation/components/message/message_bubble_radius.dart';
import 'package:copor_theme/copor_theme.dart';
import 'package:flutter/material.dart';

class TextMessageBubble extends StatelessWidget {
  static const double _widthOnMobile = 0.7;
  static const double _widthOnTablet = 0.35;
  static const double _minWidth = 40.0;

  final VuMeetMessageItemModel message;

  const TextMessageBubble({super.key, required this.message});

  @override
  Widget build(BuildContext context) {
    return ConstrainedBox(
      constraints: BoxConstraints(
        minWidth: _minWidth,
        maxWidth:
            MediaQuery.of(context).size.width *
            (context.isMobile ? _widthOnMobile : _widthOnTablet),
      ),
      child: Padding(
        padding: EdgeInsets.only(top: message.isFirstFromUser ? 3 : 0),
        child: DecoratedBox(
          decoration: BoxDecoration(
            color: message.isOwn
                ? CoporColors.of(context).primaryContainer
                : CoporColors.of(context).surfaceContainer,
            borderRadius: getMessageBubbleRadius(message: message),
            border: Border.all(
              color: message.isOwn
                  ? CoporColors.of(context).primaryBorder.withValues(alpha: 0.1)
                  : CoporColors.of(context).outline.withValues(alpha: 0.3),
            ),
          ),
          child: Padding(
            padding: const EdgeInsets.all(12.0),
            child: Text(
              message.messageContent,
              textAlign: message.isOwn ? TextAlign.end : TextAlign.start,
              style: CoporTheme.of(
                context,
              ).text.body.copyWith(color: CoporColors.of(context).onSurface),
            ),
          ),
        ),
      ),
    );
  }
}
