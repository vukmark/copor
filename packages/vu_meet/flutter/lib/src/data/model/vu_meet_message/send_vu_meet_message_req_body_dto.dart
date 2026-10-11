import 'package:copor_vu_meet/src/data/model/vu_meet_message/vu_meet_message_model.dart';
import 'package:json_annotation/json_annotation.dart';

part 'send_vu_meet_message_req_body_dto.g.dart';

@JsonSerializable()
class SendVuMeetMessageReqBodyDto {
  @JsonKey(name: 'chat')
  final String chatId;
  @JsonKey(name: 'content')
  final String content;
  @JsonKey(name: 'type')
  final VuMeetMessageType type;

  SendVuMeetMessageReqBodyDto({
    required this.chatId,
    required this.content,
    this.type = VuMeetMessageType.text,
  });

  factory SendVuMeetMessageReqBodyDto.fromJson(Map<String, dynamic> json) =>
      _$SendVuMeetMessageReqBodyDtoFromJson(json);

  Map<String, dynamic> toJson() => _$SendVuMeetMessageReqBodyDtoToJson(this);
}
