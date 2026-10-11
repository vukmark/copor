import 'package:copor_core/src/modules/administration/permissions/data/model/role_permission_model.dart';
import 'package:copor_core/src/utils/typedef.dart';
import 'package:json_annotation/json_annotation.dart';

part 'role_permission_search_response.g.dart';

@JsonSerializable()
class RolePermissionSearchResponse {
  final List<RoleFeaturePermissionsModel> items;
  final String? limit;
  final String? offset;

  const RolePermissionSearchResponse({required this.items, this.limit, this.offset});

  factory RolePermissionSearchResponse.fromJson(JSON json) =>
      _$RolePermissionSearchResponseFromJson(json);

  JSON toJson() => _$RolePermissionSearchResponseToJson(this);
}
