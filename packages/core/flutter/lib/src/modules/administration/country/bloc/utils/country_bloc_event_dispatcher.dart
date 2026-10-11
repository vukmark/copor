import 'package:copor_core/src/data/model/filter/data/model/filter_dto/filter_list_dto.dart';
import 'package:copor_core/src/modules/administration/country/bloc/country_form/country_form_bloc.dart';
import 'package:copor_core/src/modules/administration/country/bloc/country_form/country_form_event.dart';
import 'package:copor_core/src/modules/administration/country/data/model/create_country_dto.dart';
import 'package:copor_core/src/modules/administration/language/data/model/language_model.dart';
import 'package:copor_core/src/modules/administration/country/bloc/country_list/country_list_bloc.dart';
import 'package:copor_core/src/modules/administration/country/bloc/country_list/country_list_event.dart';
import 'package:copor_core/src/bloc/global_blocs/translation_bloc/translation_bloc.dart';
import 'package:copor_core/src/bloc/global_blocs/translation_bloc/translation_event.dart';
import 'package:copor_core/src/modules/administration/country/data/model/translation/country_translation.dart';

class CountryBlocEventDispatcher {
  static _Translation translation = _Translation();
  static _Country country = _Country();
}

class _Translation {
  void getCountryTranslation(TranslationBloc<CountryPageTranslation> bloc, LanguageModel language) {
    bloc.add(
      GetTranslationEvent<CountryPageTranslation>(
        namespace: CountryPageTranslation.namespaceStatic,
        languageModel: language,
        constructor: (translationStringList) =>
            CountryPageTranslation(translationStringList: translationStringList),
      ),
    );
  }
}

class _Country {
  void getCountryList(CountryListBloc bloc, FilterListDTO filterList) {
    bloc.add(GetCountryList(filterList));
  }

  void getCountryPublicList(CountryListBloc bloc) {
    bloc.add(GetCountryPublicList());
  }

  void deleteCountry(CountryListBloc bloc, String countryId) {
    bloc.add(DeleteCountry(countryId));
  }

  void getCountry(CountryFormBloc bloc, String countryId) {
    bloc.add(GetCountry(countryId));
  }

  void updateCountry(CountryFormBloc bloc, CreateCountryDTO country) {
    bloc.add(UpdateCountry(country));
  }

  void createCountry(CountryFormBloc bloc, CreateCountryDTO country) {
    bloc.add(CreateCountry(country));
  }
}
