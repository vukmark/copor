import 'package:copor_core/src/modules/preferences/bloc/preferences_bloc.dart';
import 'package:copor_core/src/modules/preferences/bloc/preferences_event.dart';
import 'package:copor_core/src/modules/preferences/data/model/update_preferences_dto.dart';

class PreferencesBlocEventDispatcher {
  static _Preferences preferences = _Preferences();
}

class _Preferences {
  void getPreferences(PreferencesBloc bloc) {
    bloc.add(GetPreferences());
  }

  void updatePreferences(PreferencesBloc bloc, UpdatePreferencesDTO preferences) {
    bloc.add(UpdatePreferences(preferences));
  }

  void resetPreferences(PreferencesBloc bloc) {
    bloc.add(UpdatePreferences(UpdatePreferencesDTO.empty()));
  }
}
