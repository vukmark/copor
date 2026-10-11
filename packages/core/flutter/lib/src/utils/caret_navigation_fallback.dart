import 'package:flutter/services.dart';
import 'package:flutter/widgets.dart';

import 'caret_navigation_fallback_io.dart'
    if (dart.library.js_interop) 'caret_navigation_fallback_web.dart';

const Map<ShortcutActivator, Intent> caretNavigationShortcuts = <ShortcutActivator, Intent>{
  SingleActivator(LogicalKeyboardKey.arrowLeft): ExtendSelectionByCharacterIntent(
    forward: false,
    collapseSelection: true,
  ),
  SingleActivator(LogicalKeyboardKey.arrowRight): ExtendSelectionByCharacterIntent(
    forward: true,
    collapseSelection: true,
  ),
  SingleActivator(LogicalKeyboardKey.arrowLeft, shift: true): ExtendSelectionByCharacterIntent(
    forward: false,
    collapseSelection: false,
  ),
  SingleActivator(LogicalKeyboardKey.arrowRight, shift: true): ExtendSelectionByCharacterIntent(
    forward: true,
    collapseSelection: false,
  ),
  SingleActivator(LogicalKeyboardKey.arrowUp): ExtendSelectionVerticallyToAdjacentLineIntent(
    forward: false,
    collapseSelection: true,
  ),
  SingleActivator(LogicalKeyboardKey.arrowDown): ExtendSelectionVerticallyToAdjacentLineIntent(
    forward: true,
    collapseSelection: true,
  ),
  SingleActivator(LogicalKeyboardKey.arrowUp, shift: true):
      ExtendSelectionVerticallyToAdjacentLineIntent(forward: false, collapseSelection: false),
  SingleActivator(LogicalKeyboardKey.arrowDown, shift: true):
      ExtendSelectionVerticallyToAdjacentLineIntent(forward: true, collapseSelection: false),
};

Widget wrapWithCaretNavigationFallback(Widget child) {
  if (!needsCaretNavigationFallback) return child;

  return Shortcuts(
    debugLabel: '<Firefox caret navigation fallback>',
    shortcuts: caretNavigationShortcuts,
    child: child,
  );
}
