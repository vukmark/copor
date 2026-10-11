import 'dart:math';
import 'package:copor_theme/copor_theme.dart';
import 'package:copor_theme/src/components/table/widgets/dt_table_load_more_indicator.dart';
import 'package:flutter/material.dart';

// ── Constants ─────────────────────────────────────────────────────────────────

const double _kHeaderMinHeight = 48.0;
const double _kBorderWidth = 1.0;
const double _kColPaddingH = 16.0;
const double _kColPaddingV = 12.0;
const double _kIconSize = 16.0;

// ── DTTableDesktop ────────────────────────────────────────────────────────────

class DTTableDesktop extends StatelessWidget {
  final List<DTColumnHeader> tableColumnHeaders;
  final List<List<Widget>> rows;
  final List<Widget> Function(int index)? rowBuilder;
  final int? rowCount;
  final Widget noResultsMessage;
  final void Function(String sortKey, String? order)? onSortClicked;
  final String? activeSortKey;
  final String? activeSortDir;
  final double minWidth;
  final double dataRowMinHeight;
  final AlignmentGeometry dataCellAlignment;
  final bool isVerticalBorderVisible;
  final bool isOutsideBorderVisible;
  final bool showRowDividers;
  final ScrollController? scrollController;
  final Color? headerColor;
  final Color? borderColor;
  final Color? headerBottomBorderColor;
  final Color? rowHoverColor;
  final bool scrollable;
  final bool isLoadingMore;
  final ValueChanged<int>? onRowTap;

  const DTTableDesktop({
    super.key,
    required this.tableColumnHeaders,
    this.rows = const [],
    this.rowBuilder,
    this.rowCount,
    required this.noResultsMessage,
    this.onSortClicked,
    this.activeSortKey,
    this.activeSortDir,
    this.minWidth = 400,
    this.dataRowMinHeight = 52,
    this.dataCellAlignment = Alignment.centerLeft,
    this.isVerticalBorderVisible = false,
    this.isOutsideBorderVisible = false,
    this.showRowDividers = true,
    this.scrollController,
    this.headerColor,
    this.borderColor,
    this.headerBottomBorderColor,
    this.rowHoverColor,
    this.scrollable = true,
    this.isLoadingMore = false,
    this.onRowTap,
  }) : assert(rowBuilder == null || rowCount != null, 'rowCount is required when rowBuilder is set');

  int get _effectiveRowCount => rowBuilder != null ? rowCount! : rows.length;

  List<Widget> _cellsForRow(int index) => rowBuilder != null ? rowBuilder!(index) : rows[index];

  @override
  Widget build(BuildContext context) {
    final dt = CoporTheme.of(context);
    final bColor = borderColor ?? dt.colors.outline;
    final hColor = headerColor ?? dt.colors.surfaceContainer;

    final layout = LayoutBuilder(
      builder: (context, constraints) {
        final totalWidth = max(constraints.maxWidth, minWidth);
        final colWidths = computeColWidths(tableColumnHeaders, totalWidth);

        Widget scrollView = CustomScrollView(
          controller: scrollController,
          shrinkWrap: !scrollable,
          physics: scrollable ? null : const NeverScrollableScrollPhysics(),
          slivers: [
            SliverPersistentHeader(
              pinned: scrollable,
              delegate: _HeaderDelegate(
                headers: tableColumnHeaders,
                colWidths: colWidths,
                onSortClicked: onSortClicked,
                activeSortKey: activeSortKey,
                activeSortDir: activeSortDir,
                headerColor: hColor,
                borderColor: bColor,
                headerBottomBorderColor: headerBottomBorderColor,
                isVerticalBorderVisible: isVerticalBorderVisible,
              ),
            ),
            if (_effectiveRowCount == 0)
              SliverFillRemaining(hasScrollBody: false, child: Center(child: noResultsMessage))
            else
              SliverList.builder(
                itemCount: _effectiveRowCount,
                itemBuilder: (ctx, i) => _DataRow(
                  cells: _cellsForRow(i),
                  colWidths: colWidths,
                  borderColor: dt.colors.outlineSubtle,
                  isVerticalBorderVisible: isVerticalBorderVisible,
                  minHeight: dataRowMinHeight,
                  cellAlignment: dataCellAlignment,
                  showBottomBorder:
                      showRowDividers && (i < _effectiveRowCount - 1 || isOutsideBorderVisible),
                  hoverColor: rowHoverColor,
                  onTap: onRowTap == null ? null : () => onRowTap!(i),
                ),
              ),
            SliverToBoxAdapter(child: DTTableLoadMoreIndicator(isLoadingMore: isLoadingMore)),
          ],
        );

        if (isOutsideBorderVisible) {
          scrollView = DecoratedBox(
            decoration: BoxDecoration(
              border: Border.all(color: bColor, width: _kBorderWidth),
              borderRadius: BorderRadius.circular(coporBorderRadius),
            ),
            child: ClipRRect(
              borderRadius: BorderRadius.circular(coporBorderRadius),
              child: scrollView,
            ),
          );
        }

        return SingleChildScrollView(
          scrollDirection: Axis.horizontal,
          child: SizedBox(width: totalWidth, child: scrollView),
        );
      },
    );

    return scrollable ? Expanded(child: layout) : layout;
  }
}

