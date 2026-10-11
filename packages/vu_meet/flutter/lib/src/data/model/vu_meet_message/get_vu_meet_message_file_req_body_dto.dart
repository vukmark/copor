import 'package:json_annotation/json_annotation.dart';

part 'get_vu_meet_message_file_req_body_dto.g.dart';

@JsonSerializable()
class GetVuMeetMessageFileReqBodyDto {
  @JsonKey(name: 'fileId')
  final String fileId;
  @JsonKey(name: 'fileName')
  final String fileName;

  GetVuMeetMessageFileReqBodyDto({required this.fileId, required this.fileName});

  factory GetVuMeetMessageFileReqBodyDto.fromJson(Map<String, dynamic> json) =>
      _$GetVuMeetMessageFileReqBodyDtoFromJson(json);

  Map<String, dynamic> toJson() => _$GetVuMeetMessageFileReqBodyDtoToJson(this);
}
