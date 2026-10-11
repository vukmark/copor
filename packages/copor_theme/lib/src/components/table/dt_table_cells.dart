import 'package:copor_theme/copor_theme.dart';
import 'package:copor_theme/src/components/buttons/dt_common_buttons.dart';
import 'package:copor_theme/src/components/display/dt_info_chip.dart';
import 'package:copor_theme/src/models/dt_table_labels.dart';
import 'package:copor_theme/src/theme/extensions/copor_theme.dart';
import 'package:copor_theme/src/theme/tokens/spacing.dart';
import 'package:copor_theme/src/utils/dt_colors.dart';
import 'package:copor_theme/src/utils/dt_icons.dart';
import 'package:flutter/gestures.dart';
import 'package:flutter/material.dart';
import 'package:intl/intl.dart';

// ── InheritedWidget providing labels to all table cells ──────────────────────

class DTTableLabelsProvider extends InheritedWidget {
  final DTTableLabels labels;
  final bool isMobile;

  const DTTableLabelsProvider({
    super.key,
    required this.labels,
    required super.child,
    this.isMobile = false,
  });

  static DTTableLabelsProvider of(BuildContext context) {
    final provider = context.dependOnInheritedWidgetOfExactType<DTTableLabelsProvider>();
    assert(provider != null, 'DTTableLabelsProvider not found in widget tree');
    return provider!;
  }

  @override
  bool updateShouldNotify(DTTableLabelsProvider oldWidget) =>
      labels != oldWidget.labels || isMobile != oldWidget.isMobile;
}

// ── Cell island ───────────────────────────────────────────────────────────────

class _CellIsland extends StatelessWidget {
  final Widget child;

  const _CellIsland({required this.child});

  @override
  Widget build(BuildContext context) {
    if (DTTableLabelsProvider.of(context).isMobile) return child;
    final dt = CoporTheme.of(context);
    return Container(
      width: double.infinity,
      padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 10),
      decoration: BoxDecoration(
        color: dt.colors.surfaceContainer,
        border: Border.all(color: dt.colors.outlineDisabled),
        borderRadius: BorderRadius.circular(coporBorderRadius),
      ),
      child: child,
    );
  }
}

// ── Text ──────────────────────────────────────────────────────────────────────

class DTTextCell extends StatelessWidget {
  final String? text;
  final bool selectable;

  const DTTextCell({super.key, this.text, this.selectable = true});

  @override
  Widget build(BuildContext context) {
    if (text == null) return const SizedBox.shrink();
    final style = CoporTheme.of(context).text.tableCell;
    final child = selectable
        ? SelectableText(text!, maxLines: 3, minLines: 1, style: style)
        : Text(text!, maxLines: 3, overflow: TextOverflow.ellipsis, style: style);
    return _CellIsland(child: child);
  }
}

// ── Description ──────────────────────────────────────────────────────────────────────

class DTDescriptionCell extends StatefulWidget {
  final String? text;
  final bool selectable;

  const DTDescriptionCell({super.key, this.text, this.selectable = true});

  @override
  State<DTDescriptionCell> createState() => _DTDescriptionCellState();
}

class _DTDescriptionCellState extends State<DTDescriptionCell> {
  static const int _collapsedMaxLines = 6;
  bool _expanded = false;

  late TapGestureRecognizer _moreRecognizer;

  @override
  void initState() {
    super.initState();
    _moreRecognizer = TapGestureRecognizer()..onTap = () => setState(() => _expanded = true);
  }

  @override
  void dispose() {
    _moreRecognizer.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final text = widget.text;
    if (text == null || text.isEmpty) return const SizedBox.shrink();

    final style = CoporTheme.of(context).text.tableCell;
    final linkStyle = style.copyWith(
      color: CoporTheme.of(context).colors.primary,
    );

    final isMobile = DTTableLabelsProvider.of(context).isMobile;

    final child = isMobile
        ? _buildMobile(context, text, style, linkStyle)
        : _buildDesktop(context, text, style, linkStyle);

    return _CellIsland(child: child);
  }

  Widget _buildMobile(
      BuildContext context,
      String text,
      TextStyle style,
      TextStyle linkStyle,
      ) {
    if (_expanded) {
      return Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        mainAxisSize: MainAxisSize.min,
        children: [
          widget.selectable
              ? SelectableText(text, style: style)
              : Text(text, style: style),
          const SizedBox(height: 4),
          InkWell(
            onTap: () => setState(() => _expanded = false),
            child: Text('weniger', style: linkStyle),
          ),
        ],
      );
    }

