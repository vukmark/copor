// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'vu_meet_message_model.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

VuMeetMessageItemModel _$VuMeetMessageItemModelFromJson(
  Map<String, dynamic> json,
) => VuMeetMessageItemModel(
  id: json['id'] as String,
  messageContent: json['messageContent'] as String,
  senderPicture: json['senderPicture'] as String,
  createdAt: json['createdAt'] as String,
  dateCreated: json['dateCreated'] as String,
  timeCreated: json['timeCreated'] as String,
  senderId: json['senderId'] as String,
  senderName: json['senderName'] as String,
  isLastFromUser: json['isLastFromUser'] as bool,
  isFirstFromUser: json['isFirstFromUser'] as bool,
  isOwn: json['isOwn'] as bool,
  isSeen: json['isSeen'] as bool,
  messageStatus:
      $enumDecodeNullable(_$VuMeetMessageTypeEnumMap, json['messageStatus']) ??
      VuMeetMessageType.text,
  isSending: json['isSending'] as bool? ?? true,
);

Map<String, dynamic> _$VuMeetMessageItemModelToJson(
  VuMeetMessageItemModel instance,
) => <String, dynamic>{
  'id': instance.id,
  'messageContent': instance.messageContent,
  'isOwn': instance.isOwn,
  'isSeen': instance.isSeen,
  'senderPicture': instance.senderPicture,
  'createdAt': instance.createdAt,
  'dateCreated': instance.dateCreated,
  'timeCreated': instance.timeCreated,
  'senderId': instance.senderId,
  'senderName': instance.senderName,
  'isLastFromUser': instance.isLastFromUser,
  'isFirstFromUser': instance.isFirstFromUser,
  'isSending': instance.isSending,
  'messageStatus': _$VuMeetMessageTypeEnumMap[instance.messageStatus]!,
};

const _$VuMeetMessageTypeEnumMap = {
  VuMeetMessageType.text: 'TEXT',
  VuMeetMessageType.file: 'FILE',
  VuMeetMessageType.callEvent: 'CALL_EVENT',
};
