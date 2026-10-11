import 'dart:convert';

String extractErrorMessage(dynamic data) {
  if (data == null) return '';

  if (data is String) {
    final trimmed = data.trim();
    if (trimmed.isEmpty) return trimmed;

    final decoded = _tryDecodeJsonString(trimmed);
    if (decoded != null) {
      return extractErrorMessage(decoded);
    }

    if (_isMarkup(trimmed)) return '';

    return trimmed;
  }

  if (data is List) {
    return data
        .map((item) {
          if (item is Map) {
            // Just values, ignore keys
            return item.values.map(_valToText).join(', ');
          }
          return _valToText(item);
        })
        .join(' | ');
  }

  if (data is Map) {
    for (final key in const ['message', 'error', 'detail', 'title', 'description']) {
      final v = data[key];
      if (v != null && v.toString().trim().isNotEmpty) {
        return _valToText(v);
      }
    }
    return data.entries
        .map((e) {
          final v = e.value;
          if (v is List) return '${e.key}: ${v.map(_valToText).join(', ')}';
          return '${e.key}: ${_valToText(v)}';
        })
        .join(', ');
  }
  return data.toString();
}

bool _isMarkup(String value) => value.startsWith('<');

dynamic _tryDecodeJsonString(String value) {
  if (!(value.startsWith('{') || value.startsWith('['))) {
    return null;
  }

  try {
    return jsonDecode(value);
  } catch (_) {
    return null;
  }
}

String _valToText(dynamic v) {
  if (v == null) return '';
  if (v is List) return v.map(_valToText).join(', ');
  if (v is Map) {
    return v.entries.map((e) => '${e.key}: ${_valToText(e.value)}').join(', ');
  }
  return v.toString();
}
