import 'dart:async';
import 'package:copor_core/src/bloc/utils/bloc_context_extensions.dart';
import 'package:copor_core/src/components/color_palette.dart';
import 'package:copor_core/src/components/form_fields/color_dropdown.dart';
import 'package:copor_core/src/components/form_fields/html_input_field.dart';
import 'package:copor_core/src/components/password_validation/bloc/password_validation_bloc.dart';
import 'package:copor_core/src/components/password_validation/bloc/password_validation_state.dart';
import 'package:copor_core/src/components/password_validation/bloc/utils/password_validation_bloc_event_dispatcher.dart';
import 'package:copor_core/src/components/password_validation/data/model/password_validation_model.dart';
import 'package:copor_core/src/components/password_validation/domain/password_policy_evaluator.dart';
import 'package:copor_core/src/components/password_validation/presentation/password_requirements_checklist.dart';
import 'package:copor_core/src/config/dependency_injection.dart';
import 'package:copor_core/src/core/system/device_service.dart';
import 'package:copor_core/src/data/model/media_file/file_types/image_file_model/image_file_model.dart';
import 'package:copor_core/src/data/model/media_file/media_file_model.dart';
import 'package:copor_core/src/data/model/named_id/named_id_model.dart';
import 'package:copor_core/src/components/upload_drop_zone.dart';
import 'package:copor_core/src/error/failure.dart';
import 'package:copor_core/src/modules/media_picker/domain/repositories/media_repository.dart';
import 'package:copor_core/src/modules/media_picker/presentation/cubit/media_picker_cubit.dart';
import 'package:copor_core/src/modules/media_picker/presentation/cubit/media_picker_state.dart';
import 'package:copor_theme/copor_theme.dart';
import 'package:copor_core/src/modules/forms/bloc/copor_form_bloc.dart';
import 'package:copor_core/src/modules/forms/bloc/copor_form_event.dart';
import 'package:copor_core/src/modules/forms/bloc/utils/copor_form_event_dispatcher.dart';
import 'package:copor_core/src/modules/forms/data/model/copor_form_dto.dart';
import 'package:copor_core/src/modules/forms/presentation/copor_form.dart';
import 'package:copor_core/src/modules/forms/presentation/widgets/create_region_dialog.dart';
import 'package:copor_core/src/modules/login/registration/bloc/contract/utils/contract_event_dispatcher.dart';
import 'package:copor_core/src/data/model/filter/data/model/filter_dto/filter_model_dto.dart';
import 'package:copor_core/src/modules/simple_list/bloc/simple_list_bloc_impl.dart';
import 'package:copor_core/src/modules/simple_list/bloc/simple_list_event.dart';
import 'package:copor_core/src/modules/simple_list/bloc/simple_list_state.dart';
import 'package:copor_core/src/modules/simple_list/bloc/utils/simple_list_helper.dart';
import 'package:copor_core/src/utils/copor_date_time_extension.dart';
import 'package:copor_core/src/utils/dropdown_entries.dart';
import 'package:copor_core/src/utils/dropped_media.dart';
import 'package:copor_core/src/utils/helper_functions.dart';
import 'package:copor_core/src/utils/typedef.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_hooks/flutter_hooks.dart';

abstract class InputFieldModel<V> extends HookWidget {
  final String label;
  final String name;
  final String? requiredMessage;
  final ValueNotifier<V> controller;
  final FocusNode focusNode;
  final GlobalKey globalKey;

  InputFieldModel({
    super.key,
    required String label,
    required this.name,
    required this.controller,
    required this.requiredMessage,
    FocusNode? focusNode,
    GlobalKey? globalKey,
  }) : label = (requiredMessage != null && !label.endsWith(' *')) ? '$label *' : label,
       focusNode = focusNode ?? FocusNode(),
       globalKey = globalKey ?? GlobalKey();

  dynamic getValue();

  bool isValid(BuildContext context) {
    final value = controller.value;
    if (requiredMessage != null) {
      if (value == null) return false;
      if (value is String && value.trim().isEmpty) return false;
    }
    return true;
  }

  @override
  Widget build(BuildContext context);
}

mixin ExcludeValue {}

mixin DeferredUpload on InputFieldModel<MediaFileModel?> {
  String get uploadEndpoint;

  String get currentImageUrl => '';

  MediaFileModel? get pendingUpload => controller.value;

  bool get pendingRemoval => false;
}

bool _isEmptyDropdownId(Object? id) => id == null || (id is String && id.trim().isEmpty);

// ---------------------------------------------------------------------------
// Generic inputs — no app-specific BLoC or business logic
// ---------------------------------------------------------------------------

/// focus node and global key commented out because of issue with softkeyboard
/// return it later because of scroll to invalid field function

class DTTextInput extends InputFieldModel<String> {
  DTTextInput({
    super.key,
    required super.name,
    required super.label,
    required super.controller,
    required super.requiredMessage,
    // super.focusNode,
    //  super.globalKey,
  });

  @override
  Widget build(BuildContext context) {
    final textEditingController = useTextEditingController(text: controller.value);
    useEffect(() {
      void sync() => controller.value = textEditingController.text;
      textEditingController.addListener(sync);
      return () => textEditingController.removeListener(sync);
    }, [textEditingController]);
    return DTInputField(
      //  key: globalKey,
      //  focusNode: focusNode,
      controller: textEditingController,
      label: label,
      required: requiredMessage,
    );
  }

  @override
  String getValue() => controller.value.trim();
}

class DTValidationTextInput extends InputFieldModel<String> {
  final List<int> triggerLengths;
  final String validationEndpoint;

  DTValidationTextInput({
    super.key,
    required super.name,
    required super.label,
    required super.controller,
    required super.requiredMessage,
    required this.triggerLengths,
    required this.validationEndpoint,
    // super.focusNode,
    //  super.globalKey,
  });

  @override
  Widget build(BuildContext context) {
    final textEditingController = useTextEditingController(text: controller.value);
    useEffect(() {
      void sync() => controller.value = textEditingController.text;
      textEditingController.addListener(sync);
      return () => textEditingController.removeListener(sync);
    }, [textEditingController]);
    return DTInputField(
      onChanged: (value) {
        if (triggerLengths.contains(value.length)) {
          context.read<CoporFormBloc>().add(GetPublicCoporForm('$validationEndpoint$value'));
        }
      },
      //  key: globalKey,
      //  focusNode: focusNode,
      controller: textEditingController,
      label: label,
      required: requiredMessage,
      maxLength: triggerLengths.reduce((a, b) => a > b ? a : b),
    );
  }

  @override
  String getValue() => controller.value.trim();
}

class DTDisabledTextInput extends InputFieldModel<String> with ExcludeValue {
  final bool? isSuccess;

  DTDisabledTextInput({
    super.key,
    required super.name,
    required super.label,
    required super.controller,
    required super.requiredMessage,
    this.isSuccess,
  });

  @override
  Widget build(BuildContext context) {
    final textEditingController = useTextEditingController(text: controller.value);
    useEffect(() {
      void sync() => controller.value = textEditingController.text;
      textEditingController.addListener(sync);
      return () => textEditingController.removeListener(sync);
    }, [textEditingController]);
    return DTInputField(
      isSuccess: isSuccess,
      controller: textEditingController,
      label: label,
      required: requiredMessage,
      enabled: false,
    );
  }

