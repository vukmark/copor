import 'package:copor_theme/src/components/buttons/dt_button.dart';
import 'package:copor_theme/src/components/layout/floating_container.dart';
import 'package:flutter/material.dart';

class DTCoporForm extends StatelessWidget {
  final VoidCallback onSubmit;
  final VoidCallback onCancel;
  final String? id;
  final String editTitle;
  final String createTitle;
  final Widget formContent;
  final GlobalKey<FormState> formKey;
  final IconData? icon;
  final String saveLabel;
  final String cancelLabel;
  final Widget? appBarLeadingExtra;
  final Listenable? formListenable;
  final bool Function(BuildContext)? isFormReady;
  final bool isLoading;

  const DTCoporForm({
    super.key,
    required this.onSubmit,
    required this.onCancel,
    required this.id,
    required this.editTitle,
    required this.createTitle,
    required this.formContent,
    required this.formKey,
    required this.saveLabel,
    required this.cancelLabel,
    this.icon,
    this.appBarLeadingExtra,
    this.formListenable,
    this.isFormReady,
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
