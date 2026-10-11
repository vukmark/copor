import 'package:json_annotation/json_annotation.dart';

part 'decline_call_req_body_dto.g.dart';

@JsonSerializable()
class DeclineCallReqBodyDto {
  @JsonKey(name: 'chatId')
  final String chatId;
  @JsonKey(name: 'numberOfDeclinedCalls')
  final int numberOfDeclinedCalls;

  DeclineCallReqBodyDto({required this.chatId, required this.numberOfDeclinedCalls});

  factory DeclineCallReqBodyDto.fromJson(Map<String, dynamic> json) =>
      _$DeclineCallReqBodyDtoFromJson(json);

  Map<String, dynamic> toJson() => _$DeclineCallReqBodyDtoToJson(this);
}
