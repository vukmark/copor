import 'dart:async';

import 'package:copor_theme/copor_theme.dart';
import 'package:flutter/material.dart';

const _kContentMaxHeight = 480.0;

enum FloatingContainerActionPosition { top, bottom }

/// A layout component for floating card pages with two structural modes:
///
/// **[FloatingContainerActionPosition.top]**: [leading] | title | [trailing] pinned at top,
/// content below.
///
/// **[FloatingContainerActionPosition.bottom]**: title at top, content in the middle,
/// [leading] and [trailing] buttons pinned at the bottom.
///
/// Use [expandedChild] when you need a scrollable region (e.g. a list) to fill
/// remaining space while [children] stay fixed above it. When provided,
/// [children] render as non-scrolling content and [expandedChild] is placed in
/// an [Expanded] below them — the parent must provide a finite height (e.g. via
/// [DTModalShell]).
class DTFloatingLayout extends StatefulWidget {
  final String title;
  final List<Widget> children;
  final Widget? expandedChild;
  final FloatingContainerActionPosition actionPosition;
  final Widget? leading;
  final Widget? trailing;
  final IconData? icon;
  final bool isLoading;
  final EdgeInsetsGeometry padding;

  /// Overrides the auto-detected pin-to-bottom/expand behavior that normally
  /// depends on whether the parent offers finite height. Pass `false` to
  /// force the content to hug its own height (bottom row directly below
  /// content) even when the parent constraint happens to be finite but much
  /// taller than the content needs — e.g. a compact floating-card page
  /// centered in the available screen height. Leave `null` (default) to keep
  /// the existing auto-detect behavior used by modals/dialogs that
  /// legitimately want to fill a finite parent and pin their action row to
  /// the bottom.
  final bool? fillAvailableHeight;

  const DTFloatingLayout({
    super.key,
    required this.title,
    required this.children,
    this.expandedChild,
    this.actionPosition = FloatingContainerActionPosition.bottom,
    this.leading,
    this.trailing,
    this.icon,
    this.isLoading = false,
    this.padding = EdgeInsets.zero,
    this.fillAvailableHeight,
  });

  @override
  State<DTFloatingLayout> createState() => _DTFloatingLayoutState();
}

class _DTFloatingLayoutState extends State<DTFloatingLayout> {
  final _scrollController = ScrollController();

  bool _showLoading = false;
  bool _minimumDurationElapsed = true;
  Timer? _minimumDurationTimer;

  @override
  void initState() {
    super.initState();
    _showLoading = widget.isLoading;
    if (widget.isLoading) _startMinimumDurationTimer();
  }

  @override
  void didUpdateWidget(DTFloatingLayout oldWidget) {
    super.didUpdateWidget(oldWidget);

    if (widget.isLoading && !oldWidget.isLoading) {
      setState(() => _showLoading = true);
      _startMinimumDurationTimer();
    } else if (!widget.isLoading && oldWidget.isLoading && _minimumDurationElapsed) {
      setState(() => _showLoading = false);
    }
  }

  void _startMinimumDurationTimer() {
    _minimumDurationTimer?.cancel();
    _minimumDurationElapsed = false;
    _minimumDurationTimer = Timer(coporMinimumLoadingDuration, () {
      _minimumDurationElapsed = true;
      if (mounted && !widget.isLoading) setState(() => _showLoading = false);
    });
  }

  @override
  void dispose() {
    _minimumDurationTimer?.cancel();
    _scrollController.dispose();
    super.dispose();
  }

  Widget _buildBar(BuildContext context) {
    final dt = CoporTheme.of(context);
    final isTop = widget.actionPosition == FloatingContainerActionPosition.top;
    return Row(
      mainAxisAlignment: MainAxisAlignment.spaceBetween,
      children: [
        if (isTop && widget.leading != null) widget.leading!,
        Expanded(
          child: Row(
            mainAxisSize: MainAxisSize.max,
            mainAxisAlignment: MainAxisAlignment.center,
            spacing: 8,
            children: [
              if (widget.icon != null)
                IgnorePointer(
                  child: DTButton.surface(
                    icon: widget.icon,
                    label: '',
                    onPressed: () {},
                    border: isTop ? false : true,
                  ),
                ),
              Flexible(
                child: Text(
                  widget.title,
                  style: dt.text.sectionTitle,
                  overflow: TextOverflow.ellipsis,
                  maxLines: 2,
                  textAlign: TextAlign.center,
                ),
              ),
            ],
          ),
        ),
        if (isTop && widget.trailing != null) widget.trailing!,
      ],
    );
  }

