// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'chat_info_member_model.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

ChatInfoMemberModel _$ChatInfoMemberModelFromJson(Map<String, dynamic> json) =>
    ChatInfoMemberModel(
      id: json['id'] as String,
      name: json['name'] as String,
      picture: json['picture'] as String,
      roleName: json['roleName'] as String,
    );

Map<String, dynamic> _$ChatInfoMemberModelToJson(
  ChatInfoMemberModel instance,
) => <String, dynamic>{
  'id': instance.id,
  'name': instance.name,
  'picture': instance.picture,
  'roleName': instance.roleName,
};
