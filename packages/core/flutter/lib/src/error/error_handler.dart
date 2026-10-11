import 'package:copor_core/src/config/connectivity_service.dart';
import 'package:copor_core/src/data/data_source/base_local_data_source.dart';
import 'package:copor_core/src/error/extract_error_message_helper.dart';
import 'package:copor_core/src/error/response_code.dart';
import 'package:copor_core/src/utils/helper_functions.dart';
import 'package:dio/dio.dart';
import 'package:flutter/foundation.dart';

import 'data_source.dart';
import 'failure.dart';

abstract class ErrorHandler {
  Failure handle(dynamic error);
}

class ErrorHandlerImpl implements ErrorHandler {
  @override
  Failure handle(dynamic error) {
    if (kDebugMode && error is! CacheNotFoundException && !_isBaseUrlNotSet(error)) {
      final trace = error is Error
          ? error.stackTrace
          : error is DioException
          ? error.stackTrace
          : null;
      debugPrint('[ErrorHandler] $error');
      if (trace != null) debugPrintTrace(trace);
    }
    if (error is DioException) {
      return _handleDioException(error);
    }
    if (error is ConnectivityException) {
      return _handleConnectivityException(error);
    }
    if (error is CacheException) {
      return _handleCacheException(error);
    }
    if (error is Exception) {
      return _handleAppException(error);
    }
    return DataSource.defaultError.getFailure(message: error.toString(), isDebug: kDebugMode);
  }

  bool _isBaseUrlNotSet(dynamic error) =>
      error is DioException &&
      error.type == DioExceptionType.cancel &&
      error.error == 'Base URL is not set';

  Failure _handleDioException(DioException error) {
    switch (error.type) {
      case DioExceptionType.connectionTimeout:
        return DataSource.connectTimeout.getFailure(message: error.message, isDebug: kDebugMode);
      case DioExceptionType.sendTimeout:
        return DataSource.sendTimeout.getFailure(message: error.message, isDebug: kDebugMode);
      case DioExceptionType.receiveTimeout:
        return DataSource.receiveTimeout.getFailure(message: error.message, isDebug: kDebugMode);
      case DioExceptionType.badResponse:
        return _handleDioBadResponse(error);
      case DioExceptionType.cancel:
        return DataSource.cancel.getFailure(message: error.message, isDebug: kDebugMode);
      case DioExceptionType.connectionError:
        return DataSource.connectionError.getFailure(message: error.message, isDebug: kDebugMode);
      default:
        return _handleDioDefaultError(error);
    }
  }

  Failure _handleDioBadResponse(DioException error) {
    try {
      final code = error.response?.statusCode ?? ResponseCode.defaultError;
      String? message = error.error as String?;

      switch (code) {
        case ResponseCode.unauthorised:
          return DataSource.unauthorised.getFailure(message: message, isDebug: kDebugMode);
        case ResponseCode.forbidden:
          return DataSource.forbidden.getFailure(message: message, isDebug: kDebugMode);
        case ResponseCode.notFound:
          return DataSource.notFound.getFailure(message: message, isDebug: kDebugMode);
        default:
          String extractedMessage = extractErrorMessage(error.response?.data);
          return Failure(code, extractedMessage);
      }
    } catch (e) {
      return DataSource.defaultError.getFailure(message: e.toString(), isDebug: kDebugMode);
    }
  }

  Failure _handleDioDefaultError(DioException error) {
    if (error.response?.statusCode == ResponseCode.noInternetConnection) {
      return DataSource.noInternetConnection.getFailure();
    } else {
      return DataSource.defaultError.getFailure();
    }
  }

  Failure _handleConnectivityException(ConnectivityException error) {
    return DataSource.noInternetConnection.getFailure(message: error.message);
  }

  Failure _handleCacheException(CacheException error) {
    if (error is CacheNotFoundException) {
      return CacheNotFoundFailure(error.message);
    } else if (error is CacheSaveException) {
      return DataSource.cacheSaveError.getFailure(message: error.message, isDebug: kDebugMode);
    } else if (error is CacheRemoveException) {
      return DataSource.cacheRemoveError.getFailure(message: error.message, isDebug: kDebugMode);
    }
    return DataSource.cacheError.getFailure(message: error.message, isDebug: kDebugMode);
  }

  Failure _handleAppException(Exception error) {
    return DataSource.defaultError.getFailure(message: error.toString());
  }
}
