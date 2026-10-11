import 'package:copor_theme/copor_theme.dart';
import 'package:flutter/material.dart';

const _kVerticalPadding = 8.0;
const _kSmallAvatarSpacing = 15.0;
const _kFirstChipSpacing = 16.0;
const _kChipSpacing = 8.0;
const _kInfoRowGap = 5.0;
const _kInfoRowSpacing = 12.0;
const _kMobileAvatarSpacing = 12.0;
const _kWrapRunSpacing = 4.0;
const _kLargeAvatarGap = 16.0;
const _kLargeChipsGap = 4.0;
const _kInfoRowPaddingH = 8.0;
const _kInfoRowPaddingV = 4.0;
const _kInfoRowBorderRadius = 8.0;
const _kInfoRowIconSize = 13.0;
const _kInfoRowLabelSpacing = 5.0;

TextStyle _kPageTitleStyle(BuildContext context) => CoporTheme.of(context).text.pageTitle;

TextStyle _kSectionTitleStyle(BuildContext context) => CoporTheme.of(context).text.sectionTitle;

TextStyle _kHeroTitleStyle(BuildContext context) => CoporTheme.of(context).text.heroTitle;

TextStyle _kBodySecondaryStyle(BuildContext context) => CoporTheme.of(context).text.bodySecondary;

enum _Layout { small, mobile, large }

/// A reusable entity header that comes in two layouts.
///
/// [DTEntityHeader.small] — horizontal compact row (avatar left, title + chips right).
/// [DTEntityHeader.large] — centered vertical hero (avatar on top, title + chips below).
class DTEntityHeader extends StatelessWidget {
  final Widget avatar;
  final String title;
  final List<Widget> chips;
  final List<Widget> infoRows;
  final List<Widget> actionIcons;
  final Color? backgroundColor;
  final Widget? trailing;
  final _Layout _layout;
  final bool? isActive;


  const DTEntityHeader.small({
    super.key,
    required this.avatar,
    required this.title,
    this.chips = const [],
    this.infoRows = const [],
    this.actionIcons = const [],
    this.backgroundColor,
    this.trailing,
    this.isActive,
  }) : _layout = _Layout.small;

  const DTEntityHeader.mobile({
    super.key,
    required this.avatar,
    required this.title,
    this.chips = const [],
    this.infoRows = const [],
    this.actionIcons = const [],
    this.backgroundColor,
    this.isActive,
  }) : trailing = null,
       _layout = _Layout.mobile;

  const DTEntityHeader.large({
    super.key,
    required this.avatar,
    required this.title,
    this.chips = const [],
    this.actionIcons = const [],
    this.backgroundColor,
    this.isActive,
  }) : infoRows = const [],
       trailing = null,
       _layout = _Layout.large;

  @override
  Widget build(BuildContext context) {
    return switch (_layout) {
      _Layout.small => _SmallLayout(
          avatar: avatar,
          title: title,
          chips: chips,
          infoRows: infoRows,
          actionIcons: actionIcons,
          backgroundColor: backgroundColor,
          trailing: trailing,
          isActive: isActive
      ),
      _Layout.mobile => _MobileLayout(
        avatar: avatar,
        title: title,
        chips: chips,
        infoRows: infoRows,
        actionIcons: actionIcons,
        backgroundColor: backgroundColor,
        isActive: isActive,
      ),
      _Layout.large => _LargeLayout(
        avatar: avatar,
        title: title,
        chips: chips,
        actionIcons: actionIcons,
        backgroundColor: backgroundColor,
        isActive: isActive,
      ),
    };
  }
}

class _SmallLayout extends StatelessWidget {
  final Widget avatar;
  final String title;
  final List<Widget> chips;
  final List<Widget> infoRows;
  final List<Widget> actionIcons;
  final Color? backgroundColor;
  final Widget? trailing;
  final bool? isActive;

  const _SmallLayout({
    required this.avatar,
    required this.title,
    required this.chips,
    required this.infoRows,
    this.actionIcons = const [],
    this.backgroundColor,
    this.trailing,
    this.isActive
  });

  @override
  Widget build(BuildContext context) {
    final content = Padding(
      padding: const EdgeInsets.symmetric(vertical: _kVerticalPadding),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.center,
        children: [
          avatar,
          const SizedBox(width: _kSmallAvatarSpacing),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              mainAxisSize: MainAxisSize.min,
              children: [
                Row(
                  crossAxisAlignment: CrossAxisAlignment.center,
                  children: [
                    Expanded(
                      child: Row(
                        crossAxisAlignment: CrossAxisAlignment.center,
                        mainAxisSize: MainAxisSize.min,
                        children: [
                          Flexible(
                            child: SelectableText(
                              isActive == false ? '[$title]' : title,
                              style: _kPageTitleStyle(context),
                              maxLines: 1,
                            ),
                          ),
                          for (int i = 0; i < chips.length; i++) ...[
                            SizedBox(width: i == 0 ? _kFirstChipSpacing : _kChipSpacing),
                            chips[i],
                          ],
                        ],
                      ),
                    ),
                    if (trailing != null) ...[const SizedBox(width: 16), trailing!],
                  ],
                ),
                const SizedBox(height: 3),
                if (infoRows.isNotEmpty) ...[
                  const SizedBox(height: _kInfoRowGap),
                  Wrap(
                    spacing: _kInfoRowSpacing,
                    runSpacing: _kWrapRunSpacing,
                    crossAxisAlignment: WrapCrossAlignment.center,
                    children: [
                      for (int i = 0; i < infoRows.length; i++) ...[
                        infoRows[i],
                        if (i != infoRows.length - 1 && (i + 1) % 2 == 0)
                          const SizedBox(width: double.infinity, height: 0),
                      ],
                    ],
                  ),
                ],
              ],
            ),
          ),
        ],
      ),
    );
    if (backgroundColor != null) {
      return ColoredBox(color: backgroundColor!, child: content);
    }
    return content;
  }
}

