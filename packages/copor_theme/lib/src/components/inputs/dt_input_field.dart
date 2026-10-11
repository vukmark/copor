import 'package:copor_theme/src/components/inputs/dt_input_constants.dart';
import 'package:copor_theme/src/components/inputs/dt_input_decorator.dart';
import 'package:copor_theme/src/theme/extensions/copor_colors.dart';
import 'package:copor_theme/src/theme/extensions/copor_theme.dart';
import 'package:copor_theme/src/theme/tokens/spacing.dart';
import 'package:copor_theme/src/theme/component_themes/input_theme.dart';
import 'package:copor_theme/src/models/dt_enums.dart';
import 'package:copor_theme/src/utils/dt_validators.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';

class DTInputField extends StatefulWidget {
  final TextEditingController controller;
  final FocusNode? focusNode;
  final String label;
  final VoidCallback? onContinuePressed;
  final TextInputType keyboardType;
  final bool autofocus;
  final bool obscureText;
  final String? required;
  final String? errorText;
  final Widget? errorContent;
  final IconData? errorIcon;
  final int? minLines;
  final int? maxLines;
  final EdgeInsetsGeometry padding;
  final int? maxLength;
  final Widget? prefixIcon;
  final Widget? suffixIcon;
  final bool autocorrect;
  final Iterable<String>? autofillHints;
  final bool enableSuggestions;
  final DTValidationType? validationType;
  final String? invalidMessage;
  final List<TextInputFormatter>? inputFormatters;
  final void Function(String)? onChanged;
  final VoidCallback? onTap;
  final bool enabled;
  final bool readOnly;
  final AutovalidateMode autovalidateMode;
  final TextInputAction? textInputAction;
  final EdgeInsetsGeometry? contentPadding;
  final Widget? helpContent;
  final String? hintText;
  final bool? isSuccess;
  final Color? statusColor;
  final bool showCounter;

  const DTInputField({
    super.key,
    required this.controller,
    required this.label,
    this.focusNode,
    this.onContinuePressed,
    this.keyboardType = TextInputType.text,
    this.autofocus = false,
    this.obscureText = false,
    this.required,
    this.errorText,
    this.errorContent,
    this.errorIcon,
    this.minLines,
    this.maxLines,
    this.padding = const EdgeInsets.only(top: kInputLabelTopPadding, bottom: kInputBottomPadding),
    this.maxLength,
    this.prefixIcon,
    this.suffixIcon,
    this.autocorrect = true,
    this.autofillHints,
    this.enableSuggestions = true,
    this.validationType,
    this.invalidMessage,
    this.inputFormatters,
    this.onChanged,
    this.onTap,
    this.enabled = true,
    this.readOnly = false,
    this.autovalidateMode = AutovalidateMode.onUserInteraction,
    this.textInputAction,
    this.contentPadding,
    this.helpContent,
    this.hintText,
    this.isSuccess,
    this.statusColor,
    this.showCounter = true,
  });

  @override
  State<DTInputField> createState() => _DTInputFieldState();
}

class _DTInputFieldState extends State<DTInputField> {
  bool _isHovered = false;
  String? _validatorError;

  MouseCursor get _cursor => !widget.enabled
      ? SystemMouseCursors.forbidden
      : widget.readOnly
      ? SystemMouseCursors.click
      : SystemMouseCursors.text;

  InputDecoration _buildDecoration(BuildContext context, {bool isError = false, bool bare = false}) {
    final suffixIcon = widget.suffixIcon == null
        ? null
        : MouseRegion(cursor: _cursor, child: widget.suffixIcon!);

    final effectiveStatusColor = widget.statusColor ??
        (widget.isSuccess == null ? null : (widget.isSuccess! ? Colors.green : Colors.red));

    Widget? prefixIcon;
    if (effectiveStatusColor != null) {
      final icon = widget.isSuccess == null
          ? Icons.warning_amber_outlined
          : (widget.isSuccess! ? Icons.check_circle_outline : Icons.cancel_outlined);

      prefixIcon = MouseRegion(
        cursor: _cursor,
        child: Icon(icon, color: effectiveStatusColor),
      );
    }

    final base = DTInputThemeData.of(context).buildDecoration(
      label: bare ? '' : widget.label,
      prefixIcon: widget.prefixIcon,
      suffixIcon: suffixIcon,
      contentPadding: widget.contentPadding,
      isHovered: _isHovered && widget.enabled,
      isError: isError,
      hintText: widget.hintText,
    );

    var decoration = base;

    if (effectiveStatusColor != null) {
      final color = effectiveStatusColor;
      final border = OutlineInputBorder(
        borderSide: BorderSide(color: color, width: 1.5),
        borderRadius: BorderRadius.circular(coporBorderRadius),
      );

      decoration = decoration.copyWith(
        prefixIcon: prefixIcon,
        enabledBorder: border,
        focusedBorder: border.copyWith(borderSide: BorderSide(color: color, width: 2.0)),
        disabledBorder: border,
        errorBorder: border,
        focusedErrorBorder: border.copyWith(borderSide: BorderSide(color: color, width: 2.0)),
      );
    }

    if (!bare) return decoration;
    return decoration.copyWith(
      labelText: null,
      floatingLabelBehavior: FloatingLabelBehavior.never,
    );
  }