  @override
  String getValue() => controller.value;
}

class DTHiddenInput extends InputFieldModel<String> {
  DTHiddenInput({
    super.key,
    required super.name,
    required super.label,
    required super.controller,
    required super.requiredMessage,
  });

  @override
  Widget build(BuildContext context) => const SizedBox.shrink();

  @override
  String getValue() => controller.value;

  @override
  bool isValid(BuildContext context) => true;
}

class DTHeaderInput extends InputFieldModel<String> with ExcludeValue {
  DTHeaderInput({
    super.key,
    required super.name,
    required super.label,
    required super.controller,
    required super.requiredMessage,
  });

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        DTInfoRow(icon: DTIcons.featured, label: label),
        DTDivider(),
      ],
    );
  }

  @override
  String getValue() => '';
}

class CreateRegionButtonInput extends InputFieldModel<String> with ExcludeValue {
  CreateRegionButtonInput({
    super.key,
    required super.name,
    required super.label,
    required super.controller,
    required super.requiredMessage,
  });

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.only(bottom: kInputBottomPadding),
      child: DTButton.secondary(
        icon: DTIcons.add,
        label: label,
        onPressed: () => CreateRegionDialog.show(context, title: label),
      ),
    );
  }

  @override
  String getValue() => '';
}

class DTTextBoxInput extends InputFieldModel<String> {
  DTTextBoxInput({
    super.key,
    required super.name,
    required super.label,
    required super.controller,
    required super.requiredMessage,
  });

  @override
  Widget build(BuildContext context) {
    final textEditingController = useTextEditingController(text: controller.value);
    useEffect(() {
      void sync() => controller.value = textEditingController.text;
      textEditingController.addListener(sync);
      return () => textEditingController.removeListener(sync);
    }, [textEditingController]);
    return DTInputField(
      minLines: 3,
      maxLines: 12,
      controller: textEditingController,
      label: label,
      required: requiredMessage,
      contentPadding: const EdgeInsets.symmetric(horizontal: 8, vertical: 12),
    );
  }

  @override
  String getValue() => controller.value.trim();
}

class DTPostalCodeInput extends InputFieldModel<String> {
  DTPostalCodeInput({
    super.key,
    required super.name,
    required super.label,
    required super.controller,
    required super.requiredMessage,
  });

  @override
  Widget build(BuildContext context) {
    final textEditingController = useTextEditingController(text: controller.value);
    useEffect(() {
      void sync() => controller.value = textEditingController.text;
      textEditingController.addListener(sync);
      return () => textEditingController.removeListener(sync);
    }, [textEditingController]);
    return DTInputField(
      controller: textEditingController,
      label: label,
      validationType: ValidationType.postalCode,
      required: requiredMessage,
    );
  }

  @override
  String getValue() => controller.value.trim();
}

class DTEmailInput extends InputFieldModel<String> {
  DTEmailInput({
    super.key,
    required super.name,
    required super.label,
    required super.controller,
    required super.requiredMessage,
    //  super.focusNode,
    // super.globalKey,
  });

  @override
  Widget build(BuildContext context) {
    final textEditingController = useTextEditingController(text: controller.value);
    useEffect(() {
      void sync() => controller.value = textEditingController.text;
      textEditingController.addListener(sync);
      return () => textEditingController.removeListener(sync);
    }, [textEditingController]);
    return DTInputField(
      // focusNode: focusNode,
      // key: globalKey,
      validationType: ValidationType.email,
      maxLines: 1,
      controller: textEditingController,
      label: label,
      required: requiredMessage,
    );
  }

  @override
  bool isValid(BuildContext context) {
    final value = controller.value.trim();
    if (requiredMessage != null && value.isEmpty) return false;
    if (value.isNotEmpty && !isValidEmail(value)) return false;
    return true;
  }

  @override
  String getValue() => controller.value.trim();
}

class DTNumberInput extends InputFieldModel<int> {
  DTNumberInput({
    super.key,
    required super.name,
    required super.label,
    required super.controller,
    required super.requiredMessage,
  });

  @override
  Widget build(BuildContext context) {
    final textEditingController = useTextEditingController(text: controller.value.toString());
    useEffect(() {
      void sync() {
        final parsed = int.tryParse(textEditingController.text);
        if (parsed != null) controller.value = parsed;
      }

      textEditingController.addListener(sync);
      return () => textEditingController.removeListener(sync);
    }, [textEditingController]);
    return DTInputField(controller: textEditingController, label: label, required: requiredMessage);
  }

  @override
  int getValue() => controller.value;
}

class DTDoubleInput extends InputFieldModel<double?> {
  DTDoubleInput({
    super.key,
    required super.name,
    required super.label,
    required super.controller,
    required super.requiredMessage,
    // super.focusNode,
    // super.globalKey,
  });

  @override
  Widget build(BuildContext context) {
    final textEditingController = useTextEditingController(text: controller.value.toString());
    useEffect(() {
      void sync() => controller.value = double.tryParse(textEditingController.text);
      textEditingController.addListener(sync);
      return () => textEditingController.removeListener(sync);
    }, [textEditingController]);
    return DTInputField(
      // key: globalKey,
      // focusNode: focusNode,
      controller: textEditingController,
      label: label,
      required: requiredMessage,
      validationType: ValidationType.doubleNumber,
    );
  }

  @override
  bool isValid(BuildContext context) {
    final value = controller.value.toString().trim();
    if (requiredMessage != null && value.isEmpty) return false;
    if (value.isNotEmpty && !isValidDoubleNumber(value)) return false;
    return true;
  }

  @override
  double? getValue() => controller.value;
}

class DateInputField extends InputFieldModel<DateTime?> {
  DateInputField({
    super.key,
    required super.label,
    required super.name,
    required super.controller,
    required super.requiredMessage,
  });

  @override
  String? getValue() => controller.value?.toCoporIso8601String();

  @override
  Widget build(BuildContext context) {
    final dateController = useListenable(
      useTextEditingController(
        text: controller.value == null ? '' : formatISODate(controller.value!),
      ),
    );
    return DTDateInput(
      controller: dateController,
      selectedDate: controller.value ?? DateTime.now(),
      onDateSelected: (DateTime picked) {
        controller.value = picked;
        dateController.text = formatISODate(picked);
      },
      onClear: () {
        controller.value = null;
        dateController.clear();
      },
      label: label,
      required: requiredMessage,
    );
  }

  @override
  bool isValid(BuildContext context) {
    return requiredMessage == null || controller.value != null;
  }
}

class DateTimeInputField extends InputFieldModel<DateTime?> {
  DateTimeInputField({
    super.key,
    required super.label,
    required super.name,
    required super.controller,
    required super.requiredMessage,
  });

  @override
  String? getValue() => controller.value?.toCoporIso8601String();

