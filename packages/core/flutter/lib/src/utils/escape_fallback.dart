import 'escape_fallback_io.dart' if (dart.library.js_interop) 'escape_fallback_web.dart';

/// Installs a browser-level Escape-key fallback that closes the topmost
/// open dialog/modal via `EscapeDismissRegistry` (see `copor_theme`).
///
/// Every dialog/modal already handles Escape correctly through Flutter's own
/// `CallbackShortcuts` mechanism (wired via `EscapeDismissable`), which works
/// fine on Chrome/Edge/Safari. This fallback exists only for Firefox: its
/// Flutter-web engine text-editing/focus strategy can swallow the Escape
/// keydown before it ever reaches the framework's Shortcuts system when a
/// text field inside the dialog has focus, silently breaking Escape-to-close
/// for that browser only. On other platforms/browsers this is a no-op.
void installEscapeFallback() => installEscapeFallbackImpl();
