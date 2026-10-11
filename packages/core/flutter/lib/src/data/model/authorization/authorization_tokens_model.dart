import 'package:copor_core/src/data/model/base_model.dart';
import 'package:copor_core/src/utils/name_spaces.dart';
import 'package:copor_core/src/utils/typedef.dart';
import 'package:json_annotation/json_annotation.dart';

part 'authorization_tokens_model.g.dart';

@JsonSerializable()
class AuthorizationTokensModel extends BaseModel {
  static const String namespaceStatic = ModelNamespaces.AuthorizationTokens;
  final String authToken;
  final String refreshToken;
  final String? message;
  final String? redirect;

  const AuthorizationTokensModel({
    required this.authToken,
    required this.refreshToken,
    this.message,
    this.redirect,
  });

  factory AuthorizationTokensModel.fromJson(JSON json) => _$AuthorizationTokensModelFromJson(json);

  @override
  JSON toJson() => _$AuthorizationTokensModelToJson(this);

  factory AuthorizationTokensModel.emptyTokens() {
    return AuthorizationTokensModel(authToken: '', refreshToken: '', message: '', redirect: '');
  }

  @override
  List<Object?> get props => [authToken, refreshToken, redirect];

  @override
  String get namespace => namespaceStatic;
}
