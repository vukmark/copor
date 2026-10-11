import 'package:copor_core/src/data/model/base_model.dart';
import 'package:copor_core/src/utils/name_spaces.dart';
import 'package:copor_core/src/utils/typedef.dart';
import 'package:json_annotation/json_annotation.dart';

part 'password_policy_model.g.dart';

@JsonSerializable()
class PasswordPolicyModel extends BaseModel {
  static final String namespaceStatic = ModelNamespaces.PasswordValidation;

  final int minPasswordLength;
  final int maxPasswordLength;
  final int minLowercaseLetters;
  final int minUppercaseLetters;
  final int minDigits;
  final int minSpecialCharacters;
  final bool allowSpaces;
  final bool disallowUsernameInPassword;
  final bool disallowEmailOrNameInPassword;
  final bool blockCommonPasswords;
  final int maxRepeatedCharacters;
  final int passwordHistoryCount;

  @JsonKey(defaultValue: <String>[])
  final List<String> commonPasswords;

  const PasswordPolicyModel({
    required this.minPasswordLength,
    required this.maxPasswordLength,
    required this.minLowercaseLetters,
    required this.minUppercaseLetters,
    required this.minDigits,
    required this.minSpecialCharacters,
    required this.allowSpaces,
    required this.disallowUsernameInPassword,
    required this.disallowEmailOrNameInPassword,
    required this.blockCommonPasswords,
    required this.maxRepeatedCharacters,
    required this.passwordHistoryCount,
    this.commonPasswords = const <String>[],
  });

  factory PasswordPolicyModel.fromJson(JSON json) => _$PasswordPolicyModelFromJson(json);

  @override
  JSON toJson() => _$PasswordPolicyModelToJson(this);

  @override
  String get namespace => namespaceStatic;

  @override
  List<Object?> get props => [
    minPasswordLength,
    maxPasswordLength,
    minLowercaseLetters,
    minUppercaseLetters,
    minDigits,
    minSpecialCharacters,
    allowSpaces,
    disallowUsernameInPassword,
    disallowEmailOrNameInPassword,
    blockCommonPasswords,
    maxRepeatedCharacters,
    passwordHistoryCount,
    commonPasswords,
  ];
}
