// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'phone_number_model.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

PhoneNumberModel _$PhoneNumberModelFromJson(Map<String, dynamic> json) =>
    PhoneNumberModel(
      id: json['id'] as String,
      user: json['user'] as String,
      phoneNumber: json['phoneNumber'] as String,
      phoneNumberType: $enumDecode(
        _$PhoneNumberTypeEnumEnumMap,
        json['phoneNumberType'],
      ),
    );

Map<String, dynamic> _$PhoneNumberModelToJson(
  PhoneNumberModel instance,
) => <String, dynamic>{
  'id': instance.id,
  'user': instance.user,
  'phoneNumber': instance.phoneNumber,
  'phoneNumberType': _$PhoneNumberTypeEnumEnumMap[instance.phoneNumberType]!,
};

const _$PhoneNumberTypeEnumEnumMap = {
  PhoneNumberTypeEnum.PHONE_MOBILE: 'PHONE_MOBILE',
  PhoneNumberTypeEnum.PHONE_HOME: 'PHONE_HOME',
  PhoneNumberTypeEnum.PHONE_WORK: 'PHONE_WORK',
  PhoneNumberTypeEnum.PHONE_MOBILE_ALTERNATIVE: 'PHONE_MOBILE_ALTERNATIVE',
  PhoneNumberTypeEnum.PHONE_HOME_ALTERNATIVE: 'PHONE_HOME_ALTERNATIVE',
  PhoneNumberTypeEnum.PHONE_WORK_ALTERNATIVE: 'PHONE_WORK_ALTERNATIVE',
  PhoneNumberTypeEnum.PHONE_OTHER: 'PHONE_OTHER',
};
