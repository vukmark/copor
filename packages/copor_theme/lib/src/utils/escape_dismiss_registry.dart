import 'package:flutter/material.dart';
import 'package:flutter/services.dart';

/// Global stack of "close me on Escape" callbacks, one per currently mounted
/// [EscapeDismissable]. Flutter's own [CallbackShortcuts]-based Escape
/// handling already works on Chrome/Edge/Safari; this registry exists purely
/// so a browser-level fallback (installed once at the web app root, and only
/// engaged on browsers where the framework handling doesn't fire — e.g.
/// Firefox's engine text-editing/focus strategy can swallow the keydown
/// before it reaches Flutter's Shortcuts system) can still close the topmost
/// open dialog/modal.
class EscapeDismissRegistry {
  EscapeDismissRegistry._();

  static final EscapeDismissRegistry instance = EscapeDismissRegistry._();

  final List<VoidCallback> _stack = [];

  void _push(VoidCallback onDismiss) => _stack.add(onDismiss);

  void _remove(VoidCallback onDismiss) {
    final index = _stack.lastIndexOf(onDismiss);
    if (index != -1) _stack.removeAt(index);
  }

  /// Invokes the topmost registered dismiss callback, if any. Returns
  /// whether something was actually dismissed.
  bool dismissTop() {
    if (_stack.isEmpty) return false;
    final onDismiss = _stack.removeLast();
    onDismiss();
    return true;
  }
}

/// Drop-in replacement for `CallbackShortcuts(bindings: {escape: onDismiss},
/// child: ...)`: keeps the exact same Escape-to-close behavior, and also
/// registers [onDismiss] with [EscapeDismissRegistry] while mounted.
class EscapeDismissable extends StatefulWidget {
  final VoidCallback onDismiss;
  final Widget child;

  const EscapeDismissable({super.key, required this.onDismiss, required this.child});

  @override
  State<EscapeDismissable> createState() => _EscapeDismissableState();
}

class _EscapeDismissableState extends State<EscapeDismissable> {
  @override
  void initState() {
    super.initState();
    EscapeDismissRegistry.instance._push(widget.onDismiss);
  }

  @override
  void didUpdateWidget(covariant EscapeDismissable oldWidget) {
    super.didUpdateWidget(oldWidget);
    if (oldWidget.onDismiss != widget.onDismiss) {
      EscapeDismissRegistry.instance._remove(oldWidget.onDismiss);
      EscapeDismissRegistry.instance._push(widget.onDismiss);
    }
  }

  @override
  void dispose() {
    EscapeDismissRegistry.instance._remove(widget.onDismiss);
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return CallbackShortcuts(
      bindings: {const SingleActivator(LogicalKeyboardKey.escape): widget.onDismiss},
      child: widget.child,
    );
  }
}
