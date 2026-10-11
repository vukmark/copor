import 'package:copor_core/src/data/model/address/country_item_model.dart';
import 'package:copor_core/src/data/model/base_model.dart';
import 'package:copor_core/src/modules/administration/state/data/model/state_model.dart';
import 'package:copor_core/src/utils/name_spaces.dart';
import 'package:copor_core/src/utils/typedef.dart';
import 'package:json_annotation/json_annotation.dart';

part 'address_model.g.dart';

@JsonSerializable(explicitToJson: true)
class AddressModel extends BaseModel {
  static const String namespaceStatic = ModelNamespaces.Address;
  @JsonKey(defaultValue: '')
  final String addressId;
  @JsonKey(defaultValue: '')
  final String streetAddress;
  @JsonKey(defaultValue: '')
  final String postalCode;
  @JsonKey(defaultValue: '')
  final String city;
  final StateModel? state;
  final CountryItemModel country;

  const AddressModel({
    required this.addressId,
    required this.streetAddress,
    required this.city,
    required this.postalCode,
    this.state,
    required this.country,
  });

  factory AddressModel.fromJson(JSON json) => _$AddressModelFromJson(json);

  @override
  JSON toJson() => _$AddressModelToJson(this);

  AddressModel copyWith({
    String? addressId,
    String? streetAddress,
    String? city,
    String? postalCode,
    StateModel? state,
    CountryItemModel? country,
  }) {
    return AddressModel(
      addressId: addressId ?? this.addressId,
      streetAddress: streetAddress ?? this.streetAddress,
      city: city ?? this.city,
      postalCode: postalCode ?? this.postalCode,
      state: state ?? this.state,
      country: country ?? this.country,
    );
  }

  @override
  List<Object?> get props => [addressId, streetAddress, city, postalCode, state, country];

  @override
  String get namespace => namespaceStatic;
}
