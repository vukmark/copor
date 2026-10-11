import 'package:copor_core/src/data/model/authorization/authorization_tokens_model.dart';
import 'package:copor_core/src/data/repository_impl/authorization/authorization_repository_impl.dart';
import 'package:copor_core/src/data/repository_impl/config/config_repository_impl.dart';
import 'package:copor_core/src/error/response_code.dart';
import 'package:copor_core/src/network/public_routes.dart';
import 'package:copor_core/src/network/token_refresh_service.dart';
import 'package:dio/dio.dart';

class TokenInterceptor extends Interceptor {
  final AuthorizationLocalDataSource authorizationLocalDataSource;
  final ConfigLocalDataSource configLocalDataSource;
  final TokenRefreshService tokenRefreshService;
  late AuthorizationTokensModel? authorizationTokensModel;
  final Dio dio;

  TokenInterceptor({
    required this.authorizationLocalDataSource,
    required this.configLocalDataSource,
    required this.tokenRefreshService,
    required this.dio,
  });

  @override
  Future<void> onRequest(RequestOptions options, RequestInterceptorHandler handler) async {
    bool doesNotRequireAuth =
        options.extra['doesNotRequireAuth'] != null && options.extra['doesNotRequireAuth'] == true;
    bool isPublicRoute = PublicRoutes.isPublic(options.path, options.method);

    if (doesNotRequireAuth || isPublicRoute) {
      handler.next(options);
      return;
    }

    try {
      authorizationTokensModel = await authorizationLocalDataSource.getTokens();
      options.headers['Authorization'] = 'Bearer ${authorizationTokensModel?.authToken}';
      handler.next(options);
    } catch (e) {
      return handler.reject(
        DioException(
          requestOptions: options,
          type: DioExceptionType.cancel,
          error: 'Authentication token is missing.',
        ),
        true,
      );
    }
  }

  @override
  Future<void> onError(DioException err, ErrorInterceptorHandler handler) async {
    if (didAuthorizationFail(err)) {
      final newTokens = await tokenRefreshService.refreshTokensAndRetry(
        handler,
        err.requestOptions,
        authorizationTokensModel!.refreshToken,
      );
      await authorizationLocalDataSource.stashTokens(newTokens);
      return;
    }
    handler.next(err);
  }

  bool didAuthorizationFail(DioException err) {
    return err.response?.statusCode == ResponseCode.unauthorised;
  }
}
