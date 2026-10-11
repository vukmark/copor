import 'package:copor_core/src/core/system/device_service.dart';
import 'package:copor_core/src/utils/color_display.dart';
import 'package:copor_core/src/utils/constants.dart';
import 'package:copor_theme/copor_theme.dart';
import 'package:flutter/material.dart';

class ColorDropdown extends StatelessWidget {
  final Color selectedColor;
  final ValueChanged<Color?> onChanged;
  final String label;
  final double? menuHeight;
  final String? required;
  final Map<int, Color>? colors;

  const ColorDropdown({
    super.key,
    required this.selectedColor,
    required this.onChanged,
    required this.label,
    this.menuHeight = 300,
    this.required,
    this.colors,
  });

  @override
  Widget build(BuildContext context) {
    final Map<String, Color> fullTranslatedColorMap = getNamedColorMap(context);
    final Map<String, Color> displayColors;

    if (colors != null) {
      final Set<Color> allowedColors = colors!.values.toSet();
      displayColors = Map.from(fullTranslatedColorMap)
        ..removeWhere((key, value) => !allowedColors.contains(value));
    } else {
      displayColors = fullTranslatedColorMap;
    }

    return DTDropdown<Color>.single(
      value: selectedColor,
      items: displayColors.entries
          .map(
            (entry) => DTOption<Color>(
              value: entry.value,
              label: entry.key,
              leading: ColorDisplay(color: entry.value, size: 20, shape: BoxShape.rectangle),
            ),
          )
          .toList(),
      onChanged: onChanged,
      label: label,
      required: required,
      menuHeight: menuHeight,
      showSelectedLeading: true,
      isMobile: context.isMobile,
    );
  }
}
