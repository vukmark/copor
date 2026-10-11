import 'package:copor_core/src/utils/constants.dart';
import 'package:copor_core/src/utils/helper_functions.dart';
import 'package:copor_core/src/utils/typedef.dart';
import 'package:flutter/material.dart';
import 'package:flutter_hooks/flutter_hooks.dart';

typedef ColorPaletteState = ({
  ColorSet selectedPalette,
  Map<int, Color> availableColors,
  Color selectedColor,
  void Function(Set<ColorSet> newSelection) onPaletteChange,
  void Function(Color? newColor) onColorChange,
});

ColorSet _findPaletteForColor(Color color) {
  if (getFilteredColorMap(ColorSet.SET5).values.contains(color)) return ColorSet.SET5;
  if (getFilteredColorMap(ColorSet.SET9).values.contains(color)) return ColorSet.SET9;
  if (getFilteredColorMap(ColorSet.SET18).values.contains(color)) return ColorSet.SET18;
  return ColorSet.SET22;
}

ColorPaletteState useColorPalette({required Color initialColor}) {
  final initialPalette = useMemoized(() => _findPaletteForColor(initialColor), []);
  final selectedPalette = useState<ColorSet>(initialPalette);
  final selectedColor = useState<Color>(initialColor);

  final availableColors = useMemoized(() => getFilteredColorMap(selectedPalette.value), [
    selectedPalette.value,
  ]);

  useEffect(() {
    if (!availableColors.values.contains(selectedColor.value)) {
      selectedColor.value = availableColors.values.isNotEmpty
          ? availableColors.values.first
          : kColorWhite;
    }
    return null;
  }, [availableColors]);

  void handlePaletteChange(Set<ColorSet> newSelection) {
    if (newSelection.isNotEmpty) {
      selectedPalette.value = newSelection.first;
    }
  }

  void handleColorChange(Color? newColor) {
    if (newColor != null) {
      selectedColor.value = newColor;
    }
  }

  return (
    selectedPalette: selectedPalette.value,
    availableColors: availableColors,
    selectedColor: selectedColor.value,
    onPaletteChange: handlePaletteChange,
    onColorChange: handleColorChange,
  );
}
