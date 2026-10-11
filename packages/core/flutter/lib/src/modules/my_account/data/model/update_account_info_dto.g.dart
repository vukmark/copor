// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'update_account_info_dto.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

UpdateAccountInfoDTO _$UpdateAccountInfoDTOFromJson(
  Map<String, dynamic> json,
) => UpdateAccountInfoDTO(
  id: json['id'] as String?,
  firstName: json['firstName'] as String,
  lastName: json['lastName'] as String,
  email: json['email'] as String,
  addressId: json['addressId'] as String?,
  address: json['address'] as String?,
  postalCode: json['postalCode'] as String?,
  city: json['city'] as String?,
  country: json['country'] as String?,
  state: json['state'] as String?,
);

Map<String, dynamic> _$UpdateAccountInfoDTOToJson(
  UpdateAccountInfoDTO instance,
) => <String, dynamic>{
  'id': instance.id,
  'firstName': instance.firstName,
  'lastName': instance.lastName,
  'email': instance.email,
  'addressId': instance.addressId,
  'address': instance.address,
  'postalCode': instance.postalCode,
  'city': instance.city,
  'country': instance.country,
  'state': instance.state,
};
