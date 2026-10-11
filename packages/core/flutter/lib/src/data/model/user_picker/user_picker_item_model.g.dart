// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'user_picker_item_model.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

UserPickerItemModel _$UserPickerItemModelFromJson(Map<String, dynamic> json) =>
    UserPickerItemModel(
      id: json['id'] as String,
      fullName: json['fullName'] as String,
      picture: json['picture'] as String,
      isActive: json['isActive'] as bool?,
    );

Map<String, dynamic> _$UserPickerItemModelToJson(
  UserPickerItemModel instance,
) => <String, dynamic>{
  'id': instance.id,
  'fullName': instance.fullName,
  'picture': instance.picture,
  'isActive': instance.isActive,
};
