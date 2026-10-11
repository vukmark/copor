import 'package:copor_core/src/data/model/base_model.dart';
import 'package:copor_vu_meet/src/config/vu_meet_namespaces.dart';
import 'package:copor_core/src/utils/typedef.dart';
import 'package:json_annotation/json_annotation.dart';

part 'chat_list_model.g.dart';

@JsonSerializable()
class ChatListItemModel extends BaseModel {
  final String id;
  final bool isPrivate;
  final String name;
  final String picture;
  final String lastMessage;
  final String createdAt;
  final int numberOfUnseenMessages;
  final bool isActive;
  final String? otherUserId;

  static const String namespaceStatic = VuMeetModelNamespaces.ChatList;

  const ChatListItemModel({
    required this.id,
    required this.isPrivate,
    required this.name,
    required this.picture,
    required this.lastMessage,
    required this.createdAt,
    required this.numberOfUnseenMessages,
    this.isActive = false,
    this.otherUserId,
  });

  factory ChatListItemModel.fromJson(JSON json) {
    return _$ChatListItemModelFromJson({
      ...json,
      'numberOfUnseenMessages': json['numberOfUnseenMessages'] ?? 0,
    });
  }

  @override
  JSON toJson() => _$ChatListItemModelToJson(this);

  ChatListItemModel copyWith({
    String? id,
    bool? isPrivate,
    String? name,
    String? picture,
    String? lastMessage,
    String? createdAt,
    int? numberOfUnseenMessages,
    bool? isActive,
    String? otherUserId,
  }) {
    return ChatListItemModel(
      id: id ?? this.id,
      isPrivate: isPrivate ?? this.isPrivate,
      name: name ?? this.name,
      picture: picture ?? this.picture,
      lastMessage: lastMessage ?? this.lastMessage,
      createdAt: createdAt ?? this.createdAt,
      numberOfUnseenMessages: numberOfUnseenMessages ?? this.numberOfUnseenMessages,
      isActive: isActive ?? this.isActive,
      otherUserId: otherUserId ?? this.otherUserId,
    );
  }

  @override
  List<Object?> get props => [
    id,
    isPrivate,
    name,
    picture,
    lastMessage,
    createdAt,
    numberOfUnseenMessages,
    isActive,
    otherUserId,
  ];

  @override
  String get namespace => namespaceStatic;
}