  @override
  Widget build(BuildContext context) {
    final dateController = useListenable(
      useTextEditingController(
        text: controller.value == null ? '' : formatISODate(controller.value!),
      ),
    );
    return DTDateTimeInput(
      controller: dateController,
      selectedDateTime: controller.value ?? DateTime.now(),
      onDateTimeSelected: (DateTime picked) {
        controller.value = picked;
        dateController.text = formatISODate(picked);
      },
      onClear: () {
        controller.value = null;
        dateController.clear();
      },
      label: label,
      required: requiredMessage,
    );
  }

  @override
  bool isValid(BuildContext context) {
    return requiredMessage == null || controller.value != null;
  }
}

class BoolInputField extends InputFieldModel<bool> {
  final void Function()? onChanged;

  BoolInputField({
    super.key,
    required super.label,
    required super.name,
    required super.controller,
    required super.requiredMessage,
    this.onChanged,
  });

  @override
  Widget build(BuildContext context) {
    return FormField<bool>(
      initialValue: controller.value,
      autovalidateMode: AutovalidateMode.onUserInteraction,
      validator: (value) {
        if (requiredMessage != null && value == false) return requiredMessage;
        return null;
      },
      builder: (field) {
        return ValueListenableBuilder<bool>(
          valueListenable: controller,
          builder: (context, currentValue, child) {
            return DTSwitchInput(
              value: currentValue,
              label: label,
              errorText: field.errorText,
              onChanged: (bool newValue) {
                controller.value = newValue;
                field.didChange(newValue);
                onChanged?.call();
              },
            );
          },
        );
      },
    );
  }

  @override
  bool isValid(BuildContext context) {
    if (requiredMessage != null && !controller.value) return false;
    return true;
  }

  @override
  bool getValue() => controller.value;
}

class HtmlInput extends InputFieldModel<String> {
  HtmlInput({
    super.key,
    required super.name,
    required super.label,
    required super.controller,
    required super.requiredMessage,
    //  super.focusNode,
    //   super.globalKey,
  });

  @override
  Widget build(BuildContext context) {
    final textEditingController = useTextEditingController(text: controller.value);
    return HtmlInputField(
      //  key: globalKey,
      controller: textEditingController,
      labelText: label,
      required: requiredMessage,
      onChanged: (value) => controller.value = value,
      autoFocus: true,
    );
  }

  @override
  String getValue() => controller.value.trim();
}

class DTDropdownInput<T> extends InputFieldModel<NamedIdModel> {
  final void Function()? onSelected;
  final List<NamedIdModel<T>> items;
  final bool isEnabled;

  DTDropdownInput({
    super.key,
    required super.label,
    required super.controller,
    required super.name,
    required this.items,
    this.onSelected,
    required super.requiredMessage,
    this.isEnabled = true,
  });

  @override
  T getValue() => controller.value.id;

  @override
  bool isValid(BuildContext context) {
    return requiredMessage == null || !_isEmptyDropdownId(controller.value.id);
  }

  @override
  Widget build(BuildContext context) {
    return ValueListenableBuilder<NamedIdModel>(
      valueListenable: controller,
      builder: (context, current, _) {
        final currentValue = !_isEmptyDropdownId(current.id)
            ? items.firstWhere(
                (item) => item.id == current.id,
                orElse: () => current as NamedIdModel<T>,
              )
            : null;

        final dropdown = DTDropdown<NamedIdModel<T>>.single(
          enabled: isEnabled,
          label: label,
          value: currentValue,
          items: items.map((c) => DropdownItem(value: c, label: c.name)).toList(),
          required: requiredMessage,
          onChanged: (NamedIdModel? selected) {
            controller.value = selected!;
            onSelected?.call();
          },
          menuHeight: 190,
          isMobile: context.isMobile,
        );

        if (requiredMessage != null) {
          return dropdown;
        }

        return Row(
          crossAxisAlignment: CrossAxisAlignment.center,
          children: [
            Expanded(child: dropdown),
            Padding(
              padding: const EdgeInsets.only(
                top: kInputLabelTopPadding,
                bottom: kInputBottomPadding,
                left: 4,
              ),
              child: ExcludeFocus(
                child: IconButton(
                  icon: const Icon(DTIcons.clear, size: 16),
                  visualDensity: VisualDensity.compact,
                  onPressed: isEnabled && currentValue != null
                      ? () {
                          controller.value = NamedIdModel<T>.empty();
                          onSelected?.call();
                        }
                      : null,
                ),
              ),
            ),
          ],
        );
      },
    );
  }
}

class DisabledDropdownInput extends InputFieldModel<NamedIdModel> {
  final List<NamedIdModel> items;

  DisabledDropdownInput({
    super.key,
    required super.label,
    required super.controller,
    required super.name,
    required this.items,
    required super.requiredMessage,
  });

  @override
  dynamic getValue() => controller.value.id;

  @override
  bool isValid(BuildContext context) {
    return requiredMessage == null || !_isEmptyDropdownId(controller.value.id);
  }

  @override
  Widget build(BuildContext context) {
    return ValueListenableBuilder<NamedIdModel>(
      valueListenable: controller,
      builder: (context, current, _) {
        final currentValue = !_isEmptyDropdownId(current.id)
            ? items.firstWhere((item) => item.id == current.id, orElse: () => current)
            : null;

        return DTDropdown<NamedIdModel>.single(
          enabled: false,
          label: label,
          value: currentValue,
          items: items.map((c) => DropdownItem(value: c, label: c.name)).toList(),
          required: requiredMessage,
          onChanged: (NamedIdModel? selected) {},
          menuHeight: 190,
          isMobile: context.isMobile,
        );
      },
    );
  }
}

class BooleanDropdownInput extends InputFieldModel<bool> {
  final void Function()? onSelected;
  final List<NamedIdModel> items;
  final bool isEnabled;

  BooleanDropdownInput({
    super.key,
    required super.label,
    required super.controller,
    required super.name,
    required this.items,
    required super.requiredMessage,
    this.onSelected,
    this.isEnabled = true,
  });

  @override
  bool getValue() => controller.value;

  @override
  bool isValid(BuildContext context) => true;

  @override
  Widget build(BuildContext context) {
    return ValueListenableBuilder<bool>(
      valueListenable: controller,
      builder: (context, current, _) {
        return DTDropdown<bool>.single(
          enabled: isEnabled,
          label: label,
          value: current,
          items: items
              .map((item) => DropdownItem(value: item.id == true, label: item.name))
              .toList(),
          required: requiredMessage,
          onChanged: (bool? selected) {
            if (selected == null) return;
            controller.value = selected;
            onSelected?.call();
          },
          menuHeight: 190,
          isMobile: context.isMobile,
        );
      },
    );
  }
}

class DTMultiselectInput<T> extends InputFieldModel<List<NamedIdModel>> {
  final void Function()? onSelected;
  final List<NamedIdModel<T>> items;

  DTMultiselectInput({
    super.key,
    required super.label,
    required super.controller,
    required super.name,
    required super.requiredMessage,
    this.onSelected,
    required this.items,
  });

