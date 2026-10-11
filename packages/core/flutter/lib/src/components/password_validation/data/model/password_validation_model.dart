import 'package:copor_core/src/data/model/base_model.dart';
import 'package:copor_core/src/utils/name_spaces.dart';
import 'package:copor_core/src/utils/typedef.dart';
import 'package:json_annotation/json_annotation.dart';

part 'password_validation_model.g.dart';

@JsonSerializable()
class PasswordValidationModel extends BaseModel {
  static final String namespaceStatic = ModelNamespaces.PasswordValidation;

  final String? password;
  final String? confirmPassword;
  final String? userName;
  final String? email;
  final String? firstName;
  final String? lastName;

  const PasswordValidationModel({
    this.password,
    this.confirmPassword,
    this.userName,
    this.email,
    this.firstName,
    this.lastName,
  });

  factory PasswordValidationModel.empty() => const PasswordValidationModel();

  factory PasswordValidationModel.fromJson(JSON json) => _$PasswordValidationModelFromJson(json);

  @override
  JSON toJson() => _$PasswordValidationModelToJson(this);

  @override
  String get namespace => namespaceStatic;

  @override
  List<Object?> get props => [password, confirmPassword, userName, email, firstName, lastName];

  PasswordValidationModel copyWith({
    String? password,
    String? confirmPassword,
    String? userName,
    String? email,
    String? firstName,
    String? lastName,
  }) {
    return PasswordValidationModel(
      password: password ?? this.password,
      confirmPassword: confirmPassword ?? this.confirmPassword,
      userName: userName ?? this.userName,
      email: email ?? this.email,
      firstName: firstName ?? this.firstName,
      lastName: lastName ?? this.lastName,
    );
  }
}
