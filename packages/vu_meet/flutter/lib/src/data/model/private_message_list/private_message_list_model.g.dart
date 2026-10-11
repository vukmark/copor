// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'private_message_list_model.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

PrivateMessageListItemModel _$PrivateMessageListItemModelFromJson(
  Map<String, dynamic> json,
) => PrivateMessageListItemModel(
  messageContent: json['messageContent'] as String,
  senderPicture: json['senderPicture'] as String,
  senderName: json['senderName'] as String,
  isOwn: json['isOwn'] as bool,
  isSeen: json['isSeen'] as bool,
  isPrivate: json['isPrivate'] as bool,
  senderId: json['senderId'] as String,
  dateCreated: json['dateCreated'] as String,
  timeCreated: json['timeCreated'] as String,
  isLastFromUser: json['isLastFromUser'] as bool,
  isFirstFromUser: json['isFirstFromUser'] as bool,
  messageStatus: $enumDecode(_$MessageStatusEnumMap, json['messageStatus']),
);

Map<String, dynamic> _$PrivateMessageListItemModelToJson(
  PrivateMessageListItemModel instance,
) => <String, dynamic>{
  'messageContent': instance.messageContent,
  'senderPicture': instance.senderPicture,
  'senderName': instance.senderName,
  'isOwn': instance.isOwn,
  'isSeen': instance.isSeen,
  'isPrivate': instance.isPrivate,
  'dateCreated': instance.dateCreated,
  'timeCreated': instance.timeCreated,
  'senderId': instance.senderId,
  'isLastFromUser': instance.isLastFromUser,
  'isFirstFromUser': instance.isFirstFromUser,
  'messageStatus': _$MessageStatusEnumMap[instance.messageStatus]!,
};

const _$MessageStatusEnumMap = {
  MessageStatus.sending: 'sending',
  MessageStatus.sent: 'sent',
  MessageStatus.failed: 'failed',
  MessageStatus.seen: 'seen',
};
