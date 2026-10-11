import 'package:json_annotation/json_annotation.dart';

part 'registration_status_model.g.dart';

@JsonSerializable(createToJson: false)
class RegistrationStatusModel {
  final bool enabled;

  const RegistrationStatusModel({required this.enabled});

  factory RegistrationStatusModel.fromJson(Map<String, dynamic> json) =>
      _$RegistrationStatusModelFromJson(json);
}
