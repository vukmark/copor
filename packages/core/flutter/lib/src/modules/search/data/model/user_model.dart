import 'package:copor_core/src/data/model/base_model.dart';
import 'package:copor_core/src/utils/typedef.dart';
import 'package:json_annotation/json_annotation.dart';

part 'user_model.g.dart';

@JsonSerializable(explicitToJson: true)
class User extends BaseModel {
  static const String namespaceStatic = 'user';

  @JsonKey(name: 'id')
  final String id;

  @JsonKey(name: 'firstName')
  final String firstName;

  @JsonKey(name: 'lastName')
  final String lastName;

  @JsonKey(name: 'role')
  final String role;

  @JsonKey(name: 'picturePath')
  final String picture;

  const User({
    required this.id,
    required this.firstName,
    required this.lastName,
    required this.role,
    required this.picture,
  });

  factory User.fromJson(JSON json) => _$UserFromJson(json);
  @override
  JSON toJson() => _$UserToJson(this);

  factory User.empty() => const User(id: '', firstName: '', lastName: '', role: '', picture: '');

  String get fullName => '$firstName $lastName'.trim();

  User copyWith({String? id, String? firstName, String? lastName, String? role, String? picture}) {
    return User(
      id: id ?? this.id,
      firstName: firstName ?? this.firstName,
      lastName: lastName ?? this.lastName,
      role: role ?? this.role,
      picture: picture ?? this.picture,
    );
  }

  @override
  List<Object?> get props => [id, firstName, lastName, role, picture];

  @override
  String get namespace => namespaceStatic;
}
