import 'package:copor_core/src/data/model/base_model.dart';
import 'package:copor_vu_meet/src/config/vu_meet_namespaces.dart';
import 'package:copor_core/src/utils/typedef.dart';
import 'package:json_annotation/json_annotation.dart';

part 'vu_meet_message_model.g.dart';

enum VuMeetMessageType {
  @JsonValue('TEXT')
  text,
  @JsonValue('FILE')
  file,
  @JsonValue('CALL_EVENT')
  callEvent,
}

@JsonSerializable(explicitToJson: true)
class VuMeetMessageItemModel extends BaseModel {
  static const String namespaceStatic = VuMeetModelNamespaces.VuMeetMessage;
  final String id;
  final String messageContent;
  final bool isOwn;
  final bool isSeen;
  final String senderPicture;
  final String createdAt;
  final String dateCreated;
  final String timeCreated;
  final String senderId;
  final String senderName;
  final bool isLastFromUser;
  final bool isFirstFromUser;
  final bool isSending;
  final VuMeetMessageType messageStatus;

  const VuMeetMessageItemModel({
    required this.id,
    required this.messageContent,
    required this.senderPicture,
    required this.createdAt,
    required this.dateCreated,
    required this.timeCreated,
    required this.senderId,
    required this.senderName,
    required this.isLastFromUser,
    required this.isFirstFromUser,
    required this.isOwn,
    required this.isSeen,
    this.messageStatus = VuMeetMessageType.text,
    this.isSending = true,
  });

  factory VuMeetMessageItemModel.fromJson(JSON json) => _$VuMeetMessageItemModelFromJson(json);

  @override
  JSON toJson() => _$VuMeetMessageItemModelToJson(this);

  VuMeetMessageItemModel copyWith({
    id,
    messageContent,
    senderPicture,
    dateCreated,
    timeCreated,
    createdAt,
    senderId,
    senderName,
    isLastFromUser,
    isFirstFromUser,
    isOwn,
    isSeen,
    isSending,
    messageStatus,
  }) {
    return VuMeetMessageItemModel(
      id: id ?? this.id,
      messageContent: messageContent ?? this.messageContent,
      senderPicture: senderPicture ?? this.senderPicture,
      dateCreated: dateCreated ?? this.dateCreated,
      timeCreated: timeCreated ?? this.timeCreated,
      createdAt: createdAt ?? this.createdAt,
      senderId: senderId ?? this.senderId,
      senderName: senderName ?? this.senderName,
      isLastFromUser: isLastFromUser ?? this.isLastFromUser,
      isFirstFromUser: isFirstFromUser ?? this.isFirstFromUser,
      isOwn: isOwn ?? this.isOwn,
      isSeen: isSeen ?? this.isSeen,
      isSending: isSending ?? this.isSending,
      messageStatus: messageStatus ?? this.messageStatus,
    );
  }

  @override
  List<Object?> get props => [
    id,
    messageContent,
    senderPicture,
    dateCreated,
    timeCreated,
    createdAt,
    senderId,
    senderName,
    isLastFromUser,
    isFirstFromUser,
    isOwn,
    isSeen,
    isSending,
    messageStatus,
  ];

  @override
  String get namespace => namespaceStatic;
}
