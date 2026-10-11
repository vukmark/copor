import 'package:flutter/material.dart';

class DSChromeState {
  final Widget? appBar;
  final Widget? drawer;
  final Widget? rail;
  final Widget? endDrawer;

  final bool isEmptyScaffold;
  final Widget? bottomNavBar;
  final Widget? leading;
  final Widget? title;
  final List<Widget>? actions;
  final Widget? floatingActionButton;

  const DSChromeState({
    this.appBar,
    this.drawer,
    this.rail,
    this.endDrawer,
    this.isEmptyScaffold = false,
    this.bottomNavBar,
    this.leading,
    this.title,
    this.actions,
    this.floatingActionButton,
  });

  DSChromeState copyWith({
    Widget? appBar,
    Widget? drawer,
    Widget? rail,
    Widget? endDrawer,
    bool? isEmptyScaffold,
    Widget? bottomNavBar,
    Widget? leading,
    Widget? title,
    List<Widget>? actions,
    Widget? floatingActionButton,
  }) {
    return DSChromeState(
      appBar: appBar ?? this.appBar,
      drawer: drawer ?? this.drawer,
      rail: rail ?? this.rail,
      endDrawer: endDrawer ?? this.endDrawer,
      isEmptyScaffold: isEmptyScaffold ?? this.isEmptyScaffold,
      bottomNavBar: bottomNavBar ?? this.bottomNavBar,
      leading: leading ?? this.leading,
      title: title ?? this.title,
      actions: actions ?? this.actions,
      floatingActionButton: floatingActionButton ?? this.floatingActionButton,
    );
  }
}
