import 'package:json_annotation/json_annotation.dart';

part 'create_new_chat_req_body_dto.g.dart';

@JsonSerializable()
class CreateNewChatReqBodyDto {
  @JsonKey(name: 'users')
  final List<String> users;

  @JsonKey(name: 'groupName', defaultValue: '') // <-- The magic is here
  final String groupName;

  CreateNewChatReqBodyDto({required this.users, this.groupName = ''});

  factory CreateNewChatReqBodyDto.fromJson(Map<String, dynamic> json) =>
      _$CreateNewChatReqBodyDtoFromJson(json);

  Map<String, dynamic> toJson() => _$CreateNewChatReqBodyDtoToJson(this);
}
