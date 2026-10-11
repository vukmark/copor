import 'package:copor_core/src/data/model/base_model.dart';
import 'package:copor_core/src/utils/name_spaces.dart';
import 'package:copor_core/src/utils/typedef.dart';
import 'package:json_annotation/json_annotation.dart';

part 'change_password_model.g.dart';

@JsonSerializable()
class ChangePasswordModel extends BaseModel {
  static const String namespaceStatic = ModelNamespaces.ChangePassword;
  final String oldPassword;
  final String newPassword;

  const ChangePasswordModel({required this.oldPassword, required this.newPassword});

  factory ChangePasswordModel.fromJson(JSON json) => _$ChangePasswordModelFromJson(json);

  @override
  JSON toJson() => _$ChangePasswordModelToJson(this);

  @override
  List<Object?> get props => [oldPassword, newPassword];

  @override
  String get namespace => namespaceStatic;
}
