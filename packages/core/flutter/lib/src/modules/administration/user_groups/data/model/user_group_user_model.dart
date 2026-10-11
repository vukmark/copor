import 'package:copor_core/src/data/model/base_model.dart';
import 'package:copor_core/src/modules/administration/user_groups/config/user_groups_name_spaces.dart';
import 'package:copor_core/src/utils/typedef.dart';
import 'package:json_annotation/json_annotation.dart';

part 'user_group_user_model.g.dart';

@JsonSerializable()
class UserGroupUserModel extends BaseModel {
  static const String namespaceStatic = UserGroupsNamespaces.userGroupUser;

  final String id;
  final String firstName;
  final String lastName;
  final String? picturePath;

  const UserGroupUserModel({
    required this.id,
    required this.firstName,
    required this.lastName,
    this.picturePath,
  });

  String get fullName => '$firstName $lastName'.trim();

  factory UserGroupUserModel.fromJson(JSON json) => _$UserGroupUserModelFromJson(json);

  @override
  JSON toJson() => _$UserGroupUserModelToJson(this);

  @override
  List<Object?> get props => [id, firstName, lastName, picturePath];

  @override
  String get namespace => namespaceStatic;
}
