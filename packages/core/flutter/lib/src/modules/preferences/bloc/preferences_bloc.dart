import 'dart:async';
import 'package:bloc/bloc.dart';
import 'package:copor_core/src/bloc/utils/bloc_state.dart';
import 'package:copor_core/src/modules/preferences/data/model/preferences_model.dart';
import 'package:copor_core/src/modules/preferences/data/repository/preference_repository.dart';
import 'package:copor_core/src/modules/preferences/bloc/preferences_event.dart';
import 'package:copor_core/src/modules/preferences/bloc/preferences_state.dart';

class PreferencesBloc extends Bloc<PreferencesEvent, PreferencesState> {
  final PreferencesRepository _preferencesRepository;

  PreferencesBloc({required PreferencesRepository preferencesRepository})
    : _preferencesRepository = preferencesRepository,
      // Seeded synchronously from whatever's already cached on disk (by the
      // time this bloc is constructed, `di.init()` has already awaited
      // SharedPreferences being ready) rather than always starting from
      // `PreferencesModel.defaultPreferences()` — otherwise the UI (theme
      // mode in particular) renders the default on the very first frame
      // and visibly flashes over to the real value once `GetPreferences`
      // resolves.
      super(
        PreferencesState.fetched(
          result: Result(data: preferencesRepository.getCachedPreferences()),
        ),
      ) {
    on<GetPreferences>(_onGetPreferences);
    on<UpdatePreferences>(_onUpdatePreferences);
  }

  Future<void> _onGetPreferences(GetPreferences event, Emitter<PreferencesState> emit) async {
    emit(PreferencesState.loading(result: state.result));

    final result = await _preferencesRepository.getPreferences();
    result.fold(
      (failure) {
        emit(state.copyWith(failure: failure, isLoading: false));
      },
      (success) {
        emit(state.copyWith(result: success, isLoading: false));
      },
    );
  }

  Future<void> _onUpdatePreferences(UpdatePreferences event, Emitter<PreferencesState> emit) async {
    // The limits and module config come from the server only; keep the
    // current ones.
    final current = state.result?.data ?? PreferencesModel.defaultPreferences();
    final optimistic = current.copyWith(
      themeMode: event.preferences.themeMode,
      contrastMode: event.preferences.contrast,
      colorSet: event.preferences.colorSet,
      contactPrivacy: event.preferences.contactPrivacy,
      authentication: event.preferences.authentication,
      language: event.preferences.language,
      fontSize: event.preferences.fontSize,
      useIcons: event.preferences.useIcons,
      actionFeedbackDuration: event.preferences.actionFeedbackDuration,
      fontWeight: event.preferences.fontWeight,
      modulePreferences: event.preferences.modulePreferences,
    );
    emit(state.copyWith(isLoading: true, isUpdated: false, result: Result(data: optimistic)));

    final result = await _preferencesRepository.updatePreferences(event.preferences);
    result.fold(
      (failure) => emit(state.copyWith(isLoading: false, failure: failure)),
      (_) => emit(state.copyWith(isLoading: false, isUpdated: true, failure: null)),
    );
  }
}