    final approxWidth = MediaQuery.sizeOf(context).width - 64;

    final painter = TextPainter(
      text: TextSpan(text: text, style: style),
      maxLines: _collapsedMaxLines,
      textDirection: Directionality.of(context),
    )..layout(maxWidth: approxWidth > 0 ? approxWidth : 300);

    final overflows = painter.didExceedMaxLines;

    final textWidget = Text(
      text,
      style: style,
      maxLines: _collapsedMaxLines,
      overflow: TextOverflow.ellipsis,
    );

    if (!overflows) {
      return widget.selectable ? SelectableText(text, style: style) : textWidget;
    }

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      mainAxisSize: MainAxisSize.min,
      children: [
        textWidget,
        const SizedBox(height: 4),
        InkWell(
          onTap: () => setState(() => _expanded = true),
          child: Text('mehr', style: linkStyle),
        ),
      ],
    );
  }

  Widget _buildDesktop(
      BuildContext context,
      String text,
      TextStyle style,
      TextStyle linkStyle,
      ) {
    return LayoutBuilder(
      builder: (context, constraints) {
        final maxWidth = constraints.maxWidth;

        if (_expanded) {
          return Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            mainAxisSize: MainAxisSize.min,
            children: [
              widget.selectable
                  ? SelectableText(text, style: style)
                  : Text(text, style: style),
              const SizedBox(height: 4),
              InkWell(
                onTap: () => setState(() => _expanded = false),
                child: Text('weniger', style: linkStyle),
              ),
            ],
          );
        }

        final fullPainter = TextPainter(
          text: TextSpan(text: text, style: style),
          maxLines: _collapsedMaxLines,
          textDirection: Directionality.of(context),
        )..layout(maxWidth: maxWidth);

        if (!fullPainter.didExceedMaxLines) {
          return widget.selectable
              ? SelectableText(text, style: style)
              : Text(text, style: style);
        }

        final truncated = _truncateForInlineMore(text, style, linkStyle, maxWidth);

        final spans = [
          TextSpan(text: '$truncated', style: style),
          TextSpan(text: ' ...mehr', style: linkStyle, recognizer: _moreRecognizer),
        ];

        return widget.selectable
            ? SelectableText.rich(TextSpan(children: spans))
            : Text.rich(TextSpan(children: spans));
      },
    );
  }

  String _truncateForInlineMore(
      String text,
      TextStyle style,
      TextStyle linkStyle,
      double maxWidth,
      ) {
    const safetyMargin = 12.0;

    bool fits(int len) {
      final candidate = text.substring(0, len);
      final painter = TextPainter(
        text: TextSpan(
          children: [
            TextSpan(text: '$candidate', style: style),
            TextSpan(text: ' ...more', style: linkStyle),
          ],
        ),
        maxLines: _collapsedMaxLines,
        textDirection: Directionality.of(context),
      )..layout(maxWidth: maxWidth - safetyMargin);
      return !painter.didExceedMaxLines;
    }

    int low = 0, high = text.length;
    while (low < high) {
      final mid = (low + high + 1) ~/ 2;
      if (fits(mid)) {
        low = mid;
      } else {
        high = mid - 1;
      }
    }
    return text.substring(0, low).trimRight();
  }
}


// ── Color dot ─────────────────────────────────────────────────────────────────

class DTColorCell extends StatelessWidget {
  final int? color;

  const DTColorCell({super.key, this.color});

  @override
  Widget build(BuildContext context) {
    if (color == null) return const SizedBox.shrink();
    return Container(
      width: 24,
      height: 24,
      decoration: BoxDecoration(
        color: colorMap[color],
        borderRadius: BorderRadius.circular(6),
        border: Border.all(color: Colors.black12),
      ),
    );
  }
}

// ── Publish status ────────────────────────────────────────────────────────────

class DTPublishStatusCell extends StatelessWidget {
  final DTPublishStatus? publishStatus;

  const DTPublishStatusCell({super.key, this.publishStatus});

