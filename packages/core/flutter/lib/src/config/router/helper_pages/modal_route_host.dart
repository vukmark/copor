import 'package:copor_theme/copor_theme.dart';
import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';

// Invisible widget that opens a root-navigator dialog on mount and keeps
// GoRouter route dismissal in sync with the dialog's own dismissal.
//
// `dialogBuilder` is called with the shell context (module blocs are
// accessible here) before the root navigator switch, so BlocProvider.value
// wiring works normally. The returned widget becomes the dialog content.
class ModalRouteHost extends StatefulWidget {
  final Widget Function(BuildContext context) dialogBuilder;

  const ModalRouteHost({super.key, required this.dialogBuilder});

  @override
  State<ModalRouteHost> createState() => _ModalRouteHostState();
}

class _ModalRouteHostState extends State<ModalRouteHost> {
  NavigatorState? _rootNavigator;
  bool _dialogActive = false;

  @override
  void didChangeDependencies() {
    super.didChangeDependencies();
    _rootNavigator = Navigator.of(context, rootNavigator: true);
  }

  @override
  void initState() {
    super.initState();
    WidgetsBinding.instance.addPostFrameCallback((_) => _showModal());
  }

  Future<void> _showModal() async {
    final content = widget.dialogBuilder(context);
    _dialogActive = true;
    await showGeneralDialog(
      context: context,
      useRootNavigator: true,
      barrierDismissible: true,
      barrierColor: coporBarrierColor(context),
      barrierLabel: '',
      transitionDuration: const Duration(milliseconds: 200),
      transitionBuilder: (_, animation, _, child) =>
          FadeTransition(opacity: animation, child: child),
      pageBuilder: (_, _, _) => Material(type: MaterialType.transparency, child: content),
    );
    _dialogActive = false;
    if (mounted) context.pop();
  }

  @override
  void dispose() {
    if (_dialogActive) _rootNavigator?.maybePop();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) => const SizedBox.shrink();
}
