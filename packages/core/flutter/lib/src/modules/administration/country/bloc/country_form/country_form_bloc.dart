import 'package:copor_core/src/modules/administration/country/bloc/country_form/country_form_event.dart';
import 'package:copor_core/src/modules/administration/country/bloc/country_form/country_form_state.dart';
import 'package:copor_core/src/modules/administration/country/data/repository/country_repository.dart';
import 'package:copor_core/src/utils/typedef.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

class CountryFormBloc extends Bloc<CountryFormEvent, CountryFormState> {
  final CountryRepository _countryRepository;

  CountryFormBloc({required CountryRepository countryRepository})
    : _countryRepository = countryRepository,
      super(const CountryFormState.initial()) {
    on<GetCountry>(_onGetCountry);
    on<CreateCountry>(_onCreateCountry);
    on<UpdateCountry>(_onUpdateCountry);
    on<RegisterValidationAndSubmitCallback>((event, emit) {
      emit(state.copyWith(onValidateAndSubmit: event.onValidateAndSubmit));
    });

    on<SaveButtonPressed>((event, emit) {
      state.onValidateAndSubmit?.call();
    });
  }

  Future<void> _onGetCountry(GetCountry event, Emitter<CountryFormState> emit) async {
    emit(CountryFormState.loading(result: state.result));

    final result = await _countryRepository.getCountry(event.countryId);
    result.fold(
      (failure) {
        emit(state.copyWith(failure: failure, isLoading: false));
      },
      (success) {
        emit(state.copyWith(result: success, isLoading: false));
      },
    );
  }

  Future<void> _onCreateCountry(CreateCountry event, Emitter<CountryFormState> emit) async {
    emit(CountryFormState.loading(result: state.result));

    final result = await _countryRepository.createCountry(event.countryToCreate);

    result.fold(
      (failure) {
        emit(state.copyWith(failure: failure, isLoading: false));
      },
      (_) {
        emit(state.copyWith(isUpdated: true, isLoading: false, actionType: ActionType.create));
      },
    );
  }

  Future<void> _onUpdateCountry(UpdateCountry event, Emitter<CountryFormState> emit) async {
    emit(CountryFormState.loading(result: state.result));

    final result = await _countryRepository.updateCountry(event.countryToUpdate);

    result.fold(
      (failure) {
        emit(state.copyWith(failure: failure, isLoading: false));
      },
      (_) {
        emit(state.copyWith(isUpdated: true, isLoading: false, actionType: ActionType.update));
      },
    );
  }
}
