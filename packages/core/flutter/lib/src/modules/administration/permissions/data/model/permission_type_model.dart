import 'package:copor_core/src/utils/typedef.dart';
import 'package:json_annotation/json_annotation.dart';

part 'permission_type_model.g.dart';

@JsonSerializable()
class PermissionTypeModel {
  final String name;
  final String translation;

  PermissionTypeModel({required this.name, required this.translation});

  factory PermissionTypeModel.fromJson(JSON json) => _$PermissionTypeModelFromJson(json);

  JSON toJson() => _$PermissionTypeModelToJson(this);

  factory PermissionTypeModel.empty() => PermissionTypeModel(name: '', translation: '');

  PermissionTypeModel copyWith({String? name, String? translation}) {
    return PermissionTypeModel(
      name: name ?? this.name,
      translation: translation ?? this.translation,
    );
  }
}
