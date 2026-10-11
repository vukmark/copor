import 'package:copor_core/src/bloc/utils/form_save_trigger_cubit.dart';
import 'package:copor_theme/copor_theme.dart';
import 'package:copor_core/src/modules/forms/bloc/copor_form_bloc.dart';
import 'package:copor_core/src/modules/forms/bloc/copor_form_event.dart';
import 'package:copor_core/src/modules/forms/data/model/copor_form_dto.dart';
import 'package:copor_core/src/data/model/named_id/named_id_model.dart';
import 'package:copor_core/src/modules/forms/data/model/input_field_model.dart';
import 'package:copor_core/src/modules/forms/presentation/utils/form_helper.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_hooks/flutter_hooks.dart';

typedef AdditionalParam = ({String key, String value});

class DTFullFormConnector extends HookWidget {
  final String? id;
  final bool isPublicForm;
  final String createTitle;
  final String editTitle;
  final IconData? icon;
  final GlobalKey<FormState> formKey;
  final List<AdditionalParam>? additionalParams;
  final VoidCallback onCancel;
  final String saveLabel;
  final String cancelLabel;
  final bool Function(BuildContext context)? isFormReady;
  final List<CoporFormFieldDTO> Function(List<CoporFormFieldDTO>)? fieldsTransformer;
  final Widget? loadingPlaceholder;

  const DTFullFormConnector({
    super.key,
    this.id,
    this.isPublicForm = false,
    required this.createTitle,
    required this.editTitle,
    required this.formKey,
    this.additionalParams,
    this.icon,
    required this.onCancel,
    this.saveLabel = 'Save',
    this.cancelLabel = 'Cancel',
    this.isFormReady,
    this.fieldsTransformer,
    this.loadingPlaceholder,
  });

  Map<String, dynamic> _getFormData(List<InputFieldModel> formContent) {
    final map = <String, dynamic>{};
    for (final model in formContent) {
      if (model is ExcludeValue || model.name.isEmpty) continue;
      if (model is InputFieldModel<NamedIdModel> && model.getValue() == '') continue;
      map[model.name] = model.getValue();
    }
    return map;
  }

  List<CoporFormEvent> _getPictureActions(List<InputFieldModel> formContent) {
    final actions = <CoporFormEvent>[];

    for (final field in formContent.whereType<DeferredUpload>()) {
      if (field.uploadEndpoint.isEmpty) continue;

      final image = field.pendingUpload;
      if (image != null) {
        actions.add(UploadPicture(field.uploadEndpoint, image, field.currentImageUrl));
      } else if (field.pendingRemoval) {
        actions.add(DeletePicture(field.uploadEndpoint, field.currentImageUrl));
      }
    }

    return actions;
  }

  Future<void> _submitForm(
    BuildContext context,
    List<InputFieldModel> formContent,
    String endpoint,
  ) async {
    final isValid =
        formKey.currentState!.validate() && formContent.every((field) => field.isValid(context));

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

    final formData = _getFormData(formContent);
    final bloc = context.read<CoporFormBloc>();

    for (final action in _getPictureActions(formContent)) {
      bloc.add(action);
    }

    final extra = additionalParams;
    if (extra != null && extra.isNotEmpty) {
      for (final param in extra) {
        formData[param.key] = param.value;
      }
    }

    if (!isPublicForm) {
      if (id != null) {
        formData['id'] ??= id;
        bloc.add(UpdateFromCoporForm(endpoint, formData));
      } else {
        bloc.add(CreateFromCoporForm(endpoint, formData));
      }

      return;
    }

    /// if public assume that there is no create/update, just the public request that doesnt require authentication for form submitting
    bloc.add(SubmitFromCoporForm(endpoint, formData));
  }

  @override
  Widget build(BuildContext context) {
    final formState = context.watch<CoporFormBloc>().state;
    final fields = formState.result == null
        ? null
        : (fieldsTransformer?.call(formState.ensuredData.fields) ?? formState.ensuredData.fields);

    // Keyed on `formState.result` (identity-equal across incidental rebuilds, e.g. the
    // MediaQuery churn from the soft keyboard on Android/iOS) so field controllers -
    // and whatever the user has already typed/selected into them - only get rebuilt
    // when the bloc actually emits new form data, not on every unrelated rebuild.
    final formContent = useMemoized(
      () => fields == null ? <InputFieldModel>[] : FormHelper.getFormContent(fields),
      [formState.result],
    );

    return BlocListener<FormSaveTriggerCubit, int>(
      listener: (context, _) {
        if (formState.result == null) return;
        _submitForm(context, formContent, formState.ensuredData.endpoint);
      },
      child: formState.result == null
          ? (loadingPlaceholder ?? const SizedBox.shrink())
          : DTFullFormLayout(
              formKey: formKey,
              id: id,
              icon: icon,
              onSubmit: () => _submitForm(context, formContent, formState.ensuredData.endpoint),
              editTitle: editTitle,
              createTitle: createTitle,
              formContent: Column(
                children: [
                  for (final field in formContent) KeyedSubtree(key: field.globalKey, child: field),
                  const SizedBox(height: 24),
                ],
              ),
              onCancel: onCancel,
              saveLabel: saveLabel,
              cancelLabel: cancelLabel,
              isLoading: formState.isLoading && formState.result != null,
              formListenable: Listenable.merge(formContent.map((f) => f.controller).toList()),
              isFormReady: isFormReady ?? (context) => formContent.every((f) => f.isValid(context)),
            ),
    );
  }
}
