import 'package:copor_theme/src/components/inputs/dt_input_constants.dart';
import 'package:copor_theme/src/components/inputs/dt_input_field.dart';
import 'package:copor_theme/src/theme/extensions/copor_colors.dart';
import 'package:copor_theme/src/utils/dt_icons.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/foundation.dart';
import 'package:flutter/gestures.dart';
import 'package:copor_theme/src/theme/tokens/spacing.dart';
import 'package:flutter/material.dart';
import 'package:flutter_hooks/flutter_hooks.dart';

enum _DTDateInputVariant { regular, compact }

class DTDateInput extends HookWidget {
  final TextEditingController controller;
  final DateTime? selectedDate;
  final ValueChanged<DateTime> onDateSelected;
  final VoidCallback? onClear;
  final EdgeInsetsGeometry padding;
  final String? label;
  final String? required;
  final String cancelLabel;
  final String saveLabel;
  final String selectDateLabel;
  final Locale? locale;
  final _DTDateInputVariant _variant;

  const DTDateInput({
    super.key,
    required this.controller,
    this.selectedDate,
    required this.onDateSelected,
    this.onClear,
    this.padding = const EdgeInsets.only(bottom: kInputBottomPadding, top: kInputLabelTopPadding),
    required this.label,
    this.required,
    this.cancelLabel = 'Cancel',
    this.saveLabel = 'Save',
    this.selectDateLabel = 'Select date',
    this.locale,
  }) : _variant = _DTDateInputVariant.regular;

  const DTDateInput.compact({
    super.key,
    required this.controller,
    this.selectedDate,
    required this.onDateSelected,
    this.onClear,
    required this.label,
    this.cancelLabel = 'Cancel',
    this.saveLabel = 'Save',
    this.padding = const EdgeInsets.only(bottom: kInputBottomPadding),
    this.selectDateLabel = 'Select date',
    this.locale,
  })  : _variant = _DTDateInputVariant.compact,
        required = null;

  String _formatISODate(DateTime dt) {
    return '${dt.day.toString().padLeft(2, '0')}.${dt.month.toString().padLeft(2, '0')}.${dt.year}';
  }

  Future<void> _selectDate(BuildContext context) async {
    final initialDate = selectedDate ?? DateTime.now();
    if (!kIsWeb && defaultTargetPlatform == TargetPlatform.iOS) {
      DateTime tempDate = initialDate;
      await showModalBottomSheet<void>(
        context: context,
        enableDrag: false,
        builder: (ctx) => SafeArea(
          top: false,
          child: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              SizedBox(
                height: 44,
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    CupertinoButton(
                      padding: const EdgeInsets.symmetric(horizontal: 16),
                      onPressed: () => Navigator.of(ctx).pop(),
                      child: Text(cancelLabel),
                    ),
                    CupertinoButton(
                      padding: const EdgeInsets.symmetric(horizontal: 16),
                      onPressed: () {
                        onDateSelected(tempDate);
                        controller.text = _formatISODate(tempDate);
                        Navigator.of(ctx).pop();
                      },
                      child: Text(saveLabel),
                    ),
                  ],
                ),
              ),
              SizedBox(
                height: 216,
                child: ScrollConfiguration(
                  behavior: ScrollConfiguration.of(ctx).copyWith(
                    dragDevices: {
                      PointerDeviceKind.touch,
                      PointerDeviceKind.mouse,
                    },
                  ),
                  child: CupertinoDatePicker(
                    mode: CupertinoDatePickerMode.date,
                    initialDateTime: initialDate,
                    minimumDate: DateTime(1950),
                    maximumDate: DateTime(2050),
                    onDateTimeChanged: (date) => tempDate = date,
                  ),
                ),
              ),
            ],
          ),
        ),
      );
      return;
    }

    final DateTime? picked = await showDatePicker(
      context: context,
      initialDate: initialDate,
      firstDate: DateTime(2000),
      lastDate: DateTime(2100),
      locale: locale,
      cancelText: cancelLabel,
      helpText: selectDateLabel,
    );

    if (picked != null) {
      onDateSelected(picked);
      controller.text = _formatISODate(picked);
    }
  }

  @override
  Widget build(BuildContext context) {
    final isHovered = useState(false);

    if (_variant == _DTDateInputVariant.compact) {
      return _buildCompact(context, isHovered: isHovered);
    }

    final dc = CoporColors.of(context);

    return ValueListenableBuilder<TextEditingValue>(
      valueListenable: controller,
      builder: (context, value, _) {
        final hasValue = value.text.isNotEmpty;
        return DTInputField(
          autovalidateMode: AutovalidateMode.disabled,
          controller: controller,
          label: label ?? '',
          readOnly: true,
          onTap: hasValue
              ? () { controller.clear(); onClear?.call(); }
              : () => _selectDate(context),
          suffixIcon: hasValue
              ? Icon(DTIcons.close, size: 16, color: dc.onSurface)
              : Icon(DTIcons.calendar, size: 20, color: dc.onSurfaceSubtle),
          required: required,
          padding: padding,
        );
      },
    );
  }

  Widget _buildCompact(BuildContext context, {required ValueNotifier<bool> isHovered}) {
    final dc = CoporColors.of(context);
    const textStyle = TextStyle(fontWeight: FontWeight.w400, fontSize: kDateCompactFontSize);

    return ValueListenableBuilder<TextEditingValue>(
      valueListenable: controller,
      builder: (context, value, _) {
        final hasValue = value.text.isNotEmpty;
        final isClearing = hasValue && onClear != null;
        final hovered = isHovered.value;

        return Padding(
          padding: padding,
          child: MouseRegion(
            cursor: SystemMouseCursors.click,
            onEnter: (_) => isHovered.value = true,
            onExit: (_) => isHovered.value = false,
            child: Material(
              color: hovered ? dc.primaryHovered : (hasValue ? dc.primaryContainer : dc.surfaceContainer),
              shape: RoundedRectangleBorder(
                borderRadius: BorderRadius.circular(coporBorderRadius),
                side: BorderSide(color: hovered ? dc.primaryBorder : dc.outline),
              ),
              clipBehavior: Clip.antiAlias,
              child: InkWell(
                onTap: isClearing ? () {
                                controller.clear();
                                onClear?.call();
                              } : () => _selectDate(context),
                mouseCursor: SystemMouseCursors.click,
                overlayColor: WidgetStateProperty.resolveWith((states) {
                  if (states.contains(WidgetState.pressed)) return dc.surfacePressed;
                  return Colors.transparent;
                }),
                child: Padding(
                  padding: kDateCompactPadding,
                  child: Row(
                    mainAxisSize: MainAxisSize.max,
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Text(
                        hasValue ? value.text : (label ?? ''),
                        style: textStyle.copyWith(
                          color: hasValue ? dc.onPrimaryContainer : dc.onSurface,
                          fontWeight: hasValue ? FontWeight.w600 : FontWeight.w400,
                        ),
                      ),
                      const SizedBox(width: 8),
                      isClearing
                          ? Icon(DTIcons.close, size: kDateCompactIconSize, color: dc.onPrimaryContainer)
                          : Icon(DTIcons.calendar, size: kDateCompactIconSize, color: dc.onSurfaceSubtle),
                    ],
                  ),
                ),
              ),
            ),
          ),
        );
      },
    );
  }

}