// ── Header (sticky) ───────────────────────────────────────────────────────────

class _HeaderDelegate extends SliverPersistentHeaderDelegate {
  final List<DTColumnHeader> headers;
  final List<double> colWidths;
  final void Function(String, String?)? onSortClicked;
  final String? activeSortKey;
  final String? activeSortDir;
  final Color? headerColor;
  final Color? borderColor;
  final Color? headerBottomBorderColor;
  final bool isVerticalBorderVisible;
  late final double _calculatedHeight;

  _HeaderDelegate({
    required this.headers,
    required this.colWidths,
    this.onSortClicked,
    this.activeSortKey,
    this.activeSortDir,
    this.headerColor,
    this.borderColor,
    this.headerBottomBorderColor,
    required this.isVerticalBorderVisible,
  }) {
    _calculatedHeight = _calculateHeaderHeight();
  }

  double _calculateHeaderHeight() {
    const verticalPadding = _kColPaddingV * 2;
    const minHeight = _kHeaderMinHeight;
    const estimatedIconWidth = 24.0;
    const estimatedInfoIconWidth = 28.0;

    bool needsTwoLines = false;
    bool needsThreeLines = false;

    for (int i = 0; i < headers.length; i++) {
      final header = headers[i];
      double availableWidth = colWidths[i] - (_kColPaddingH * 2);

      if (header.sortKey != null) {
        availableWidth -= estimatedIconWidth;
      }
      if (header.info != null) {
        availableWidth -= estimatedInfoIconWidth;
      }

      final maxCharsPerLine = (availableWidth / 6).ceil();

      if (header.name.length > maxCharsPerLine * 2 || header.name.length > 40) {
        needsThreeLines = true;
        break;
      }
      if (header.name.length > maxCharsPerLine || header.name.length > 20) {
        needsTwoLines = true;
      }
    }

    if (needsThreeLines) {
      return max(minHeight, verticalPadding + 50); // 3 lines
    }
    if (needsTwoLines) {
      return max(minHeight, verticalPadding + 30); // 2 lines
    }
    return minHeight;
  }

  @override
  double get maxExtent => _calculatedHeight;

  @override
  double get minExtent => _calculatedHeight;

