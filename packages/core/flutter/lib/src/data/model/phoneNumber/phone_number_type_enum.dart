import 'package:json_annotation/json_annotation.dart';

enum PhoneNumberTypeEnum {
  @JsonValue('PHONE_MOBILE')
  PHONE_MOBILE,
  @JsonValue('PHONE_HOME')
  PHONE_HOME,
  @JsonValue('PHONE_WORK')
  PHONE_WORK,
  @JsonValue('PHONE_MOBILE_ALTERNATIVE')
  PHONE_MOBILE_ALTERNATIVE,
  @JsonValue('PHONE_HOME_ALTERNATIVE')
  PHONE_HOME_ALTERNATIVE,
  @JsonValue('PHONE_WORK_ALTERNATIVE')
  PHONE_WORK_ALTERNATIVE,
  @JsonValue('PHONE_OTHER')
  PHONE_OTHER,
}
