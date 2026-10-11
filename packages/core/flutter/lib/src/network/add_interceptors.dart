import 'package:copor_core/src/config/dependency_injection.dart';
import 'package:copor_core/src/network/server_url_interceptor.dart';
import 'package:copor_core/src/network/token_interceptor.dart';
import 'package:dio/dio.dart';

void addInterceptors(Dio dio) {
  dio.interceptors.add(getIt<ServerUrlInterceptor>());
  dio.interceptors.add(getIt<TokenInterceptor>());
  /*
  if (!kReleaseMode) {
    dio.interceptors.add(PrettyDioLogger(
      request: true,
      requestHeader: true,
      requestBody: true,
      responseHeader: true,
      responseBody: true,
      error: true,
    ));
  }
*/
}
