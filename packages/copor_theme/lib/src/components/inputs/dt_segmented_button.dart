import 'package:copor_theme/src/components/buttons/dt_button.dart';
import 'package:copor_theme/src/theme/component_themes/segmented_button_theme.dart';
import 'package:flutter/material.dart';

class DTSegmentedButtonSegment<T> {
  final T value;
  final Widget? icon;
  final Widget? label;
  final Widget? labelSelected;
  final String? semanticLabel;
  final bool enabled;

  const DTSegmentedButtonSegment({
    required this.value,
    this.icon,
    this.label,
    this.labelSelected,
    this.semanticLabel,
    this.enabled = true,
  });
}

class DTSegmentedButton<T> extends StatelessWidget {
  final Set<T> selected;
  final List<Object> segments;
  final void Function(Set<T>) onSelectionChanged;
  final bool emptySelectionAllowed;
  final DTInputSize inputSize;
  final bool highlightToggled;

  const DTSegmentedButton({
    super.key,
    required this.selected,
    required this.segments,
    required this.onSelectionChanged,
    this.emptySelectionAllowed = false,
    this.inputSize = DTInputSize.normal,
    this.highlightToggled = true,
  });

  @override
  Widget build(BuildContext context) {
    final h = inputSize.containerSize;
    return SizedBox(
      height: h,
      child: SegmentedButton<T>(
        showSelectedIcon: false,
        emptySelectionAllowed: emptySelectionAllowed,
        segments: segments.map((segment) => _buttonSegment(segment)).toList(),
        selected: selected,
        onSelectionChanged: (newSelection) {
          if (newSelection.isNotEmpty || emptySelectionAllowed) {
            onSelectionChanged(newSelection);
          }
        },
        style: _style(context, h),
      ),
    );
  }

  ButtonStyle _style(BuildContext context, double h) {
    final style = DTSegmentedButtonThemeData.of(context).style;

    return style.copyWith(
          tapTargetSize: MaterialTapTargetSize.shrinkWrap,
          // SegmentedButton ignores minimumSize/fixedSize; height is driven by
          // `textButtonMinHeight(40) + densityAdjustment.dy`. Set density so
          // that equals h for any inputSize, regardless of platform defaults.
          visualDensity: VisualDensity(horizontal: 0, vertical: (h - 40) / 4),
          backgroundColor: highlightToggled ? style.backgroundColor : _withoutSelected(style.backgroundColor),
          foregroundColor: highlightToggled ? style.foregroundColor : _withoutSelected(style.foregroundColor),
    );
  }

  WidgetStateProperty<TValue?>? _withoutSelected<TValue>(WidgetStateProperty<TValue?>? property) {
    if (property == null) return null;
    return WidgetStateProperty.resolveWith((states) {
      final unselectedStates = Set<WidgetState>.of(states)..remove(WidgetState.selected);
      return property.resolve(unselectedStates);
    });
  }

  Widget? _segmentIcon(DTSegmentedButtonSegment<T> segment, {required bool isSelected}) {
    final icon = segment.icon;
    if (icon == null) return null;
    final label = segment.semanticLabel ?? (isSelected ? 'Selected' : 'Unselected');
    return Semantics(label: label, child: icon);
  }

  ButtonSegment<T> _buttonSegment(Object segment) {
    if (segment is DTSegmentedButtonSegment<T>) {
      final isSelected = selected.contains(segment.value);
      return ButtonSegment<T>(
        value: segment.value,
        icon: _segmentIcon(segment, isSelected: isSelected),
        label: isSelected ? segment.labelSelected ?? segment.label : segment.label,
        enabled: segment.enabled,
      );
    }

    return segment as ButtonSegment<T>;
  }
}
