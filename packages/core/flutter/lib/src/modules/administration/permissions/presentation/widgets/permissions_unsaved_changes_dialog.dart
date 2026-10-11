import 'package:copor_core/src/bloc/utils/bloc_context_extensions.dart';
import 'package:flutter/material.dart';

Future<bool> confirmDiscardPermissionChanges(BuildContext context) async {
  final translations = context.getState.commonTranslation.ensuredData;

  return await showDialog<bool>(
        context: context,
        builder: (dialogContext) => AlertDialog(
          title: Text(translations.UNSAVED_CHANGES),
          content: Text(translations.UNSAVED_PERMISSION_CHANGES_MESSAGE),
          actions: [
            TextButton(
              onPressed: () => Navigator.of(dialogContext).pop(false),
              child: Text(translations.CANCEL),
            ),
            TextButton(
              onPressed: () => Navigator.of(dialogContext).pop(true),
              child: Text(translations.DISCARD),
            ),
          ],
        ),
      ) ??
      false;
}
