import 'package:bloc/bloc.dart';
import 'package:copor_core/src/bloc/utils/bloc_event_transformer.dart';
import 'package:copor_core/src/bloc/utils/bloc_state.dart';
import 'package:copor_core/src/data/model/filter/bloc/filter_event.dart';
import 'package:copor_core/src/data/model/filter/bloc/filter_state.dart';
import 'package:copor_core/src/data/model/filter/repository/filter_repository.dart';

class FilterBloc extends Bloc<FilterEvent, FilterState> {
  final FilterRepository filterRepository;

  FilterBloc({required this.filterRepository}) : super(const FilterState.initial()) {
    on<LoadFilters>(_onLoadFilters);
    on<LoadStaticFilters>(_onLoadStaticFilters);
    on<ApplyFilters>(_onApplyFilters);
    on<ClearFiltersWithoutSearch>(_onClearFiltersWithoutSearch);
    on<ClearFilters>(_onClearFilters);
    on<ToggleDesktopSort>(_onToggleDesktopSort);
    on<SetDefaultSort>(_onSetDefaultSort);
    on<SearchQueryChanged>(
      _onSearchQueryChanged,
      transformer: debounceRestartable(const Duration(milliseconds: 300)),
    );
  }

  void _onLoadFilters(LoadFilters event, Emitter<FilterState> emit) async {
    final bool isModuleChanging = state.module != event.endpoint;
    if (!event.forceReload && !isModuleChanging && state.result != null && !state.isLoading) {
      return;
    }
    emit(state.copyWith(isLoading: true, result: null, showDesktopSort: false));
    final result = await filterRepository.getFilters(event.endpoint);
    result.fold(
      (failure) {
        emit(state.copyWith(isLoading: false, failure: failure, module: ''));
      },
      (resultData) {
        emit(
          state.copyWith(
            isLoading: false,
            result: resultData,
            appliedFilters: isModuleChanging ? {} : state.appliedFilters,
            module: event.endpoint,
          ),
        );
      },
    );
  }

  void _onLoadStaticFilters(LoadStaticFilters event, Emitter<FilterState> emit) {
    final bool isModuleChanging = state.module != event.module;
    if (!isModuleChanging && state.result != null) return;
    emit(
      state.copyWith(
        result: Result(data: event.filters),
        appliedFilters: isModuleChanging ? {} : state.appliedFilters,
        module: event.module,
        showDesktopSort: false,
      ),
    );
  }

  void _onApplyFilters(ApplyFilters event, Emitter<FilterState> emit) {
    emit(state.copyWith(appliedFilters: event.selectedFilters));
  }

  void _onClearFiltersWithoutSearch(ClearFiltersWithoutSearch event, Emitter<FilterState> emit) {
    final newFilters = <String, dynamic>{};
    if (state.appliedFilters.containsKey('SEARCH')) {
      newFilters['SEARCH'] = state.appliedFilters['SEARCH'];
    }
    emit(state.copyWith(appliedFilters: newFilters));
  }

  void _onClearFilters(ClearFilters event, Emitter<FilterState> emit) {
    emit(state.copyWith(appliedFilters: {}));
  }

  void _onSearchQueryChanged(SearchQueryChanged event, Emitter<FilterState> emit) {
    final newFilters = Map<String, dynamic>.from(state.appliedFilters);
    if (event.query.isEmpty) {
      newFilters.remove(event.filterKey);
    } else {
      newFilters[event.filterKey] = event.query;
    }
    emit(state.copyWith(appliedFilters: newFilters));
  }

  void _onToggleDesktopSort(ToggleDesktopSort event, Emitter<FilterState> emit) {
    emit(state.copyWith(showDesktopSort: !state.showDesktopSort));
  }

  void _onSetDefaultSort(SetDefaultSort event, Emitter<FilterState> emit) {
    emit(
      state.copyWith(defaultSortKey: event.defaultSortKey, defaultSortDir: event.defaultSortDir),
    );
  }
}
