import 'package:copor_core/src/data/model/base_model.dart';
import 'package:copor_core/src/utils/name_spaces.dart';
import 'package:copor_core/src/utils/typedef.dart';
import 'package:json_annotation/json_annotation.dart';

part 'contact_privacy_model.g.dart';

@JsonSerializable()
class ContactPrivacyModel extends BaseModel {
  static const String namespaceStatic = ModelNamespaces.ContactPrivacy;
  final bool picture;
  final bool email;
  final bool dateOfBirth;
  final bool tenant;
  final bool group;
  final bool private;

  const ContactPrivacyModel({
    required this.picture,
    required this.email,
    required this.dateOfBirth,
    required this.tenant,
    required this.group,
    required this.private,
  });

  factory ContactPrivacyModel.defaultContactPrivacy() {
    return ContactPrivacyModel(
      picture: true,
      email: true,
      dateOfBirth: true,
      tenant: true,
      group: true,
      private: true,
    );
  }

  factory ContactPrivacyModel.fromJson(JSON json) => _$ContactPrivacyModelFromJson(json);

  @override
  JSON toJson() => _$ContactPrivacyModelToJson(this);

  ContactPrivacyModel copyWith({
    bool? picture,
    bool? email,
    bool? dateOfBirth,
    bool? tenant,
    bool? group,
    bool? private,
  }) {
    return ContactPrivacyModel(
      picture: picture ?? this.picture,
      email: email ?? this.email,
      dateOfBirth: dateOfBirth ?? this.dateOfBirth,
      tenant: tenant ?? this.tenant,
      group: group ?? this.group,
      private: private ?? this.private,
    );
  }

  @override
  List<Object?> get props => [picture, email, dateOfBirth, tenant, group, private];

  @override
  String get namespace => namespaceStatic;
}
