// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'copor_action_dto_model.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

CoporActionDTOModel _$CoporActionDTOModelFromJson(
  Map<String, dynamic> json,
) => CoporActionDTOModel(
  routerPath: json['routerPath'] as String,
  actionType: $enumDecode(_$TableActionTypeEnumMap, json['actionType']),
  popupMessage: json['popupMessage'] as String,
  isActive: json['isActive'] as bool?,
);

Map<String, dynamic> _$CoporActionDTOModelToJson(
  CoporActionDTOModel instance,
) => <String, dynamic>{
  'routerPath': instance.routerPath,
  'actionType': _$TableActionTypeEnumMap[instance.actionType]!,
  'popupMessage': instance.popupMessage,
  'isActive': instance.isActive,
};

const _$TableActionTypeEnumMap = {
  TableActionType.edit: 'edit',
  TableActionType.remove: 'remove',
  TableActionType.info: 'info',
  TableActionType.document: 'document',
  TableActionType.toggleActive: 'toggleActive',
  TableActionType.permissions: 'permissions',
};
