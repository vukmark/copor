// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'create_new_chat_req_body_dto.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

CreateNewChatReqBodyDto _$CreateNewChatReqBodyDtoFromJson(
  Map<String, dynamic> json,
) => CreateNewChatReqBodyDto(
  users: (json['users'] as List<dynamic>).map((e) => e as String).toList(),
  groupName: json['groupName'] as String? ?? '',
);

Map<String, dynamic> _$CreateNewChatReqBodyDtoToJson(
  CreateNewChatReqBodyDto instance,
) => <String, dynamic>{
  'users': instance.users,
  'groupName': instance.groupName,
};
