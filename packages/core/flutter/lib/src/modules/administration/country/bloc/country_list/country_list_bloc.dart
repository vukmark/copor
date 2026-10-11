import 'dart:async';
import 'package:copor_core/src/modules/administration/country/bloc/country_list/country_list_event.dart';
import 'package:copor_core/src/modules/administration/country/bloc/country_list/country_list_state.dart';
import 'package:copor_core/src/modules/administration/country/data/repository/country_repository.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

class CountryListBloc extends Bloc<CountryListEvent, CountryListState> {
  final CountryRepository _countryRepository;

  CountryListBloc({required CountryRepository countryRepository})
    : _countryRepository = countryRepository,
      super(CountryListState.initial()) {
    on<GetCountryList>(_onGetCountryList);
    on<GetCountryPublicList>(_onGetCountryPublicList);
    on<DeleteCountry>(_onDeleteCountry);
  }

  Future<void> _onGetCountryList(GetCountryList event, Emitter<CountryListState> emit) async {
    emit(state.copyWith(isLoading: true, isDeleted: false, filterList: event.filterList));

    final result = await _countryRepository.getCountryList(event.filterList);
    result.fold(
      (failure) {
        emit(state.copyWith(failure: failure, isLoading: false));
      },
      (success) {
        emit(state.copyWith(result: success, isLoading: false));
      },
    );
  }

  Future<void> _onGetCountryPublicList(
    GetCountryPublicList event,
    Emitter<CountryListState> emit,
  ) async {
    emit(state.copyWith(isLoading: true, isDeleted: false));

    final result = await _countryRepository.getCountryPublicList();
    result.fold(
      (failure) {
        emit(state.copyWith(failure: failure, isLoading: false));
      },
      (success) {
        emit(state.copyWith(result: success, isLoading: false));
      },
    );
  }

  Future<void> _onDeleteCountry(DeleteCountry event, Emitter<CountryListState> emit) async {
    emit(state.copyWith(isLoading: true));

    final result = await _countryRepository.deleteCountry(event.countryId);
    result.fold(
      (failure) {
        emit(state.copyWith(failure: failure, isLoading: false));
      },
      (_) {
        emit(state.copyWith(isLoading: false, isDeleted: true));
      },
    );
  }
}
