import 'package:copor_core/src/data/model/base_model.dart';
import 'package:copor_vu_meet/src/config/vu_meet_namespaces.dart';
import 'package:copor_core/src/utils/typedef.dart';
import 'package:json_annotation/json_annotation.dart';

part 'chat_info_member_model.g.dart';

@JsonSerializable()
class ChatInfoMemberModel extends BaseModel {
  final String id;
  final String name;
  final String picture;
  final String roleName;
  static const String namespaceStatic = VuMeetModelNamespaces.ChatInfoMemberModel;

  const ChatInfoMemberModel({
    required this.id,
    required this.name,
    required this.picture,
    required this.roleName,
  });

  factory ChatInfoMemberModel.fromJson(JSON json) => _$ChatInfoMemberModelFromJson(json);

  @override
  JSON toJson() => _$ChatInfoMemberModelToJson(this);

  ChatInfoMemberModel copyWith({String? id, String? name, String? picture, String? roleName}) {
    return ChatInfoMemberModel(
      id: id ?? this.id,
      name: name ?? this.name,
      picture: picture ?? this.picture,
      roleName: roleName ?? this.roleName,
    );
  }

  @override
  List<Object?> get props => [id, name, picture, roleName];

  @override
  String get namespace => namespaceStatic;
}
