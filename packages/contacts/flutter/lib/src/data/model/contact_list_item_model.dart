import 'package:copor_core/src/data/model/base_model.dart';
import 'package:json_annotation/json_annotation.dart';

part 'contact_list_item_model.g.dart';

@JsonSerializable()
class ContactListItemModel extends BaseModel {
  static const String namespaceStatic = 'contact_list_item';

  final String id;
  final String fullName;
  final String picture;
  final bool? isActive;

  const ContactListItemModel({
    required this.id,
    required this.fullName,
    required this.picture,
    this.isActive,
  });

  factory ContactListItemModel.fromJson(Map<String, dynamic> json) =>
      _$ContactListItemModelFromJson(json);

  @override
  Map<String, dynamic> toJson() => _$ContactListItemModelToJson(this);

  @override
  List<Object?> get props => [id, fullName, picture, isActive];

  @override
  String get namespace => namespaceStatic;
}
