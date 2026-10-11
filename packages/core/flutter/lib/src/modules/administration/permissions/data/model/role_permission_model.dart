import 'package:copor_core/src/modules/administration/permissions/data/model/permission_effect_enum.dart';
import 'package:copor_core/src/modules/administration/permissions/data/model/permission_scope_enum.dart';
import 'package:copor_core/src/utils/typedef.dart';
import 'package:equatable/equatable.dart';
import 'package:json_annotation/json_annotation.dart';

part 'role_permission_model.g.dart';

@JsonSerializable()
class RolePermissionModel extends Equatable {
  final String permissionType;
  @JsonKey(includeToJson: false, defaultValue: '')
  final String translation;
  // Detailed explanation of what the permission does and where it's used,
  // shown behind an info button next to the permission name. Empty when no
  // copy has been authored yet for this permission.
  @JsonKey(includeToJson: false, defaultValue: '')
  final String description;
  final String? scope;
  @JsonKey(defaultValue: 'ALLOW')
  final String effect;
  @JsonKey(includeToJson: false, defaultValue: false)
  final bool requiresScope;
  // Only present when `effect` is INHERIT: what it actually resolves to by
  // walking up this group's own ancestor chain. Null for Role permissions
  // (which never have Inherit) and for User Group rows that aren't Inherit.
  @JsonKey(includeToJson: false)
  final String? effectiveEffect;
  // Transitive closure of permissions that must also be ALLOW for this one to work.
  @JsonKey(includeToJson: false, defaultValue: <String>[])
  final List<String> dependsOn;

  const RolePermissionModel({
    required this.permissionType,
    required this.translation,
    this.description = '',
    required this.scope,
    this.effect = 'ALLOW',
    this.requiresScope = false,
    this.effectiveEffect,
    this.dependsOn = const <String>[],
  });

  factory RolePermissionModel.fromJson(JSON json) => _$RolePermissionModelFromJson(json);

  JSON toJson() => _$RolePermissionModelToJson(this);

  RolePermissionModel copyWith({
    String? permissionType,
    String? translation,
    String? description,
    String? scope,
    String? effect,
    bool? requiresScope,
    String? effectiveEffect,
    List<String>? dependsOn,
  }) {
    return RolePermissionModel(
      permissionType: permissionType ?? this.permissionType,
      translation: translation ?? this.translation,
      description: description ?? this.description,
      scope: scope ?? this.scope,
      effect: effect ?? this.effect,
      requiresScope: requiresScope ?? this.requiresScope,
      effectiveEffect: effectiveEffect ?? this.effectiveEffect,
      dependsOn: dependsOn ?? this.dependsOn,
    );
  }

  PermissionScope? get permissionScopeEnum =>
      scope == null ? null : PermissionScope.fromValue(scope!);

  PermissionEffect? get permissionEffectEnum => PermissionEffect.fromValue(effect);

  PermissionEffect? get effectiveEffectEnum =>
      effectiveEffect == null ? null : PermissionEffect.fromValue(effectiveEffect!);

  @override
  List<Object?> get props => [
    permissionType,
    translation,
    description,
    scope,
    effect,
    requiresScope,
    effectiveEffect,
    dependsOn,
  ];
}

@JsonSerializable()
class RoleFeaturePermissionsModel extends Equatable {
  final RolePermissionFeatureModel feature;
  final List<RolePermissionModel> permissionList;

  const RoleFeaturePermissionsModel({required this.feature, required this.permissionList});

  factory RoleFeaturePermissionsModel.fromJson(JSON json) =>
      _$RoleFeaturePermissionsModelFromJson(json);

  JSON toJson() => _$RoleFeaturePermissionsModelToJson(this);

  @override
  List<Object?> get props => [feature, permissionList];
}

@JsonSerializable()
class RolePermissionFeatureModel extends Equatable {
  final String feature;
  final String name;

  const RolePermissionFeatureModel({required this.feature, required this.name});

  factory RolePermissionFeatureModel.fromJson(JSON json) =>
      _$RolePermissionFeatureModelFromJson(json);

  JSON toJson() => _$RolePermissionFeatureModelToJson(this);

  @override
  List<Object?> get props => [feature, name];
}
