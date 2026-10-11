import 'dart:async';
import 'package:bloc/bloc.dart';
import 'package:bloc_concurrency/bloc_concurrency.dart';
import 'package:copor_core/src/bloc/global_blocs/web_socket_bloc/web_socket_message.dart';
import 'package:copor_core/src/config/web_socket_service.dart';
import 'package:copor_core/src/error/failure.dart';
import 'package:copor_core/src/bloc/global_blocs/web_socket_bloc/web_socket_event.dart';
import 'package:copor_core/src/bloc/global_blocs/web_socket_bloc/web_socket_state.dart';
import 'package:flutter/foundation.dart';

class WebSocketBloc extends Bloc<WebSocketEvent, WebSocketState> {
  static const Duration _maxReconnectDelay = Duration(seconds: 30);

  final WebSocketRepository repository;
  Timer? _reconnectTimer;
  int _reconnectAttempt = 0;
  int _connectionId = 0;
  bool _shouldReconnect = false;

  WebSocketBloc({required this.repository}) : super(WebSocketInitial()) {
    on<ConnectWebSocket>(_connectToWebSocket, transformer: restartable());
    on<DisconnectWebSocket>(_disconnectWebSocket);
  }

  void _disconnectWebSocket(DisconnectWebSocket event, Emitter<WebSocketState> emit) {
    _shouldReconnect = false;
    _reconnectTimer?.cancel();
    _reconnectTimer = null;
    _reconnectAttempt = 0;
    _connectionId++;
    repository.disconnect();
    emit(WebSocketInitial());
  }

  Future<void> _connectToWebSocket(ConnectWebSocket event, Emitter<WebSocketState> emit) async {
    _shouldReconnect = true;
    _reconnectTimer?.cancel();
    _reconnectTimer = null;
    final connectionId = ++_connectionId;
    emit(WebSocketConnecting());
    final socketUri = Uri.parse(event.webSocketUrl);
    final url = socketUri
        .replace(queryParameters: {...socketUri.queryParameters, 'token': event.token})
        .toString();
    final result = await repository.connect(url);
    if (emit.isDone || !_shouldReconnect || connectionId != _connectionId) return;

    await result.fold(
      (failure) async {
        emit(WebSocketError(failure));
        _scheduleReconnect(event);
      },
      (webSocketResult) async {
        emit(WebSocketConnected());

        await emit.forEach<dynamic>(
          webSocketResult.data.channel!.stream,
          onData: (message) {
            if (!_shouldReconnect || connectionId != _connectionId) return state;

            final textFrame = message is String ? message.trim() : null;
            if (textFrame == 'pong' || textFrame == '"pong"') {
              _reconnectAttempt = 0;
              repository.markPongReceived();
              return state;
            }
            if (textFrame == 'ping' || textFrame == '"ping"') {
              repository.sendPong();
              return state;
            }

            final decodedMessage = WebSocketMessage.tryParse(message);
            if (decodedMessage != null) {
              _reconnectAttempt = 0;
              return WebSocketMessageReceived(decodedMessage);
            }

            if (textFrame?.isNotEmpty ?? true) {
              debugPrint('Ignored unsupported WebSocket frame (${message.runtimeType})');
            }
            return state;
          },
          onError: (error, stackTrace) {
            return WebSocketError(Failure(500, error.toString()));
          },
        );

        if (!isClosed && _shouldReconnect) {
          emit(WebSocketDisconnected());
          _scheduleReconnect(event);
        }
      },
    );
  }

  void _scheduleReconnect(ConnectWebSocket event) {
    if (!_shouldReconnect || isClosed || _reconnectTimer?.isActive == true) return;

    final exponent = _reconnectAttempt.clamp(0, 5);
    final delaySeconds = 1 << exponent;
    final delay = Duration(seconds: delaySeconds.clamp(1, _maxReconnectDelay.inSeconds));
    _reconnectAttempt++;
    _reconnectTimer = Timer(delay, () {
      if (_shouldReconnect && !isClosed) add(event);
    });
  }

  @override
  Future<void> close() {
    _shouldReconnect = false;
    _reconnectTimer?.cancel();
    repository.disconnect();
    return super.close();
  }
}
