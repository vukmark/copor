import 'package:copor_theme/src/theme/extensions/copor_theme.dart';
import 'package:copor_theme/src/theme/extensions/dt_chrome_metrics.dart';
import 'package:copor_theme/src/theme/tokens/spacing.dart';
import 'package:flutter/material.dart';

const _kMobilePadding = 8.0;
const _kTrailingButtonSpacing = 8.0;

TextStyle _kTitleStyle(BuildContext context) {
  final dt = CoporTheme.of(context);
  return dt.text.appBarTitle.copyWith(color: dt.colors.onSurface);
}

/// Not a [PreferredSizeWidget] — that's only needed by whatever hands this
/// to `Scaffold.appBar` directly (wrap it in a plain `PreferredSize` there),
/// or by `DSAppBarShell` for the `DSScaffold` path. This widget only cares
/// about its own content height, resolved from [DTChromeMetrics] when
/// present, falling back to [kToolbarHeight] otherwise.
///
/// Carries no [SafeArea] of its own — the host scaffold is expected to wrap
/// its whole layout (appBar included) in a single top-level [SafeArea].
class DTAppBar extends StatelessWidget {
  final String title;
  final Widget? titleWidget;
  final Widget? leading;
  final List<Widget>? actions;
  final bool isMobile;

  const DTAppBar({
    super.key,
    this.title = '',
    this.titleWidget,
    this.leading,
    this.actions,
    this.isMobile = false,
  });

  @override
  Widget build(BuildContext context) {
    final dt = CoporTheme.of(context);
    final middle = titleWidget != null
        ? DefaultTextStyle(
            style: _kTitleStyle(context),
            textAlign: TextAlign.center,
            child: titleWidget!,
          )
        : Text(title, style: _kTitleStyle(context));
    final trailingChildren = actions;

    final padding = isMobile ? _kMobilePadding : 0.0;
    final contentHeight =
        DTChromeMetrics.maybeOf(context)?.appBarContentHeight ?? kToolbarHeight;

    final toolbar = Padding(
      padding: EdgeInsets.symmetric(horizontal: padding, vertical: 0),
      child: NavigationToolbar(
        leading: UnconstrainedBox(
          constrainedAxis: Axis.horizontal,
          child: leading,
        ),
        middle: middle,
        trailing: _buildTrailing(trailingChildren),
        centerMiddle: true,
      ),
    );

    if (isMobile) {
      return Container(
        decoration: BoxDecoration(
          color: dt.colors.surface,
          border: Border(bottom: BorderSide(color: dt.colors.outlineSubtle)),
          boxShadow: coporDropShadow(context),
        ),
        child: SizedBox(height: contentHeight, child: toolbar),
      );
    }

    return Container(
      color: Colors.transparent,
      child: SizedBox(height: contentHeight, child: toolbar),
    );
  }

  Widget? _buildTrailing(List<Widget>? actions) {
    if (actions == null || actions.isEmpty) return null;
    return Row(
      mainAxisSize: MainAxisSize.min,
      spacing: _kTrailingButtonSpacing,
      children: actions,
    );
  }
}
