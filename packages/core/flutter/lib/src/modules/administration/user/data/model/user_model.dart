import 'package:copor_core/src/data/model/base_model.dart';
import 'package:copor_core/src/modules/administration/user/config/user_name_spaces.dart';
import 'package:copor_core/src/utils/typedef.dart';
import 'package:json_annotation/json_annotation.dart';

part 'user_model.g.dart';

@JsonSerializable()
class UserModel extends BaseModel {
  static const String namespaceStatic = UserNamespaces.User;
  final String? id;
  final String? firstName;
  final String? lastName;
  final String? picturePath;
  final String? role;
  final bool? isDefaultRole;
  final bool? isActive;

  const UserModel({
    this.id,
    this.firstName,
    this.lastName,
    this.picturePath,
    this.role,
    this.isDefaultRole,
    this.isActive,
  });

  factory UserModel.fromJson(JSON json) => _$UserModelFromJson(json);

  @override
  JSON toJson() => _$UserModelToJson(this);

  UserModel copyWith({
    String? id,
    String? firstName,
    String? lastName,
    String? picturePath,
    String? role,
    bool? isDefaultRole,
    bool? isActive,
  }) {
    return UserModel(
      id: id ?? this.id,
      firstName: firstName ?? this.firstName,
      lastName: lastName ?? this.lastName,
      picturePath: picturePath ?? this.picturePath,
      role: role ?? this.role,
      isDefaultRole: isDefaultRole ?? this.isDefaultRole,
      isActive: isActive ?? this.isActive,
    );
  }

  @override
  List<Object?> get props => [id, firstName, lastName, picturePath, role, isDefaultRole, isActive];

  @override
  String get namespace => namespaceStatic;
}
