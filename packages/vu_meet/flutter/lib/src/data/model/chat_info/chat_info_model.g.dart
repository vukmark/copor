// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'chat_info_model.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

ChatInfoModel _$ChatInfoModelFromJson(Map<String, dynamic> json) =>
    ChatInfoModel(
      id: json['id'] as String,
      members: (json['members'] as List<dynamic>)
          .map((e) => ChatInfoMemberModel.fromJson(e as Map<String, dynamic>))
          .toList(),
      name: json['name'] as String,
      isPrivate: json['isPrivate'] as bool,
      chatPicture: json['chatPicture'] as String,
      isActive: json['isActive'] as bool?,
    );

Map<String, dynamic> _$ChatInfoModelToJson(ChatInfoModel instance) =>
    <String, dynamic>{
      'id': instance.id,
      'name': instance.name,
      'isPrivate': instance.isPrivate,
      'chatPicture': instance.chatPicture,
      'members': instance.members,
      'isActive': instance.isActive,
    };
