import 'package:copor_theme/src/components/table/dt_table_desktop.dart';
import 'package:copor_theme/src/components/table/dt_table_mobile.dart';
import 'package:copor_theme/src/components/table/dt_table_cells.dart';
import 'package:copor_theme/src/models/dt_table_labels.dart';
import 'package:copor_theme/src/utils/dt_table_utils.dart';
import 'package:flutter/material.dart';

/// Pure presentation table widget with no bloc dependencies.
///
/// The caller is responsible for building cell widgets and providing
/// [DTTableLabels] via [DTTableLabelsProvider].
///
/// Switches between [DTTableDesktop] and [DTTableMobile] based on [isMobile].
///
/// In the main app, use `DTTableConnector` (in `lib/src/modules/DT/connectors/`)
/// which wires up [FilterBloc], [TableLazyLoadWrapper], and cell conversion.
///
/// About rows vs rowBuilder
///
/// Pre-built cell widgets, one list per row. Prefer [rowBuilder]/[rowCount]
/// for large row counts — this materializes every row's cells upfront
/// even though the underlying list/table only lays out and paints the visible ones.
/// final List<List<Widget>> rows;
///
/// Lazy alternative to [rows] — cells for row [index] are built only when
/// that row actually scrolls into view. Requires [rowCount]; when set,
/// [rows] is ignored.
/// final List<Widget> Function(int index)? rowBuilder;

class DTTable extends StatelessWidget {
  final List<DTColumnHeader> headers;
  final List<List<Widget>> rows;
  final List<Widget> Function(int index)? rowBuilder;
  final int? rowCount;
  final Widget noData;
  final DTTableLabels? labels;
  final bool isMobile;
  final ScrollController? scrollController;
  final String? activeSortKey;
  final String? activeSortDir;
  final void Function(String sortKey, String? order)? onSortClicked;
  final ValueChanged<int>? onRowTap;
  final double minWidth;
  final double dataRowMinHeight;
  final AlignmentGeometry dataCellAlignment;
  final bool scrollable;
  final bool shrinkWrap;
  final bool isVerticalBorderVisible;
  final bool isOutsideBorderVisible;
  final bool showRowDividers;
  final Color? headerColor;
  final Color? borderColor;
  final Color? headerBottomBorderColor;
  final Color? rowHoverColor;
  final bool isLoadingMore;

  const DTTable({
    super.key,
    required this.headers,
    this.rows = const [],
    this.rowBuilder,
    this.rowCount,
    required this.noData,
    this.labels,
    required this.isMobile,
    this.scrollController,
    this.activeSortKey,
    this.activeSortDir,
    this.onSortClicked,
    this.onRowTap,
    this.minWidth = 100,
    this.dataRowMinHeight = 52,
    this.dataCellAlignment = Alignment.centerLeft,
    this.scrollable = true,
    this.shrinkWrap = false,
    this.isVerticalBorderVisible = false,
    this.isOutsideBorderVisible = false,
    this.showRowDividers = true,
    this.headerColor,
    this.borderColor,
    this.headerBottomBorderColor,
    this.rowHoverColor,
    this.isLoadingMore = false,
  }) : assert(rowBuilder == null || rowCount != null, 'rowCount is required when rowBuilder is set');

  @override
  Widget build(BuildContext context) {
    return DTTableLabelsProvider(
      labels: labels ?? const DTTableLabels.empty(),
      isMobile: isMobile,
      child: isMobile
          ? DTTableMobile(
              tableColumnHeaders: headers,
              rows: rows,
              rowBuilder: rowBuilder,
              rowCount: rowCount,
              noResultsMessage: noData,
              scrollController: scrollController,
              shrinkWrap: shrinkWrap,
              isLoadingMore: isLoadingMore,
              onRowTap: onRowTap,
            )
          : DTTableDesktop(
              tableColumnHeaders: headers,
              rows: rows,
              rowBuilder: rowBuilder,
              rowCount: rowCount,
              noResultsMessage: noData,
              scrollController: scrollController,
              onSortClicked: onSortClicked,
              activeSortKey: activeSortKey,
              activeSortDir: activeSortDir,
              minWidth: minWidth,
              dataRowMinHeight: dataRowMinHeight,
              dataCellAlignment: dataCellAlignment,
              scrollable: scrollable,
              isVerticalBorderVisible: isVerticalBorderVisible,
              isOutsideBorderVisible: isOutsideBorderVisible,
              showRowDividers: showRowDividers,
              headerColor: headerColor,
              borderColor: borderColor,
              headerBottomBorderColor: headerBottomBorderColor,
              rowHoverColor: rowHoverColor,
              isLoadingMore: isLoadingMore,
              onRowTap: onRowTap,
      ),
    );
  }
}