  @override
  Widget build(BuildContext context) {
    return ValueListenableBuilder<List<NamedIdModel>>(
      valueListenable: controller,
      builder: (context, currentValues, _) {
        return DTDropdown<String>.multi(
          label: label,
          selectedValues: currentValues.map((n) => n.id.toString()).toList(),
          items: items
              .map((item) => DTOption<String>(value: item.id.toString(), label: item.name))
              .toList(),
          onChanged: (List<String> ids) {
            controller.value = ids.map((id) {
              final found = items.firstWhere(
                (i) => i.id.toString() == id,
                orElse: () => NamedIdModel(id: id, name: id) as NamedIdModel<T>,
              );
              return NamedIdModel(id: found.id, name: found.name);
            }).toList();
            onSelected?.call();
          },
          required: requiredMessage,
          isMobile: context.isMobile,
        );
      },
    );
  }

  @override
  getValue() => controller.value.map((c) => c.id).toList();
}

// ---------------------------------------------------------------------------
// App-specific role inputs
// ---------------------------------------------------------------------------

// ---------------------------------------------------------------------------
// App-specific country / state inputs (extend DTDropdownInput for BLoC side
// effects tied to country/state relationship)
// ---------------------------------------------------------------------------

class ContentItemInput extends DTDropdownInput<String> {
  ContentItemInput({
    super.key,
    required super.label,
    required super.controller,
    required super.name,
    required super.items,
    required super.requiredMessage,
  });

  @override
  Widget build(BuildContext context) {
    return DTDropdownInput(
      label: label,
      controller: controller,
      items: items,
      name: name,
      onSelected: () {
        context.read<RoleSimpleListBloc>().add(GetRoleSimpleList(controller.value.id));
      },
      requiredMessage: requiredMessage,
    );
  }
}

class RoleMultiselectInput extends InputFieldModel<List<NamedIdModel>> {
  RoleMultiselectInput({
    super.key,
    required super.label,
    required super.controller,
    required super.name,
    required super.requiredMessage,
  });

  @override
  Widget build(BuildContext context) {
    return BlocBuilder<RoleSimpleListBloc, SimpleListState>(
      builder: (context, state) {
        if (state.result == null) {
          return const SizedBox.shrink();
        }

        return DTMultiselectInput(
          label: label,
          name: name,
          requiredMessage: requiredMessage,
          controller: controller,
          items: state.ensuredData.items,
        );
      },
    );
  }

  @override
  getValue() => controller.value.map((e) => e.id).toList();
}

class CountryInput extends DTDropdownInput<String> {
  CountryInput({
    super.key,
    required super.label,
    required super.controller,
    required super.name,
    required super.items,
    required super.requiredMessage,
  });

  @override
  Widget build(BuildContext context) {
    useEffect(() {
      final countryId = controller.value.id;
      if (!_isEmptyDropdownId(countryId)) {
        context.read<StateSimpleListBloc>().add(GetStateSimpleList(countryId));
      }
      return null;
    }, const []);

    return ValueListenableBuilder<NamedIdModel>(
      valueListenable: controller,
      builder: (context, current, _) {
        final currentValue = _isEmptyDropdownId(current.id)
            ? null
            : items.firstWhere(
                (item) => item.id == current.id,
                orElse: () => NamedIdModel<String>(id: current.id, name: current.name),
              );

        return DTDropdown<NamedIdModel<String>>.single(
          label: label,
          value: currentValue,
          items: items.map((c) => DropdownItem(value: c, label: c.name)).toList(),
          required: requiredMessage,
          onChanged: (NamedIdModel? selected) {
            if (selected == null) return;
            controller.value = selected;
            context.read<StateSimpleListBloc>().add(GetStateSimpleList(controller.value.id));
          },
          menuHeight: 190,
          isMobile: context.isMobile,
        );
      },
    );
  }
}

/// CHECK AND REFACTOR LATER ///////////////////////////////////////////////////////////////////////////////////

/// //////////////////////////////////////////////////////////////////////////////////////////////

class CitizenshipInput extends DTDropdownInput<String> {
  CitizenshipInput({
    super.key,
    required super.label,
    required super.controller,
    required super.name,
    required super.items,
    required super.requiredMessage,
  });

  @override
  Widget build(BuildContext context) {
    return DTDropdownInput(
      label: label,
      controller: controller,
      items: items,
      name: name,
      requiredMessage: requiredMessage,
    );
  }
}

class StateInput extends DTDropdownInput<String> {
  StateInput({
    super.key,
    required super.label,
    required super.name,
    required super.controller,
    required super.requiredMessage,
    required super.items,
  });

  @override
  String getValue() => controller.value.id;

  @override
  Widget build(BuildContext context) {
    final state = context.watch<StateSimpleListBloc>().state;

    final currentItems = state.result != null
        ? state.ensuredData.items.map((i) => NamedIdModel<String>(id: i.id, name: i.name)).toList()
        : items.map((i) => NamedIdModel<String>(id: i.id, name: i.name)).toList();

    useEffect(() {
      if (state.result == null) return null;

      final selectedId = controller.value.id;
      if (_isEmptyDropdownId(selectedId)) return null;
      if (currentItems.any((item) => item.id == selectedId)) return null;

      WidgetsBinding.instance.addPostFrameCallback((_) {
        controller.value = NamedIdModel<String>.empty();
      });
      return null;
    }, [state.result]);

    return ValueListenableBuilder<NamedIdModel>(
      valueListenable: controller,
      builder: (context, current, _) {
        return DTDropdown<NamedIdModel<String>>.single(
          key: ValueKey((state, current.id)),
          required: requiredMessage,
          label: label,
          value: _isEmptyDropdownId(current.id)
              ? null
              : NamedIdModel<String>(id: current.id, name: current.name),
          items: currentItems.map((c) => DropdownItem(value: c, label: c.name)).toList(),
          onChanged: (NamedIdModel? selected) {
            if (selected != null) controller.value = selected;
          },
          menuHeight: 190,
          isMobile: context.isMobile,
        );
      },
    );
  }
}

class StateValidationInput extends DTDropdownInput<String> {
  StateValidationInput({
    super.key,
    required super.label,
    required super.name,
    required super.controller,
    required super.requiredMessage,
    required super.items,
  });

  @override
  String getValue() => controller.value.id;

  @override
  Widget build(BuildContext context) {
    return BlocBuilder<StateSimpleListBloc, SimpleListState>(
      builder: (context, state) {
        List<NamedIdModel<String>> currentItems = items
            .map((i) => NamedIdModel<String>(id: i.id, name: i.name))
            .toList();

        if (state.result != null && state.ensuredData.items.isNotEmpty) {
          currentItems = state.ensuredData.items
              .map((i) => NamedIdModel<String>(id: i.id, name: i.name))
              .toList();
        }

        return DTDropdown<NamedIdModel<String>>.single(
          key: ValueKey(state),
          required: requiredMessage,
          label: label,
          value: NamedIdModel<String>(id: controller.value.id, name: controller.value.name),
          items: currentItems.map((c) => DropdownItem(value: c, label: c.name)).toList(),
          onChanged: (NamedIdModel<String>? selected) {
            if (selected != null) {
              controller.value = selected;
              context.read<StateIdCubit>().setId(selected.id);
            }
          },
          menuHeight: 190,
          isMobile: context.isMobile,
        );
      },
    );
  }
}

class DependentValidationTextInput extends InputFieldModel<String> {
  final int triggerLength;
  final int? maxLength;
  final String validationEndpoint;
  final bool? isSuccess;
  final bool? isEnabled;
  final TenantActivationCheckStatus? checkStatus;
  final String? checkStatusMessage;

