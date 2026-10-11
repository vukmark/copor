// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'user_group_users_request.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

UserGroupUsersRequest _$UserGroupUsersRequestFromJson(
  Map<String, dynamic> json,
) => UserGroupUsersRequest(
  userGroupId: json['userGroupId'] as String,
  limit: (json['limit'] as num).toInt(),
  offset: (json['offset'] as num).toInt(),
);

Map<String, dynamic> _$UserGroupUsersRequestToJson(
  UserGroupUsersRequest instance,
) => <String, dynamic>{
  'userGroupId': instance.userGroupId,
  'limit': instance.limit,
  'offset': instance.offset,
};
