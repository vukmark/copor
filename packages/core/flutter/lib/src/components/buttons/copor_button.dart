import 'dart:async';

import 'package:copor_theme/copor_theme.dart';
import 'package:flutter/material.dart';

class CoporButton extends StatefulWidget {
  final VoidCallback? onPressed;
  final String label;
  final IconData? icon;
  final bool fullWidth;
  final bool outlined;
  final bool text;
  final bool secondary;
  final bool isLoading;
  final double? iconSize;
  final String? semanticLabel;

  const CoporButton({
    super.key,
    required this.onPressed,
    required this.label,
    this.icon,
    this.fullWidth = false,
    this.outlined = false,
    this.text = false,
    this.secondary = false,
    this.isLoading = false,
    this.iconSize,
    this.semanticLabel,
  });

  @override
  State<CoporButton> createState() => _CoporButtonState();
}

class _CoporButtonState extends State<CoporButton> {
  bool _showLoading = false;
  bool _minimumDurationElapsed = true;
  Timer? _minimumDurationTimer;

  @override
  void initState() {
    super.initState();
    _showLoading = widget.isLoading;
    if (widget.isLoading) _startMinimumDurationTimer();
  }

  @override
  void didUpdateWidget(CoporButton oldWidget) {
    super.didUpdateWidget(oldWidget);

    if (widget.isLoading && !oldWidget.isLoading) {
      setState(() => _showLoading = true);
      _startMinimumDurationTimer();
    } else if (!widget.isLoading && oldWidget.isLoading && _minimumDurationElapsed) {
      setState(() => _showLoading = false);
    }
  }

  void _startMinimumDurationTimer() {
    _minimumDurationTimer?.cancel();
    _minimumDurationElapsed = false;
    _minimumDurationTimer = Timer(coporMinimumLoadingDuration, () {
      _minimumDurationElapsed = true;
      if (mounted && !widget.isLoading) setState(() => _showLoading = false);
    });
  }

  @override
  void dispose() {
    _minimumDurationTimer?.cancel();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final colorScheme = Theme.of(context).colorScheme;

    final backgroundColor = widget.secondary ? colorScheme.secondary : colorScheme.primary;
    final foregroundColor = widget.secondary ? colorScheme.onSecondary : colorScheme.onPrimary;
    final iconColor = (widget.text || widget.outlined) ? backgroundColor : foregroundColor;

    Widget buttonChild;

    if (_showLoading) {
      buttonChild = SizedBox(
        height: 20.0,
        width: 20.0,
        child: CircularProgressIndicator(strokeWidth: 2.5, color: iconColor),
      );
    } else {
      buttonChild = widget.icon != null
          ? Row(
              mainAxisSize: MainAxisSize.min,
              mainAxisAlignment: MainAxisAlignment.center,
              crossAxisAlignment: CrossAxisAlignment.center,
              children: [
                widget.semanticLabel != null
                    ? Semantics(
                        label: widget.semanticLabel,
                        child: Icon(widget.icon, color: iconColor, size: widget.iconSize),
                      )
                    : Icon(widget.icon, color: iconColor, size: widget.iconSize),
                if (widget.label != '') const SizedBox(width: 8),
                Flexible(child: Text(widget.label, textAlign: TextAlign.center)),
              ],
            )
          : Text(widget.label, textAlign: TextAlign.center);
    }

    Widget button;

    if (widget.text) {
      button = TextButton(
        onPressed: widget.onPressed,
        style: TextButton.styleFrom(
          padding: const EdgeInsets.symmetric(horizontal: 8),
          foregroundColor: backgroundColor,
          tapTargetSize: MaterialTapTargetSize.shrinkWrap,
          alignment: Alignment.centerLeft,
          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(5)),
        ),
        child: buttonChild,
      );
    } else if (widget.outlined) {
      button = OutlinedButton(
        onPressed: widget.onPressed,
        style: OutlinedButton.styleFrom(
          foregroundColor: backgroundColor,
          side: BorderSide(color: backgroundColor),
          padding: const EdgeInsets.symmetric(vertical: 12, horizontal: 10),
          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(5)),
        ).copyWith(overlayColor: WidgetStateProperty.all(backgroundColor.withAlpha(25))),
        child: buttonChild,
      );
    } else {
      button = FilledButton(
        onPressed: widget.onPressed,
        style: FilledButton.styleFrom(
          backgroundColor: backgroundColor,
          foregroundColor: foregroundColor,
          padding: const EdgeInsets.symmetric(vertical: 12, horizontal: 10),
          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(5)),
        ),
        child: buttonChild,
      );
    }

    if (widget.fullWidth) {
      return Center(
        child: SizedBox(width: MediaQuery.of(context).size.width, child: button),
      );
    }

    return button;
  }
}
