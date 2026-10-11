import 'package:copor_theme/copor_theme.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import '../loading/ds_loading_cubit.dart';
import '../loading/ds_loading_overlays.dart';
import 'ds_chrome_card.dart';

class DSPageWrapper extends StatelessWidget {
  final List<Widget> children;
  final EdgeInsetsGeometry? padding;
  final bool isMobile;
  final bool scrollable;
  final ScrollController? scrollController;
  final bool _isFloating;
  final bool isModal;

  const DSPageWrapper({
    super.key,
    required this.children,
    this.padding,
    required this.isMobile,
    this.scrollable = false,
    this.scrollController,
  }) : _isFloating = false,
       isModal = false;

  const DSPageWrapper.floating({
    super.key,
    required this.children,
    this.padding,
    required this.isMobile,
    this.isModal = false,
    this.scrollable = false,
    this.scrollController,
  }) : _isFloating = true;

  EdgeInsetsGeometry get _padding =>
      padding ??
      (_isFloating
          ? coporFloatingFormPadding
          : (isMobile ? coporMobilePagePadding : coporPagePadding));

  // Non-flex children of a Column always get unbounded main-axis
  // constraints, regardless of the Column's own constraint — so filling
  // the viewport requires an explicit Expanded, not just mainAxisSize.max.
  Widget _buildColumn({bool fill = false}) {
    if (fill && children.length == 1) {
      return Column(
        mainAxisSize: MainAxisSize.max,
        children: [Expanded(child: children.single)],
      );
    }
    return Column(
      mainAxisSize: _isFloating ? MainAxisSize.min : MainAxisSize.max,
      children: children,
    );
  }

  Widget _wrapScrollable(Widget content) => scrollable
      ? SingleChildScrollView(controller: scrollController, child: content)
      : content;

  Widget _buildFloatingCard(BuildContext context, Widget content) {
    final loadingState = context.watch<DSLoadingCubit>().state;

    final cardBody = scrollable
        ? SingleChildScrollView(controller: scrollController, child: content)
        : content;

    final decoratedCard = DSChromeCard(
      child: Stack(
        clipBehavior: Clip.none,
        children: [
          cardBody,
          Positioned.fill(
            child: DSLoadingOverlays(
              isPageLoading: loadingState.isPageLoading,
              isLoading: loadingState.isLoading,
              showDebugOverlay: false,
              loadingSources: loadingState.loadingSources,
            ),
          ),
        ],
      ),
    );

    return Center(
      child: ConstrainedBox(
        constraints: const BoxConstraints(maxWidth: coporCompactContentWidth),
        child: !scrollable
            ? decoratedCard
            : LayoutBuilder(
                builder: (context, viewport) {
                  return ConstrainedBox(
                    constraints: BoxConstraints(maxHeight: viewport.maxHeight),
                    child: decoratedCard,
                  );
                },
              ),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    final dt = CoporTheme.of(context);
    final fillMobileHeight = isMobile && _isFloating && !scrollable;
    final content = Padding(
      padding: _padding,
      child: _buildColumn(fill: fillMobileHeight),
    );

    if (isMobile) {
      final body = _isFloating
          ? _wrapScrollable(content)
          : _wrapScrollable(Center(child: content));
      return ColoredBox(color: dt.colors.surface, child: body);
    }

    if (_isFloating) {
      final card = _buildFloatingCard(context, content);
      if (isModal) {
        return Container(
          clipBehavior: Clip.none,
          color: dt.colors.scrim.withValues(alpha: 0.5),
          child: card,
        );
      }
      return card;
    }

    return _wrapScrollable(content);
  }
}
