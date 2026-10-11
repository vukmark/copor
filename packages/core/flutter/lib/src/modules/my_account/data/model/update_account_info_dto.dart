import 'package:json_annotation/json_annotation.dart';

part 'update_account_info_dto.g.dart';

@JsonSerializable()
class UpdateAccountInfoDTO {
  final String? id;
  final String firstName;
  final String lastName;
  final String email;
  final String? addressId;
  final String? address;
  final String? postalCode;
  final String? city;
  final String? country;
  final String? state;

  UpdateAccountInfoDTO({
    this.id,
    required this.firstName,
    required this.lastName,
    required this.email,
    this.addressId,
    this.address,
    this.postalCode,
    this.city,
    this.country,
    this.state,
  });

  factory UpdateAccountInfoDTO.fromJson(Map<String, dynamic> json) =>
      _$UpdateAccountInfoDTOFromJson(json);

  Map<String, dynamic> toJson() => _$UpdateAccountInfoDTOToJson(this);
}
