import 'package:copor_core/src/modules/preferences/data/model/preferences_model.dart';
import 'package:copor_core/src/modules/preferences/data/model/update_preferences_dto.dart';
import 'package:copor_core/src/modules/preferences/data/repository/preference_repository.dart';
import 'package:retrofit/retrofit.dart';
import 'package:dio/dio.dart';

part 'preferences_remote_source.g.dart';

@RestApi()
abstract class PreferencesRemoteDataSourceImpl implements PreferencesRemoteDataSource {
  factory PreferencesRemoteDataSourceImpl(Dio dio, {String baseUrl}) =
      _PreferencesRemoteDataSourceImpl;

  @override
  @GET('/user-preferences')
  Future<PreferencesModel> getPreferences();

  @override
  @PATCH('/user-preferences')
  Future<void> updatePreferences(@Body() UpdatePreferencesDTO preferences);
}
