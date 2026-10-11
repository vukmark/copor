import 'package:copor_theme/src/components/inputs/dt_input_constants.dart';
import 'package:copor_theme/src/theme/extensions/copor_theme.dart';
import 'package:copor_theme/src/theme/tokens/spacing.dart';
import 'package:flutter/material.dart';

class DTRadioButton extends StatelessWidget {
  final bool value;
  final ValueChanged<bool?> onChanged;
  final String label;
  final bool disabled;

  /// When true the row expands to fill its parent's width.
  final bool expand;

  const DTRadioButton({
    super.key,
    required this.value,
    required this.onChanged,
    required this.label,
    this.disabled = false,
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
                    child: RadioGroup<bool>(
                      groupValue: value ? true : null,
                      onChanged: (_) {},
                      child: Radio<bool>(
                        value: true,
                        visualDensity: const VisualDensity(
                          horizontal: -4.0,
                          vertical: -2.0,
                        ),
                        fillColor: WidgetStateProperty.resolveWith((states) {
                          if (states.contains(WidgetState.selected)) {
                            return dt.colors.primary;
                          }
                          return dt.colors.outline;
                        }),
                      ),
                    ),
                  ),
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