  DependentValidationTextInput({
    super.key,
    required super.name,
    required super.label,
    required super.controller,
    required super.requiredMessage,
    required this.triggerLength,
    this.maxLength,
    required this.validationEndpoint,
    this.isSuccess,
    this.isEnabled,
    this.checkStatus,
    this.checkStatusMessage,
  });

  @override
  Widget build(BuildContext context) {
    final textEditingController = useTextEditingController(text: controller.value);

    useEffect(() {
      void sync() => controller.value = textEditingController.text;
      textEditingController.addListener(sync);
      return () => textEditingController.removeListener(sync);
    }, [textEditingController]);

    final dependentValue = context.watch<StateIdCubit>().state;

    final localCheckStatus = useState(checkStatus);
    final localCheckStatusMessage = useState(checkStatusMessage);
    final localIsSuccess = useState(isSuccess);

    final validatedDependentValue = useRef(dependentValue);
    final validatedText = useRef(controller.value);

    useEffect(() {
      Timer? debounceTimer;
      String lastValue = textEditingController.text;

      void loadForm(String value) {
        context.read<CoporFormBloc>().add(
          GetPublicCoporForm('$validationEndpoint$dependentValue/$value'),
        );
      }

      Future<void> validate(String value) async {
        final repository = context.read<CoporFormBloc>().coporFormRepository;
        final result = await repository.getPublicCoporForm(
          '$validationEndpoint$dependentValue/$value',
        );

        if (!context.mounted || textEditingController.text != value) return;
        result.fold((failure) {}, (success) {
          CoporFormFieldDTO? matchedField;
          for (final f in success.data.fields) {
            if (f.name == name) {
              matchedField = f;
              break;
            }
          }
          if (matchedField == null) return;

          final status = matchedField.currentValue.checkStatus;
          localCheckStatus.value = status;
          localCheckStatusMessage.value = matchedField.currentValue.checkStatusMessage;
          localIsSuccess.value = matchedField.currentValue.isSuccess;

          if (status == TenantActivationCheckStatus.NOT_ACTIVATED ||
              status == TenantActivationCheckStatus.FOUND) {
            loadForm(value);
          }
        });
      }

      void onChanged() {
        final value = textEditingController.text;

        if (value == lastValue) return;
        lastValue = value;

        if (isSuccess == true && value != validatedText.value) {
          debounceTimer?.cancel();
          loadForm(value);
          return;
        }

        if (value.length < triggerLength) {
          localCheckStatus.value = null;
          localCheckStatusMessage.value = null;
          localIsSuccess.value = null;
          return;
        }

        debounceTimer?.cancel();
        debounceTimer = Timer(const Duration(milliseconds: 400), () => validate(value));
      }

      if (validatedDependentValue.value != dependentValue) {
        validatedDependentValue.value = dependentValue;
        if (textEditingController.text.length >= triggerLength) {
          validate(textEditingController.text);
        }
      }

      textEditingController.addListener(onChanged);
      return () {
        debounceTimer?.cancel();
        textEditingController.removeListener(onChanged);
      };
    }, [textEditingController, dependentValue]);

    // INVALID -> red border (isSuccess: false, the DTInputField default).
    // NOT_BASE_TENANT / ALREADY_ACTIVATED -> orange border: the code is genuinely valid and was
    // found, it just can't go any further right now - shown via the statusColor override.
    // NOT_ACTIVATED / FOUND -> green border (isSuccess: true, passed straight through) with the
    // tenant name shown underneath in a green card instead of the red error box.
    final isBlockedButFound =
        localCheckStatus.value == TenantActivationCheckStatus.ALREADY_ACTIVATED ||
        localCheckStatus.value == TenantActivationCheckStatus.NOT_BASE_TENANT;
    final isNotActivated =
        localCheckStatus.value == TenantActivationCheckStatus.NOT_ACTIVATED ||
        localCheckStatus.value == TenantActivationCheckStatus.FOUND;

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        DTInputField(
          enabled: isEnabled ?? true,
          autofocus: isSuccess != true && controller.value.isNotEmpty,
          controller: textEditingController,
          label: label,
          required: requiredMessage,
          maxLength: maxLength ?? triggerLength,
          showCounter: false,
          isSuccess: isBlockedButFound ? null : localIsSuccess.value,
          statusColor: isBlockedButFound ? Colors.orange : null,
          errorText: isNotActivated ? null : localCheckStatusMessage.value,
        ),
        if (isNotActivated && localCheckStatusMessage.value != null)
          Container(
            margin: kInputErrorMargin,
            padding: kInputErrorPadding,
            width: double.infinity,
            decoration: BoxDecoration(
              color: CoporColors.of(context).successContainer,
              borderRadius: BorderRadius.circular(coporBorderRadius),
              border: Border.all(color: CoporColors.of(context).successBorder),
            ),
            child: Text(
              localCheckStatusMessage.value!,
              style: TextStyle(
                color: CoporColors.of(context).onSuccessContainer,
                fontSize: 12,
                fontWeight: FontWeight.w500,
              ),
            ),
          ),
      ],
    );
  }

  @override
  String getValue() => controller.value.trim();
}

class StateIdCubit extends Cubit<String?> {
  StateIdCubit([super.initialId]);

  void setId(String newId) {
    emit(newId);
  }

  void clearId() {
    emit(null);
  }
}

class BlockCommonPasswordsDropdown extends InputFieldModel<NamedIdModel> {
  final List<NamedIdModel> items;

  BlockCommonPasswordsDropdown({
    super.key,
    required super.label,
    required super.name,
    required super.controller,
    required super.requiredMessage,
    required this.items,
  });

  @override
  dynamic getValue() => controller.value.id;

  @override
  Widget build(BuildContext context) {
    return DTDropdownInput<dynamic>(
      label: label,
      name: name,
      controller: controller,
      items: items,
      requiredMessage: requiredMessage,
      onSelected: () {
        final form = context.findAncestorWidgetOfExactType<CoporFullForm>();
        final currentValues = form?.getFormData() ?? {};
        CoporFormEventDispatcher.coporForm.filterCommonPasswordsField(
          context,
          controller.value.id == true,
          currentValues,
        );
      },
    );
  }
}

class TextListInput extends InputFieldModel<List<String>> {
  TextListInput({
    super.key,
    required super.label,
    required super.name,
    required super.controller,
    super.requiredMessage,
  });

  @override
  List<String> getValue() => controller.value;

