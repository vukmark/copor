import 'package:dio/dio.dart';

class ServerUrlInterceptor extends Interceptor {
  @override
  void onRequest(RequestOptions options, RequestInterceptorHandler handler) {
    if (options.baseUrl.isEmpty) {
      if (options.extra['skipBaseUrlCheck'] != null && options.extra['skipBaseUrlCheck'] == true) {
        return handler.next(options);
      }

      return handler.reject(
        DioException(
          requestOptions: options,
          error: 'Base URL is not set',
          type: DioExceptionType.cancel,
        ),
      );
    }

    return handler.next(options);
  }
}
