// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'get_vu_meet_message_list_req_body_dto.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

GetVuMeetMessageListReqBodyDto _$GetVuMeetMessageListReqBodyDtoFromJson(
  Map<String, dynamic> json,
) => GetVuMeetMessageListReqBodyDto(
  chatId: json['chatId'] as String,
  beforeDate: json['beforeDate'] as String? ?? '',
  afterDate: json['afterDate'] as String? ?? '',
);

Map<String, dynamic> _$GetVuMeetMessageListReqBodyDtoToJson(
  GetVuMeetMessageListReqBodyDto instance,
) => <String, dynamic>{
  'chatId': instance.chatId,
  'beforeDate': instance.beforeDate,
  'afterDate': instance.afterDate,
};
