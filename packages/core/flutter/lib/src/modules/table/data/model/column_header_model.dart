import 'package:copor_theme/copor_theme.dart';
import 'package:equatable/equatable.dart';
import 'package:json_annotation/json_annotation.dart';

part 'column_header_model.g.dart';

@JsonSerializable()
class ColumnHeaderModel extends Equatable {
  final String name;
  final String? key;
  final String? sortKey;
  final ColumnType? type;
  final String? info;
  final DTColumnSize? size;
  final double? fixedWidth;
  final String? defaultSortDir;
  final DTColumnAlignment? alignment;

  const ColumnHeaderModel({
    required this.name,
    this.key,
    this.sortKey,
    this.type,
    this.info,
    this.size,
    this.fixedWidth,
    this.defaultSortDir,
    this.alignment,
  });

  factory ColumnHeaderModel.fromJson(Map<String, dynamic> json) =>
      _$ColumnHeaderModelFromJson(json);

  Map<String, dynamic> toJson() => _$ColumnHeaderModelToJson(this);

  ColumnHeaderModel copyWith({
    String? name,
    String? key,
    String? sortKey,
    ColumnType? type,
    String? info,
    DTColumnSize? size,
    double? fixedWidth,
    String? defaultSortDir,
    DTColumnAlignment? alignment,
  }) {
    return ColumnHeaderModel(
      name: name ?? this.name,
      key: key ?? this.key,
      sortKey: sortKey ?? this.sortKey,
      type: type ?? this.type,
      info: info ?? this.info,
      size: size ?? this.size,
      fixedWidth: fixedWidth ?? this.fixedWidth,
      defaultSortDir: defaultSortDir ?? this.defaultSortDir,
      alignment: alignment ?? this.alignment,
    );
  }

  @override
  List<Object?> get props => [
    name,
    key,
    sortKey,
    type,
    info,
    size,
    fixedWidth,
    defaultSortDir,
    alignment,
  ];
}
