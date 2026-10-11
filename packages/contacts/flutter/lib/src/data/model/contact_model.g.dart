// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'contact_model.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

PhoneNumberModel _$PhoneNumberModelFromJson(Map<String, dynamic> json) =>
    PhoneNumberModel(
      phoneTitle: json['phoneTitle'] as String,
      phoneNumber: json['phoneNumber'] as String,
    );

Map<String, dynamic> _$PhoneNumberModelToJson(PhoneNumberModel instance) =>
    <String, dynamic>{
      'phoneTitle': instance.phoneTitle,
      'phoneNumber': instance.phoneNumber,
    };

ContactModel _$ContactModelFromJson(Map<String, dynamic> json) => ContactModel(
  id: json['id'] as String,
  initials: json['initials'] as String?,
  fullName: json['fullName'] as String,
  jobTitle: json['jobTitle'] as String?,
  email: json['email'] as String?,
  salutation: json['salutation'] as String?,
  picture: json['picture'] as String,
  address: json['address'] as String?,
  country: json['country'] as String?,
  state: json['state'] as String?,
  postalCode: json['postalCode'] as String?,
  city: json['city'] as String?,
  phoneNumber: (json['phoneNumber'] as List<dynamic>?)
      ?.map((e) => PhoneNumberModel.fromJson(e as Map<String, dynamic>))
      .toList(),
  tenantName: json['tenantName'] as String?,
  tenantAddress: json['tenantAddress'] as String?,
  tenantCountry: json['tenantCountry'] as String?,
  tenantState: json['tenantState'] as String?,
  tenantPostalCode: json['tenantPostalCode'] as String?,
  tenantCity: json['tenantCity'] as String?,
  role: json['role'] as String?,
  isActive: json['isActive'] as bool?,
);

Map<String, dynamic> _$ContactModelToJson(ContactModel instance) =>
    <String, dynamic>{
      'id': instance.id,
      'initials': instance.initials,
      'fullName': instance.fullName,
      'jobTitle': instance.jobTitle,
      'email': instance.email,
      'salutation': instance.salutation,
      'picture': instance.picture,
      'address': instance.address,
      'country': instance.country,
      'state': instance.state,
      'postalCode': instance.postalCode,
      'city': instance.city,
      'phoneNumber': instance.phoneNumber?.map((e) => e.toJson()).toList(),
      'tenantName': instance.tenantName,
      'tenantAddress': instance.tenantAddress,
      'tenantCountry': instance.tenantCountry,
      'tenantState': instance.tenantState,
      'tenantPostalCode': instance.tenantPostalCode,
      'tenantCity': instance.tenantCity,
      'role': instance.role,
      'isActive': instance.isActive,
    };
