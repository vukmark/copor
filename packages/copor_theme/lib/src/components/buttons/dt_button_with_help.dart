import 'package:copor_theme/src/components/buttons/dt_button.dart';
import 'package:copor_theme/src/components/buttons/dt_common_buttons.dart';
import 'package:copor_theme/src/components/inputs/dt_input_constants.dart';
import 'package:copor_theme/src/theme/extensions/copor_colors.dart';
import 'package:copor_theme/src/theme/extensions/copor_text_theme.dart';
import 'package:flutter/material.dart';

class DTButtonWithHelp extends StatefulWidget {
  final IconData? icon;
  final String label;
  final String? semanticLabel;
  final VoidCallback onPressed;
  final bool enabled;
  final bool fullWidth;
  final String helpContent;
  final String helpTooltip;

  const DTButtonWithHelp({
    super.key,
    this.icon,
    required this.label,
    this.semanticLabel,
    required this.onPressed,
    this.enabled = true,
    this.fullWidth = false,
    required this.helpContent,
    this.helpTooltip = 'Hilfe',
  });

  @override
  State<DTButtonWithHelp> createState() => _DTButtonWithHelpState();
}

class _DTButtonWithHelpState extends State<DTButtonWithHelp> {
  bool _showHelp = false;

  @override
  Widget build(BuildContext context) {
    final dc = CoporColors.of(context);

    return Column(
      crossAxisAlignment: CrossAxisAlignment.center,
      mainAxisSize: MainAxisSize.min,
      children: [
        Stack(
          clipBehavior: Clip.none,
          children: [
            DTButton.primary(
              icon: widget.icon,
              label: widget.label,
              semanticLabel: widget.semanticLabel ?? widget.label,
              onPressed: widget.onPressed,
              enabled: widget.enabled,
              fullWidth: widget.fullWidth,
            ),
            Positioned(
              top: -16,
              right: 6,
              child: DTCommonButtons.info(
                isActive: _showHelp,
                semanticLabel: widget.helpTooltip,
                onPressed: () => setState(() => _showHelp = !_showHelp),
              ),
            ),
          ],
        ),
        AnimatedSize(
          duration: kInputAnimDuration,
          curve: Curves.easeInOut,
          alignment: Alignment.topCenter,
          child: AnimatedSwitcher(
            duration: kInputAnimDuration,
            child: _showHelp
                ? Container(
                    key: const ValueKey('help'),
                    width: double.infinity,
                    margin: const EdgeInsets.only(top: kDecoratorHelpMarginTop),
                    padding: const EdgeInsets.symmetric(
                      horizontal: kDecoratorHelpPaddingH,
                      vertical: kDecoratorHelpPaddingV,
                    ),
                    decoration: BoxDecoration(
                      color: dc.surfaceContainer,
                      border: Border.all(color: dc.outlineSubtle),
                      borderRadius: BorderRadius.circular(kInputBorderRadius),
                    ),
                    child: Text(
                      widget.helpContent,
                      style: CoporTextStyles.of(context).bodySecondary,
                    ),
                  )
                : const SizedBox.shrink(key: ValueKey('empty')),
          ),
        ),
      ],
    );
  }
}
