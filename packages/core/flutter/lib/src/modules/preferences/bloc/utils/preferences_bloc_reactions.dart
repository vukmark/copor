import 'package:copor_core/src/bloc/global_blocs/authorization_bloc/authorization_bloc.dart';
import 'package:copor_core/src/bloc/global_blocs/config_bloc/config_bloc.dart';
import 'package:copor_core/src/bloc/global_blocs/config_bloc/config_event.dart';
import 'package:copor_core/src/modules/administration/feature_flags/bloc/utils/feature_access_bloc_reactions.dart';
import 'package:copor_core/src/modules/administration/language/bloc/language_bloc.dart';
import 'package:copor_core/src/modules/administration/language/bloc/language_event.dart';
import 'package:copor_core/src/modules/preferences/bloc/preferences_bloc.dart';
import 'package:copor_core/src/modules/preferences/bloc/preferences_event.dart';
import 'package:copor_core/src/bloc/global_blocs/authorization_bloc/authorization_state.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

class PreferencesBlocReactions {
  PreferencesBlocReactions._();

  static final preferences = PreferencesBlocReactions._();

  void getPreferencesWhenAuthenticated(BuildContext context, AuthorizationState state) {
    final token = state.result?.data.authToken ?? '';
    if (token.isNotEmpty) {
      context.read<PreferencesBloc>().add(GetPreferences());
      context.read<LanguageBloc>().add(GetLanguage());
    }
  }

  void updateLanguageIfAuthenticated(BuildContext context) {
    final authState = context.read<AuthorizationBloc>().state;
    final prefState = context.read<PreferencesBloc>().state;
    final langState = context.read<LanguageBloc>().state;

    final token = authState.result?.data.authToken ?? '';
    if (token.isEmpty) return;

    // Skip the transitional `loading` emission (still carrying the
    // previously-cached preferences) and act only once GetPreferences has
    // actually settled, so we react to the account's real language instead
    // of a possibly-stale cached one.
    if (prefState.isLoading) return;

    final preferredId = prefState.result?.data.language;
    if (preferredId == null) return;

    final availableLanguages = langState.result?.data;
    if (availableLanguages == null || availableLanguages.isEmpty) {
      return;
    }

    final targetLanguage = availableLanguages.firstWhere(
      (l) => l.id == preferredId,
      orElse: () => availableLanguages.first,
    );

    final configBloc = context.read<ConfigBloc>();
    if (configBloc.state.result?.data.language.id != targetLanguage.id) {
      // ConfigBloc will re-emit once the language change lands, which
      // triggers getMenuWhenLanguageChanges to fetch the menu correctly.
      configBloc.add(UpdateAppLanguage(targetLanguage));
    } else {
      // Config already matches the account's language, so ConfigBloc won't
      // re-emit and getMenuWhenLanguageChanges won't fire - issue the
      // initial menu fetch here instead, now that the account language is known.
      FeatureAccessBlocReactions.featureAccess.getMenuIfNotLoaded(context);
    }
  }
}
