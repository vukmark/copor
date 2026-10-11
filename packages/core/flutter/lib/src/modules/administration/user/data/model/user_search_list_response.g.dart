// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'user_search_list_response.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

UserSearchListResponse _$UserSearchListResponseFromJson(
  Map<String, dynamic> json,
) => UserSearchListResponse(
  items: (json['items'] as List<dynamic>)
      .map((e) => UserModel.fromJson(e as Map<String, dynamic>))
      .toList(),
  limit: json['limit'] as String?,
  offset: json['offset'] as String?,
);

Map<String, dynamic> _$UserSearchListResponseToJson(
  UserSearchListResponse instance,
) => <String, dynamic>{
  'items': instance.items,
  'limit': instance.limit,
  'offset': instance.offset,
};
