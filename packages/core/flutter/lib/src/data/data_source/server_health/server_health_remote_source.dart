import 'package:copor_core/src/data/repository_impl/server_health/server_health_repository_impl.dart';
import 'package:retrofit/retrofit.dart';
import 'package:dio/dio.dart';

part 'server_health_remote_source.g.dart';

@RestApi()
abstract class ServerHealthRemoteDataSourceImpl implements ServerHealthRemoteDataSource {
  factory ServerHealthRemoteDataSourceImpl(Dio dio, {String baseUrl}) =
      _ServerHealthRemoteDataSourceImpl;

  @override
  @GET("{baseURL}")
  Future<String> pingServer(
    @Path("baseURL") String baseURL, {
    @Extras()
    Map<String, dynamic> extras = const {'doesNotRequireAuth': true, 'skipBaseUrlCheck': true},
  });
}