  @override
  Widget build(BuildContext context) {
    final labels = DTTableLabelsProvider.of(context).labels;
    return switch (publishStatus) {
      DTPublishStatus.published => Icon(DTIcons.published, semanticLabel: labels.published),
      DTPublishStatus.unpublished => Icon(DTIcons.unpublished, semanticLabel: labels.unpublished),
      DTPublishStatus.draft => Icon(DTIcons.draft, semanticLabel: labels.draft),
      _ => const SizedBox.shrink(),
    };
  }
}

// ── Copyable text ─────────────────────────────────────────────────────────────

class DTCopyableTextCell extends StatelessWidget {
  final String? copyText;
  final bool selectable;

  /// Called after the value has been copied to the clipboard — use this to
  /// route the confirmation through app-level feedback (e.g. a `DSBanner`).
  final VoidCallback onCopied;

  const DTCopyableTextCell({
    super.key,
    this.copyText,
    this.selectable = true,
    required this.onCopied,
  });

  @override
  Widget build(BuildContext context) {
    if (copyText == null) return const SizedBox.shrink();
    final labels = DTTableLabelsProvider.of(context).labels;
    return _CellIsland(
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Flexible(
            child: selectable
                ? SelectableText(copyText!, maxLines: 1)
                : Text(copyText!, maxLines: 1, overflow: TextOverflow.ellipsis),
          ),
          DTCommonButtons.copy(
            value: copyText!,
            semanticLabel: labels.copy,
            onCopied: onCopied,
          ),
        ],
      ),
    );
  }
}

// ── Date ──────────────────────────────────────────────────────────────────────

class DTDateCell extends StatelessWidget {
  final String? date;
  final bool selectable;

  const DTDateCell({super.key, this.date, this.selectable = true});

  String _formatDate(String raw) {
    try {
      final dt = DateTime.parse(raw).toLocal();
      return '${dt.day.toString().padLeft(2, '0')}.${dt.month.toString().padLeft(2, '0')}.${dt.year}';
    } catch (_) {
      return raw;
    }
  }

  @override
  Widget build(BuildContext context) {
    if (date == null) return const SizedBox.shrink();
    final formatted = _formatDate(date!);
    final style = CoporTheme.of(context).text.tableCell;
    return _CellIsland(
      child: selectable
          ? SelectableText(formatted, style: style)
          : Text(formatted, style: style),
    );
  }
}

// ── Date & Time ───────────────────────────────────────────────────────────────

class DTDateTimeCell extends StatelessWidget {
  final String? date;
  final bool selectable;
  final bool showWeekday;
  final String languageCode;

  const DTDateTimeCell({
    super.key,
    this.date,
    this.selectable = true,
    this.showWeekday = false,
    this.languageCode = 'en',
  });

  String _formatDateTime(String raw) {
    try {
      final dt = DateTime.parse(raw).toLocal();
      final datePart = '${dt.day.toString().padLeft(2, '0')}.'
          '${dt.month.toString().padLeft(2, '0')}.'
          '${dt.year}';
      final timePart = '${dt.hour.toString().padLeft(2, '0')}:'
          '${dt.minute.toString().padLeft(2, '0')}';
      return '$datePart\n$timePart';
    } catch (_) {
      return raw;
    }
  }

  String? _formatWeekday(String raw) {
    try {
      final dt = DateTime.parse(raw).toLocal();
      try {
        return DateFormat('EEEE', languageCode).format(dt);
      } catch (_) {
        return DateFormat('EEEE').format(dt);
      }
    } catch (_) {
      return null;
    }
  }

  @override
  Widget build(BuildContext context) {
    if (date == null) return const SizedBox.shrink();

    final formatted = _formatDateTime(date!);
    final style = CoporTheme.of(context).text.tableCell;

    final display = showWeekday
        ? [_formatWeekday(date!), formatted].whereType<String>().join('\n')
        : formatted;

    return _CellIsland(
      child: selectable
          ? SelectableText(display, style: style)
          : Text(display, style: style),
    );
  }
}

// ── Priority ──────────────────────────────────────────────────────────────────

class DTPriorityCell extends StatelessWidget {
  final DTPriority? priority;

  const DTPriorityCell({super.key, this.priority});

