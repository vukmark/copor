import 'package:copor_core/src/data/model/base_model.dart';
import 'package:copor_core/src/modules/table/data/model/cell_dto.dart';
import 'package:copor_core/src/modules/table/data/model/column_header_model.dart';
import 'package:copor_core/src/utils/typedef.dart';
import 'package:json_annotation/json_annotation.dart';

part 'copor_table_model.g.dart';

@JsonSerializable(explicitToJson: true)
class CoporTableModel extends BaseModel {
  static const String namespaceStatic = 'coporTableModel';

  final List<ColumnHeaderModel> header;
  final List<List<CellDTO>> body;

  const CoporTableModel({required this.header, required this.body});

  @override
  String get namespace => namespaceStatic;

  factory CoporTableModel.fromJson(JSON json) => _$CoporTableModelFromJson(json);

  @override
  JSON toJson() => _$CoporTableModelToJson(this);

  CoporTableModel copyWith({List<ColumnHeaderModel>? header, List<List<CellDTO>>? body}) {
    return CoporTableModel(header: header ?? this.header, body: body ?? this.body);
  }

  @override
  List<Object?> get props => [header, body];
}
