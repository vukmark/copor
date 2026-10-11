import 'package:copor_core/src/data/model/authorization/authorization_tokens_model.dart';
import 'package:copor_core/src/data/model/config/config_model.dart';
import 'package:copor_core/src/data/repository_impl/config/config_repository_impl.dart';
import 'package:dio/dio.dart';

abstract class TokenRefreshService {
  Future<AuthorizationTokensModel> refreshTokensAndRetry(
    ErrorInterceptorHandler handler,
    RequestOptions requestOptions,
    String refreshToken,
  );
}

class TokenRefreshServiceImpl implements TokenRefreshService {
  final Dio dio;
  final ConfigLocalDataSource configLocalDataSource;

  TokenRefreshServiceImpl({required this.dio, required this.configLocalDataSource});

  @override
  Future<AuthorizationTokensModel> refreshTokensAndRetry(
    ErrorInterceptorHandler handler,
    RequestOptions requestOptions,
    String refreshToken,
  ) async {
    try {
      final ConfigModel configModel = await configLocalDataSource.getConfig();
      final baseUrl = configModel.baseUrl;
      final refreshUrl = '$baseUrl/login/refresh';

      final response = await dio.post(refreshUrl, data: {'refresh_token': refreshToken});

      final newTokens = response.data;
      if (newTokens != null) {
        final tokensModel = AuthorizationTokensModel.fromJson(newTokens);

        final newRequestOptions = requestOptions.copyWith(
          headers: {
            ...requestOptions.headers,
            'Authorization': 'Bearer ${newTokens['access_token']}',
          },
        );

        handler.resolve(await dio.fetch(newRequestOptions));

        return tokensModel;
      }
    } catch (error) {
      handler.reject(error as DioException);
    }

    throw Exception("Token refresh failed and no valid response was returned");
  }
}
