import 'package:copor_core/src/data/repository_impl/online_status/online_status_repository_impl.dart';
import 'package:retrofit/retrofit.dart';
import 'package:dio/dio.dart';

part 'online_status_remote_source.g.dart';

@RestApi()
abstract class OnlineStatusRemoteDataSourceImpl implements OnlineStatusRemoteDataSource {
  factory OnlineStatusRemoteDataSourceImpl(Dio dio, {String baseUrl}) =
      _OnlineStatusRemoteDataSourceImpl;

  @override
  @GET('/online-users')
  Future<dynamic> getOnlineUserIds();
}
