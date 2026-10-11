import 'package:json_annotation/json_annotation.dart';

part 'edit_chat_req_body_dto.g.dart';

@JsonSerializable()
class EditChatReqBodyDto {
  @JsonKey(name: 'id')
  final String id;

  @JsonKey(name: 'name')
  final String name;

  @JsonKey(name: 'userList')
  final List<String> userList;

  EditChatReqBodyDto({required this.id, required this.name, required this.userList});

  factory EditChatReqBodyDto.fromJson(Map<String, dynamic> json) =>
      _$EditChatReqBodyDtoFromJson(json);

  Map<String, dynamic> toJson() => _$EditChatReqBodyDtoToJson(this);
}
