abstract class WebSocketEvent {
  const WebSocketEvent();
}

class ConnectWebSocket extends WebSocketEvent {
  final String webSocketUrl;
  final String token;

  const ConnectWebSocket({required this.webSocketUrl, required this.token});
}

class DisconnectWebSocket extends WebSocketEvent {
  const DisconnectWebSocket();
}