  bool get _disableTextAssist {
    final validationType = widget.validationType;
    final keyboardType = widget.keyboardType;

    return widget.obscureText ||
        validationType == DTValidationType.email ||
        validationType == DTValidationType.doubleNumber ||
        validationType == DTValidationType.password ||
        keyboardType == TextInputType.emailAddress ||
        keyboardType == TextInputType.number ||
        keyboardType == TextInputType.visiblePassword;
  }

  @override
  Widget build(BuildContext context) {
    if (widget.helpContent != null) {
      return DTInputDecorator.withHelp(
        label: widget.label,
        helpContent: widget.helpContent!,
        child: _buildFieldWidget(context, bare: true, outerPadding: EdgeInsets.zero),
      );
    }
    return _buildFieldWidget(context, bare: false, outerPadding: widget.padding);
  }

  Widget _buildFieldWidget(BuildContext context, {required bool bare, required EdgeInsetsGeometry outerPadding}) {
    final effectiveError = widget.errorText ?? _validatorError;
    final inputTheme = DTInputThemeData.of(context);
    final resolved = outerPadding.resolve(Directionality.of(context));
    final disableTextAssist = _disableTextAssist;
    final activePadding = effectiveError != null
        ? EdgeInsets.only(top: resolved.top)
        : resolved;

    final field = MouseRegion(
      cursor: _cursor,
      onEnter: (_) => setState(() => _isHovered = true),
      onExit: (_) => setState(() => _isHovered = false),
      child: AnimatedPadding(
        duration: kInputAnimDuration,
        curve: Curves.easeInOut,
        padding: activePadding,
        child: FormField<String>(
          autovalidateMode: widget.autovalidateMode,
          validator: (_) => _validateAndStore(widget.controller.text),
          builder: (state) {
            final textField = TextField(
              key: ValueKey('pw-field-${widget.obscureText}'),
              style: CoporTheme.of(context).text.inputValue,
              controller: widget.controller,
              focusNode: widget.focusNode,
              autofocus: widget.autofocus,
              readOnly: widget.readOnly,
              mouseCursor: _cursor,
              onTap: widget.readOnly ? null : widget.onTap,
              obscureText: widget.obscureText,
              minLines: widget.obscureText ? 1 : widget.minLines,
              maxLines: widget.obscureText ? 1 : widget.maxLines,
              autocorrect: disableTextAssist ? false : widget.autocorrect,
              autofillHints: widget.autofillHints ?? (widget.obscureText ? const [AutofillHints.newPassword] : null),
              enableSuggestions: disableTextAssist ? false : widget.enableSuggestions,
              textInputAction: widget.textInputAction,
              onChanged: (value) {
                state.didChange(value);
                widget.onChanged?.call(value);
              },
              inputFormatters: widget.inputFormatters,
              onSubmitted: widget.onContinuePressed != null
                  ? (_) => widget.onContinuePressed!()
                  : null,
              keyboardType: widget.keyboardType,
              maxLength: widget.maxLength,
              enabled: widget.enabled,
              decoration: _buildDecoration(context, isError: effectiveError != null, bare: bare)
                  .copyWith(counterText: widget.showCounter ? null : ''),
            );
            if (!widget.readOnly) return textField;
            return GestureDetector(
              onTap: widget.onTap,
              child: AbsorbPointer(child: textField),
            );
          },
        ),
      ),
    );

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        field,
        AnimatedSwitcher(
          duration: kInputAnimDuration,
          transitionBuilder: (child, animation) => SizeTransition(
            sizeFactor: CurvedAnimation(parent: animation, curve: Curves.easeInOut),
            child: FadeTransition(opacity: animation, child: child),
          ),
          child: effectiveError != null
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
            child: Row(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                if (widget.errorIcon != null) ...[
                  Icon(widget.errorIcon!, size: 15, color: CoporColors.of(context).onErrorContainer),
                  const SizedBox(width: 8),
                ],
                Expanded(
                  child: widget.errorContent ??
                      Text(effectiveError, style: inputTheme.errorStyle),
                ),
              ],
            ),
          )
              : const SizedBox.shrink(key: ValueKey('none')),
        ),
      ],
    );
  }

  String? _validateAndStore(String? value) {
    final error = _computeError(value);
    WidgetsBinding.instance.addPostFrameCallback((_) {
      if (mounted && _validatorError != error) {
        setState(() => _validatorError = error);
      }
    });
    return error;
  }

  String? _computeError(String? value) {
    if (widget.required != null && (value == null || value.trim().isEmpty)) return widget.required;
    if (value == null || value.trim().isEmpty) return null;
    return switch (widget.validationType) {
      DTValidationType.email when !isValidEmail(value) => widget.invalidMessage,
      DTValidationType.postalCode when !isValidPostalCode(value) => widget.invalidMessage,
      DTValidationType.doubleNumber when !isValidDoubleNumber(value) => widget.invalidMessage,
      DTValidationType.password when !isValidPassword(value) => widget.invalidMessage,
      _ => null,
    };
  }
}
