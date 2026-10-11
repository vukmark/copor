import 'package:dartz/dartz.dart';
import 'package:copor_core/src/modules/preferences/data/model/preferences_model.dart';
import 'package:copor_core/src/error/failure.dart';
import 'package:copor_core/src/bloc/utils/bloc_state.dart';
import 'package:copor_core/src/modules/preferences/data/model/update_preferences_dto.dart';

abstract class PreferencesRepository {
  Future<Either<Failure, Result<PreferencesModel>>> getPreferences();
  Future<Either<Failure, void>> updatePreferences(UpdatePreferencesDTO preferences);

  /// Synchronous best-effort read of whatever's already cached on disk —
  /// falls back to [PreferencesModel.defaultPreferences] if nothing is
  /// cached yet. Meant for seeding `PreferencesBloc`'s initial state before
  /// the first frame, so the UI (theme mode in particular) never starts on
  /// the default and flashes over to the real value once [getPreferences]
  /// resolves.
  PreferencesModel getCachedPreferences();
}

abstract class PreferencesLocalDataSource {
  Future<PreferencesModel> getPreferences();
  Future<void> setPreferences(PreferencesModel preferences);

  /// Synchronous counterpart to [getPreferences] — null if nothing is
  /// cached yet (never throws).
  PreferencesModel? getCachedPreferences();
}

abstract class PreferencesRemoteDataSource {
  Future<PreferencesModel> getPreferences();
  Future<void> updatePreferences(UpdatePreferencesDTO preferences);
}
