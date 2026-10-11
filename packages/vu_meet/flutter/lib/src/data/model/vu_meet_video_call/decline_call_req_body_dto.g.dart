// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'decline_call_req_body_dto.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

DeclineCallReqBodyDto _$DeclineCallReqBodyDtoFromJson(
  Map<String, dynamic> json,
) => DeclineCallReqBodyDto(
  chatId: json['chatId'] as String,
  numberOfDeclinedCalls: (json['numberOfDeclinedCalls'] as num).toInt(),
);

Map<String, dynamic> _$DeclineCallReqBodyDtoToJson(
  DeclineCallReqBodyDto instance,
) => <String, dynamic>{
  'chatId': instance.chatId,
  'numberOfDeclinedCalls': instance.numberOfDeclinedCalls,
};
