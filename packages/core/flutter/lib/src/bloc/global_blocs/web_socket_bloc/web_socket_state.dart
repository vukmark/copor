import 'package:copor_core/src/error/failure.dart';
import 'package:copor_core/src/bloc/global_blocs/web_socket_bloc/web_socket_message.dart';
import 'package:uuid/uuid.dart';
import 'package:web_socket_channel/web_socket_channel.dart';

class WebSocketModel {
  final WebSocketChannel? channel;

  const WebSocketModel({this.channel});
}

abstract class WebSocketState {
  const WebSocketState();
}

class WebSocketInitial extends WebSocketState {}

class WebSocketConnecting extends WebSocketState {}

class WebSocketConnected extends WebSocketState {}

class WebSocketDisconnected extends WebSocketState {}

class WebSocketError extends WebSocketState {
  final Failure failure;

  const WebSocketError(this.failure);
}

class WebSocketMessageReceived extends WebSocketState {
  final WebSocketMessage message;

  final String eventId = const Uuid().v4();

  WebSocketMessageReceived(this.message);
}