  @override
  Widget build(BuildContext context) {
    final entryController = useTextEditingController();
    final colors = CoporTheme.of(context).colors;
    final translation = context.getState.commonTranslation.ensuredData;

    void addEntry() {
      final value = entryController.text.trim();
      if (value.isEmpty) return;
      if (controller.value.any((e) => e.toLowerCase() == value.toLowerCase())) {
        entryController.clear();
        return;
      }
      controller.value = [...controller.value, value];
      entryController.clear();
    }

    void removeEntry(String value) {
      controller.value = controller.value.where((e) => e != value).toList();
    }

    void clearAll() {
      controller.value = [];
    }

    return ValueListenableBuilder<List<String>>(
      valueListenable: controller,
      builder: (context, entries, _) {
        return Padding(
          padding: const EdgeInsets.only(bottom: 16),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              DTInputField(
                controller: entryController,
                label: label,
                onContinuePressed: addEntry,
                suffixIcon: TextButton(onPressed: addEntry, child: Text(translation.ADD)),
              ),
              if (entries.isNotEmpty) const SizedBox(height: 8),
              if (entries.isNotEmpty)
                Wrap(
                  spacing: 8,
                  runSpacing: 8,
                  children: [
                    InkWell(
                      onTap: clearAll,
                      child: Container(
                        padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 6),
                        decoration: BoxDecoration(
                          color: colors.secondaryContainer,
                          border: Border.all(color: colors.secondaryBorder),
                          borderRadius: BorderRadius.circular(20),
                        ),
                        child: Text(
                          translation.CLEAR_ALL,
                          style: CoporTheme.of(
                            context,
                          ).text.chipLabel.copyWith(color: colors.onSecondaryContainer),
                        ),
                      ),
                    ),
                    ...entries.map(
                      (entry) => Container(
                        padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 6),
                        decoration: BoxDecoration(
                          color: colors.surfaceContainer,
                          border: Border.all(color: colors.outline),
                          borderRadius: BorderRadius.circular(20),
                        ),
                        child: Row(
                          mainAxisSize: MainAxisSize.min,
                          children: [
                            Text(entry, style: CoporTheme.of(context).text.chipLabel),
                            const SizedBox(width: 6),
                            InkWell(
                              onTap: () => removeEntry(entry),
                              child: const Icon(Icons.close, size: 14),
                            ),
                          ],
                        ),
                      ),
                    ),
                  ],
                ),
            ],
          ),
        );
      },
    );
  }
}

// ---------------------------------------------------------------------------
// App-specific contract switch — manages signed-contract list in the form
// ---------------------------------------------------------------------------

class ContractSwitch extends InputFieldModel<ContractValueDTO> {
  ContractSwitch({
    super.key,
    required super.label,
    required super.name,
    required super.controller,
    required super.requiredMessage,
    // super.focusNode,
    //  super.globalKey,
  });

  @override
  Widget build(BuildContext context) {
    return FormField<bool>(
      initialValue: controller.value.accepted,
      autovalidateMode: AutovalidateMode.onUserInteraction,
      validator: (value) {
        if (requiredMessage != null && value != true) return requiredMessage;
        return null;
      },
      builder: (field) {
        return ValueListenableBuilder<ContractValueDTO>(
          valueListenable: controller,
          builder: (context, contractValue, _) {
            return DTContractSwitch(
              value: contractValue.accepted,
              label: label,
              errorText: field.errorText,
              downloadTooltip: contractValue.iconMessage,
              onChanged: (bool newValue) {
                controller.value = contractValue.copyWith(accepted: newValue);
                field.didChange(newValue);
              },
              onDownload: () => ContractEventDispatcher.contract.getContract(
                context,
                contractValue.contractRoute!,
              ),
            );
          },
        );
      },
    );
  }

  @override
  bool isValid(BuildContext context) {
    if (requiredMessage != null && !controller.value.accepted) return false;
    return true;
  }

  @override
  dynamic getValue() {
    if (controller.value.accepted && controller.value.contractType != null) {
      return [controller.value.contractType];
    }
    return null;
  }
}

// ---------------------------------------------------------------------------
// App-specific color input (depends on non-DT ColorDropdown)
// ---------------------------------------------------------------------------

class ColorInput extends InputFieldModel<ColorFieldDTO> {
  ColorInput({
    super.key,
    required super.label,
    required super.name,
    required super.controller,
    required super.requiredMessage,
  });

  @override
  Widget build(BuildContext context) {
    final selectedColor = colorMap[controller.value.color] ?? kColorWhite;
    final colorPalette = useColorPalette(initialColor: selectedColor);

    return ColorDropdown(
      label: label,
      required: requiredMessage,
      colors: getColorsForUser(context, constrainedBy: controller.value.colorSet),
      selectedColor: colorPalette.selectedColor,
      onChanged: (Color? newColor) {
        if (newColor != null) {
          colorPalette.onColorChange(newColor);

          final colorEntry = colorMap.entries.firstWhere(
            (entry) => entry.value.toARGB32() == newColor.toARGB32(),
            orElse: () => MapEntry(0, kColorWhite),
          );
          controller.value = controller.value.copyWith(color: colorEntry.key);
        }
      },
    );
  }

  ColorFieldDTO getColorDTOValue() => controller.value;

  @override
  int getValue() => controller.value.color;
}

// ---------------------------------------------------------------------------
// App-specific phone list input (depends on PhoneNumberDTO from forms module)
// ---------------------------------------------------------------------------

class PhoneNumberListInput extends InputFieldModel<List<PhoneNumberDTO>> {
  PhoneNumberListInput({
    super.key,
    required super.label,
    required super.name,
    required super.controller,
    required super.requiredMessage,
  });

  static DTPhoneEntry _toEntry(PhoneNumberDTO dto) {
    final type = switch (dto.phoneNumberType) {
      PhoneNumberType.PHONE_HOME => DTPhoneType.home,
      PhoneNumberType.PHONE_WORK => DTPhoneType.work,
      _ => DTPhoneType.mobile,
    };
    return DTPhoneEntry(id: dto.id, phoneNumber: dto.phoneNumber, type: type);
  }

  static PhoneNumberDTO _fromEntry(DTPhoneEntry entry) {
    final phoneNumberType = switch (entry.type) {
      DTPhoneType.home => PhoneNumberType.PHONE_HOME,
      DTPhoneType.work => PhoneNumberType.PHONE_WORK,
      DTPhoneType.mobile => PhoneNumberType.PHONE_MOBILE,
    };
    return PhoneNumberDTO(
      id: entry.id,
      phoneNumber: entry.phoneNumber.trim(),
      phoneNumberType: phoneNumberType,
    );
  }

  @override
  Widget build(BuildContext context) {
    return DTDynamicPhoneList(
      initialItems: controller.value.map(_toEntry).toList(),
      onChanged: (List<DTPhoneEntry> newValues) {
        controller.value = newValues.map(_fromEntry).toList();
      },
    );
  }

  @override
  List<PhoneNumberDTO> getValue() =>
      controller.value.where((phone) => phone.phoneNumber.isNotEmpty).toList();
}

// ---------------------------------------------------------------------------
// App-specific searchable inputs (remote search via SimpleListHelper, wired
// into DTDropdown's async-search support)
// ---------------------------------------------------------------------------

class SearchableDropdownInput extends InputFieldModel<NamedIdModel> {
  final String searchableDropdownType;
  final List<FilterModelDTO> searchableDropdownFilters;

  SearchableDropdownInput({
    super.key,
    required super.label,
    required super.name,
    required super.controller,
    required super.requiredMessage,
    required this.searchableDropdownType,
    this.searchableDropdownFilters = const [],
  });

  Future<List<DTOption<NamedIdModel>>> _search(String query, int offset) async {
    final results = await SimpleListHelper.search(
      searchableDropdownType,
      query,
      offset: offset,
      extraFilters: searchableDropdownFilters,
    );
    return results.map((n) => DTOption<NamedIdModel>(value: n, label: n.name)).toList();
  }

