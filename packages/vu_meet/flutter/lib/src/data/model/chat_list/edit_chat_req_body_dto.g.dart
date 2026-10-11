// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'edit_chat_req_body_dto.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

EditChatReqBodyDto _$EditChatReqBodyDtoFromJson(Map<String, dynamic> json) =>
    EditChatReqBodyDto(
      id: json['id'] as String,
      name: json['name'] as String,
      userList: (json['userList'] as List<dynamic>)
          .map((e) => e as String)
          .toList(),
    );

Map<String, dynamic> _$EditChatReqBodyDtoToJson(EditChatReqBodyDto instance) =>
    <String, dynamic>{
      'id': instance.id,
      'name': instance.name,
      'userList': instance.userList,
    };
