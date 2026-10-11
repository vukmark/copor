import 'package:flutter/widgets.dart';

class DSBreakpoints {
  final double mobile;
  final double desktop;

  const DSBreakpoints({required this.mobile, required this.desktop});

  @override
  bool operator ==(Object other) =>
      other is DSBreakpoints &&
      other.mobile == mobile &&
      other.desktop == desktop;

  @override
  int get hashCode => Object.hash(mobile, desktop);
}

class DSBreakpointsScope extends InheritedWidget {
  final DSBreakpoints breakpoints;

  const DSBreakpointsScope({
    super.key,
    required this.breakpoints,
    required super.child,
  });

  static DSBreakpoints of(BuildContext context) {
    final scope = context
        .dependOnInheritedWidgetOfExactType<DSBreakpointsScope>();
    assert(
      scope != null,
      'No DSBreakpointsScope found in context — wrap the app root with one.',
    );
    return scope!.breakpoints;
  }

  @override
  bool updateShouldNotify(DSBreakpointsScope oldWidget) =>
      breakpoints != oldWidget.breakpoints;
}
