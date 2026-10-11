import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'ds_scaffold_controller.dart';

class DSScaffoldSetup extends StatefulWidget {
  final Widget child;

  final Widget? appBar;
  final Widget? leading;
  final Widget? title;
  final List<Widget>? actions;
  final Widget? drawer;
  final Widget? rail;
  final Widget? endDrawer;
  final Widget? bottomNavBar;
  final Widget? floatingActionButton;

  const DSScaffoldSetup({
    super.key,
    required this.child,
    this.appBar,
    this.leading,
    this.title,
    this.actions,
    this.drawer,
    this.rail,
    this.endDrawer,
    this.bottomNavBar,
    this.floatingActionButton,
  });

  @override
  State<DSScaffoldSetup> createState() => _DSScaffoldSetupState();
}

class _DSScaffoldSetupState extends State<DSScaffoldSetup> {
  @override
  void initState() {
    super.initState();
    WidgetsBinding.instance.addPostFrameCallback((_) => _apply());
  }

  @override
  void didUpdateWidget(DSScaffoldSetup old) {
    super.didUpdateWidget(old);
    if (_changed(old)) {
      WidgetsBinding.instance.addPostFrameCallback((_) => _apply());
    }
  }

  void _apply() {
    if (!mounted) return;
    context.read<DSScaffoldController>().configureScaffold(
      appBar: widget.appBar,
      leading: widget.leading,
      title: widget.title,
      actions: widget.actions,
      drawer: widget.drawer,
      rail: widget.rail,
      endDrawer: widget.endDrawer,
      bottomNavBar: widget.bottomNavBar,
      floatingActionButton: widget.floatingActionButton,
    );
  }

  bool _changed(DSScaffoldSetup old) =>
      !identical(old.appBar, widget.appBar) ||
      !identical(old.leading, widget.leading) ||
      !identical(old.title, widget.title) ||
      !identical(old.actions, widget.actions) ||
      !identical(old.drawer, widget.drawer) ||
      !identical(old.rail, widget.rail) ||
      !identical(old.endDrawer, widget.endDrawer) ||
      !identical(old.bottomNavBar, widget.bottomNavBar) ||
      !identical(old.floatingActionButton, widget.floatingActionButton);

  @override
  Widget build(BuildContext context) => widget.child;
}
