import 'package:copor_core/src/bloc/global_blocs/navigation_bloc/navigation_bloc.dart';
import 'package:copor_core/src/components/edit_app_bar.dart';
import 'package:copor_core/src/core/system/device_service.dart';
import 'package:flutter/material.dart';

class CoporForm extends StatelessWidget {
  final VoidCallback onSubmit;
  final String? id;
  final String editTitle;
  final String createTitle;
  final Widget formContent;
  final EdgeInsetsGeometry padding;
  final GlobalKey<FormState> formKey;
  final VoidCallback? onBack;

  const CoporForm({
    super.key,
    required this.onSubmit,
    required this.id,
    required this.editTitle,
    required this.createTitle,
    required this.formContent,
    this.padding = const EdgeInsets.symmetric(horizontal: 16, vertical: 16),
    required this.formKey,
    this.onBack,
  });

  @override
  Widget build(BuildContext context) {
    return Form(
      key: formKey,
      child: Column(
        mainAxisSize: MainAxisSize.min,
        children: [
          if (!context.isMobile)
            EditAppBar(
              id: id,
              onBack: onBack ?? goBack,
              onSave: onSubmit,
              editTitle: editTitle,
              createTitle: createTitle,
            ),
          const SizedBox(height: 15),
          Flexible(
            fit: FlexFit.loose,
            child: SingleChildScrollView(padding: padding, child: formContent),
          ),
          const SizedBox(height: 40),
        ],
      ),
    );
  }
}
