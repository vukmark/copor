import 'package:copor_core/src/modules/administration/country/data/model/create_country_dto.dart';
import 'package:equatable/equatable.dart';

sealed class CountryFormEvent extends Equatable {
  const CountryFormEvent();

  @override
  List<Object?> get props => [];
}

class GetCountry extends CountryFormEvent {
  final String countryId;
  const GetCountry(this.countryId);
}

class CreateCountry extends CountryFormEvent {
  final CreateCountryDTO countryToCreate;
  const CreateCountry(this.countryToCreate);
}

class UpdateCountry extends CountryFormEvent {
  final CreateCountryDTO countryToUpdate;
  const UpdateCountry(this.countryToUpdate);
}

class RegisterValidationAndSubmitCallback extends CountryFormEvent {
  final void Function() onValidateAndSubmit;
  const RegisterValidationAndSubmitCallback(this.onValidateAndSubmit);
}

class SaveButtonPressed extends CountryFormEvent {}