  @override
  bool isValid(BuildContext context) {
    return requiredMessage == null || !_isEmptyDropdownId(controller.value.id);
  }

  @override
  Widget build(BuildContext context) {
    return ValueListenableBuilder<NamedIdModel>(
      valueListenable: controller,
      builder: (context, current, _) {
        final isEmpty = _isEmptyDropdownId(current.id);

        final dropdown = DTDropdown<NamedIdModel>.single(
          label: label,
          value: isEmpty ? null : current,
          items: isEmpty ? const [] : [DTOption(value: current, label: current.name)],
          onChanged: (selected) => controller.value = selected ?? NamedIdModel.empty(),
          onSearch: _search,
          searchDebounce: const Duration(milliseconds: 500),
          minSearchLength: 0,
          required: requiredMessage,
          isMobile: context.isMobile,
        );

        if (requiredMessage != null) {
          return dropdown;
        }

        return Row(
          crossAxisAlignment: CrossAxisAlignment.center,
          children: [
            Expanded(child: dropdown),
            Padding(
              padding: const EdgeInsets.only(
                top: kInputLabelTopPadding,
                bottom: kInputBottomPadding,
                left: 4,
              ),
              child: ExcludeFocus(
                child: IconButton(
                  icon: const Icon(DTIcons.clear, size: 16),
                  visualDensity: VisualDensity.compact,
                  onPressed: isEmpty ? null : () => controller.value = NamedIdModel.empty(),
                ),
              ),
            ),
          ],
        );
      },
    );
  }

  @override
  String getValue() => controller.value.id;
}

class SearchableMultiselectInput extends InputFieldModel<List<NamedIdModel>> {
  final String searchableDropdownType;
  final List<FilterModelDTO> searchableDropdownFilters;

  SearchableMultiselectInput({
    super.key,
    required super.label,
    required super.name,
    required super.controller,
    required super.requiredMessage,
    required this.searchableDropdownType,
    this.searchableDropdownFilters = const [],
  });

  Future<List<DTOption<NamedIdModel>>> search(String query, int offset) async {
    final results = await SimpleListHelper.search(
      searchableDropdownType,
      query,
      offset: offset,
      extraFilters: searchableDropdownFilters,
    );
    final selectedById = {for (final selected in controller.value) selected.id: selected};

    return results.map((result) {
      final value = selectedById[result.id] ?? result;
      return DTOption<NamedIdModel>(value: value, label: result.name);
    }).toList();
  }

  @override
  Widget build(BuildContext context) {
    return ValueListenableBuilder<List<NamedIdModel>>(
      valueListenable: controller,
      builder: (context, current, _) {
        return DTDropdown<NamedIdModel>.chips(
          inputLabel: label,
          label: label,
          selectedValues: current,
          items: current.map((n) => DTOption(value: n, label: n.name)).toList(),
          onChanged: (selected) => controller.value = selected,
          onSearch: search,
          minSearchLength: 0,
          required: requiredMessage,
          isMobile: context.isMobile,
        );
      },
    );
  }

  @override
  List<dynamic> getValue() => controller.value.map((item) => item.id).toList();
}

class RangeSearchableMultiselectInput extends SearchableMultiselectInput {
  RangeSearchableMultiselectInput({
    super.key,
    required super.label,
    required super.name,
    required super.controller,
    required super.requiredMessage,
    required super.searchableDropdownType,
    super.searchableDropdownFilters,
  });

  static final RegExp _rangePattern = RegExp(r'^(\d{4,})\s*-\s*(\d{4,})$');

  @override
  Future<List<DTOption<NamedIdModel>>> search(String query, int offset) async {
    final range = _rangePattern.firstMatch(query.trim());

    if (range == null) return super.search(query, offset);

    final results = await SimpleListHelper.searchRange(
      searchableDropdownType,
      range.group(1)!,
      range.group(2)!,
      extraFilters: searchableDropdownFilters,
    );
    final merged = {
      for (final selected in controller.value) selected.id: selected,
      for (final result in results) result.id: result,
    };

    controller.value = merged.values.toList();
    return const [];
  }
}

// ---------------------------------------------------------------------------
// App-specific password input (depends on PasswordValidationBloc)
// ---------------------------------------------------------------------------

class PasswordInput extends InputFieldModel<String> {
  final ValueNotifier<String> _confirmValue = ValueNotifier('');

  PasswordInput({
    super.key,
    required super.name,
    required super.label,
    required super.controller,
    required super.requiredMessage,
  });

  @override
  String getValue() => controller.value;

  @override
  bool isValid(BuildContext context) {
    if (!super.isValid(context)) return false;
    if (controller.value.isEmpty) return true;
    if (controller.value != _confirmValue.value) return false;

    final state = context.read<PasswordValidationBloc>().state;
    final policy = state.policy;
    if (policy == null) return state.policyUnavailable;

    return const PasswordPolicyEvaluator()
        .evaluate(policy, PasswordValidationModel(password: controller.value))
        .isEmpty;
  }

  @override
  Widget build(BuildContext context) {
    final passwordController = useTextEditingController(text: controller.value);
    final confirmController = useTextEditingController(text: _confirmValue.value);
    useEffect(() {
      void sync() => controller.value = passwordController.text;
      passwordController.addListener(sync);
      return () => passwordController.removeListener(sync);
    }, [passwordController]);
    useEffect(() {
      void sync() => _confirmValue.value = confirmController.text;
      confirmController.addListener(sync);
      return () => confirmController.removeListener(sync);
    }, [confirmController]);
    useEffect(
      () => PasswordValidationBlocEventDispatcher.passwordValidation.listenToPasswordControllers(
        context,
        passwordController,
        confirmController,
      ),
      [passwordController, confirmController],
    );

    final translation = context.watchState.commonTranslation.ensuredData;

    return BlocBuilder<PasswordValidationBloc, PasswordValidationState>(
      buildWhen: (prev, curr) => prev.failure?.message != curr.failure?.message,
      builder: (context, state) {
        return AnimatedBuilder(
          animation: Listenable.merge([passwordController, confirmController]),
          builder: (context, _) {
            final mismatch =
                confirmController.text.isNotEmpty &&
                confirmController.text != passwordController.text;
            return Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                DTPasswordField(
                  key: ValueKey('$name-password'),
                  controller: passwordController,
                  label: label,
                  required: requiredMessage,
                ),
                DTPasswordField(
                  key: ValueKey('$name-confirm-password'),
                  controller: confirmController,
                  label: label,
                  required: requiredMessage,
                  errorText: mismatch ? translation.PASSWORD_DO_NOT_MATCH : state.failure?.message,
                ),
                const PasswordRequirementsChecklist(),
              ],
            );
          },
        );
      },
    );
  }
}

class SinglePasswordInput extends InputFieldModel<String> {
  SinglePasswordInput({
    super.key,
    required super.name,
    required super.label,
    required super.controller,
    required super.requiredMessage,
  });

  @override
  String getValue() => controller.value;

