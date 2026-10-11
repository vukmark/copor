import 'dart:async';
import 'package:copor_core/src/modules/preferences/data/model/preferences_model.dart';
import 'package:copor_core/src/data/repository_impl/base_repository.dart';
import 'package:copor_core/src/modules/preferences/data/model/update_preferences_dto.dart';
import 'package:copor_core/src/modules/preferences/data/repository/preference_repository.dart';
import 'package:dartz/dartz.dart';
import 'package:copor_core/src/error/failure.dart';
import 'package:copor_core/src/bloc/utils/bloc_state.dart';

class PreferencesRepositoryImpl extends BaseRepository implements PreferencesRepository {
  final PreferencesRemoteDataSource remoteDataSource;
  final PreferencesLocalDataSource localDataSource;

  PreferencesRepositoryImpl({
    required this.remoteDataSource,
    required this.localDataSource,
    required super.errorHandler,
    required super.connectivityService,
  });

  @override
  Future<Either<Failure, Result<PreferencesModel>>> getPreferences() async {
    return performOperationAndMapToResult<PreferencesModel>(
      localOperation: () async {
        return performLocalStorageOperation<PreferencesModel>(() async {
          final localPreferences = localDataSource.getPreferences();
          return localPreferences;
        });
      },

      remoteOperation: () async {
        return performNetworkOperation<PreferencesModel>(() async {
          final preferences = await remoteDataSource.getPreferences();
          await localDataSource.setPreferences(preferences);
          return preferences;
        });
      },
    );
  }

  @override
  PreferencesModel getCachedPreferences() {
    return localDataSource.getCachedPreferences() ?? PreferencesModel.defaultPreferences();
  }

  @override
  Future<Either<Failure, Result<void>>> updatePreferences(UpdatePreferencesDTO preferences) async {
    return performVoidOperation(
      remoteOperation: () async {
        return performNetworkOperation<void>(() async {
          await remoteDataSource.updatePreferences(preferences);
        });
      },
    );
  }
}
