import 'package:copor_core/src/data/model/base_model.dart';
import 'package:copor_vu_meet/src/config/vu_meet_namespaces.dart';
import 'package:copor_vu_meet/src/data/model/chat_info/chat_info_member_model.dart';
import 'package:copor_core/src/utils/typedef.dart';
import 'package:json_annotation/json_annotation.dart';

part 'chat_info_model.g.dart';

@JsonSerializable()
class ChatInfoModel extends BaseModel {
  final String id;
  final String name;
  final bool isPrivate;
  final String chatPicture;
  final List<ChatInfoMemberModel> members;
  final bool? isActive;

  static const String namespaceStatic = VuMeetModelNamespaces.ChatInfoModel;

  const ChatInfoModel({
    required this.id,
    required this.members,
    required this.name,
    required this.isPrivate,
    required this.chatPicture,
    this.isActive,
  });

  factory ChatInfoModel.fromJson(JSON json) => _$ChatInfoModelFromJson(json);

  @override
  JSON toJson() => _$ChatInfoModelToJson(this);

  ChatInfoModel copyWith({
    String? id,
    String? name,
    bool? isPrivate,
    String? chatPicture,
    List<ChatInfoMemberModel>? members,
    bool? isActive,
  }) {
    return ChatInfoModel(
      id: id ?? this.id,
      members: members ?? this.members,
      name: name ?? this.name,
      isPrivate: isPrivate ?? this.isPrivate,
      chatPicture: chatPicture ?? this.chatPicture,
      isActive: isActive ?? this.isActive,
    );
  }

  @override
  List<Object?> get props => [id, members, name, isPrivate, chatPicture, isActive];

  @override
  String get namespace => namespaceStatic;
}
