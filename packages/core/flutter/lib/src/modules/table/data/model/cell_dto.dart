import 'package:copor_core/src/modules/table/data/model/cell_content.dart';
import 'package:copor_core/src/modules/table/data/model/cell_type.dart';
import 'package:equatable/equatable.dart';
import 'package:json_annotation/json_annotation.dart';

part 'cell_dto.g.dart';

@JsonSerializable()
class CellDTO extends Equatable {
  final CellType type;
  final CellContent content;

  const CellDTO({required this.type, required this.content});

  factory CellDTO.fromJson(Map<String, dynamic> json) => _$CellDTOFromJson(json);

  Map<String, dynamic> toJson() => _$CellDTOToJson(this);

  CellDTO copyWith({CellType? type, CellContent? content}) {
    return CellDTO(type: type ?? this.type, content: content ?? this.content);
  }

  @override
  List<Object?> get props => [type, content];
}
