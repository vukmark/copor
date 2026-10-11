// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'address_model.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

AddressModel _$AddressModelFromJson(Map<String, dynamic> json) => AddressModel(
  addressId: json['addressId'] as String? ?? '',
  streetAddress: json['streetAddress'] as String? ?? '',
  city: json['city'] as String? ?? '',
  postalCode: json['postalCode'] as String? ?? '',
  state: json['state'] == null
      ? null
      : StateModel.fromJson(json['state'] as Map<String, dynamic>),
  country: CountryItemModel.fromJson(json['country'] as Map<String, dynamic>),
);

Map<String, dynamic> _$AddressModelToJson(AddressModel instance) =>
    <String, dynamic>{
      'addressId': instance.addressId,
      'streetAddress': instance.streetAddress,
      'postalCode': instance.postalCode,
      'city': instance.city,
      'state': instance.state?.toJson(),
      'country': instance.country.toJson(),
    };
