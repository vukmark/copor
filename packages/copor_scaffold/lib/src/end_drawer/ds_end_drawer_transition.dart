import 'package:copor_theme/copor_theme.dart';
import 'package:flutter/material.dart';

class DSEndDrawerTransition extends StatefulWidget {
  final bool isOpen;
  final Widget child;

  const DSEndDrawerTransition({super.key, required this.isOpen, required this.child});

  @override
  State<DSEndDrawerTransition> createState() => _DSEndDrawerTransitionState();
}

class _DSEndDrawerTransitionState extends State<DSEndDrawerTransition>
    with SingleTickerProviderStateMixin {
  late final AnimationController _controller;
  late final Animation<double> _fade;
  late final Animation<Offset> _slide;

  late bool _visible = widget.isOpen;

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(
      vsync: this,
      duration: coporDropdownAnimDuration,
      value: widget.isOpen ? 1 : 0,
    );
    _fade = CurvedAnimation(parent: _controller, curve: Curves.easeOut);
    _slide = Tween<Offset>(
      begin: const Offset(0, -0.04),
      end: Offset.zero,
    ).animate(CurvedAnimation(parent: _controller, curve: Curves.easeOut));
  }

  @override
  void didUpdateWidget(DSEndDrawerTransition oldWidget) {
    super.didUpdateWidget(oldWidget);
    if (widget.isOpen && !oldWidget.isOpen) {
      setState(() => _visible = true);
      _controller.forward(from: 0);
    } else if (!widget.isOpen && oldWidget.isOpen) {
      _controller.reverse().whenComplete(() {
        if (mounted) setState(() => _visible = false);
      });
    }
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    if (!_visible) return const SizedBox.shrink();
    return IgnorePointer(
      ignoring: !widget.isOpen,
      child: FadeTransition(
        opacity: _fade,
        child: SlideTransition(position: _slide, child: widget.child),
      ),
    );
  }
}
