// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'user_group_users_response.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

UserGroupUsersResponse _$UserGroupUsersResponseFromJson(
  Map<String, dynamic> json,
) => UserGroupUsersResponse(
  items: (json['items'] as List<dynamic>)
      .map((e) => UserGroupUserModel.fromJson(e as Map<String, dynamic>))
      .toList(),
  limit: (json['limit'] as num).toInt(),
  offset: (json['offset'] as num).toInt(),
);

Map<String, dynamic> _$UserGroupUsersResponseToJson(
  UserGroupUsersResponse instance,
) => <String, dynamic>{
  'items': instance.items,
  'limit': instance.limit,
  'offset': instance.offset,
};
