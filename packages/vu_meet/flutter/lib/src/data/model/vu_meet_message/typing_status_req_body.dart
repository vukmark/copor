import 'package:copor_vu_meet/src/helpers/typing_data.dart';

class TypingStatusReqBody {
  final String chatId;
  final TypingStatus typingStatus;

  const TypingStatusReqBody({required this.chatId, required this.typingStatus});

  Map<String, dynamic> toJson() {
    return {'chatId': chatId, 'typingStatus': typingStatus.toJson()};
  }

  factory TypingStatusReqBody.fromJson(Map<String, dynamic> json) {
    return TypingStatusReqBody(
      chatId: json['chatId'] as String,
      typingStatus: TypingStatus.fromJson(json['typingStatus'] as String),
    );
  }
}

class TypingStatusUpdateDTO {
  final String chatId;
  final bool isTyping;
  final String userName;

  const TypingStatusUpdateDTO({
    required this.chatId,
    required this.isTyping,
    required this.userName,
  });
}
