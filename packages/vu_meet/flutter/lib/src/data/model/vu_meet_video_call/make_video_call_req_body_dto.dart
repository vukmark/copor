import 'package:json_annotation/json_annotation.dart';

part 'make_video_call_req_body_dto.g.dart';

class CallActionType {
  static String CALL_ACCEPTED = 'CALL_ACCEPTED';
  static String START_CALL = 'START_CALL';
  static String END_CALL = 'END_CALL';
  static String DECLINE_CALL = 'DECLINE_CALL';
  static String TIMEOUT_CALL = 'TIMEOUT_CALL';

  static String toTranslationKey(String action) {
    switch (action) {
      case 'CALL_ACCEPTED':
        return 'translationStringList.CALL_TO_YOU_ACCEPTED';
      case 'START_CALL':
        return 'translationStringList.START_CALL';
      case 'END_CALL':
        return 'translationStringList.CALL_ENDED';
      case 'DECLINE_CALL':
        return 'translationStringList.YOU_DECLINED_CALL';
      case 'TIMEOUT_CALL':
        return 'translationStringList.CALL_TO_YOU_TIMED_OUT';
      default:
        return action;
    }
  }
}

@JsonSerializable()
class MakeVideoCallActionReqBodyDto {
  @JsonKey(name: 'chatId')
  final String chatId;
  @JsonKey(name: 'type')
  final String type;
  @JsonKey(name: 'action')
  final String action;
  @JsonKey(name: 'durationSeconds', includeIfNull: false)
  final int? durationSeconds;

  MakeVideoCallActionReqBodyDto({
    required this.chatId,
    required this.type,
    required this.action,
    this.durationSeconds,
  });

  factory MakeVideoCallActionReqBodyDto.fromJson(Map<String, dynamic> json) =>
      _$MakeVideoCallActionReqBodyDtoFromJson(json);

  Map<String, dynamic> toJson() => _$MakeVideoCallActionReqBodyDtoToJson(this);
}
