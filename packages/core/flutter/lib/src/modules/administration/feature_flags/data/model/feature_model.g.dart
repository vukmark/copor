// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'feature_model.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

FeatureListModel _$FeatureListModelFromJson(Map<String, dynamic> json) =>
    FeatureListModel(
      featureList: (json['featureList'] as List<dynamic>)
          .map((e) => e as String)
          .toList(),
    );

Map<String, dynamic> _$FeatureListModelToJson(FeatureListModel instance) =>
    <String, dynamic>{'featureList': instance.featureList};

FeatureRoleModel _$FeatureRoleModelFromJson(Map<String, dynamic> json) =>
    FeatureRoleModel(
      roleId: json['roleId'] as String,
      roleName: json['roleName'] as String,
      enabled: json['enabled'] as bool,
    );

Map<String, dynamic> _$FeatureRoleModelToJson(FeatureRoleModel instance) =>
    <String, dynamic>{
      'roleId': instance.roleId,
      'roleName': instance.roleName,
      'enabled': instance.enabled,
    };

FeatureModel _$FeatureModelFromJson(Map<String, dynamic> json) => FeatureModel(
  featureId: json['featureId'] as String,
  roleList: (json['roleList'] as List<dynamic>)
      .map((e) => FeatureRoleModel.fromJson(e as Map<String, dynamic>))
      .toList(),
  featureName: json['featureName'] as String,
);

Map<String, dynamic> _$FeatureModelToJson(FeatureModel instance) =>
    <String, dynamic>{
      'featureId': instance.featureId,
      'featureName': instance.featureName,
      'roleList': instance.roleList,
    };

FeatureModelDTO _$FeatureModelDTOFromJson(Map<String, dynamic> json) =>
    FeatureModelDTO(
      featureId: json['feature'] as String,
      enabledRoles: (json['enabledRoles'] as List<dynamic>)
          .map((e) => e as String)
          .toList(),
    );

Map<String, dynamic> _$FeatureModelDTOToJson(FeatureModelDTO instance) =>
    <String, dynamic>{
      'feature': instance.featureId,
      'enabledRoles': instance.enabledRoles,
    };

MenuListModel _$MenuListModelFromJson(Map<String, dynamic> json) =>
    MenuListModel(
      menuList: (json['menuList'] as List<dynamic>)
          .map((e) => MenuItemModel.fromJson(e as Map<String, dynamic>))
          .toList(),
    );

Map<String, dynamic> _$MenuListModelToJson(MenuListModel instance) =>
    <String, dynamic>{
      'menuList': instance.menuList.map((e) => e.toJson()).toList(),
    };

MenuItemModel _$MenuItemModelFromJson(Map<String, dynamic> json) =>
    MenuItemModel(
      icon: json['icon'] as String,
      label: json['label'] as String,
      isExternalLink: json['isExternalLink'] as bool?,
      route: json['route'] as String?,
      children:
          (json['children'] as List<dynamic>?)
              ?.map((e) => MenuItemModel.fromJson(e as Map<String, dynamic>))
              .toList() ??
          const [],
    );

Map<String, dynamic> _$MenuItemModelToJson(MenuItemModel instance) =>
    <String, dynamic>{
      'icon': instance.icon,
      'label': instance.label,
      'route': instance.route,
      'isExternalLink': instance.isExternalLink,
      'children': instance.children.map((e) => e.toJson()).toList(),
    };
