import 'package:copor_theme/src/components/buttons/dt_common_buttons.dart';
import 'package:copor_theme/src/components/inputs/dt_input_constants.dart';
import 'package:copor_theme/src/theme/tokens/spacing.dart';
import 'package:copor_theme/src/theme/component_themes/input_theme.dart';
import 'package:copor_theme/src/theme/extensions/copor_colors.dart';
import 'package:copor_theme/src/theme/extensions/copor_theme.dart';
import 'package:flutter/material.dart';

/// Coordinates mutual exclusion of help panels across a group of [DTSwitchInput]s.
///
/// Create one instance, pass it to all switches that should share exclusive
/// open state, and dispose it with the owning widget.
///
/// ```dart
/// final _switchController = DTSwitchGroupController();
///
/// DTSwitchInput(controller: _switchController, ...)
/// DTSwitchInput(controller: _switchController, ...)
/// ```
class DTSwitchGroupController extends ChangeNotifier {
  Object? _activeId;

  bool isActive(Object id) => _activeId == id;

  void toggle(Object id) {
    _activeId = _activeId == id ? null : id;
    notifyListeners();
  }
}

class DTSwitchInput extends StatefulWidget {
  final bool value;
  final ValueChanged<bool> onChanged;
  final String label;
  final String? errorText;
  final Widget? helpContent;
  final bool disabled;
  final DTSwitchGroupController? controller;

  const DTSwitchInput({
    super.key,
    required this.value,
    required this.onChanged,
    required this.label,
    this.errorText,
    this.helpContent,
    this.disabled = false,
    this.controller,
  });

  @override
  State<DTSwitchInput> createState() => _DTSwitchInputState();
}

class _DTSwitchInputState extends State<DTSwitchInput> {
  // Standalone toggle used when no controller is provided.
  bool _infoOpen = false;

  // Stable identity used as the key within a DTSwitchGroupController.
  final Object _id = Object();

  bool get _showInfo =>
      widget.controller != null ? widget.controller!.isActive(_id) : _infoOpen;

  void _toggleInfo() {
    if (widget.controller != null) {
      widget.controller!.toggle(_id);
    } else {
      setState(() => _infoOpen = !_infoOpen);
    }
  }

  void _onControllerChanged() => setState(() {});

  @override
  void initState() {
    super.initState();
    widget.controller?.addListener(_onControllerChanged);
  }

  @override
  void didUpdateWidget(DTSwitchInput oldWidget) {
    super.didUpdateWidget(oldWidget);
    if (oldWidget.controller != widget.controller) {
      oldWidget.controller?.removeListener(_onControllerChanged);
      widget.controller?.addListener(_onControllerChanged);
    }
  }

  @override
  void dispose() {
    widget.controller?.removeListener(_onControllerChanged);
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final dt = CoporTheme.of(context);
    final inputTheme = DTInputThemeData.of(context);

    return Opacity(
      opacity: widget.disabled ? 0.4 : 1.0,
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Material(
            color: Colors.transparent,
            borderRadius: BorderRadius.all(radius),
            child: InkWell(
              onTap: widget.disabled ? null : () => widget.onChanged(!widget.value),
              borderRadius: BorderRadius.all(radius),
              overlayColor: WidgetStateProperty.resolveWith((states) {
                if (states.contains(WidgetState.hovered)) return dt.colors.surfaceHovered;
                if (states.contains(WidgetState.pressed)) return dt.colors.surfacePressed;
                return Colors.transparent;
              }),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  IgnorePointer(
                    child: Transform.scale(
                      scale: 0.75,
                      alignment: Alignment.center,
                      child: Switch(
                        value: widget.value,
                        onChanged: (_) {},
                        activeThumbColor: dt.colors.onPrimaryContainer,
                        activeTrackColor: dt.colors.primaryContainer,
                        inactiveThumbColor: dt.colors.outline,
                        inactiveTrackColor: dt.colors.surface,
                        trackOutlineColor: WidgetStateProperty.resolveWith((states) {
                          if (states.contains(WidgetState.selected)) return dt.colors.primaryBorder;
                          return dt.colors.outline;
                        }),
                      ),
                    ),
                  ),
                  Expanded(
                    child: Text(widget.label, style: dt.text.body),
                  ),
                  if (widget.helpContent != null) ...[
                    const SizedBox(width: 4),
                    DTCommonButtons.info(
                      isActive: _showInfo,
                      semanticLabel: widget.label,
                      onPressed: _toggleInfo,
                    ),
                    const SizedBox(width: 4),
                  ],
                ],
              ),
            ),
          ),
          AnimatedSwitcher(
            duration: kInputAnimDuration,
            transitionBuilder: (child, animation) => SizeTransition(
              sizeFactor: CurvedAnimation(parent: animation, curve: Curves.easeInOut),
              child: FadeTransition(opacity: animation, child: child),
            ),
            child: widget.errorText != null
                ? Container(
                    key: const ValueKey('error'),
                    margin: kInputErrorMargin,
                    padding: kInputErrorPadding,
                    width: double.infinity,
                    decoration: BoxDecoration(
                      color: CoporColors.of(context).errorContainer,
                      borderRadius: BorderRadius.circular(coporBorderRadius),
                      border: Border.all(color: CoporColors.of(context).errorBorder),
                    ),
                    child: Text(widget.errorText!, style: inputTheme.errorStyle),
                  )
                : widget.helpContent != null && _showInfo
                    ? Container(
                        key: const ValueKey('help'),
                        width: double.infinity,
                        margin: const EdgeInsets.only(bottom: kDecoratorHelpMarginTop),
                        padding: const EdgeInsets.symmetric(
                          horizontal: kDecoratorHelpPaddingH,
                          vertical: kDecoratorHelpPaddingV,
                        ),
                        decoration: BoxDecoration(
                          color: CoporColors.of(context).surfaceContainer,
                          border: Border.all(color: CoporColors.of(context).outlineSubtle),
                          borderRadius: BorderRadius.circular(kInputBorderRadius),
                        ),
                        child: widget.helpContent,
                      )
                    : const SizedBox.shrink(key: ValueKey('none')),
          ),
        ],
      ),
    );
  }
}
