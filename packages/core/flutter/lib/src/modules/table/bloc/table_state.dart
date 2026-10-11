import 'package:copor_core/src/error/failure.dart';
import 'package:copor_core/src/bloc/utils/bloc_state.dart';
import 'package:copor_core/src/modules/table/data/model/copor_table_model.dart';
import 'package:copor_core/src/utils/typedef.dart';

final class TableState extends BaseState<CoporTableModel> with DeletableState, ToggledState {
  @override
  final bool isDeleted;
  @override
  final bool isToggled;
  final String? tableKey;
  final int limit;
  final int offset;
  final bool hasMore;
  final TableGetType? tableGetType;

  const TableState._({
    super.result,
    super.isLoading,
    super.isUpdated,
    super.failure,
    this.tableKey,
    this.isDeleted = false,
    this.isToggled = false,
    this.limit = 20,
    this.offset = 0,
    this.hasMore = true,
    this.tableGetType,
  });

  const TableState.initial() : this._(result: null);
  const TableState.loading({
    required Result<CoporTableModel>? result,
    filterList,
    int? limit,
    int? offset,
    bool? hasMore,
  }) : this._(
         result: result,
         isLoading: true,
         limit: limit ?? 20,
         offset: offset ?? 0,
         hasMore: hasMore ?? true,
       );
  const TableState.fetched({required Result<CoporTableModel>? result, isLoading})
    : this._(result: result, isLoading: isLoading);
  const TableState.failure({
    required Failure failure,
    required Result<CoporTableModel>? result,
    filterList,
  }) : this._(result: result, failure: failure);

  @override
  TableState copyWith({
    Result<CoporTableModel>? result,
    bool? isLoading,
    bool? isUpdated,
    Failure? failure,
    String? tableKey,
    bool? isDeleted,
    bool? isToggled,
    int? limit,
    int? offset,
    bool? hasMore,
    TableGetType? tableGetType,
  }) {
    return TableState._(
      result: result ?? this.result,
      isLoading: isLoading ?? this.isLoading,
      isUpdated: isUpdated ?? this.isUpdated,
      failure: failure ?? this.failure,
      tableKey: tableKey ?? this.tableKey,
      isDeleted: isDeleted ?? this.isDeleted,
      isToggled: isToggled ?? this.isToggled,
      limit: limit ?? this.limit,
      offset: offset ?? this.offset,
      hasMore: hasMore ?? this.hasMore,
      tableGetType: tableGetType ?? this.tableGetType,
    );
  }

  @override
  List<Object?> get props => [
    result,
    isLoading,
    isUpdated,
    failure,
    tableKey,
    isDeleted,
    isToggled,
    limit,
    offset,
    hasMore,
    tableGetType,
  ];
}
