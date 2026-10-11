import 'package:copor_core/src/modules/preferences/bloc/preferences_bloc.dart';
import 'package:copor_core/src/config/dependency_injection.dart' show getIt;

class PreferencesBlocFactory {
  static PreferencesBloc initializePreferencesBloc() {
    final bloc = getIt<PreferencesBloc>();
    return bloc;
  }
}
