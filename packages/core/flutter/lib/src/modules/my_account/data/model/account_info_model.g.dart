// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'account_info_model.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

AccountInfoModel _$AccountInfoModelFromJson(Map<String, dynamic> json) =>
    AccountInfoModel(
      id: json['id'] as String,
      firstName: json['firstName'] as String,
      lastName: json['lastName'] as String,
      username: json['username'] as String,
      email: json['email'] as String,
      roleType: json['roleType'] as String,
      phoneNumberList: (json['phoneNumberList'] as List<dynamic>)
          .map((e) => PhoneNumberModel.fromJson(e as Map<String, dynamic>))
          .toList(),
      deletionRequested: json['deletionRequested'] as bool,
      gender: json['gender'] as String?,
      nickName: json['nickName'] as String?,
      picture: json['picture'] as String?,
      citizenship: json['citizenship'] as String?,
      address: json['address'] == null
          ? null
          : AddressModel.fromJson(json['address'] as Map<String, dynamic>),
      dateOfBirth: json['dateOfBirth'] as String?,
      placeOfBirth: json['placeOfBirth'] as String?,
      nativeLanguage: json['nativeLanguage'] == null
          ? null
          : NamedIdDTO.fromJson(json['nativeLanguage'] as Map<String, dynamic>),
      salutation: json['salutation'] as String?,
      registrationDate: json['registrationDate'] as String?,
      lastVisitedDate: json['lastVisitedDate'] as String?,
      contactNote: json['contactNote'] as String?,
      specialRoles: (json['specialRoles'] as List<dynamic>?)
          ?.map((e) => e as String)
          .toList(),
      isActive: json['isActive'] as bool?,
    );

Map<String, dynamic> _$AccountInfoModelToJson(
  AccountInfoModel instance,
) => <String, dynamic>{
  'id': instance.id,
  'firstName': instance.firstName,
  'lastName': instance.lastName,
  'username': instance.username,
  'email': instance.email,
  'roleType': instance.roleType,
  'phoneNumberList': instance.phoneNumberList.map((e) => e.toJson()).toList(),
  'address': instance.address?.toJson(),
  'citizenship': instance.citizenship,
  'salutation': instance.salutation,
  'nickName': instance.nickName,
  'gender': instance.gender,
  'picture': instance.picture,
  'dateOfBirth': instance.dateOfBirth,
  'placeOfBirth': instance.placeOfBirth,
  'nativeLanguage': instance.nativeLanguage?.toJson(),
  'registrationDate': instance.registrationDate,
  'lastVisitedDate': instance.lastVisitedDate,
  'contactNote': instance.contactNote,
  'specialRoles': instance.specialRoles,
  'isActive': instance.isActive,
  'deletionRequested': instance.deletionRequested,
};
