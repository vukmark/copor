import 'package:copor_core/src/data/model/base_model.dart';
import 'package:copor_contacts/src/config/contact_name_spaces.dart';
import 'package:copor_core/src/utils/typedef.dart';
import 'package:json_annotation/json_annotation.dart';

part 'contact_model.g.dart';

@JsonSerializable()
class PhoneNumberModel {
  final String phoneTitle;
  final String phoneNumber;

  const PhoneNumberModel({required this.phoneTitle, required this.phoneNumber});

  factory PhoneNumberModel.fromJson(Map<String, dynamic> json) => _$PhoneNumberModelFromJson(json);

  Map<String, dynamic> toJson() => _$PhoneNumberModelToJson(this);
}

@JsonSerializable(explicitToJson: true)
class ContactModel extends BaseModel {
  static const String namespaceStatic = ContactNamespaces.Contact;
  final String id;
  final String? initials;
  final String fullName;
  final String? jobTitle;
  final String? email;
  final String? salutation;
  final String picture;
  final String? address;
  final String? country;
  final String? state;
  final String? postalCode;
  final String? city;
  final List<PhoneNumberModel>? phoneNumber;
  final String? tenantName;
  final String? tenantAddress;
  final String? tenantCountry;
  final String? tenantState;
  final String? tenantPostalCode;
  final String? tenantCity;
  final String? role;
  final bool? isActive;

  const ContactModel({
    required this.id,
    this.initials,
    required this.fullName,
    this.jobTitle,
    this.email,
    this.salutation,
    required this.picture,
    this.address,
    this.country,
    this.state,
    this.postalCode,
    this.city,
    this.phoneNumber,
    this.tenantName,
    this.tenantAddress,
    this.tenantCountry,
    this.tenantState,
    this.tenantPostalCode,
    this.tenantCity,
    this.role,
    this.isActive,
  });

  factory ContactModel.fromJson(Map<String, dynamic> json) => _$ContactModelFromJson(json);

  @override
  JSON toJson() => _$ContactModelToJson(this);

  @override
  List<Object?> get props => [
    id,
    initials,
    fullName,
    jobTitle,
    email,
    salutation,
    picture,
    address,
    country,
    state,
    postalCode,
    city,
    phoneNumber,
    tenantName,
    tenantAddress,
    tenantCountry,
    tenantState,
    tenantPostalCode,
    tenantCity,
    role,
    isActive,
  ];

  @override
  String get namespace => namespaceStatic;
}
