import 'package:copor_core/src/data/model/base_model.dart';
import 'package:copor_core/src/utils/typedef.dart';
import 'package:json_annotation/json_annotation.dart';
import '../../../../utils/name_spaces.dart';

part 'authentication_type_model.g.dart';

@JsonSerializable()
class AuthenticationTypeModel extends BaseModel {
  static const String namespaceStatic = ModelNamespaces.AuthenticationType;
  final bool faceId;
  final bool fingerprint;
  final bool lockAppId;

  const AuthenticationTypeModel({
    required this.faceId,
    required this.fingerprint,
    required this.lockAppId,
  });

  factory AuthenticationTypeModel.defaultAuthenticationType() {
    return const AuthenticationTypeModel(faceId: true, fingerprint: true, lockAppId: true);
  }

  factory AuthenticationTypeModel.fromJson(JSON json) => _$AuthenticationTypeModelFromJson(json);

  @override
  JSON toJson() => _$AuthenticationTypeModelToJson(this);

  AuthenticationTypeModel copyWith({bool? faceId, bool? fingerprint, bool? lockAppId}) {
    return AuthenticationTypeModel(
      faceId: faceId ?? this.faceId,
      fingerprint: fingerprint ?? this.fingerprint,
      lockAppId: lockAppId ?? this.lockAppId,
    );
  }

  @override
  List<Object?> get props => [faceId, fingerprint, lockAppId];

  @override
  String get namespace => namespaceStatic;
}
