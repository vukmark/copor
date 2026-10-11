import 'package:copor_core/src/data/model/base_model.dart';
import 'package:copor_core/src/modules/administration/permissions/data/model/permission_group_type_enum.dart';
import 'package:copor_core/src/modules/administration/user_groups/config/user_groups_name_spaces.dart';
import 'package:copor_core/src/utils/typedef.dart';
import 'package:json_annotation/json_annotation.dart';

part 'user_group_model.g.dart';

@JsonSerializable()
class UserGroupModel extends BaseModel {
  static const String namespaceStatic = UserGroupsNamespaces.userGroup;

  final String id;
  final String name;
  @JsonKey(defaultValue: false)
  final bool canEdit;
  @JsonKey(defaultValue: false)
  final bool canCreateChildren;
  @JsonKey(defaultValue: <UserGroupModel>[])
  final List<UserGroupModel> children;
  @JsonKey(defaultValue: 'USER_GROUP')
  final String groupType;

  const UserGroupModel({
    required this.id,
    required this.name,
    required this.canEdit,
    required this.canCreateChildren,
    required this.children,
    this.groupType = 'USER_GROUP',
  });

  factory UserGroupModel.fromJson(JSON json) => _$UserGroupModelFromJson(json);

  @override
  JSON toJson() => _$UserGroupModelToJson(this);

  factory UserGroupModel.empty() => const UserGroupModel(
    id: '',
    name: '',
    canEdit: false,
    canCreateChildren: false,
    children: [],
  );

  PermissionGroupType? get permissionGroupTypeEnum => PermissionGroupType.fromValue(groupType);

  UserGroupModel copyWith({
    String? id,
    String? name,
    List<UserGroupModel>? children,
  }) {
    return UserGroupModel(
      id: id ?? this.id,
      name: name ?? this.name,
      canEdit: canEdit,
      canCreateChildren: canCreateChildren,
      children: children ?? this.children,
      groupType: groupType,
    );
  }

  @override
  List<Object?> get props => [id, name, canEdit, canCreateChildren, children, groupType];

  @override
  String get namespace => namespaceStatic;
}
