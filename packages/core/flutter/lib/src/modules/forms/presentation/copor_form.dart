import 'package:copor_core/src/bloc/utils/form_save_trigger_cubit.dart';
import 'package:copor_core/src/components/copor_form.dart';
import 'package:copor_core/src/modules/forms/bloc/copor_form_bloc.dart';
import 'package:copor_core/src/modules/forms/bloc/copor_form_event.dart';
import 'package:copor_core/src/modules/forms/data/model/copor_form_dto.dart';
import 'package:copor_core/src/modules/forms/data/model/input_field_model.dart';
import 'package:copor_core/src/modules/forms/presentation/utils/form_helper.dart';
import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

typedef AdditionalParam = ({String key, String value});

class CoporFullForm extends StatelessWidget {
  final List<CoporFormFieldDTO> formFields;
  final List<InputFieldModel> formContent;
  final bool includesCountryAndState = false;
  final String? id;
  final String endpoint;
  final String createTitle;
  final String editTitle;
  final GlobalKey<FormState> formKey;
  final List<AdditionalParam>? additionalParams;
  final VoidCallback? onBack;
  final EdgeInsetsGeometry? padding;

  CoporFullForm({
    super.key,
    required this.formFields,
    this.id,
    required this.endpoint,
    required this.createTitle,
    required this.editTitle,
    required this.formKey,
    this.additionalParams,
    this.onBack,
    this.padding,
  }) : formContent = FormHelper.getFormContent(formFields);

  Map<String, dynamic> getFormData() {
    final Map<String, dynamic> map = {};

    for (final model in formContent) {
      if (model is! DTHeaderInput && model.name != '') {
        map[model.name] = model.getValue();
      }
    }
    return map;
  }

  Widget buildFormContent() {
    return Column(
      children: [for (final field in formContent) KeyedSubtree(key: field.globalKey, child: field)],
    );
  }

  Future<void> submitForm(BuildContext context, String? id) async {
    final isValid = formKey.currentState!.validate();

    if (!isValid) {
      for (final field in formContent) {
        if (!field.isValid(context)) {
          final ctx = field.globalKey.currentContext;
          if (ctx == null) continue;

          await Scrollable.ensureVisible(
            ctx,
            duration: const Duration(milliseconds: 300),
            curve: Curves.easeInOut,
            alignment: 0.2,
          );

          field.focusNode.requestFocus();
          return;
        }
      }

      return;
    }

    final formData = getFormData();
    final bloc = context.read<CoporFormBloc>();

    final additionalParams = this.additionalParams;

    if (additionalParams != null && additionalParams.isNotEmpty) {
      for (var additionalParam in additionalParams) {
        formData[additionalParam.key] = additionalParam.value;
      }
    }

    if (id != null) {
      formData['id'] = id;
      bloc.add(UpdateFromCoporForm(endpoint, formData));
    } else {
      bloc.add(CreateFromCoporForm(endpoint, formData));
    }
  }

  @override
  Widget build(BuildContext context) {
    return BlocListener<FormSaveTriggerCubit, int>(
      listener: (context, state) {
        submitForm(context, id);
      },
      child: CoporForm(
        formKey: formKey,
        id: id,
        onSubmit: () => submitForm(context, id),
        editTitle: editTitle,
        createTitle: createTitle,
        padding: padding ?? const EdgeInsets.symmetric(horizontal: 16, vertical: 6),
        formContent: buildFormContent(),
        onBack: onBack,
      ),
    );
  }
}
