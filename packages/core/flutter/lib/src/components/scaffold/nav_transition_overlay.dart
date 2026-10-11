import 'dart:ui' as ui;

import 'package:copor_core/src/config/router/routes.dart';
import 'package:flutter/material.dart';
import 'package:flutter/rendering.dart';

enum _NavSlide { forward, backward }

class NavTransitionOverlay extends StatefulWidget {
  static final overlayKey = GlobalKey<NavTransitionOverlayState>();

  final Widget child;

  NavTransitionOverlay({required this.child}) : super(key: NavTransitionOverlay.overlayKey);

  static _NavSlide? _slideFor(String from, String to) {
    final fi = AppRoutes.getBottomNavBarIndexFromRoute(from);
    final ti = AppRoutes.getBottomNavBarIndexFromRoute(to);
    if (fi == -1 || ti == -1 || fi == ti) return null;
    return ti > fi ? _NavSlide.forward : _NavSlide.backward;
  }

  @override
  State<NavTransitionOverlay> createState() => NavTransitionOverlayState();
}

class NavTransitionOverlayState extends State<NavTransitionOverlay>
    with SingleTickerProviderStateMixin {
  final _repaintKey = GlobalKey();
  late final AnimationController _controller;
  ui.Image? _capturedImage;
  _NavSlide? _direction;

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(vsync: this, duration: const Duration(milliseconds: 400));
    _controller.addStatusListener((status) {
      if (status == AnimationStatus.completed) {
        final old = _capturedImage;
        setState(() {
          _capturedImage = null;
          _direction = null;
        });
        _controller.reset();
        old?.dispose();
      }
    });
  }

  @override
  void dispose() {
    _controller.dispose();
    _capturedImage?.dispose();
    super.dispose();
  }

  /// Call this before navigating. Captures the current frame and begins the
  /// slide animation if [from] → [to] is an adjacent navbar transition.
  void startIfNeeded(String from, String to) {
    final direction = NavTransitionOverlay._slideFor(from, to);
    if (direction == null) return;
    _captureAndAnimate(direction);
  }

  void _captureAndAnimate(_NavSlide direction) {
    final boundary = _repaintKey.currentContext?.findRenderObject() as RenderRepaintBoundary?;
    if (boundary == null) return;

    final pixelRatio = MediaQuery.of(context).devicePixelRatio;
    final image = boundary.toImageSync(pixelRatio: pixelRatio);
    final old = _capturedImage;

    setState(() {
      _capturedImage = image;
      _direction = direction;
    });
    old?.dispose();
    _controller.forward(from: 0);
  }

  @override
  Widget build(BuildContext context) {
    final content = RepaintBoundary(key: _repaintKey, child: widget.child);
    final image = _capturedImage;
    final direction = _direction;

    if (image == null || direction == null) return content;

    final animation = CurvedAnimation(parent: _controller, curve: Curves.easeInOut);
    final newBeginX = direction == _NavSlide.forward ? 1.0 : -1.0;
    final oldEndX = direction == _NavSlide.forward ? -1.0 : 1.0;

    return Stack(
      children: [
        SlideTransition(
          position: Tween<Offset>(begin: Offset(newBeginX, 0), end: Offset.zero).animate(animation),
          child: content,
        ),
        SlideTransition(
          position: Tween<Offset>(begin: Offset.zero, end: Offset(oldEndX, 0)).animate(animation),
          child: RawImage(
            image: image,
            width: double.infinity,
            height: double.infinity,
            fit: BoxFit.fill,
          ),
        ),
      ],
    );
  }
}
