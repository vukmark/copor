import 'package:copor_theme/src/components/display/dt_animated_chevron.dart';
import 'package:copor_theme/src/theme/extensions/copor_colors.dart';
import 'package:copor_theme/src/theme/extensions/copor_theme.dart';
import 'package:copor_theme/src/theme/tokens/spacing.dart';
import 'package:copor_theme/src/utils/phosphor_icons.dart';
import 'package:flutter/material.dart';

const _kBorderRadius = coporBorderRadius;
const _kHeaderPaddingH = 16.0;
const _kHeaderPaddingV = 12.0;
const _kIconSize = 15.0;
const _kAnimDuration = Duration(milliseconds: 220);
const _kContentPadding = 16.0;
const _kSlimContentPaddingV = 8.0;

TextStyle _kHeaderStyle(BuildContext context) =>
    CoporTheme.of(context).text.sectionTitle;

enum _DTExpandableSectionVariant { bordered, slim, splitHeader }

/// Collapsible showcase section with an animated expand/collapse.
///
/// [DTExpandableSection] — bordered card with full padding.
/// [DTExpandableSection.slim] — no outer border, no horizontal content padding;
///   only a bottom divider separates the header from the content.
/// [DTExpandableSection.splitHeader] — like [DTExpandableSection.slim], but the
///   header is two independent full-height tap targets: a square chevron button
///   that toggles expand/collapse, and the rest of the row (holding [titleWidget]
///   or [title]) which does not. Use this when the title itself needs its own
///   action (e.g. "enter" a row) that must not also toggle the section.
class DTExpandableSection extends StatefulWidget {
  final String title;
  final Widget? titleWidget;
  final Widget child;
  final bool initiallyExpanded;
  final bool? isExpanded;
  final bool enabled;
  final bool reverseHeader;
  final ValueChanged<bool>? onExpansionChanged;
  // Shows a small warning triangle next to the title, using the same
  // secondary/orange tokens DTBanner.warning and DTButton.toggle's `warning`
  // flag use, to flag that something inside [child] needs attention.
  final bool isWarning;
  final _DTExpandableSectionVariant _variant;

  const DTExpandableSection({
    super.key,
    required this.title,
    this.titleWidget,
    required this.child,
    this.initiallyExpanded = false,
    this.isExpanded,
    this.enabled = true,
    this.reverseHeader = false,
    this.onExpansionChanged,
    this.isWarning = false,
  }) : _variant = _DTExpandableSectionVariant.bordered;

  const DTExpandableSection.slim({
    super.key,
    required this.title,
    this.titleWidget,
    required this.child,
    this.initiallyExpanded = false,
    this.isExpanded,
    this.enabled = true,
    this.reverseHeader = false,
    this.onExpansionChanged,
    this.isWarning = false,
  }) : _variant = _DTExpandableSectionVariant.slim;

  const DTExpandableSection.splitHeader({
    super.key,
    required this.title,
    this.titleWidget,
    required this.child,
    this.initiallyExpanded = false,
    this.isExpanded,
    this.enabled = true,
    this.reverseHeader = false,
    this.onExpansionChanged,
    this.isWarning = false,
  }) : _variant = _DTExpandableSectionVariant.splitHeader;

  @override
  State<DTExpandableSection> createState() => _DTExpandableSectionState();
}

