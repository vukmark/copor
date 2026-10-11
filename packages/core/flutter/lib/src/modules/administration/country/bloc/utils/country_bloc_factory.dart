import 'package:copor_core/src/modules/administration/country/bloc/country_list/country_list_bloc.dart';
import 'package:copor_core/src/modules/administration/country/bloc/country_form/country_form_bloc.dart';
import 'package:copor_core/src/modules/administration/country/bloc/utils/country_bloc_event_dispatcher.dart';
import 'package:copor_core/src/modules/administration/country/data/model/translation/country_translation.dart';
import 'package:copor_core/src/modules/administration/country/data/repository/country_repository.dart';
import 'package:copor_core/src/bloc/global_blocs/translation_bloc/translation_bloc.dart';
import 'package:copor_core/src/bloc/utils/bloc_context_extensions.dart';
import 'package:flutter/material.dart';
import 'package:copor_core/src/config/dependency_injection.dart';

class CountryListBlocFactory {
  static _CountryTranslation translation = _CountryTranslation();

  static CountryListBloc initializeCountryListBloc(BuildContext context) {
    final bloc = getIt<CountryListBloc>();
    return bloc;
  }

  static CountryListBloc initializeCountryPublicListBloc(BuildContext context) {
    final bloc = getIt<CountryListBloc>();
    CountryBlocEventDispatcher.country.getCountryPublicList(bloc);
    return bloc;
  }

  static CountryFormBloc initializeCountryFormBloc() {
    return getIt<CountryFormBloc>();
  }

  static CountryRepository provideCountryRepository() {
    return getIt<CountryRepository>();
  }
}

class _CountryTranslation {
  TranslationBloc<CountryPageTranslation> initializeCountryPageTranslationBloc(
    BuildContext context,
  ) {
    final bloc = getIt<TranslationBloc<CountryPageTranslation>>();
    CountryBlocEventDispatcher.translation.getCountryTranslation(
      bloc,
      context.config.currentLanguage,
    );
    return bloc;
  }
}
