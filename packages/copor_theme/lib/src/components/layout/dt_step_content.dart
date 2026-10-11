import 'package:flutter/material.dart';

/// Animates between step widgets with a directional slide transition.
///
/// Wrap the current step's content as [child] — a new [stepIndex] value
/// triggers a slide-in from the right (forward) or left (backward).
/// The child is automatically keyed by [stepIndex], so callers don't need
/// to add keys themselves.
///
/// Use [height] to constrain the animated area when steps have varying sizes,
/// preventing layout jumps during the transition.
///
/// Use [separation] to add a horizontal pixel gap between the outgoing and
/// incoming steps during the transition.
class DTStepContent extends StatefulWidget {
  final int stepIndex;
  final Widget child;
  final double? height;
  final Duration duration;
  final double separation;

  const DTStepContent({
    super.key,
    required this.stepIndex,
    required this.child,
    this.height,
    this.duration = const Duration(milliseconds: 280),
    this.separation = 50,
  });

  @override
  State<DTStepContent> createState() => _DTStepContentState();
}

class _DTStepContentState extends State<DTStepContent> {
  bool _goingForward = true;

  @override
  void didUpdateWidget(DTStepContent oldWidget) {
    super.didUpdateWidget(oldWidget);
    if (oldWidget.stepIndex != widget.stepIndex) {
      _goingForward = widget.stepIndex > oldWidget.stepIndex;
    }
  }

  @override
  Widget build(BuildContext context) {
    final currentIndex = widget.stepIndex;
    final goingForward = _goingForward;
    final separation = widget.separation;

    Widget switcher = LayoutBuilder(
      builder: (context, constraints) {
        final width = constraints.maxWidth;
        final fraction = (separation > 0 && width > 0)
            ? (width + separation) / width
            : 1.0;

        return AnimatedSwitcher(
          duration: widget.duration,
          layoutBuilder: (currentChild, previousChildren) => Stack(
            fit: StackFit.loose,
            alignment: Alignment.topCenter,
            children: [
              for (final previousChild in previousChildren) IgnorePointer(child: previousChild),
              if (currentChild != null) currentChild,
            ],
          ),
          transitionBuilder: (child, animation) {
            final isEntering = (child.key as ValueKey?)?.value == currentIndex;
            final beginOffset = isEntering
                ? (goingForward ? Offset(fraction, 0) : Offset(-fraction, 0))
                : (goingForward ? Offset(-fraction, 0) : Offset(fraction, 0));
            return SlideTransition(
              position: Tween<Offset>(begin: beginOffset, end: Offset.zero)
                  .animate(CurvedAnimation(parent: animation, curve: Curves.easeInOut)),
              child: child,
            );
          },
          child: KeyedSubtree(key: ValueKey(currentIndex), child: widget.child),
        );
      },
    );

    if (widget.height != null) return SizedBox(height: widget.height, child: switcher);
    return switcher;
  }
}
