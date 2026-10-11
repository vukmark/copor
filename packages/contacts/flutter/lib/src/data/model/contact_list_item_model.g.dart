// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'contact_list_item_model.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

ContactListItemModel _$ContactListItemModelFromJson(
  Map<String, dynamic> json,
) => ContactListItemModel(
  id: json['id'] as String,
  fullName: json['fullName'] as String,
  picture: json['picture'] as String,
  isActive: json['isActive'] as bool?,
);

Map<String, dynamic> _$ContactListItemModelToJson(
  ContactListItemModel instance,
) => <String, dynamic>{
  'id': instance.id,
  'fullName': instance.fullName,
  'picture': instance.picture,
  'isActive': instance.isActive,
};
