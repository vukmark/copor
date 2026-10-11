import 'package:copor_core/src/modules/administration/region_city/bloc/region_city_list/region_city_list_event.dart';
import 'package:copor_core/src/modules/administration/region_city/bloc/region_city_list/region_city_list_state.dart';
import 'package:copor_core/src/modules/administration/region_city/data/repository/region_city_repository.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

class RegionCityListBloc extends Bloc<RegionCityListEvent, RegionCityListState> {
  final RegionCityRepository _regionCityRepository;

  RegionCityListBloc({required RegionCityRepository regionCityRepository})
    : _regionCityRepository = regionCityRepository,
      super(RegionCityListState.initial()) {
    on<GetRegionCityList>(_onGetRegionCityList);
  }

  Future<void> _onGetRegionCityList(
    GetRegionCityList event,
    Emitter<RegionCityListState> emit,
  ) async {
    emit(state.copyWith(isLoading: true, filterList: event.filterList));

    final result = await _regionCityRepository.getRegionCityList(event.filterList);
    result.fold(
      (failure) {
        emit(state.copyWith(failure: failure, isLoading: false, filterList: event.filterList));
      },
      (success) {
        emit(state.copyWith(result: success, isLoading: false, filterList: event.filterList));
      },
    );
  }
}
