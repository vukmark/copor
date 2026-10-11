import 'package:equatable/equatable.dart';
import 'package:copor_core/src/error/response_code.dart';

class Failure extends Equatable {
  final int responseCode;
  final String message;

  const Failure(this.responseCode, this.message);

  @override
  List<Object?> get props => [message, responseCode];
}

class CacheNotFoundFailure extends Failure {
  const CacheNotFoundFailure(String message) : super(ResponseCode.cacheError, message);
}
