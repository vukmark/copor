import 'package:copor_theme/src/components/table/widgets/dt_table_load_more_indicator.dart';
import 'package:copor_theme/src/components/display/dt_info_row.dart';
import 'package:copor_theme/src/utils/dt_table_utils.dart';
import 'package:flutter/material.dart';

class DTTableMobile extends StatelessWidget {
  final List<DTColumnHeader> tableColumnHeaders;

  /// Pre-built cell widgets, one list per row. Prefer [rowBuilder]/[rowCount]
  /// for large row counts — this materializes every row's cells upfront
  /// even though the list only lays out and paints the visible ones.
  final List<List<Widget>> rows;

  /// Lazy alternative to [rows] — cells for row [index] are built only when
  /// that row actually scrolls into view. Requires [rowCount]; when set,
  /// [rows] is ignored.
  final List<Widget> Function(int index)? rowBuilder;
  final int? rowCount;
  final Widget noResultsMessage;
  final ScrollController? scrollController;
  final bool shrinkWrap;
  final bool isLoadingMore;
  final ValueChanged<int>? onRowTap;

  const DTTableMobile({
    super.key,
    required this.tableColumnHeaders,
    this.rows = const [],
    this.rowBuilder,
    this.rowCount,
    required this.noResultsMessage,
    this.scrollController,
    this.shrinkWrap = false,
    this.isLoadingMore = false,
    this.onRowTap,
  }) : assert(rowBuilder == null || rowCount != null, 'rowCount is required when rowBuilder is set');

  int get _effectiveRowCount => rowBuilder != null ? rowCount! : rows.length;

  List<Widget> _cellsForRow(int index) => rowBuilder != null ? rowBuilder!(index) : rows[index];

  @override
  Widget build(BuildContext context) {
    if (_effectiveRowCount == 0) {
      return Expanded(child: Center(child: noResultsMessage));
    }

    final list = ListView.builder(
      padding: const EdgeInsets.symmetric(vertical: 15),
      controller: shrinkWrap ? null : scrollController,
      shrinkWrap: shrinkWrap,
      physics: shrinkWrap ? const NeverScrollableScrollPhysics() : null,
      itemCount: _effectiveRowCount + 1,
      itemBuilder: (context, rowIndex) {
        if (rowIndex == _effectiveRowCount) {
          return DTTableLoadMoreIndicator(isLoadingMore: isLoadingMore);
        }

        final row = _cellsForRow(rowIndex);
        final labelRows = <DTLabelRow>[];

        for (var cellIndex = 0; cellIndex < row.length; cellIndex++) {
          final cell = row[cellIndex];
          final header = tableColumnHeaders.length > cellIndex
              ? tableColumnHeaders[cellIndex].name
              : '';

          labelRows.add(
            DTLabelRow(
              label: header,
              smallLabels: false,
              valueWidget: Align(
                alignment: AlignmentDirectional.centerStart,
                child: DefaultTextStyle.merge(textAlign: TextAlign.left, child: cell),
              ),
            ),
          );
        }

        final rowWidget = Padding(
          padding: const EdgeInsets.only(bottom: 12),
          child: DTLabelRow.group(children: labelRows),
        );

        if (onRowTap == null) return rowWidget;

        return GestureDetector(
          behavior: HitTestBehavior.opaque,
          onTap: () => onRowTap!(rowIndex),
          child: rowWidget,
        );
      },
    );

    return shrinkWrap ? list : Expanded(child: list);
  }
}
