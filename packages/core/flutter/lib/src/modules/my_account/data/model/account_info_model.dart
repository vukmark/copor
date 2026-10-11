import 'package:copor_core/src/data/model/address/address_model.dart';
import 'package:copor_core/src/data/model/base_model.dart';
import 'package:copor_core/src/data/model/named_id_dto.dart';
import 'package:copor_core/src/utils/name_spaces.dart';
import 'package:copor_core/src/utils/typedef.dart';
import 'package:json_annotation/json_annotation.dart';
import '../../../../data/model/phoneNumber/phone_number_model.dart';

part 'account_info_model.g.dart';

@JsonSerializable(explicitToJson: true)
class AccountInfoModel extends BaseModel {
  static const String namespaceStatic = ModelNamespaces.AccountInfo;
  final String id;
  final String firstName;
  final String lastName;
  final String username;
  final String email;
  final String roleType;
  final List<PhoneNumberModel> phoneNumberList;
  final AddressModel? address;
  final String? citizenship;
  final String? salutation;
  final String? nickName;
  final String? gender;
  final String? picture;
  final String? dateOfBirth;
  final String? placeOfBirth;
  final NamedIdDTO? nativeLanguage;
  final String? registrationDate;
  final String? lastVisitedDate;
  final String? contactNote;
  final List<String>? specialRoles;
  final bool? isActive;
  final bool deletionRequested;

  const AccountInfoModel({
    required this.id,
    required this.firstName,
    required this.lastName,
    required this.username,
    required this.email,
    required this.roleType,
    required this.phoneNumberList,
    required this.deletionRequested,
    this.gender,
    this.nickName,
    this.picture,
    this.citizenship,
    this.address,
    this.dateOfBirth,
    this.placeOfBirth,
    this.nativeLanguage,
    this.salutation,
    this.registrationDate,
    this.lastVisitedDate,
    this.contactNote,
    this.specialRoles,
    this.isActive,
  });

  factory AccountInfoModel.fromJson(JSON json) => _$AccountInfoModelFromJson(json);

  @override
  JSON toJson() => _$AccountInfoModelToJson(this);

  AccountInfoModel copyWith({
    String? id,
    String? registrationDate,
    String? lastVisitedDate,
    String? firstName,
    String? lastName,
    String? username,
    String? email,
    List<PhoneNumberModel>? phoneNumberList,
    String? citizenship,
    String? picture,
    String? nickName,
    String? gender,
    String? dateOfBirth,
    String? placeOfBirth,
    NamedIdDTO? nativeLanguage,
    AddressModel? address,
    String? roleType,
    String? salutation,
    String? contactNote,
    List<String>? specialRoles,
    bool? isActive,
    bool? deletionRequested,
  }) {
    return AccountInfoModel(
      id: id ?? this.id,
      registrationDate: registrationDate ?? this.registrationDate,
      lastVisitedDate: lastVisitedDate ?? this.lastVisitedDate,
      firstName: firstName ?? this.firstName,
      lastName: lastName ?? this.lastName,
      username: username ?? this.username,
      email: email ?? this.email,
      phoneNumberList: phoneNumberList ?? this.phoneNumberList,
      citizenship: citizenship ?? this.citizenship,
      picture: picture ?? this.picture,
      address: address ?? this.address,
      nickName: nickName ?? this.nickName,
      gender: gender ?? this.gender,
      dateOfBirth: dateOfBirth ?? this.dateOfBirth,
      placeOfBirth: placeOfBirth ?? this.placeOfBirth,
      nativeLanguage: nativeLanguage ?? this.nativeLanguage,
      roleType: roleType ?? this.roleType,
      salutation: salutation ?? this.salutation,
      contactNote: contactNote ?? this.contactNote,
      specialRoles: specialRoles ?? this.specialRoles,
      isActive: isActive ?? this.isActive,
      deletionRequested: deletionRequested ?? this.deletionRequested,
    );
  }

  @override
  List<Object?> get props => [
    id,
    registrationDate,
    lastVisitedDate,
    username,
    firstName,
    lastName,
    citizenship,
    email,
    picture,
    roleType,
    nickName,
    gender,
    dateOfBirth,
    placeOfBirth,
    nativeLanguage,
    phoneNumberList,
    salutation,
    contactNote,
    specialRoles,
    isActive,
    deletionRequested,
  ];

  @override
  String get namespace => namespaceStatic;
}