  Widget? _buildBottomRow() {
    if (widget.actionPosition == FloatingContainerActionPosition.top) {
      return null;
    }
    if (widget.leading == null && widget.trailing == null) return null;
    if (widget.leading != null && widget.trailing != null) {
      return Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [widget.leading!, widget.trailing!],
      );
    }
    if (widget.trailing != null) {
      return Row(
        mainAxisAlignment: MainAxisAlignment.end,
        children: [widget.trailing!],
      );
    }
    return Row(children: [widget.leading!]);
  }

  @override
  Widget build(BuildContext context) {
    final bottomRow = _buildBottomRow();
    final isBottom =
        widget.actionPosition == FloatingContainerActionPosition.bottom;
    final hasExpandedChild = widget.expandedChild != null;

    // Bottom mode pins the action row to the bottom by filling the parent.
    // This only works when the parent provides finite height. When height is
    // unbounded (e.g. inside a scrolling container or floating card), we fall
    // back to top mode layout so the Column does not try to expand to infinity.
    //
    // expandedChild also requires filling the parent (finite height from DTModalShell).
    return LayoutBuilder(
      builder: (context, constraints) {
        final hasFiniteHeight =
            widget.fillAvailableHeight ?? constraints.maxHeight.isFinite;
        final canPin = isBottom && hasFiniteHeight;
        final needsExpand =
            canPin ||
            (hasExpandedChild && hasFiniteHeight) ||
            (_showLoading && hasFiniteHeight);

        final Widget contentArea;
        if (hasExpandedChild) {
          // Fixed children above, expandedChild fills remaining space.
          contentArea = Padding(
            padding: coporPageMargins,
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                ...widget.children,
                Expanded(child: widget.expandedChild!),
              ],
            ),
          );
        } else {
          contentArea = Scrollbar(
            controller: _scrollController,
            thumbVisibility: true,
            child: SingleChildScrollView(
              controller: _scrollController,
              padding: const EdgeInsets.only(left: 20, right: 20, top: 24),
              clipBehavior: Clip.none,
              child: Column(
                mainAxisSize: MainAxisSize.min,
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [...widget.children],
              ),
            ),
          );
        }

        final column = Column(
          mainAxisSize: needsExpand ? MainAxisSize.max : MainAxisSize.min,
          crossAxisAlignment: CrossAxisAlignment.start,
          mainAxisAlignment: MainAxisAlignment.start,
          children: [
            Padding(
              padding: EdgeInsetsGeometry.symmetric(horizontal: 20),
              child: _buildBar(context),
            ),
            const SizedBox(height: 12),
            // No built-in top/bottom spacing here (height: 0) — the content
            // area sits flush against the line so scrolled content can bleed
            // all the way up to it; the breathing room below the line lives
            // in the scroll view's own top padding instead, so it scrolls
            // away with the content rather than staying as dead space.
            const DTDivider.subtle(height: 0),
            if (needsExpand)
              Expanded(
                child: ClipRect(
                  clipBehavior: Clip.hardEdge,
                  child: contentArea,
                ),
              )
            else
              ClipRect(
                clipBehavior: Clip.hardEdge,
                child: ConstrainedBox(
                  constraints: const BoxConstraints(
                    maxHeight: _kContentMaxHeight,
                  ),
                  child: contentArea,
                ),
              ),
            if (bottomRow != null) ...[
              const SizedBox(height: 20),
              SafeArea(
                child: Padding(
                  padding: EdgeInsetsGeometry.symmetric(horizontal: 20),
                  child: bottomRow,
                ),
              ),
            ],
          ],
        );

        final paddedColumn = widget.padding == EdgeInsets.zero
            ? column
            : Padding(padding: widget.padding, child: column);

        return Stack(
          children: [
            paddedColumn,
            if (_showLoading)
              Positioned.fill(
                child: AbsorbPointer(
                  child: ColoredBox(
                    color: CoporTheme.of(
                      context,
                    ).colors.surface.withValues(alpha: 0.7),
                    child: const Center(child: DTRingLoader()),
                  ),
                ),
              ),
          ],
        );
      },
    );
  }
}
