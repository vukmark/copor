// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'simple_list_model.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

SimpleListModel _$SimpleListModelFromJson(Map<String, dynamic> json) =>
    SimpleListModel(
      items: (json['items'] as List<dynamic>)
          .map((e) => NamedIdModel<String>.fromJson(e as Map<String, dynamic>))
          .toList(),
      limit: json['limit'] as String?,
      offset: json['offset'] as String?,
    );

Map<String, dynamic> _$SimpleListModelToJson(SimpleListModel instance) =>
    <String, dynamic>{
      'items': instance.items.map((e) => e.toJson()).toList(),
      'limit': instance.limit,
      'offset': instance.offset,
    };
