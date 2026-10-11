import 'package:copor_core/src/error/response_code.dart';
import 'package:copor_core/src/error/response_message.dart';
import 'failure.dart';

enum DataSource {
  success,
  noContent,
  badRequest,
  forbidden,
  unauthorised,
  notFound,
  internetServerError,
  connectTimeout,
  connectionError,
  cancel,
  receiveTimeout,
  sendTimeout,
  cacheError,
  cacheNotFound,
  cacheSaveError,
  cacheRemoveError,
  noInternetConnection,
  defaultError,
}

extension DataSourceExtension on DataSource {
  Failure getFailure({String? message, bool isDebug = false}) {
    String baseMessage;
    int code;
    switch (this) {
      case DataSource.success:
        baseMessage = ResponseMessage.success;
        code = ResponseCode.success;
        break;
      case DataSource.noContent:
        baseMessage = ResponseMessage.noContent;
        code = ResponseCode.noContent;
        break;
      case DataSource.badRequest:
        baseMessage = ResponseMessage.badRequest;
        code = ResponseCode.badRequest;
        break;
      case DataSource.forbidden:
        baseMessage = ResponseMessage.forbidden;
        code = ResponseCode.forbidden;
        break;
      case DataSource.unauthorised:
        baseMessage = ResponseMessage.unauthorised;
        code = ResponseCode.unauthorised;
        break;
      case DataSource.notFound:
        baseMessage = ResponseMessage.notFound;
        code = ResponseCode.notFound;
        break;
      case DataSource.internetServerError:
        baseMessage = ResponseMessage.internalServerError;
        code = ResponseCode.internalServerError;
        break;
      case DataSource.connectTimeout:
        baseMessage = ResponseMessage.connectTimeout;
        code = ResponseCode.connectTimeout;
        break;
      case DataSource.connectionError:
        baseMessage = ResponseMessage.connectionError;
        code = ResponseCode.connectionError;
        break;
      case DataSource.cancel:
        baseMessage = ResponseMessage.cancel;
        code = ResponseCode.cancel;
        break;
      case DataSource.receiveTimeout:
        baseMessage = ResponseMessage.receiveTimeout;
        code = ResponseCode.receiveTimeout;
        break;
      case DataSource.sendTimeout:
        baseMessage = ResponseMessage.sendTimeout;
        code = ResponseCode.sendTimeout;
        break;
      case DataSource.cacheError:
        baseMessage = ResponseMessage.cacheError;
        code = ResponseCode.cacheError;
        break;
      case DataSource.cacheNotFound:
        baseMessage = ResponseMessage.cacheNotFound;
        code = ResponseCode.cacheError;
        break;
      case DataSource.cacheSaveError:
        baseMessage = ResponseMessage.cacheSaveError;
        code = ResponseCode.cacheError;
        break;
      case DataSource.cacheRemoveError:
        baseMessage = ResponseMessage.cacheRemoveError;
        code = ResponseCode.cacheError;
        break;
      case DataSource.noInternetConnection:
        baseMessage = ResponseMessage.noInternetConnection;
        code = ResponseCode.noInternetConnection;
        break;
      case DataSource.defaultError:
        baseMessage = '${ResponseMessage.defaultError} : ${message ?? 'Unknown error'}';
        code = ResponseCode.defaultError;
        break;
    }

    return Failure(code, baseMessage);
  }
}
