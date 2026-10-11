import 'package:copor_core/src/data/repository_impl/config/config_repository_impl.dart';
import 'package:retrofit/retrofit.dart';
import 'package:dio/dio.dart';

part 'config_remote_source.g.dart';

@RestApi()
abstract class ConfigRemoteDataSourceImpl implements ConfigRemoteDataSource {
  factory ConfigRemoteDataSourceImpl(Dio dio, {String baseUrl}) = _ConfigRemoteDataSourceImpl;

  @override
  @GET('/wsconfig')
  Future<Map<String, String>> getWebSocketConfig({
    @Extras() Map<String, dynamic> extras = const {'doesNotRequireAuth': true},
  });
}