  @override
  bool shouldRebuild(_HeaderDelegate old) {
    final oldSum = old.colWidths.fold(0.0, (a, b) => a + b);
    final newSum = colWidths.fold(0.0, (a, b) => a + b);

    if (old.headers.length != headers.length) {
      return true;
    }
    for (int i = 0; i < headers.length; i++) {
      if (old.headers[i].name != headers[i].name) {
        return true;
      }
      if (old.headers[i].alignment != headers[i].alignment) {
        return true;
      }
      if ((old.colWidths[i] - colWidths[i]).abs() > 5) {
        return true;
      }
    }

    return old.activeSortKey != activeSortKey ||
        old.activeSortDir != activeSortDir ||
        old.headerColor != headerColor ||
        old.borderColor != borderColor ||
        old.headerBottomBorderColor != headerBottomBorderColor ||
        old.isVerticalBorderVisible != isVerticalBorderVisible ||
        (oldSum - newSum).abs() > 0.5;
  }

  @override
  Widget build(BuildContext context, double shrinkOffset, bool overlapsContent) {
    final dt = CoporTheme.of(context);
    final bColor = borderColor ?? dt.colors.outline;
    final bottomColor = headerBottomBorderColor ?? bColor;
    final uniformColors = bottomColor == bColor;
    final side = BorderSide(color: bColor, width: _kBorderWidth);

    final totalColsWidth =
        colWidths.fold(0.0, (a, b) => a + b) +
        (isVerticalBorderVisible ? (headers.length - 1) * _kBorderWidth : 0.0);

    return SizedBox(
      width: totalColsWidth,
      height: _calculatedHeight,
      child: DecoratedBox(
        decoration: BoxDecoration(
          color: headerColor,
          borderRadius: uniformColors
              ? const BorderRadius.only(
                  topLeft: Radius.circular(coporBorderRadius),
                  topRight: Radius.circular(coporBorderRadius),
                )
              : null,
          border: uniformColors
              ? Border.all(color: bColor, width: _kBorderWidth)
              : Border(
                  top: side,
                  left: side,
                  right: side,
                  bottom: BorderSide(color: bottomColor, width: _kBorderWidth),
                ),
        ),
        child: Row(
          crossAxisAlignment: CrossAxisAlignment.center,
          children: [
            for (var i = 0; i < headers.length; i++) ...[
              if (isVerticalBorderVisible && i > 0)
                SizedBox(
                  width: _kBorderWidth,
                  child: ColoredBox(color: bColor),
                ),
              SizedBox(
                width: colWidths[i],
                height: _calculatedHeight,
                child: _HeaderCell(
                  header: headers[i],
                  activeSortDir: headers[i].sortKey == activeSortKey
                      ? activeSortDir
                      : (activeSortKey == null ? headers[i].defaultSortDir : null),
                  onSortClicked: onSortClicked,
                ),
              ),
            ],
          ],
        ),
      ),
    );
  }
}

// ── Header cell ───────────────────────────────────────────────────────────────

class _HeaderCell extends StatelessWidget {
  final DTColumnHeader header;
  final String? activeSortDir;
  final void Function(String, String?)? onSortClicked;

  const _HeaderCell({required this.header, this.activeSortDir, this.onSortClicked});

