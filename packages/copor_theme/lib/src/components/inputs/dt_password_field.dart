import 'package:copor_theme/src/components/inputs/dt_input_constants.dart';
import 'package:copor_theme/src/components/inputs/dt_input_field.dart';
import 'package:copor_theme/src/theme/tokens/spacing.dart';
import 'package:copor_theme/src/utils/dt_icons.dart';
import 'package:flutter/material.dart';
import 'package:flutter_hooks/flutter_hooks.dart';

import '../../models/dt_enums.dart';

class DTPasswordField extends HookWidget {
  final TextEditingController controller;
  final String label;
  final String? required;
  final String? errorText;
  final TextInputAction? textInputAction;
  final Iterable<String>? autofillHints;
  final bool enableAutofill;
  final VoidCallback? onContinuePressed;
  final EdgeInsetsGeometry? padding;
  final FocusNode? focusNode;
  final DTValidationType? validationType;
  final String? invalidMessage;

  const DTPasswordField({
    super.key,
    required this.controller,
    required this.label,
    this.required,
    this.errorText,
    this.textInputAction,
    this.autofillHints,
    this.enableAutofill = false,
    this.onContinuePressed,
    this.padding,
    this.focusNode,
    this.validationType,
    this.invalidMessage
  });

  @override
  Widget build(BuildContext context) {
    final isObscure = useState(true);
    final internalFocusNode = useFocusNode();
    final effectiveFocusNode = focusNode ?? internalFocusNode;

    void toggleObscure() {
      final hadFocus = effectiveFocusNode.hasFocus;
      isObscure.value = !isObscure.value;
      if (hadFocus) {
        effectiveFocusNode.unfocus();
        WidgetsBinding.instance.addPostFrameCallback((_) {
          effectiveFocusNode.requestFocus();
        });
      }
    }

    return DTInputField(
      controller: controller,
      focusNode: effectiveFocusNode,
      label: label,
      required: required,
      errorText: errorText,
      textInputAction: textInputAction,
      autofillHints: enableAutofill ? autofillHints : null,
      onContinuePressed: onContinuePressed,
      obscureText: isObscure.value,
      validationType: validationType,
      invalidMessage: invalidMessage,
      suffixIcon: Theme(
        data: Theme.of(context).copyWith(iconButtonTheme: coporCompactIconButtonTheme),
        child: IconButton(
          icon: Icon(
            isObscure.value ? DTIcons.hide : DTIcons.show,
            size: kInputEndIconSize,
          ),
          onPressed: toggleObscure,
          style: IconButton.styleFrom(shape: const CircleBorder()),
        ),
      ),
    );
  }
}
