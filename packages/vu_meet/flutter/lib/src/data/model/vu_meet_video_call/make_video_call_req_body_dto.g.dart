// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'make_video_call_req_body_dto.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

MakeVideoCallActionReqBodyDto _$MakeVideoCallActionReqBodyDtoFromJson(
  Map<String, dynamic> json,
) => MakeVideoCallActionReqBodyDto(
  chatId: json['chatId'] as String,
  type: json['type'] as String,
  action: json['action'] as String,
  durationSeconds: (json['durationSeconds'] as num?)?.toInt(),
);

Map<String, dynamic> _$MakeVideoCallActionReqBodyDtoToJson(
  MakeVideoCallActionReqBodyDto instance,
) => <String, dynamic>{
  'chatId': instance.chatId,
  'type': instance.type,
  'action': instance.action,
  'durationSeconds': ?instance.durationSeconds,
};
