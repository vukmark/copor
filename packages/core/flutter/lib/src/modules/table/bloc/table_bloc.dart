import 'package:copor_core/src/data/model/filter/data/model/filter_dto/filter_dto_converter.dart';
import 'package:copor_core/src/data/model/filter/data/model/filter_dto/filter_list_dto.dart';
import 'package:copor_core/src/modules/table/bloc/table_event.dart';
import 'package:copor_core/src/modules/table/bloc/table_state.dart';
import 'package:copor_core/src/modules/table/data/model/copor_table_model.dart';
import 'package:copor_core/src/modules/table/data/repository/table_repository.dart';
import 'package:copor_core/src/utils/typedef.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

class TableBloc extends Bloc<TableEvent, TableState> {
  final TableRepository _repository;

  TableBloc({required TableRepository tableRepository})
    : _repository = tableRepository,
      super(TableState.initial()) {
    on<GetTable>(_onGetTable);
    on<DeleteRow>(_onDeleteRow);
    on<ToggleRow>(_onToggleRow);
    on<LoadMoreTable>(_onLoadMoreTable);
  }

  Future<void> _onLoadMoreTable(LoadMoreTable event, Emitter<TableState> emit) async {
    if (state.isLoading) return;
    if (!state.hasMore) return;

    final previousOffset = state.offset;
    final nextOffset = previousOffset + state.limit;

    emit(
      state.copyWith(
        isLoading: true,
        offset: nextOffset,
        failure: null,
        tableGetType: TableGetType.loadMore,
      ),
    );

    final dto = FilterDtoConverter.fromState(event.filterState, state.copyWith(offset: nextOffset));

    final result = await _repository.getTable(event.listType, dto);

    result.fold(
      (failure) {
        emit(
          state.copyWith(
            failure: failure,
            isLoading: false,
            offset: previousOffset,
            tableGetType: TableGetType.loadMore,
          ),
        );
      },
      (success) {
        final previousModel = state.result?.data;
        final nextModel = success.data;

        final nextRows = nextModel.body;
        final hasMore = nextRows.length >= state.limit;

        final mergedModel = (previousModel != null)
            ? CoporTableModel(
                header: previousModel.header,
                body: [...previousModel.body, ...nextModel.body],
              )
            : nextModel;

        emit(
          state.copyWith(
            result: success.copyWith(data: mergedModel),
            isLoading: false,
            hasMore: hasMore,
            failure: null,
            isDeleted: false,
            tableGetType: TableGetType.loadMore,
          ),
        );
      },
    );
  }

  Future<void> _onGetTable(GetTable event, Emitter<TableState> emit) async {
    const freshOffset = 0;

    emit(
      TableState.loading(
        result: state.result,
        limit: state.limit,
        offset: freshOffset,
        hasMore: true,
      ).copyWith(tableGetType: event.tableGetType, isDeleted: false),
    );

    final filterDto = FilterListDTO(
      filterList: event.filterList.filterList,
      limit: state.limit.toString(),
      offset: freshOffset.toString(),
    );

    final result = await _repository.getTable(event.listType, filterDto);

    result.fold(
      (failure) {
        emit(state.copyWith(failure: failure, isLoading: false, isDeleted: false));
      },
      (success) {
        final nextModel = success.data;
        final nextRows = nextModel.body;
        final hasMore = nextRows.length >= state.limit;

        emit(
          state.copyWith(
            result: success,
            isLoading: false,
            isDeleted: false,
            isToggled: false,
            failure: null,
            hasMore: hasMore,
            offset: freshOffset,
            tableGetType: event.tableGetType,
          ),
        );
      },
    );
  }

  Future<void> _onDeleteRow(DeleteRow event, Emitter<TableState> emit) async {
    emit(
      TableState.loading(
        result: state.result,
        limit: state.limit,
        offset: state.offset,
        hasMore: state.hasMore,
      ),
    );

    final result = await _repository.deleteRow(event.serverPath);
    result.fold(
      (failure) {
        emit(state.copyWith(failure: failure, isLoading: false));
      },
      (success) {
        emit(state.copyWith(isLoading: false, isDeleted: true, isToggled: false));
      },
    );
  }

  Future<void> _onToggleRow(ToggleRow event, Emitter<TableState> emit) async {
    emit(
      TableState.loading(
        result: state.result,
        limit: state.limit,
        offset: state.offset,
        hasMore: state.hasMore,
      ),
    );

    final result = await _repository.toggleRow(event.serverPath, event.isActive);
    result.fold(
      (failure) {
        emit(state.copyWith(failure: failure, isLoading: false));
      },
      (success) {
        emit(state.copyWith(isLoading: false, isToggled: true, isDeleted: false));
      },
    );
  }
}
