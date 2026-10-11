import 'dart:js_interop';

import 'package:copor_theme/copor_theme.dart';
import 'package:web/web.dart' as web;

/// Web implementation: only Firefox needs the fallback (see
/// `escape_fallback.dart` for why), so every other browser skips installing
/// the listener entirely.
void installEscapeFallbackImpl() {
  final userAgent = web.window.navigator.userAgent.toLowerCase();
  if (!userAgent.contains('firefox')) return;

  web.document.addEventListener(
    'keydown',
    ((web.KeyboardEvent event) {
      if (event.key != 'Escape') return;

      final dismissed = EscapeDismissRegistry.instance.dismissTop();
      if (dismissed) {
        event.preventDefault();
      }
    }).toJS,
  );
}
