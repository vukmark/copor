import 'package:web/web.dart' as web;

final bool needsCaretNavigationFallback = web.window.navigator.userAgent.toLowerCase().contains(
  'firefox',
);
