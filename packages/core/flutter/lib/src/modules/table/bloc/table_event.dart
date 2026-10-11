import 'package:copor_core/src/data/model/filter/bloc/filter_state.dart';
import 'package:copor_core/src/data/model/filter/data/model/filter_dto/filter_list_dto.dart';
import 'package:copor_core/src/utils/typedef.dart';
import 'package:equatable/equatable.dart';

sealed class TableEvent extends Equatable {
  const TableEvent();

  @override
  List<Object?> get props => [];
}

class GetTable extends TableEvent {
  final String listType;
  final FilterListDTO filterList;
  final TableGetType tableGetType;

  const GetTable(this.listType, this.filterList, this.tableGetType);

  @override
  List<Object?> get props => [listType, filterList, tableGetType];
}

class LoadMoreTable extends TableEvent {
  final String listType;
  final FilterState filterState;

  const LoadMoreTable(this.listType, this.filterState);

  @override
  List<Object?> get props => [listType, filterState];
}

class DeleteRow extends TableEvent {
  final String serverPath;
  const DeleteRow(this.serverPath);
}

class ToggleRow extends TableEvent {
  final String serverPath;
  final bool isActive;
  const ToggleRow(this.serverPath, this.isActive);

  @override
  List<Object?> get props => [serverPath, isActive];
}
