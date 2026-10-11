// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'role_permission_search_response.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

RolePermissionSearchResponse _$RolePermissionSearchResponseFromJson(
  Map<String, dynamic> json,
) => RolePermissionSearchResponse(
  items: (json['items'] as List<dynamic>)
      .map(
        (e) => RoleFeaturePermissionsModel.fromJson(e as Map<String, dynamic>),
      )
      .toList(),
  limit: json['limit'] as String?,
  offset: json['offset'] as String?,
);

Map<String, dynamic> _$RolePermissionSearchResponseToJson(
  RolePermissionSearchResponse instance,
) => <String, dynamic>{
  'items': instance.items,
  'limit': instance.limit,
  'offset': instance.offset,
};
