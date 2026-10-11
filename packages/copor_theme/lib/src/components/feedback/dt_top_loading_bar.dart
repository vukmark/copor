import 'package:copor_theme/copor_theme.dart';
import 'package:flutter/material.dart';

class DTTopLoadingBar extends StatefulWidget {
  final bool isLoading;

  const DTTopLoadingBar({super.key, required this.isLoading});

  @override
  State<DTTopLoadingBar> createState() => _DTTopLoadingBarState();
}

class _DTTopLoadingBarState extends State<DTTopLoadingBar>
    with SingleTickerProviderStateMixin {
  late final AnimationController _controller = AnimationController(
    vsync: this,
    duration: const Duration(milliseconds: 1800 * 5), // 1 color per indicator sweep
  );

  @override
  void initState() {
    super.initState();
    if (widget.isLoading) _controller.repeat();
  }

  @override
  void didUpdateWidget(DTTopLoadingBar oldWidget) {
    super.didUpdateWidget(oldWidget);
    if (widget.isLoading && !oldWidget.isLoading) {
      if (!_controller.isAnimating) _controller.repeat();
    } else if (!widget.isLoading && oldWidget.isLoading) {
      _controller.stop();
    }
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final c = CoporTheme.of(context).colors;
    final colors = [c.primary, c.secondary, c.tertiary, c.error, c.success];

    return AnimatedOpacity(
      opacity: widget.isLoading ? 1.0 : 0.0,
      duration: const Duration(milliseconds: 250),
      child: Align(
        child: ConstrainedBox(
          constraints: const BoxConstraints(maxWidth: coporMaxContentWidth),
          child: Padding(
            padding: const EdgeInsets.symmetric(horizontal: coporBorderRadius),
            child: AnimatedBuilder(
              animation: _controller,
              builder: (_, __) {
                final color = colors[(_controller.value * colors.length).floor().clamp(0, colors.length - 1)];
                return LinearProgressIndicator(
                  value: null,
                  valueColor: AlwaysStoppedAnimation<Color>(color),
                  backgroundColor: Colors.transparent,
                  minHeight: 4,
                  borderRadius: BorderRadius.all(radius),
                );
              },
            ),
          ),
        ),
      ),
    );
  }
}
