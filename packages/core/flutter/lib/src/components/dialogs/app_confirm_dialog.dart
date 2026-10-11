import 'package:copor_core/src/bloc/utils/bloc_context_extensions.dart';
import 'package:copor_theme/copor_theme.dart';

import 'package:flutter/material.dart';

/// App-level wrappers around [DTDialog.showConfirm] that supply
/// [CommonTranslation] default strings so call sites don't have to.
///
/// Use [AppConfirmDialog.showDelete] for the standard delete confirmation.
/// Use [AppConfirmDialog.showConfirm] when you need a custom message but still
/// want translation-backed label fallbacks.
abstract final class AppConfirmDialog {
  static Future<bool?> showConfirm(
    BuildContext context, {
    String? title,
    String? content,
    String? cancelLabel,
    String? confirmLabel,
  }) {
    final t = context.getState.commonTranslation.ensuredData;
    return DTDialog.showConfirm(
      context,
      title: title ?? t.CONFIRM_DELETION,
      content: content ?? t.DELETE_ITEM_MESSAGE,
      cancelLabel: cancelLabel ?? t.NO,
      confirmLabel: confirmLabel ?? t.YES,
    );
  }

  static Future<bool?> showDelete(BuildContext context) => AppConfirmDialog.showConfirm(context);
}
