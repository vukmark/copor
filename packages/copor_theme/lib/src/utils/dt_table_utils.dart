import 'package:copor_theme/copor_theme.dart';

/// 24-column grid span for a table column (1–24).
/// Each column gets `span / totalFlexSpans` of the available width.
/// Use [ColumnHeader.fixedWidth] to override with an exact pixel value instead.
enum DTColumnSize {
  col1,  col2,  col3,  col4,  col5,  col6,
  col7,  col8,  col9,  col10, col11, col12,
  col13, col14, col15, col16, col17, col18,
  col19, col20, col21, col22, col23, col24,
}

extension DTColumnSizeSpan on DTColumnSize {
  int get span => index + 1;
}

// ── Column width computation ───────────────────────────────────────────────────

/// Computes exact pixel widths for every column given [availableWidth].
///
/// Three column types, applied in priority order:
/// - [fixedWidth] — exact pixel value, subtracted from available width first.
/// - [size] — proportional share of the flex space using the 24-column grid.
/// - neither — "fill" columns that share whatever the grid columns don't claim.
///
/// Fill columns (no [size], no [fixedWidth]) behave like [Expanded] in a Row:
/// they split the space left over after sized columns have taken their
/// proportional share of the 24-column grid. If there are no fill columns,
/// sized columns distribute all flex space proportionally among themselves.
List<double> computeColWidths(List<DTColumnHeader> headers, double availableWidth) {
  final fixedTotal = headers.fold(0.0, (sum, h) => sum + (h.fixedWidth ?? 0.0));
  final flexAvailable = (availableWidth - fixedTotal).clamp(0.0, double.infinity);

  final sizedSpans = headers.fold(0, (sum, h) {
    if (h.fixedWidth != null || h.size == null) return sum;
    return sum + h.size!.span;
  });
  final fillCount = headers.where((h) => h.fixedWidth == null && h.size == null).length;

  if (fillCount == 0) {
    final unitWidth = sizedSpans > 0 ? flexAvailable / sizedSpans : 0.0;
    return headers.map((h) {
      if (h.fixedWidth != null) return h.fixedWidth!;
      return unitWidth * h.size!.span;
    }).toList();
  }

  // Grid columns claim (sizedSpans / 12) of the flex budget; fill columns
  // share the remainder. Clamp so sized columns never consume more than the
  // space that remains after each fill column gets at least 1/12 of flex.
  final maxGridFraction = ((24 - fillCount) / 24).clamp(0.0, 1.0);
  final gridFraction = (sizedSpans / 24).clamp(0.0, maxGridFraction);
  final gridBudget = flexAvailable * gridFraction;
  final fillBudget = flexAvailable - gridBudget;
  final sizedUnit = sizedSpans > 0 ? gridBudget / sizedSpans : 0.0;
  final fillWidth = fillBudget / fillCount;

  return headers.map((h) {
    if (h.fixedWidth != null) return h.fixedWidth!;
    if (h.size == null) return fillWidth;
    return sizedUnit * h.size!.span;
  }).toList();
}

/// ------- Constants -------- ///

class DTColumnHeader {
  final String name;
  final String? key;
  final String? sortKey;
  final String? info;
  final DTColumnSize? size;
  final double? fixedWidth;
  final String? defaultSortDir;
  final DTColumnAlignment? alignment;

  DTColumnHeader({
    required this.name,
    this.key,
    this.sortKey,
    this.info,
    this.size,
    this.fixedWidth,
    this.defaultSortDir,
    this.alignment = DTColumnAlignment.left,
  });
}

class SortDerivationResult {
  final Map<String, DTColumnHeader> sortableHeaders;

  final String? activeSortKey;
  final String? activeSortDir;

  final String? effectiveSortKey;
  final String? effectiveSortDir;

  const SortDerivationResult({
    required this.sortableHeaders,
    required this.activeSortKey,
    required this.activeSortDir,
    required this.effectiveSortKey,
    required this.effectiveSortDir,
  });
}

/// ---------- Sorting logic ----------  ///

SortDerivationResult deriveSortState(
  List<DTColumnHeader> headers,
  Map<String, dynamic> appliedFilters,
) {
  final sortableHeaders = {
    for (final h in headers)
      if (h.sortKey != null) h.sortKey!: h,
  };

  if (sortableHeaders.isEmpty) {
    return const SortDerivationResult(
      sortableHeaders: {},
      activeSortKey: null,
      activeSortDir: null,
      effectiveSortKey: null,
      effectiveSortDir: null,
    );
  }

  String? activeSortKey = appliedFilters.keys.firstWhere(
    (k) => sortableHeaders.containsKey(k),
    orElse: () => '',
  );
  activeSortKey = (activeSortKey.isEmpty) ? null : activeSortKey;

  String? activeSortDir = activeSortKey != null ? appliedFilters[activeSortKey] as String? : null;

  String? effectiveSortKey = activeSortKey;
  String? effectiveSortDir = activeSortDir;

  if (effectiveSortKey == null) {
    final withDefault = headers.firstWhere(
      (h) => h.sortKey != null && h.defaultSortDir != null,
      orElse: () => headers.firstWhere((h) => h.sortKey != null, orElse: () => headers.first),
    );
    if (withDefault.sortKey != null && withDefault.defaultSortDir != null) {
      effectiveSortKey = withDefault.sortKey;
      effectiveSortDir = withDefault.defaultSortDir;
    }
  }

  return SortDerivationResult(
    sortableHeaders: sortableHeaders,
    activeSortKey: activeSortKey,
    activeSortDir: activeSortDir,
    effectiveSortKey: effectiveSortKey,
    effectiveSortDir: effectiveSortDir,
  );
}

Map<String, dynamic> nextFiltersAfterSortClick({
  required List<DTColumnHeader> headers,
  required Map<String, dynamic> currentAppliedFilters,
  required String sortKey,
  required String? order,
  bool keepDefaultOnNeutral = false,
}) {
  final sortableHeaders = {
    for (final h in headers)
      if (h.sortKey != null) h.sortKey!: h,
  };

  final newFilters = Map<String, dynamic>.from(currentAppliedFilters)
    ..removeWhere((k, _) => sortableHeaders.containsKey(k));

  if (order == null) {
    if (keepDefaultOnNeutral) {
      final hdr = sortableHeaders[sortKey];
      final def = hdr?.defaultSortDir;
      if (def != null) newFilters[sortKey] = def;
    }
    return newFilters;
  }

  newFilters[sortKey] = order;
  return newFilters;
}
