import 'dart:js_interop';

Object? normalizeJsonObject(Object? value) {
  try {
    return (value as JSAny?).dartify();
  } catch (_) {
    return value;
  }
}
