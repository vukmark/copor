import 'package:copor_core/src/data/model/base_model.dart';
import 'package:copor_core/src/utils/name_spaces.dart';
import 'package:copor_core/src/utils/typedef.dart';
import 'package:json_annotation/json_annotation.dart';

part 'feature_model.g.dart';

@JsonSerializable()
class FeatureListModel extends BaseModel {
  final List<String> featureList;

  const FeatureListModel({required this.featureList});

  factory FeatureListModel.fromJson(JSON json) => _$FeatureListModelFromJson(json);

  @override
  JSON toJson() => _$FeatureListModelToJson(this);

  @override
  String get namespace => ModelNamespaces.Feature;
}

@JsonSerializable()
class FeatureRoleModel {
  final String roleId;
  final String roleName;
  final bool enabled;

  FeatureRoleModel({required this.roleId, required this.roleName, required this.enabled});

  factory FeatureRoleModel.fromJson(JSON json) => _$FeatureRoleModelFromJson(json);

  JSON toJson() => _$FeatureRoleModelToJson(this);
}

@JsonSerializable()
class FeatureModel extends BaseModel {
  static const String namespaceStatic = ModelNamespaces.Feature;

  final String featureId;
  final String featureName;
  final List<FeatureRoleModel> roleList;

  const FeatureModel({required this.featureId, required this.roleList, required this.featureName});

  factory FeatureModel.fromJson(JSON json) => _$FeatureModelFromJson(json);

  @override
  JSON toJson() => _$FeatureModelToJson(this);

  @override
  String get namespace => namespaceStatic;
}

@JsonSerializable()
class FeatureModelDTO extends BaseModel {
  @JsonKey(name: 'feature')
  final String featureId;
  final List<String> enabledRoles;

  const FeatureModelDTO({required this.featureId, required this.enabledRoles});

  factory FeatureModelDTO.fromJson(JSON json) => _$FeatureModelDTOFromJson(json);

  @override
  String get namespace => FeatureModel.namespaceStatic;

  @override
  JSON toJson() => _$FeatureModelDTOToJson(this);
}

@JsonSerializable(explicitToJson: true)
class MenuListModel extends BaseModel {
  final List<MenuItemModel> menuList;

  const MenuListModel({required this.menuList});

  factory MenuListModel.fromJson(JSON json) => _$MenuListModelFromJson(json);

  @override
  JSON toJson() => _$MenuListModelToJson(this);

  @override
  String get namespace => ModelNamespaces.Feature;
}

@JsonSerializable(explicitToJson: true)
class MenuItemModel {
  final String icon;
  final String label;
  final String? route;
  final bool? isExternalLink;
  final List<MenuItemModel> children;

  const MenuItemModel({
    required this.icon,
    required this.label,
    this.isExternalLink,
    this.route,
    this.children = const [],
  });

  factory MenuItemModel.fromJson(JSON json) => _$MenuItemModelFromJson(json);

  JSON toJson() => _$MenuItemModelToJson(this);
}
