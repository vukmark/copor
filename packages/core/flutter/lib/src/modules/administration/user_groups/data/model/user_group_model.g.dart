// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'user_group_model.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

UserGroupModel _$UserGroupModelFromJson(Map<String, dynamic> json) =>
    UserGroupModel(
      id: json['id'] as String,
      name: json['name'] as String,
      canEdit: json['canEdit'] as bool? ?? false,
      canCreateChildren: json['canCreateChildren'] as bool? ?? false,
      children:
          (json['children'] as List<dynamic>?)
              ?.map((e) => UserGroupModel.fromJson(e as Map<String, dynamic>))
              .toList() ??
          [],
      groupType: json['groupType'] as String? ?? 'USER_GROUP',
    );

Map<String, dynamic> _$UserGroupModelToJson(UserGroupModel instance) =>
    <String, dynamic>{
      'id': instance.id,
      'name': instance.name,
      'canEdit': instance.canEdit,
      'canCreateChildren': instance.canCreateChildren,
      'children': instance.children,
      'groupType': instance.groupType,
    };
