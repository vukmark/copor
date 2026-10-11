import 'package:copor_theme/src/components/buttons/dt_button.dart';
import 'package:copor_theme/src/components/layout/floating_container.dart';
import 'package:flutter/material.dart';

/// A pure layout widget for floating forms.
///
/// This widget has no bloc or service dependencies — it is purely presentational.
/// The caller is responsible for submitting, cancelling, and driving the button
/// enabled state.
///
/// In the main app, use `DTFullFormConnector` (in `lib/src/modules/DT/connectors/`)
/// which wires up [CoporFormBloc] and [FormSaveTriggerCubit].
class DTFullFormLayout extends StatelessWidget {
  final String? id;
  final String createTitle;
  final String editTitle;
  final IconData? icon;
  final GlobalKey<FormState> formKey;
  final Widget formContent;
  final VoidCallback onSubmit;
  final VoidCallback onCancel;
  final String saveLabel;
  final String cancelLabel;
  final Listenable? formListenable;
  final bool Function(BuildContext)? isFormReady;
  final Widget? appBarLeadingExtra;
  final bool isLoading;

  const DTFullFormLayout({
    super.key,
    required this.id,
    required this.createTitle,
    required this.editTitle,
    required this.formKey,
    required this.formContent,
    required this.onSubmit,
    required this.onCancel,
    required this.saveLabel,
    required this.cancelLabel,
    this.icon,
    this.formListenable,
    this.isFormReady,
    this.appBarLeadingExtra,
    this.isLoading = false,
  });

  @override
  Widget build(BuildContext context) {
    final title = id != null ? editTitle : createTitle;

    final cancelButton = DTButton.surface(
      onPressed: onCancel,
      label: cancelLabel,
      semanticLabel: cancelLabel,
    );

    final leading = appBarLeadingExtra != null
        ? Row(
            mainAxisSize: MainAxisSize.min,
            children: [
              cancelButton,
              const SizedBox(width: 8),
              appBarLeadingExtra!,
            ],
          )
        : cancelButton;

    Widget buildSaveButton(BuildContext ctx) => DTButton.positive(
          onPressed: onSubmit,
          label: saveLabel,
          semanticLabel: saveLabel,
          enabled: isFormReady?.call(ctx) ?? true,
        );

    final trailing = formListenable != null
        ? ListenableBuilder(
            listenable: formListenable!,
            builder: (ctx, _) => buildSaveButton(ctx),
          )
        : buildSaveButton(context);

    return Form(
      key: formKey,
      child: DTFloatingLayout(
        actionPosition: FloatingContainerActionPosition.bottom,
        title: title,
        leading: leading,
        icon: icon,
        trailing: trailing,
        isLoading: isLoading,
        children: [formContent],
      ),
    );
  }
}
