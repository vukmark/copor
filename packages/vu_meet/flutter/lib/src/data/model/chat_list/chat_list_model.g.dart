// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'chat_list_model.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

ChatListItemModel _$ChatListItemModelFromJson(Map<String, dynamic> json) =>
    ChatListItemModel(
      id: json['id'] as String,
      isPrivate: json['isPrivate'] as bool,
      name: json['name'] as String,
      picture: json['picture'] as String,
      lastMessage: json['lastMessage'] as String,
      createdAt: json['createdAt'] as String,
      numberOfUnseenMessages: (json['numberOfUnseenMessages'] as num).toInt(),
      isActive: json['isActive'] as bool? ?? false,
      otherUserId: json['otherUserId'] as String?,
    );

Map<String, dynamic> _$ChatListItemModelToJson(ChatListItemModel instance) =>
    <String, dynamic>{
      'id': instance.id,
      'isPrivate': instance.isPrivate,
      'name': instance.name,
      'picture': instance.picture,
      'lastMessage': instance.lastMessage,
      'createdAt': instance.createdAt,
      'numberOfUnseenMessages': instance.numberOfUnseenMessages,
      'isActive': instance.isActive,
      'otherUserId': instance.otherUserId,
    };
