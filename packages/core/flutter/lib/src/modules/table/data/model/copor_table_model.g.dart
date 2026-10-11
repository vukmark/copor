// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'copor_table_model.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

CoporTableModel _$CoporTableModelFromJson(Map<String, dynamic> json) =>
    CoporTableModel(
      header: (json['header'] as List<dynamic>)
          .map((e) => ColumnHeaderModel.fromJson(e as Map<String, dynamic>))
          .toList(),
      body: (json['body'] as List<dynamic>)
          .map(
            (e) => (e as List<dynamic>)
                .map((e) => CellDTO.fromJson(e as Map<String, dynamic>))
                .toList(),
          )
          .toList(),
    );

Map<String, dynamic> _$CoporTableModelToJson(
  CoporTableModel instance,
) => <String, dynamic>{
  'header': instance.header.map((e) => e.toJson()).toList(),
  'body': instance.body.map((e) => e.map((e) => e.toJson()).toList()).toList(),
};
