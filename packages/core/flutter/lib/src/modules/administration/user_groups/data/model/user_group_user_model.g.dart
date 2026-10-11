// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'user_group_user_model.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

UserGroupUserModel _$UserGroupUserModelFromJson(Map<String, dynamic> json) =>
    UserGroupUserModel(
      id: json['id'] as String,
      firstName: json['firstName'] as String,
      lastName: json['lastName'] as String,
      picturePath: json['picturePath'] as String?,
    );

Map<String, dynamic> _$UserGroupUserModelToJson(UserGroupUserModel instance) =>
    <String, dynamic>{
      'id': instance.id,
      'firstName': instance.firstName,
      'lastName': instance.lastName,
      'picturePath': instance.picturePath,
    };
