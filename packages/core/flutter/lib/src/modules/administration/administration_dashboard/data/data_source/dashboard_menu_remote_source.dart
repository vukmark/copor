import 'package:copor_core/src/modules/administration/administration_dashboard/data/model/dashboard_menu_model.dart';
import 'package:dio/dio.dart';
import 'package:retrofit/retrofit.dart';

part 'dashboard_menu_remote_source.g.dart';

abstract class DashboardMenuRemoteDataSource {
  Future<DashboardMenuModel> getDashboardMenu(String languageCode);
}

@RestApi()
abstract class DashboardMenuRemoteDataSourceImpl implements DashboardMenuRemoteDataSource {
  factory DashboardMenuRemoteDataSourceImpl(Dio dio, {String baseUrl}) =
      _DashboardMenuRemoteDataSourceImpl;

  @override
  @GET('/dashboard-menu')
  Future<DashboardMenuModel> getDashboardMenu(@Header('Accept-Language') String languageCode);
}
