import 'dart:convert';
import 'dart:typed_data';

import 'package:copor_core/src/utils/json_object_normalizer.dart';

class WebSocketMessage {
  final String event;
  final Map<String, dynamic> payload;

  const WebSocketMessage({required this.event, required this.payload});

  static WebSocketMessage? tryParse(Object? rawMessage) {
    try {
      final textMessage = switch (rawMessage) {
        Uint8List value => utf8.decode(value),
        List<int> value => utf8.decode(value),
        _ => rawMessage,
      };
      final decoded = textMessage is String ? jsonDecode(textMessage) : textMessage;
      final message = _asJsonMap(decoded);
      if (message == null) return null;

      final event = message['event'];
      final rawPayload = message['payload'];
      final mappedPayload = rawPayload == null ? <String, dynamic>{} : _asJsonMap(rawPayload);
      final payload = mappedPayload ?? <String, dynamic>{'value': normalizeJsonObject(rawPayload)};
      if (event is! String || event.isEmpty) return null;

      return WebSocketMessage(event: event, payload: payload);
    } catch (_) {
      return null;
    }
  }

  static Map<String, dynamic>? _asJsonMap(Object? value) {
    Object? decoded = value;
    if (value is String) {
      try {
        decoded = jsonDecode(value);
      } catch (_) {
        return null;
      }
    }
    final normalized = normalizeJsonObject(decoded);
    if (normalized is! Map) return null;

    return normalized.map((key, value) => MapEntry(key.toString(), value));
  }
}
