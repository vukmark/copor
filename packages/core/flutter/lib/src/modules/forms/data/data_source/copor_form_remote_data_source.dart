import 'package:copor_core/src/data/model/key_value_pair/key_value_model.dart';
import 'package:copor_core/src/modules/forms/data/model/copor_form_dto.dart';
import 'package:dio/dio.dart';
import 'package:retrofit/retrofit.dart';

part 'copor_form_remote_data_source.g.dart';

abstract class CoporFormRemoteDataSource {
  Future<CoporFormDTO> getCoporForm(String path);

  Future<CoporFormDTO> getPublicCoporForm(String path);

  Future<void> submitFromCoporForm(String path, Map<String, dynamic> formData);

  Future<void> createFromCoporForm(String path, Map<String, dynamic> formData);

  Future<dynamic> updateFromCoporForm(String path, Map<String, dynamic> formData);

  Future<void> updateSystemSettings(List<KeyValueModel<dynamic>> formData);

  Future<void> uploadFormImage(String path, MultipartFile image);

  Future<void> deleteFormImage(String path);
}

@RestApi()
abstract class CoporFormRemoteDataSourceImpl implements CoporFormRemoteDataSource {
  factory CoporFormRemoteDataSourceImpl(Dio dio, {String baseUrl}) = _CoporFormRemoteDataSourceImpl;

  @override
  @GET('/{path}')
  Future<CoporFormDTO> getCoporForm(@Path('path') String path);

  @override
  @GET('/{path}')
  @Extra({'doesNotRequireAuth': true})
  Future<CoporFormDTO> getPublicCoporForm(@Path('path') String path);

  @override
  @POST('/{path}')
  @Extra({'doesNotRequireAuth': true})
  Future<void> submitFromCoporForm(
    @Path('path') String path,
    @Body() Map<String, dynamic> formData,
  );

  @override
  @POST('/{path}')
  Future<void> createFromCoporForm(
    @Path('path') String path,
    @Body() Map<String, dynamic> formData,
  );

  @override
  @PATCH('/{path}')
  Future<dynamic> updateFromCoporForm(
    @Path('path') String path,
    @Body() Map<String, dynamic> formData,
  );

  @override
  @PATCH('/system-settings')
  Future<void> updateSystemSettings(@Body() List<KeyValueModel<dynamic>> formData);

  @override
  @POST('/{path}')
  @MultiPart()
  Future<void> uploadFormImage(@Path('path') String path, @Part(name: 'image') MultipartFile image);

  @override
  @DELETE('/{path}')
  Future<void> deleteFormImage(@Path('path') String path);
}
