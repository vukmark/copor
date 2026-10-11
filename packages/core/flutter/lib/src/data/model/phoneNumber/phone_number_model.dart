import 'package:copor_core/src/data/model/base_model.dart';
import 'package:copor_core/src/data/model/phoneNumber/phone_number_type_enum.dart';
import 'package:copor_core/src/utils/name_spaces.dart';
import 'package:copor_core/src/utils/typedef.dart';
import 'package:json_annotation/json_annotation.dart';

part 'phone_number_model.g.dart';

@JsonSerializable()
class PhoneNumberModel extends BaseModel {
  static const String namespaceStatic = ModelNamespaces.PhoneNumber;
  final String id;
  final String user;
  final String phoneNumber;
  final PhoneNumberTypeEnum phoneNumberType;

  const PhoneNumberModel({
    required this.id,
    required this.user,
    required this.phoneNumber,
    required this.phoneNumberType,
  });

  factory PhoneNumberModel.fromJson(JSON json) => _$PhoneNumberModelFromJson(json);

  @override
  JSON toJson() => _$PhoneNumberModelToJson(this);

  PhoneNumberModel copyWith({
    String? id,
    String? user,
    String? phoneNumber,
    PhoneNumberTypeEnum? phoneNumberType,
  }) {
    return PhoneNumberModel(
      id: id ?? this.id,
      user: user ?? this.user,
      phoneNumber: phoneNumber ?? this.phoneNumber,
      phoneNumberType: phoneNumberType ?? this.phoneNumberType,
    );
  }

  @override
  List<Object?> get props => [id, user, phoneNumber, phoneNumberType];

  @override
  String get namespace => namespaceStatic;
}
