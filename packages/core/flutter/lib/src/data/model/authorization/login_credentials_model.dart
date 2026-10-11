import 'package:copor_core/src/data/model/base_model.dart';
import 'package:copor_core/src/utils/name_spaces.dart';
import 'package:copor_core/src/utils/typedef.dart';
import 'package:json_annotation/json_annotation.dart';

part 'login_credentials_model.g.dart';

@JsonSerializable()
class LoginCredentialsModel extends BaseModel {
  static const String namespaceStatic = ModelNamespaces.LoginCredentials;
  final String username;
  final String password;

  const LoginCredentialsModel({required this.username, required this.password});

  factory LoginCredentialsModel.fromJson(JSON json) => _$LoginCredentialsModelFromJson(json);

  @override
  JSON toJson() => _$LoginCredentialsModelToJson(this);

  @override
  List<Object?> get props => [username, password];

  @override
  String get namespace => namespaceStatic;
}
