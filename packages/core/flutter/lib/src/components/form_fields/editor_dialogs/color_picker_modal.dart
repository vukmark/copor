import 'package:copor_theme/copor_theme.dart';
import 'package:flutter/material.dart';
import 'package:flutter_quill/flutter_quill.dart';
import 'package:flutter_colorpicker/flutter_colorpicker.dart'
    as color_picker
    show ColorPicker, MaterialPicker, colorToHex;

/// Shows a color picker modal using the app's DTModalShell/DTFloatingLayout.
/// Applies selection directly to the provided [controller].
Future<Color?> showColorPickerModal(
  BuildContext context,
  QuillController controller, {
  required bool isBackground,
}) {
  Color selectedColor = Colors.blue;

  return DTModalShell.show<Color?>(
    context,
    isMobile: MediaQuery.of(context).size.width < 600,
    builder: (ctx) {
      return DefaultTabController(
        length: 2,
        child: DTFloatingLayout(
          title: 'Select color',
          leading: DTButton.surface(label: 'Cancel', onPressed: () => Navigator.of(ctx).pop(null)),
          trailing: DTButton.positive(
            label: 'Apply',
            onPressed: () {
              final hex = color_picker.colorToHex(selectedColor);
              final hexWithHash = '#$hex';
              controller.formatSelection(
                isBackground ? BackgroundAttribute(hexWithHash) : ColorAttribute(hexWithHash),
              );
              Navigator.of(ctx).pop(selectedColor);
            },
          ),
          expandedChild: MediaQuery(
            data: MediaQuery.of(ctx).copyWith(size: Size(360, MediaQuery.of(ctx).size.height)),
            child: TabBarView(
              children: [
                SingleChildScrollView(
                  child: Center(
                    child: color_picker.MaterialPicker(
                      pickerColor: selectedColor,
                      onColorChanged: (color) {
                        selectedColor = color;
                      },
                    ),
                  ),
                ),
                SingleChildScrollView(
                  child: Padding(
                    padding: const EdgeInsets.symmetric(horizontal: 8.0, vertical: 8.0),
                    child: color_picker.ColorPicker(
                      pickerColor: selectedColor,
                      onColorChanged: (color) {
                        selectedColor = color;
                      },
                      pickerAreaHeightPercent: 0.7,
                    ),
                  ),
                ),
              ],
            ),
          ),
          children: [
            MediaQuery(
              data: MediaQuery.of(ctx).copyWith(size: Size(360, MediaQuery.of(ctx).size.height)),
              child: Row(
                children: [
                  Expanded(
                    child: TabBar(
                      labelColor: Theme.of(ctx).colorScheme.onSurface,
                      unselectedLabelColor: Theme.of(
                        ctx,
                      ).colorScheme.onSurface.withValues(alpha: 0.6),
                      indicatorColor: Theme.of(ctx).colorScheme.primary,
                      tabs: const [
                        Tab(text: 'Material'),
                        Tab(text: 'Color'),
                      ],
                    ),
                  ),
                  const SizedBox(width: 8),
                  DTButton.surface(label: 'Clear', onPressed: () => Navigator.of(ctx).pop(null)),
                ],
              ),
            ),
            const SizedBox(height: 8),
          ],
        ),
      );
    },
  );
}