class _DTExpandableSectionState extends State<DTExpandableSection>
    with SingleTickerProviderStateMixin {
  late final AnimationController _controller;
  late final Animation<double> _expandAnim;
  late bool _isExpanded;

  @override
  void initState() {
    super.initState();
    _isExpanded = widget.isExpanded ?? widget.initiallyExpanded;
    _controller = AnimationController(
      vsync: this,
      duration: _kAnimDuration,
      value: _isExpanded ? 1.0 : 0.0,
    );
    _expandAnim = CurvedAnimation(parent: _controller, curve: Curves.easeInOut);
  }

  @override
  void didUpdateWidget(covariant DTExpandableSection oldWidget) {
    super.didUpdateWidget(oldWidget);
    if (widget.isExpanded != null && widget.isExpanded != _isExpanded) {
      setState(() => _isExpanded = widget.isExpanded!);
      if (_isExpanded) {
        _controller.forward();
      } else {
        _controller.reverse();
      }
    }
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  void _toggle() {
    if (!widget.enabled) return;
    final next = !_isExpanded;

    if (widget.isExpanded == null) {
      setState(() => _isExpanded = next);
      if (next) {
        _controller.forward();
      } else {
        _controller.reverse();
      }
    }

    widget.onExpansionChanged?.call(next);
  }

  @override
  Widget build(BuildContext context) {
    final dc = CoporColors.of(context);
    final isBordered = widget._variant == _DTExpandableSectionVariant.bordered;
    final isSplitHeader = widget._variant == _DTExpandableSectionVariant.splitHeader;
    final isSlimContent = !isBordered;

    final isEnabled = widget.enabled;

    final header = isSplitHeader
        ? _buildSplitHeader(dc, isEnabled)
        : _buildHeader(context, dc, isEnabled, isSlimContent);

    final expandedContent = SizeTransition(
      sizeFactor: _expandAnim,
      axisAlignment: -1,
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          if (isSlimContent) SizedBox(height: 8),
          Divider(height: 1, thickness: 1, color: dc.outlineSubtle),
          Padding(
            padding: isSlimContent
                ? const EdgeInsets.symmetric(vertical: _kSlimContentPaddingV)
                : const EdgeInsets.all(_kContentPadding),
            child: widget.child,
          ),
        ],
      ),
    );

    final column = Column(
      crossAxisAlignment: CrossAxisAlignment.stretch,
      children: [header, expandedContent],
    );

    if (isSlimContent) return column;

    return ClipRRect(
      borderRadius: BorderRadius.circular(_kBorderRadius),
      child: DecoratedBox(
        decoration: BoxDecoration(
          border: Border.all(color: dc.outlineSubtle),
          borderRadius: BorderRadius.circular(_kBorderRadius),
        ),
        child: column,
      ),
    );
  }

  // Small warning triangle shown next to the title when [DTExpandableSection.isWarning]
  // is set, using the same secondary/orange tokens DTBanner.warning uses elsewhere.
  Widget _buildWarningIcon(CoporColors dc) {
    return Padding(
      padding: const EdgeInsets.only(right: 8),
      child: Icon(
        PhosphorIconsThin.warning,
        size: _kIconSize,
        color: dc.onSecondaryContainer,
      ),
    );
  }

  Widget _buildHeader(BuildContext context, CoporColors dc, bool isEnabled, bool isSlimContent) {
    return Material(
      color: Colors.transparent,
      borderRadius: isSlimContent ? BorderRadius.circular(_kBorderRadius) : null,
      child: InkWell(
        onTap: isEnabled ? _toggle : null,
        hoverColor: isEnabled ? dc.surfaceHovered : Colors.transparent,
        splashColor: isEnabled ? dc.surfacePressed : Colors.transparent,
        mouseCursor: isEnabled ? SystemMouseCursors.click : MouseCursor.defer,
        borderRadius: isSlimContent ? BorderRadius.circular(_kBorderRadius) : null,
        child: Padding(
          padding: const EdgeInsets.symmetric(
            horizontal: _kHeaderPaddingH,
            vertical: _kHeaderPaddingV,
          ),
          child: Row(
            children: widget.reverseHeader
                ? [
                    Opacity(
                      opacity: isEnabled ? 1.0 : 0.4,
                      child: DTAnimatedChevron(
                        isOpen: _isExpanded,
                        size: _kIconSize,
                        color: dc.onSurfaceSubtle,
                        openColor: dc.onPrimaryContainer,
                      ),
                    ),
                    const SizedBox(width: _kHeaderPaddingH),
                    Expanded(
                      child: Row(
                        children: [
                          if (widget.isWarning) _buildWarningIcon(dc),
                          Flexible(
                            child:
                                widget.titleWidget ??
                                Text(widget.title, style: _kHeaderStyle(context)),
                          ),
                        ],
                      ),
                    ),
                  ]
                : [
                    Expanded(
                      child: Row(
                        children: [
                          if (widget.isWarning) _buildWarningIcon(dc),
                          Flexible(
                            child:
                                widget.titleWidget ??
                                Text(widget.title, style: _kHeaderStyle(context)),
                          ),
                        ],
                      ),
                    ),
                    Opacity(
                      opacity: isEnabled ? 1.0 : 0.4,
                      child: DTAnimatedChevron(
                        isOpen: _isExpanded,
                        size: _kIconSize,
                        color: dc.onSurfaceSubtle,
                        openColor: dc.onPrimaryContainer,
                      ),
                    ),
                  ],
          ),
        ),
      ),
    );
  }

  Widget _buildSplitHeader(CoporColors dc, bool isEnabled) {
    final chevronButton = AspectRatio(
      aspectRatio: 1,
      child: Material(
        color: Colors.transparent,
        borderRadius: BorderRadius.circular(_kBorderRadius),
        child: InkWell(
          onTap: isEnabled ? _toggle : null,
          borderRadius: BorderRadius.circular(_kBorderRadius),
          hoverColor: isEnabled ? dc.surfaceHovered : Colors.transparent,
          splashColor: isEnabled ? dc.surfacePressed : Colors.transparent,
          mouseCursor: isEnabled ? SystemMouseCursors.click : MouseCursor.defer,
          child: Center(
            child: Opacity(
              opacity: isEnabled ? 1.0 : 0.4,
              child: DTAnimatedChevron(
                isOpen: _isExpanded,
                size: _kIconSize,
                color: dc.onSurfaceSubtle,
                openColor: dc.onPrimaryContainer,
              ),
            ),
          ),
        ),
      ),
    );

    // A caller-supplied titleWidget owns its own full-height tap target (mirroring
    // chevronButton's own Material/InkWell filling its whole cell), so it's used
    // unwrapped here — adding padding around it would shrink its hover/splash area
    // below the chevron's. The plain-text fallback has no tap target of its own,
    // so it still gets the header's default padding.
    final titleArea =
        widget.titleWidget ??
        Padding(
          padding: const EdgeInsets.symmetric(
            horizontal: _kHeaderPaddingH,
            vertical: _kHeaderPaddingV,
          ),
          child: Align(
            alignment: Alignment.centerLeft,
            child: Row(
              mainAxisSize: MainAxisSize.min,
              children: [
                if (widget.isWarning) _buildWarningIcon(dc),
                Flexible(child: Text(widget.title, style: _kHeaderStyle(context))),
              ],
            ),
          ),
        );

    // A plain titleWidget (e.g. bare Text) has almost no intrinsic height on its
    // own, and IntrinsicHeight sizes the row to the tallest child's intrinsic
    // height — without a floor here, both zones (chevron included) would shrink
    // to a sliver. This keeps the row at least as tall as a comfortable chevron
    // touch target regardless of what the caller's titleWidget reports.
    return ConstrainedBox(
      constraints: BoxConstraints(minHeight: _kHeaderPaddingV * 2 + _kIconSize),
      child: IntrinsicHeight(
        child: Row(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: widget.reverseHeader
              ? [chevronButton, Expanded(child: titleArea)]
              : [Expanded(child: titleArea), chevronButton],
        ),
      ),
    );
  }

  String get title => widget.title;
}
