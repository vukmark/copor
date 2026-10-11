import 'dart:async';
import 'package:dartz/dartz.dart';
import 'package:copor_core/src/data/repository_impl/base_repository.dart';
import 'package:copor_core/src/error/failure.dart';
import 'package:copor_core/src/bloc/utils/bloc_state.dart';
import 'package:web_socket_channel/web_socket_channel.dart';
import '../bloc/global_blocs/web_socket_bloc/web_socket_state.dart';

class WebSocketRepository extends BaseRepository {
  static const Duration _pingInterval = Duration(seconds: 30);
  static const Duration _pongTimeout = Duration(seconds: 75);

  WebSocketChannel? _channel;
  Timer? pingTimer;
  DateTime? _lastPongReceivedAt;

  WebSocketRepository({required super.errorHandler, required super.connectivityService});

  Future<Either<Failure, Result<WebSocketModel>>> connect(String url) async {
    try {
      if (_channel != null) {
        disconnect();
      }
      _channel = WebSocketChannel.connect(Uri.parse(url));

      await _channel!.ready;

      _lastPongReceivedAt = DateTime.now();
      _ensureConnection();

      return Right(Result(data: WebSocketModel(channel: _channel!)));
    } catch (error) {
      return Left(errorHandler.handle(error));
    }
  }

  void disconnect() {
    pingTimer?.cancel();
    pingTimer = null;
    _lastPongReceivedAt = null;

    _channel?.sink.close();
    _channel = null;
  }

  void _ensureConnection() {
    pingTimer?.cancel();

    pingTimer = Timer.periodic(_pingInterval, (timer) {
      if (_channel != null && _channel?.closeCode == null) {
        final lastPong = _lastPongReceivedAt;
        if (lastPong != null && DateTime.now().difference(lastPong) > _pongTimeout) {
          _channel?.sink.close();
          timer.cancel();
          return;
        }
        _channel?.sink.add('ping');
      } else {
        timer.cancel();
      }
    });
  }

  void markPongReceived() {
    _lastPongReceivedAt = DateTime.now();
  }

  void sendPong() {
    if (_channel != null && _channel?.closeCode == null) {
      _channel?.sink.add('pong');
    }
  }
}
