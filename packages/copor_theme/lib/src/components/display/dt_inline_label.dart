import 'package:copor_theme/src/theme/extensions/copor_colors.dart';
import 'package:copor_theme/src/theme/extensions/copor_text_theme.dart';
import 'package:flutter/material.dart';

/// Displays a label followed by a value on the same line.
///
/// The text wraps naturally when there is not enough horizontal space.
///
/// ```dart
/// DTInlineLabel(label: 'Street address', value: '10 Main Street')
/// ```
class DTInlineLabel extends StatelessWidget {
  final String label;
  final String value;
  final String separator;

  const DTInlineLabel({super.key, required this.label, required this.value, this.separator = ': '});

  @override
  Widget build(BuildContext context) {
    final dc = CoporColors.of(context);
    final dt = CoporTextStyles.of(context);

    return SelectableText.rich(
      TextSpan(
        style: dt.body.copyWith(color: dc.onSurface),
        children: [
          TextSpan(
            text: '$label$separator',
            style: TextStyle(color: dc.onSurface.withValues(alpha: 0.8)),
          ),
          TextSpan(text: value),
        ],
      ),
      maxLines: null,
      showCursor: false,
    );
  }
}

/// Displays multiple label-value pairs as aligned table rows.
///
/// The widest label determines the width of the first column.
class DTInlineLabelGroup extends StatelessWidget {
  final List<DTInlineLabel> children;
  final double columnSpacing;
  final double rowSpacing;

  const DTInlineLabelGroup({
    super.key,
    required this.children,
    this.columnSpacing = 16,
    this.rowSpacing = 10,
  });

  @override
  Widget build(BuildContext context) {
    final dc = CoporColors.of(context);
    final dt = CoporTextStyles.of(context);

    return Table(
      columnWidths: const {0: IntrinsicColumnWidth(), 1: FlexColumnWidth()},
      defaultVerticalAlignment: TableCellVerticalAlignment.top,
      children: [
        for (var index = 0; index < children.length; index++)
          TableRow(
            children: [
              Padding(
                padding: EdgeInsets.only(bottom: index == children.length - 1 ? 0 : rowSpacing),
                child: Text(
                  '${children[index].label}${children[index].separator}',
                  style: dt.body.copyWith(color: dc.onSurface.withValues(alpha: 0.8)),
                ),
              ),
              Padding(
                padding: EdgeInsets.only(
                  left: columnSpacing,
                  bottom: index == children.length - 1 ? 0 : rowSpacing,
                ),
                child: SelectableText(children[index].value, style: dt.body.copyWith(color: dc.onSurface),),
              ),
            ],
          ),
      ],
    );
  }
}