  @override
  Widget build(BuildContext context) {
    final dt = CoporTheme.of(context);
    final dc = dt.colors;

    final content = Row(
      crossAxisAlignment: CrossAxisAlignment.center,
      mainAxisAlignment: header.alignment == DTColumnAlignment.right
          ? MainAxisAlignment.end
          : MainAxisAlignment.start,
      children: [
        Flexible(child: Text(header.name, style: dt.text.columnHeader)),
        if (header.sortKey != null && onSortClicked != null)
          Padding(
            padding: const EdgeInsets.only(left: 8),
            child: Semantics(
              label: switch (activeSortDir ?? '') {
                'asc' => 'Sorted ascending',
                'desc' => 'Sorted descending',
                _ => 'Sort ascending or descending',
              },
              child: Icon(
                switch (activeSortDir ?? '') {
                  'asc' => DTIcons.sortAsc,
                  'desc' => DTIcons.sortDesc,
                  _ => DTIcons.sortNeutral,
                },
                size: _kIconSize,
                color: dc.onSurfaceSubtle,
              ),
            ),
          ),
        if (header.info != null)
          Padding(
            padding: const EdgeInsets.only(left: 4),
            child: Semantics(
              label: 'More information: ${header.info!}',
              child: Icon(DTIcons.info, size: _kIconSize),
            ),
          ),
      ],
    );

    final cellContent = Padding(
      padding: const EdgeInsets.only(
        top: 6,
        bottom: 6,
        left: 6,
        right: 12,
      //  horizontal: _kColPaddingH,
      //   vertical: _kColPaddingV
      ),
      child: Align(
        alignment: header.alignment == DTColumnAlignment.right
            ? Alignment.centerRight
            : Alignment.centerLeft,
        child: content,
      ),
    );

    if (header.sortKey == null || onSortClicked == null) {
      return cellContent;
    }

    return MouseRegion(
      cursor: SystemMouseCursors.click,
      child: Material(
        color: Colors.transparent,
        borderRadius: BorderRadius.circular(coporBorderRadius),
        child: InkWell(
          borderRadius: BorderRadius.circular(coporBorderRadius),
          splashColor: dc.surfacePressed,
          hoverColor: dc.surfaceHovered,
          onTap: () {
            final nextDir = switch (activeSortDir) {
              null => 'asc',
              'asc' => 'desc',
              _ => null,
            };
            onSortClicked!(header.sortKey!, nextDir);
          },
          child: cellContent,
        ),
      ),
    );
  }
}

// ── Data row ──────────────────────────────────────────────────────────────────

class _DataRow extends StatefulWidget {
  final List<Widget> cells;
  final List<double> colWidths;
  final Color borderColor;
  final bool isVerticalBorderVisible;
  final double minHeight;
  final AlignmentGeometry cellAlignment;
  final bool showBottomBorder;
  final Color? hoverColor;
  final VoidCallback? onTap;

  const _DataRow({
    required this.cells,
    required this.colWidths,
    required this.borderColor,
    required this.isVerticalBorderVisible,
    required this.minHeight,
    required this.cellAlignment,
    required this.showBottomBorder,
    this.hoverColor,
    this.onTap,
  });

  @override
  State<_DataRow> createState() => _DataRowState();
}

class _DataRowState extends State<_DataRow> {
  var _isHovered = false;

  @override
  Widget build(BuildContext context) {
    final row = DecoratedBox(
      decoration: BoxDecoration(
        color: _isHovered ? widget.hoverColor : null,
        border: widget.showBottomBorder
            ? Border(
                bottom: BorderSide(color: widget.borderColor, width: _kBorderWidth),
              )
            : null,
      ),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.center,
        children: [
          for (var i = 0; i < widget.cells.length; i++) ...[
            if (widget.isVerticalBorderVisible && i > 0)
              SizedBox(
                width: _kBorderWidth,
                child: ColoredBox(color: widget.borderColor),
              ),
            ConstrainedBox(
              constraints: BoxConstraints(minHeight: widget.minHeight),
              child: SizedBox(
                width: widget.colWidths[i],
                child: Padding(
                  padding: const EdgeInsets.only(
                    top: 6,
                    bottom: 6,
                    left: 6,
                    right: 12,
                  //  horizontal: _kColPaddingH,
                  //  vertical: _kColPaddingV,
                  ),
                  child: Align(
                      alignment: widget.cellAlignment,
                      child: widget.cells[i],
                  ),
                ),
              ),
            ),
          ],
        ],
      ),
    );

    if (widget.onTap == null && widget.hoverColor == null) return row;

    return MouseRegion(
      cursor: widget.onTap == null ? MouseCursor.defer : SystemMouseCursors.click,
      onEnter: widget.hoverColor == null ? null : (_) => setState(() => _isHovered = true),
      onExit: widget.hoverColor == null ? null : (_) => setState(() => _isHovered = false),
      child: GestureDetector(behavior: HitTestBehavior.opaque, onTap: widget.onTap, child: row),
    );
  }
}
