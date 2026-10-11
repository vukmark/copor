import 'package:copor_core/src/data/model/base_model.dart';
import 'package:copor_core/src/utils/name_spaces.dart';
import 'package:copor_core/src/utils/typedef.dart';
import 'package:json_annotation/json_annotation.dart';

part 'user_profile_model.g.dart';

@JsonSerializable()
class UserProfileModel extends BaseModel {
  static const String namespaceStatic = ModelNamespaces.UserProfile;
  final String detail;

  const UserProfileModel({required this.detail});

  factory UserProfileModel.fromJson(JSON json) => _$UserProfileModelFromJson(json);

  @override
  JSON toJson() => _$UserProfileModelToJson(this);

  @override
  List<Object?> get props => [detail];

  @override
  String get namespace => namespaceStatic;
}