  @override
  Widget build(BuildContext context) {
    final passwordController = useTextEditingController(text: controller.value);
    useEffect(() {
      void sync() => controller.value = passwordController.text;
      passwordController.addListener(sync);
      return () => passwordController.removeListener(sync);
    }, [passwordController]);

    return DTPasswordField(
      key: ValueKey('$name-password'),
      controller: passwordController,
      label: label,
      required: requiredMessage,
    );
  }
}

// ---------------------------------------------------------------------------
// Utility widgets
// ---------------------------------------------------------------------------

class DividerWidget extends StatelessWidget {
  final String label;

  const DividerWidget({super.key, required this.label});

  @override
  Widget build(BuildContext context) {
    return Column(children: [Text(label), const Divider()]);
  }
}

class SizedBoxWidget extends StatelessWidget {
  final double height;

  const SizedBoxWidget({super.key, required this.height});

  @override
  Widget build(BuildContext context) => SizedBox(height: height);
}

class TextLabelWidget extends StatelessWidget {
  final String label;

  const TextLabelWidget({super.key, required this.label});

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 15),
      child: Text(label, style: Theme.of(context).textTheme.bodyMedium),
    );
  }
}

class TextLabelInput extends InputFieldModel<String> with ExcludeValue {
  TextLabelInput({super.key, required super.name, required super.label, required super.controller})
    : super(requiredMessage: null);

  @override
  String getValue() => '';

  @override
  Widget build(BuildContext context) => TextLabelWidget(label: label);
}

class SuccessLabel extends InputFieldModel with ExcludeValue {
  final String message;
  final bool isSuccess;

  SuccessLabel({
    super.key,
    required this.message,
    this.isSuccess = true,
    required super.label,
    required super.name,
    required super.controller,
    required super.requiredMessage,
  });

  @override
  Widget build(BuildContext context) {
    return AnimatedSwitcher(
      duration: const Duration(milliseconds: 250),
      child: Container(
        key: ValueKey(message),
        margin: const EdgeInsets.only(bottom: 16),
        padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 10),
        decoration: BoxDecoration(
          borderRadius: BorderRadius.circular(5),
          border: Border.all(color: isSuccess ? Colors.green : Colors.red, width: 1.5),
        ),
        child: Row(
          children: [
            Icon(isSuccess ? Icons.check_circle_outline : Icons.error_outline, size: 18),
            const SizedBox(width: 8),
            Expanded(child: Text(message, style: TextStyle(fontSize: 13))),
          ],
        ),
      ),
    );
  }

  @override
  getValue() {
    return message;
  }
}

class DTImageInput extends InputFieldModel<MediaFileModel?> with ExcludeValue, DeferredUpload {
  @override
  final String uploadEndpoint;
  @override
  final String currentImageUrl;
  final double previewHeight;

  final ValueNotifier<bool> isRemoved = ValueNotifier(false);

  DTImageInput({
    super.key,
    required super.name,
    required super.label,
    required super.controller,
    required super.requiredMessage,
    required this.uploadEndpoint,
    this.currentImageUrl = '',
    this.previewHeight = 160,
  });

  @override
  MediaFileModel? getValue() => controller.value;

  @override
  bool get pendingRemoval => isRemoved.value;

  bool get _hasCurrentImage => currentImageUrl.isNotEmpty && !isRemoved.value;

  @override
  bool isValid(BuildContext context) =>
      requiredMessage == null || controller.value != null || _hasCurrentImage;

  @override
  Widget build(BuildContext context) {
    final translation = context.watchState.commonTranslation.ensuredData;
    final maxFileSize = context.getState.preferences.result?.data.maxImageSize ?? 1;

    return BlocProvider(
      create: (_) =>
          MediaPickerCubit(mediaRepository: getIt<MediaRepository>(), maxFileSize: maxFileSize),
      child: FormField<MediaFileModel?>(
        initialValue: controller.value,
        validator: (picked) => (requiredMessage != null && picked == null && !_hasCurrentImage)
            ? requiredMessage
            : null,
        builder: (field) => BlocConsumer<MediaPickerCubit, MediaPickerState>(
          listenWhen: (previous, current) => current.uploads.length > previous.uploads.length,
          listener: (context, state) {
            final cubit = context.read<MediaPickerCubit>();
            final picked = state.uploads.last;

            if (picked is! ImageFileModel) {
              cubit.removeUpload(state.uploads.length - 1);
              cubit.setFailure(Failure(0, translation.NOT_IMAGE_WARNING_MESSAGE));
              return;
            }

            controller.value = picked;
            field.didChange(picked);
          },
          builder: (context, state) {
            final cubit = context.read<MediaPickerCubit>();

            return Padding(
              padding: const EdgeInsets.only(bottom: kInputBottomPadding),
              child: DTInputDecorator(
                label: label,
                errorText: field.errorText,
                child: ValueListenableBuilder<bool>(
                  valueListenable: isRemoved,
                  builder: (context, removed, _) => Column(
                    crossAxisAlignment: CrossAxisAlignment.stretch,
                    children: [
                      if (field.value != null)
                        _buildPreview(
                          image: Image.memory(
                            field.value!.bytes,
                            height: previewHeight,
                            width: double.infinity,
                            fit: BoxFit.cover,
                          ),
                          removeLabel: translation.REMOVE_IMAGE,
                          onRemove: () {
                            controller.value = null;
                            field.didChange(null);
                          },
                        )
                      else if (currentImageUrl.isNotEmpty && !removed)
                        _buildPreview(
                          image: Image.network(
                            currentImageUrl,
                            height: previewHeight,
                            width: double.infinity,
                            fit: BoxFit.cover,
                            errorBuilder: (_, _, _) => const SizedBox.shrink(),
                          ),
                          removeLabel: translation.REMOVE_IMAGE,
                          onRemove: () {
                            isRemoved.value = true;
                            field.didChange(null);
                          },
                        ),
                      const SizedBox(height: 8),
                      UploadDropZone(
                        onBrowse: cubit.pickFromFileSystem,
                        onFilesDropped: (droppedItems) async =>
                            cubit.addFiles(await readDroppedMedia(droppedItems)),
                        browseLabel: translation.BROWSE_IMAGE,
                        dropFilesLabel: translation.DROP_IMAGE_HERE,
                        icon: PhosphorIconsThin.image,
                      ),
                      if (state.failure != null)
                        Padding(
                          padding: const EdgeInsets.only(top: 8),
                          child: Text(
                            state.failure!.message,
                            style: CoporTextStyles.of(
                              context,
                            ).bodySecondary.copyWith(color: CoporColors.of(context).error),
                          ),
                        ),
                    ],
                  ),
                ),
              ),
            );
          },
        ),
      ),
    );
  }

  Widget _buildPreview({required Widget image, String? removeLabel, VoidCallback? onRemove}) {
    return Stack(
      children: [
        ClipRRect(borderRadius: BorderRadius.circular(kInputBorderRadius), child: image),
        if (onRemove != null)
          Positioned(
            top: 8,
            right: 8,
            child: DTButton.surface(
              icon: DTIcons.delete,
              label: '',
              semanticLabel: removeLabel ?? '',
              onPressed: onRemove,
              inputSize: DTInputSize.xs,
            ),
          ),
      ],
    );
  }
}
