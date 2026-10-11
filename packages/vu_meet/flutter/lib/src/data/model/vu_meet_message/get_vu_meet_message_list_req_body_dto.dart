import 'package:json_annotation/json_annotation.dart';

part 'get_vu_meet_message_list_req_body_dto.g.dart';

@JsonSerializable()
class GetVuMeetMessageListReqBodyDto {
  final String chatId;
  final String beforeDate;
  final String afterDate;

  GetVuMeetMessageListReqBodyDto({required this.chatId, this.beforeDate = '', this.afterDate = ''});

  factory GetVuMeetMessageListReqBodyDto.fromJson(Map<String, dynamic> json) =>
      _$GetVuMeetMessageListReqBodyDtoFromJson(json);

  Map<String, dynamic> toJson() => _$GetVuMeetMessageListReqBodyDtoToJson(this);
}
