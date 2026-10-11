// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'send_vu_meet_message_req_body_dto.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

SendVuMeetMessageReqBodyDto _$SendVuMeetMessageReqBodyDtoFromJson(
  Map<String, dynamic> json,
) => SendVuMeetMessageReqBodyDto(
  chatId: json['chat'] as String,
  content: json['content'] as String,
  type:
      $enumDecodeNullable(_$VuMeetMessageTypeEnumMap, json['type']) ??
      VuMeetMessageType.text,
);

Map<String, dynamic> _$SendVuMeetMessageReqBodyDtoToJson(
  SendVuMeetMessageReqBodyDto instance,
) => <String, dynamic>{
  'chat': instance.chatId,
  'content': instance.content,
  'type': _$VuMeetMessageTypeEnumMap[instance.type]!,
};

const _$VuMeetMessageTypeEnumMap = {
  VuMeetMessageType.text: 'TEXT',
  VuMeetMessageType.file: 'FILE',
  VuMeetMessageType.callEvent: 'CALL_EVENT',
};
