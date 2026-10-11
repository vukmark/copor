import 'package:copor_theme/src/components/inputs/dt_input_constants.dart';
import 'package:copor_theme/src/theme/extensions/copor_theme.dart';
import 'package:copor_theme/src/theme/tokens/spacing.dart';
import 'package:flutter/material.dart';

class DTCheckbox extends StatelessWidget {
  final bool value;
  final ValueChanged<bool?> onChanged;
  final String label;
  final bool disabled;
  final Widget? leading;

  /// When true the row expands to fill its parent's width (e.g. inside a menu
  /// panel column). Defaults to false so standalone usage stays min-width.
  final bool expand;

  const DTCheckbox({
    super.key,
    required this.value,
    required this.onChanged,
    required this.label,
    this.disabled = false,
    this.leading,
    this.expand = false,
  });

  @override
  Widget build(BuildContext context) {
    final dt = CoporTheme.of(context);

    return Opacity(
      opacity: disabled ? 0.4 : 1.0,
      child: Material(
        color: Colors.transparent,
        borderRadius: BorderRadius.all(radius),
        child: InkWell(
          onTap: disabled ? null : () => onChanged(!value),
          borderRadius: BorderRadius.all(radius),
          overlayColor: WidgetStateProperty.resolveWith((states) {
            if (states.contains(WidgetState.hovered)) return dt.colors.surfaceHovered;
            if (states.contains(WidgetState.pressed)) return dt.colors.surfacePressed;
            return Colors.transparent;
          }),
          child: SizedBox(
            height: coporInputLarge,
            width: expand ? double.infinity : null,
            child: Padding(
              padding: coporInputHorizontalPadding,
              child: Row(
                mainAxisSize: expand ? MainAxisSize.max : MainAxisSize.min,
                children: [
                  IgnorePointer(
                    child: Checkbox(
                      value: value,
                      onChanged: (_) {},
                      side: BorderSide(color: dt.colors.outline),
                      activeColor: dt.colors.primary,
                      checkColor: dt.colors.surface,
                      shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(kCheckboxShapeRadius),
                      ),
                      visualDensity: const VisualDensity(horizontal: -4.0, vertical: -2.0),
                    ),
                  ),
                  if (leading != null) ...[
                    const SizedBox(width: 4),
                    leading!,
                  ],
                  const SizedBox(width: kCheckboxLabelSpacing),
                  Flexible(
                    child: Text(label, style: dt.text.body),
                  ),
                  const SizedBox(width: kCheckboxTrailingSpacing),
                ],
              ),
            ),
          ),
        ),
      ),
    );
  }
}
