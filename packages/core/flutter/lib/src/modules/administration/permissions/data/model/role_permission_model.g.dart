// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'role_permission_model.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

RolePermissionModel _$RolePermissionModelFromJson(Map<String, dynamic> json) =>
    RolePermissionModel(
      permissionType: json['permissionType'] as String,
      translation: json['translation'] as String? ?? '',
      description: json['description'] as String? ?? '',
      scope: json['scope'] as String?,
      effect: json['effect'] as String? ?? 'ALLOW',
      requiresScope: json['requiresScope'] as bool? ?? false,
      effectiveEffect: json['effectiveEffect'] as String?,
      dependsOn:
          (json['dependsOn'] as List<dynamic>?)
              ?.map((e) => e as String)
              .toList() ??
          [],
    );

Map<String, dynamic> _$RolePermissionModelToJson(
  RolePermissionModel instance,
) => <String, dynamic>{
  'permissionType': instance.permissionType,
  'scope': instance.scope,
  'effect': instance.effect,
};

RoleFeaturePermissionsModel _$RoleFeaturePermissionsModelFromJson(
  Map<String, dynamic> json,
) => RoleFeaturePermissionsModel(
  feature: RolePermissionFeatureModel.fromJson(
    json['feature'] as Map<String, dynamic>,
  ),
  permissionList: (json['permissionList'] as List<dynamic>)
      .map((e) => RolePermissionModel.fromJson(e as Map<String, dynamic>))
      .toList(),
);

Map<String, dynamic> _$RoleFeaturePermissionsModelToJson(
  RoleFeaturePermissionsModel instance,
) => <String, dynamic>{
  'feature': instance.feature,
  'permissionList': instance.permissionList,
};

RolePermissionFeatureModel _$RolePermissionFeatureModelFromJson(
  Map<String, dynamic> json,
) => RolePermissionFeatureModel(
  feature: json['feature'] as String,
  name: json['name'] as String,
);

Map<String, dynamic> _$RolePermissionFeatureModelToJson(
  RolePermissionFeatureModel instance,
) => <String, dynamic>{'feature': instance.feature, 'name': instance.name};
