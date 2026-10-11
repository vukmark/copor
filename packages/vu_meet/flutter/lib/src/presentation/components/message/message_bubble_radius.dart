import 'package:copor_vu_meet/src/data/model/vu_meet_message/vu_meet_message_model.dart';
import 'package:copor_theme/copor_theme.dart';
import 'package:flutter/material.dart';

BorderRadius getMessageBubbleRadius({required VuMeetMessageItemModel message}) {
  const double full = coporBorderRadius + 10;
  const double tight = 4.0;

  if (message.isOwn) {
    return BorderRadius.only(
      topLeft: Radius.circular(full),
      bottomLeft: Radius.circular(full),
      topRight: Radius.circular(message.isFirstFromUser ? full : tight),
      bottomRight: Radius.circular(message.isLastFromUser ? full : tight),
    );
  } else {
    return BorderRadius.only(
      topRight: Radius.circular(full),
      bottomRight: Radius.circular(full),
      topLeft: Radius.circular(message.isFirstFromUser ? full : tight),
      bottomLeft: Radius.circular(message.isLastFromUser ? full : tight),
    );
  }
}