class _MobileLayout extends StatelessWidget {
  final Widget avatar;
  final String title;
  final List<Widget> chips;
  final List<Widget> infoRows;
  final List<Widget> actionIcons;
  final Color? backgroundColor;
  final bool? isActive;

  const _MobileLayout({
    required this.avatar,
    required this.title,
    required this.chips,
    required this.infoRows,
    this.actionIcons = const [],
    this.backgroundColor,
    this.isActive
  });

  @override
  Widget build(BuildContext context) {
    final content = Padding(
      padding: const EdgeInsets.symmetric(vertical: _kVerticalPadding),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        mainAxisSize: MainAxisSize.min,
        children: [
          Row(
            crossAxisAlignment: CrossAxisAlignment.center,
            children: [
              avatar,
              const SizedBox(width: _kMobileAvatarSpacing),
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  mainAxisSize: MainAxisSize.min,
                  children: [
                    Wrap(
                      crossAxisAlignment: WrapCrossAlignment.center,
                      children: [
                        SelectableText(
                          isActive == false ? '[$title]' : title,
                          style: _kPageTitleStyle(context),
                        ),
                        if (actionIcons.isNotEmpty) ...[
                          const SizedBox(width: 6),
                          ...actionIcons,
                        ],
                      ],
                    ),
                    if (chips.isNotEmpty) ...[
                      const SizedBox(height: _kChipSpacing),
                      Wrap(spacing: _kChipSpacing, runSpacing: _kWrapRunSpacing, children: chips),
                    ],
                  ],
                ),
              ),
            ],
          ),
          if (infoRows.isNotEmpty) ...[
            const SizedBox(height: 6),
            Wrap(spacing: _kInfoRowSpacing, runSpacing: _kWrapRunSpacing, children: infoRows),
          ],
        ],
      ),
    );

    if (backgroundColor != null) {
      return ColoredBox(color: backgroundColor!, child: content);
    }
    return content;
  }
}

class _LargeLayout extends StatelessWidget {
  final Widget avatar;
  final String title;
  final List<Widget> chips;
  final List<Widget> actionIcons;
  final Color? backgroundColor;
  final bool? isActive;

  const _LargeLayout({
    required this.avatar,
    required this.title,
    required this.chips,
    this.actionIcons = const [],
    this.backgroundColor,
    this.isActive,
  });

  @override
  Widget build(BuildContext context) {
    final content = Column(
      children: [
        Center(child: avatar),
        const SizedBox(height: _kLargeAvatarGap),
        Row(
          mainAxisAlignment: MainAxisAlignment.center,
          crossAxisAlignment: CrossAxisAlignment.center,
          children: [
            SelectableText(
                isActive == false ? '[$title]' : title,
                style: _kHeroTitleStyle(context),
                textAlign: TextAlign.center
            ),
            if (actionIcons.isNotEmpty) ...[
              const SizedBox(width: _kChipSpacing),
              ...actionIcons,
            ],
          ],
        ),
        if (chips.isNotEmpty) ...[
          const SizedBox(height: _kLargeChipsGap),
          Center(
            child: Row(
              mainAxisSize: MainAxisSize.min,
              children: [
                for (int i = 0; i < chips.length; i++) ...[
                  if (i > 0) const SizedBox(width: _kChipSpacing),
                  chips[i],
                ],
              ],
            ),
          ),
        ],
        const SizedBox(height: _kLargeAvatarGap),
      ],
    );
    if (backgroundColor != null) {
      return ColoredBox(color: backgroundColor!, child: content);
    }
    return content;
  }
}

class DTEntityHeaderInfoRow extends StatelessWidget {
  final IconData icon;
  final String label;

  const DTEntityHeaderInfoRow({super.key, required this.icon, required this.label});

  @override
  Widget build(BuildContext context) {
    final dt = CoporTheme.of(context);
    return Row(
      mainAxisSize: MainAxisSize.min,
      children: [
        Container(
          padding: const EdgeInsets.symmetric(
            horizontal: _kInfoRowPaddingH,
            vertical: _kInfoRowPaddingV,
          ),
          decoration: BoxDecoration(
            border: Border.all(color: dt.colors.outline),
            borderRadius: BorderRadius.circular(_kInfoRowBorderRadius),
          ),
          child: Icon(icon, size: _kInfoRowIconSize, color: dt.colors.onSurfaceSubtle),
        ),
        const SizedBox(width: _kInfoRowLabelSpacing),
        Flexible(
          child: SelectableText(
            label,
            style: _kBodySecondaryStyle(context),
            maxLines: 1,
            toolbarOptions: const ToolbarOptions(copy: true, selectAll: true),
          ),
        ),
      ],
    );
  }
}



