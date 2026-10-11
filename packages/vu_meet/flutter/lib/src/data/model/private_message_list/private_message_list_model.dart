import 'package:copor_core/src/data/model/base_model.dart';
import 'package:copor_vu_meet/src/config/vu_meet_namespaces.dart';
import 'package:copor_core/src/utils/typedef.dart';
import 'package:json_annotation/json_annotation.dart';

part 'private_message_list_model.g.dart';

@JsonSerializable()
class PrivateMessageListItemModel extends BaseModel {
  static const String namespaceStatic = VuMeetModelNamespaces.PrivateMessageList;
  final String messageContent;
  final String senderPicture;
  final String senderName;
  final bool isOwn;
  final bool isSeen;
  final bool isPrivate;
  final String dateCreated;
  final String timeCreated;
  final String senderId;
  final bool isLastFromUser;
  final bool isFirstFromUser;
  final MessageStatus messageStatus;

  const PrivateMessageListItemModel({
    required this.messageContent,
    required this.senderPicture,
    required this.senderName,
    required this.isOwn,
    required this.isSeen,
    required this.isPrivate,
    required this.senderId,
    required this.dateCreated,
    required this.timeCreated,
    required this.isLastFromUser,
    required this.isFirstFromUser,
    required this.messageStatus,
  });

  factory PrivateMessageListItemModel.fromJson(JSON json) =>
      _$PrivateMessageListItemModelFromJson(json);

  @override
  JSON toJson() => _$PrivateMessageListItemModelToJson(this);

  PrivateMessageListItemModel copyWith({
    String? messageContent,
    String? senderPicture,
    String? senderName,
    bool? isOwn,
    bool? isSeen,
    bool? isPrivate,
    String? senderId,
    String? dateCreated,
    String? timeCreated,
    bool? isLastFromUser,
    bool? isFirstFromUser,
    MessageStatus? messageStatus,
  }) {
    return PrivateMessageListItemModel(
      messageContent: messageContent ?? this.messageContent,
      senderPicture: senderPicture ?? this.senderPicture,
      isOwn: isOwn ?? this.isOwn,
      isSeen: isSeen ?? this.isSeen,
      isPrivate: isPrivate ?? this.isPrivate,
      senderId: senderId ?? this.senderId,
      dateCreated: dateCreated ?? this.dateCreated,
      timeCreated: timeCreated ?? this.timeCreated,
      isLastFromUser: isLastFromUser ?? this.isLastFromUser,
      isFirstFromUser: isFirstFromUser ?? this.isFirstFromUser,
      messageStatus: messageStatus ?? this.messageStatus,
      senderName: senderName ?? this.senderName,
    );
  }

  @override
  List<Object?> get props => [
    messageContent,
    senderPicture,
    senderName,
    isOwn,
    senderId,
    isSeen,
    isPrivate,
    dateCreated,
    timeCreated,
    isLastFromUser,
    isFirstFromUser,
    messageStatus,
  ];

  @override
  String get namespace => namespaceStatic;
}
