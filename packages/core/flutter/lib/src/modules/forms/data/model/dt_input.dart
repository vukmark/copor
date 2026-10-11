import 'package:copor_core/src/data/model/media_file/media_file_model.dart';
import 'package:copor_core/src/data/model/named_id/named_id_model.dart';
import 'package:copor_core/src/modules/forms/data/model/input_field_model.dart';
import 'package:flutter/material.dart';

abstract class DTInput {
  DTInput._();

  static DTTextInput text({
    Key? key,
    required String name,
    required String label,
    required ValueNotifier<String> controller,
    required String? requiredMessage,
    // FocusNode? focusNode,
    // GlobalKey? globalKey,
  }) => DTTextInput(
    key: key,
    name: name,
    label: label,
    controller: controller,
    requiredMessage: requiredMessage,
    // focusNode: focusNode,
    //  globalKey: globalKey,
  );

  static DTEmailInput email({
    Key? key,
    required String name,
    required String label,
    required ValueNotifier<String> controller,
    required String? requiredMessage,
    //  FocusNode? focusNode,
    //  GlobalKey? globalKey,
  }) => DTEmailInput(
    key: key,
    name: name,
    label: label,
    controller: controller,
    requiredMessage: requiredMessage,
    //focusNode: focusNode,
    //globalKey: globalKey,
  );

  static DTNumberInput number({
    Key? key,
    required String name,
    required String label,
    required ValueNotifier<int> controller,
    required String? requiredMessage,
  }) => DTNumberInput(
    key: key,
    name: name,
    label: label,
    controller: controller,
    requiredMessage: requiredMessage,
  );

  static DTDoubleInput decimal({
    Key? key,
    required String name,
    required String label,
    required ValueNotifier<double?> controller,
    required String? requiredMessage,
    // FocusNode? focusNode,
    // GlobalKey? globalKey,
  }) => DTDoubleInput(
    key: key,
    name: name,
    label: label,
    controller: controller,
    requiredMessage: requiredMessage,
    //   focusNode: focusNode,
    //   globalKey: globalKey,
  );

  static DateInputField date({
    Key? key,
    required String name,
    required String label,
    required ValueNotifier<DateTime?> controller,
    required String? requiredMessage,
  }) => DateInputField(
    key: key,
    name: name,
    label: label,
    controller: controller,
    requiredMessage: requiredMessage,
  );

  static DateTimeInputField dateTime({
    Key? key,
    required String name,
    required String label,
    required ValueNotifier<DateTime?> controller,
    required String? requiredMessage,
  }) => DateTimeInputField(
    key: key,
    name: name,
    label: label,
    controller: controller,
    requiredMessage: requiredMessage,
  );

  static BoolInputField bool_({
    Key? key,
    required String name,
    required String label,
    required ValueNotifier<bool> controller,
    required String? requiredMessage,
    void Function()? onChanged,
  }) => BoolInputField(
    key: key,
    name: name,
    label: label,
    controller: controller,
    requiredMessage: requiredMessage,
    onChanged: onChanged,
  );

  static DTTextBoxInput textBox({
    Key? key,
    required String name,
    required String label,
    required ValueNotifier<String> controller,
    required String? requiredMessage,
  }) => DTTextBoxInput(
    key: key,
    name: name,
    label: label,
    controller: controller,
    requiredMessage: requiredMessage,
  );

  static DTPostalCodeInput postalCode({
    Key? key,
    required String name,
    required String label,
    required ValueNotifier<String> controller,
    required String? requiredMessage,
  }) => DTPostalCodeInput(
    key: key,
    name: name,
    label: label,
    controller: controller,
    requiredMessage: requiredMessage,
  );

  static DTDropdownInput<T> dropdown<T>({
    Key? key,
    required String name,
    required String label,
    required ValueNotifier<NamedIdModel> controller,
    required List<NamedIdModel<T>> items,
    required String? requiredMessage,
    void Function()? onSelected,
    bool isEnabled = true,
  }) => DTDropdownInput<T>(
    key: key,
    name: name,
    label: label,
    controller: controller,
    items: items,
    requiredMessage: requiredMessage,
    onSelected: onSelected,
    isEnabled: isEnabled,
  );

  static DTMultiselectInput<T> multiselect<T>({
    Key? key,
    required String name,
    required String label,
    required ValueNotifier<List<NamedIdModel>> controller,
    required List<NamedIdModel<T>> items,
    required String? requiredMessage,
    void Function()? onSelected,
  }) => DTMultiselectInput<T>(
    key: key,
    name: name,
    label: label,
    controller: controller,
    items: items,
    requiredMessage: requiredMessage,
    onSelected: onSelected,
  );

  static DTHiddenInput hidden({
    Key? key,
    required String name,
    required String label,
    required ValueNotifier<String> controller,
    required String? requiredMessage,
  }) => DTHiddenInput(
    key: key,
    name: name,
    label: label,
    controller: controller,
    requiredMessage: requiredMessage,
  );

  static DTHeaderInput header({
    Key? key,
    required String name,
    required String label,
    required ValueNotifier<String> controller,
  }) => DTHeaderInput(
    key: key,
    name: name,
    label: label,
    controller: controller,
    requiredMessage: null,
  );

  static DTDisabledTextInput disabled({
    Key? key,
    required String name,
    required String label,
    required ValueNotifier<String> controller,
    required String? requiredMessage,
    bool? isSuccess,
  }) => DTDisabledTextInput(
    key: key,
    name: name,
    label: label,
    controller: controller,
    requiredMessage: requiredMessage,
    isSuccess: isSuccess,
  );

  static DTTextInput textLabel({
    Key? key,
    required String name,
    required String label,
    required ValueNotifier<String> controller,
    required String? requiredMessage,
    // FocusNode? focusNode,
    // GlobalKey? globalKey,
  }) => DTTextInput(
    key: key,
    name: name,
    label: label,
    controller: controller,
    requiredMessage: requiredMessage,
    // focusNode: focusNode,
    //  globalKey: globalKey,
  );

  static DTImageInput image({
    Key? key,
    required String name,
    required String label,
    required ValueNotifier<MediaFileModel?> controller,
    required String? requiredMessage,
    required String uploadEndpoint,
    String currentImageUrl = '',
  }) => DTImageInput(
    key: key,
    name: name,
    label: label,
    controller: controller,
    requiredMessage: requiredMessage,
    uploadEndpoint: uploadEndpoint,
    currentImageUrl: currentImageUrl,
  );

  static DTValidationTextInput validationText({
    Key? key,
    required List<int> triggerLengths,
    required String name,
    required String label,
    required ValueNotifier<String> controller,
    required String? requiredMessage,
    required String validationEndpoint,
    // FocusNode? focusNode,
    // GlobalKey? globalKey,
  }) => DTValidationTextInput(
    key: key,
    name: name,
    label: label,
    controller: controller,
    requiredMessage: requiredMessage,
    triggerLengths: triggerLengths,
    validationEndpoint: validationEndpoint,
    // focusNode: focusNode,
    //  globalKey: globalKey,
  );
}