  @override
  Widget build(BuildContext context) {
    final labels = DTTableLabelsProvider.of(context).labels;
    return switch (priority) {
      DTPriority.normal => DTInfoChip.surface(icon: DTIcons.priorityNormal, label: labels.normal),
      DTPriority.high => DTInfoChip.surface(icon: DTIcons.priorityHigh, label: labels.high),
      DTPriority.urgent => DTInfoChip.surface(icon: DTIcons.priorityUrgent, label: labels.urgent),
      _ => const SizedBox.shrink(),
    };
  }
}

// ── Progress ──────────────────────────────────────────────────────────────────

class DTProgressCell extends StatelessWidget {
  final DTProgress? progress;

  const DTProgressCell({super.key, this.progress});

  @override
  Widget build(BuildContext context) {
    final labels = DTTableLabelsProvider.of(context).labels;
    return switch (progress) {
      DTProgress.toDo => DTInfoChip.surface(icon: DTIcons.progressTodo, label: labels.todo),
      DTProgress.started => DTInfoChip.surface(icon: DTIcons.progressStarted, label: labels.started),
      DTProgress.halfWay => DTInfoChip.surface(icon: DTIcons.progressHalfway, label: labels.halfway),
      DTProgress.almostDone => DTInfoChip.surface(icon: DTIcons.progressAlmostDone, label: labels.almostDone),
      DTProgress.finished => DTInfoChip.surface(icon: DTIcons.progressDone, label: labels.finished),
      _ => const SizedBox.shrink(),
    };
  }
}

// ── Checked ───────────────────────────────────────────────────────────────────

class DTCheckedCell extends StatelessWidget {
  final bool? isChecked;

  const DTCheckedCell({super.key, this.isChecked});

  @override
  Widget build(BuildContext context) {
    final labels = DTTableLabelsProvider.of(context).labels;
    if (isChecked == true) return Icon(DTIcons.checked, semanticLabel: labels.trueLabel);
    return Icon(DTIcons.unchecked, semanticLabel: labels.falseLabel);
  }
}

// ── Featured ──────────────────────────────────────────────────────────────────

class DTFeaturedCell extends StatelessWidget {
  final bool? isFeatured;

  const DTFeaturedCell({super.key, this.isFeatured});

  @override
  Widget build(BuildContext context) {
    if (isFeatured != true) return const SizedBox.shrink();
    final labels = DTTableLabelsProvider.of(context).labels;
    return Icon(DTIcons.priorityNormal, semanticLabel: labels.currentPeriodLabel);
  }
}

// ── Hidden text ───────────────────────────────────────────────────────────────

class DTHiddenTextCell extends StatelessWidget {
  final String? hiddenText;

  const DTHiddenTextCell({super.key, this.hiddenText});

  @override
  Widget build(BuildContext context) {
    if (hiddenText == null) return const SizedBox.shrink();
    return _DTHiddenTextCellBody(value: hiddenText!);
  }
}

class _DTHiddenTextCellBody extends StatefulWidget {
  final String value;

  const _DTHiddenTextCellBody({required this.value});

  @override
  State<_DTHiddenTextCellBody> createState() => _DTHiddenTextCellBodyState();
}

class _DTHiddenTextCellBodyState extends State<_DTHiddenTextCellBody> {
  bool _visible = false;

  @override
  Widget build(BuildContext context) {
    return Row(
      mainAxisSize: MainAxisSize.min,
      children: [
        Flexible(
          child: Text(
            _visible ? widget.value : '••••••••',
            maxLines: 1,
            overflow: TextOverflow.ellipsis,
          ),
        ),
        IconButton(
          padding: const EdgeInsets.symmetric(horizontal: 4),
          visualDensity: VisualDensity.compact,
          icon: Icon(_visible ? DTIcons.hide : DTIcons.show, size: 17),
          onPressed: () => setState(() => _visible = !_visible),
        ),
      ],
    );
  }
}

// ── Action ────────────────────────────────────────────────────────────────────

class DTActionCell extends StatelessWidget {
  final List<Widget> children;

  const DTActionCell({super.key, required this.children});

  @override
  Widget build(BuildContext context) {
    final isMobile = DTTableLabelsProvider.of(context).isMobile;
    return Row(
      mainAxisAlignment: isMobile ? MainAxisAlignment.start : MainAxisAlignment.end,
      children: [
        for (int i = 0; i < children.length; i++) ...[
          if (i > 0) const SizedBox(width: 5),
          children[i],
        ],
      ],
    );
  }
}