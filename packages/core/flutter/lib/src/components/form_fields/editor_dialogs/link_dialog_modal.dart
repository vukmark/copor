import 'package:copor_theme/copor_theme.dart';
import 'package:flutter/material.dart';
import 'package:flutter_quill/flutter_quill.dart';

/// Shows a link dialog and applies the link to the controller when Apply is pressed.
Future<void> showLinkDialogModal(
  BuildContext context,
  QuillController controller, {
  String? initialText,
  String? initialLink,
}) {
  final TextEditingController textController = TextEditingController(text: initialText ?? '');
  final TextEditingController linkController = TextEditingController(text: initialLink ?? '');

  return DTModalShell.show<void>(
    context,
    isMobile: MediaQuery.of(context).size.width < 600,
    builder: (ctx) {
      return DTFloatingLayout(
        title: 'Insert link',
        leading: DTButton.surface(label: 'Cancel', onPressed: () => Navigator.of(ctx).pop()),
        trailing: DTButton.positive(
          label: 'Apply',
          onPressed: () {
            final text = textController.text.trim();
            final url = linkController.text.trim();
            if (url.isEmpty) return;

            final selection = controller.selection;
            final start = selection.baseOffset;
            final length = selection.extentOffset - start;

            if (length > 0) {
              controller.formatText(start, length, LinkAttribute(url));
            } else if (text.isNotEmpty) {
              controller.replaceText(
                start,
                0,
                text,
                TextSelection.collapsed(offset: start + text.length),
              );
              controller.formatText(start, text.length, LinkAttribute(url));
            } else {
              controller.replaceText(
                start,
                0,
                url,
                TextSelection.collapsed(offset: start + url.length),
              );
              controller.formatText(start, url.length, LinkAttribute(url));
            }

            Navigator.of(ctx).pop();
          },
        ),
        children: [
          Form(
            child: Column(
              mainAxisSize: MainAxisSize.min,
              children: [
                const SizedBox(height: 8),
                TextFormField(
                  controller: textController,
                  decoration: const InputDecoration(labelText: 'Text', hintText: 'Text to display'),
                ),
                const SizedBox(height: 12),
                TextFormField(
                  controller: linkController,
                  decoration: const InputDecoration(
                    labelText: 'URL',
                    hintText: 'https://example.com',
                  ),
                  keyboardType: TextInputType.url,
                ),
              ],
            ),
          ),
        ],
      );
    },
  );
}
