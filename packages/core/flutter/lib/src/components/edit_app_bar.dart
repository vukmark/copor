import 'package:copor_core/src/components/buttons/copor_button.dart';
import 'package:copor_core/src/bloc/utils/bloc_context_extensions.dart';
import 'package:flutter/material.dart';

class EditAppBar extends StatelessWidget implements PreferredSizeWidget {
  final String? id;
  final VoidCallback onSave;
  final VoidCallback onBack;
  final String createTitle;
  final String editTitle;

  const EditAppBar({
    super.key,
    required this.id,
    required this.onSave,
    required this.onBack,
    required this.createTitle,
    required this.editTitle,
  });

  @override
  Widget build(BuildContext context) {
    final translation = context.getState.commonTranslation.ensuredData;

    return Padding(
      padding: EdgeInsetsGeometry.symmetric(horizontal: 16),
      child: AppBar(
        forceMaterialTransparency: true,
        centerTitle: true,
        leadingWidth: 110,
        title: Text(id != null ? editTitle : createTitle),
        titleTextStyle: TextStyle(
          fontSize: Theme.of(context).textTheme.titleMedium?.fontSize,
          color: Theme.of(context).colorScheme.onSurface,
        ),
        leading: Align(
          alignment: Alignment.centerLeft,
          child: CoporButton(onPressed: onBack, outlined: true, label: translation.CANCEL),
        ),
        actions: [CoporButton(onPressed: onSave, label: translation.SAVE)],
        shape: Border(
          bottom: BorderSide(color: Theme.of(context).colorScheme.outlineVariant, width: 1.0),
        ),
      ),
    );
  }

  @override
  Size get preferredSize => const Size.fromHeight(kToolbarHeight);
}
