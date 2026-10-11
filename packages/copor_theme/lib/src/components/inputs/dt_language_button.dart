import 'package:country_flags/country_flags.dart';
import 'package:copor_theme/src/components/buttons/dt_action_footer.dart';
import 'package:copor_theme/src/components/display/dt_animated_chevron.dart';
import 'package:copor_theme/src/components/inputs/dt_dropdown_overlay.dart';
import 'package:copor_theme/src/components/inputs/dt_input_constants.dart';
import 'package:copor_theme/src/components/layout/dt_draggable_sheet.dart';
import 'package:copor_theme/src/components/display/dt_divider.dart';
import 'package:copor_theme/src/theme/extensions/copor_colors.dart';
import 'package:copor_theme/src/theme/extensions/copor_theme.dart';
import 'package:copor_theme/src/theme/tokens/spacing.dart';
import 'package:copor_theme/src/utils/dt_icons.dart';
import 'package:flutter/material.dart';
import 'package:flutter_hooks/flutter_hooks.dart';

TextStyle _kButtonLabelStyle(BuildContext context) =>
    CoporTheme.of(context).text.buttonLabel;

TextStyle _kItemStyle(BuildContext context) => CoporTheme.of(context).text.body;

// ── Data model ────────────────────────────────────────────────────────────────

class DTLanguageItem {
  final String code;
  final String name;
  final String flagCode;

  const DTLanguageItem({
    required this.code,
    required this.name,
    required this.flagCode,
  });
}

// ── Widget ────────────────────────────────────────────────────────────────────

class DTLanguageButton extends HookWidget {
  final List<DTLanguageItem> items;
  final DTLanguageItem? selected;
  final ValueChanged<DTLanguageItem> onChanged;
  final bool isLoading;
  final bool expandLeft;
  final bool isMobile;
  final String cancelLabel;

  /// Shares the dropdown panel's `TapRegion` membership with an ancestor
  /// `TapRegion` of the same group (e.g. a popover this button is nested
  /// inside). The dropdown panel renders through `OverlayPortal`, in a
  /// different part of the tree from wherever this widget is placed — so
  /// without a shared groupId, tapping an item in the dropdown reads as an
  /// "outside" tap to that ancestor `TapRegion` and dismisses it too, on
  /// top of the dropdown closing itself normally.
  final Object? groupId;

  final bool _compact;

  const DTLanguageButton({
    super.key,
    required this.items,
    required this.selected,
    required this.onChanged,
    this.isLoading = false,
    this.expandLeft = true,
    this.isMobile = false,
    this.cancelLabel = 'Cancel',
    this.groupId,
  }) : _compact = false;

  const DTLanguageButton.compact({
    super.key,
    required this.items,
    required this.selected,
    required this.onChanged,
    this.isLoading = false,
    this.expandLeft = true,
    this.isMobile = false,
    this.cancelLabel = 'Cancel',
    this.groupId,
  }) : _compact = true;

  @override
  Widget build(BuildContext context) {
    final dt = CoporTheme.of(context);
    final dc = CoporColors.of(context);
    final overlay = useDropdownOverlay(preferredMaxHeight: coporDropdownMaxHeight);

    void close() => overlay.hide();

    void open() {
      if (isLoading || items.isEmpty) return;

      if (isMobile) {
        showModalBottomSheet<void>(
          context: context,
          backgroundColor: Colors.transparent,
          isScrollControlled: true,
          builder: (_) => DTDraggableScrollableSheet(
            initialSize: 0.4,
            maxSize: 0.65,
            footer: DTActionFooter.single(
              label: cancelLabel,
              onPressed: () => Navigator.of(context).pop(),
            ),
            contentBuilder: (_, scrollController) => SingleChildScrollView(
              controller: scrollController,
              child: Column(
                mainAxisSize: MainAxisSize.min,
                children: [
                  for (int i = 0; i < items.length; i++) ...[
                    _LanguageRow(
                      item: items[i],
                      isSelected: items[i].code == selected?.code,
                      dt: dt,
                      padding: kSheetItemPadding,
                      onTap: () {
                        Navigator.of(context).pop();
                        onChanged(items[i]);
                      },
                    ),
                    if (i < items.length - 1) const DTDivider(height: 1),
                  ],
                ],
              ),
            ),
          ),
        );
        return;
      }

      overlay.show(contentHeight: items.length * coporDropdownEstimatedItemHeight);
    }

    // Wraps the *entire* overlay (scrim included, not just the dropdown
    // panel) in [groupId] — while this dropdown is open, its full-screen
    // scrim sits on top of and intercepts every tap, including ones over an
    // ancestor popover's own content. Since `TapRegion`'s outside-tap check
    // is based on which `TapRegion` the tap actually hit (the topmost thing
    // wins, and the scrim has none), any tap anywhere — even ones squarely
    // inside that ancestor popover — read as "outside" it too, closing both
    // at once instead of just this dropdown. Grouping the scrim means one
    // tap closes only this dropdown; a second tap is needed to dismiss the
    // ancestor, matching how nested menus/popovers are conventionally
    // expected to cascade.
    return DTDropdownAnchor(
      handle: overlay,
      groupId: groupId,
      alignEnd: expandLeft,
      verticalGap: 2,
      panelBuilder: (context, maxHeight) => ConstrainedBox(
        constraints: BoxConstraints(
          minWidth: kLangDropdownPanelWidth,
          maxWidth: kLangDropdownPanelWidth,
        ),
        child: _DropdownPanel(
          items: items,
          selected: selected,
          maxHeight: maxHeight,
          dt: dt,
          onSelect: (item) {
            onChanged(item);
            close();
          },
        ),
      ),
      trigger: _compact
          ? _buildCompactTrigger(context, dt, dc, overlay.isOpen, open)
          : _buildFullTrigger(context, dt, dc, overlay.isOpen, open),
    );
  }

  Widget _buildFullTrigger(
    BuildContext context,
    CoporTheme dt,
    CoporColors dc,
    bool isOpen,
    VoidCallback open,
  ) {
    return Material(
      color: dc.surfaceContainer,
      borderRadius: BorderRadius.circular(kInputBorderRadius),
      child: InkWell(
        onTap: open,
        borderRadius: BorderRadius.circular(kInputBorderRadius),
        overlayColor: WidgetStateProperty.resolveWith((states) {
          if (states.contains(WidgetState.hovered))
            return dt.colors.surfaceHovered;
          if (states.contains(WidgetState.pressed))
            return dt.colors.surfacePressed;
          return Colors.transparent;
        }),
        child: AnimatedContainer(
          duration: coporDropdownAnimDuration,
          curve: Curves.easeOut,
          decoration: BoxDecoration(
            borderRadius: BorderRadius.circular(kInputBorderRadius),
            border: Border.all(
              color: isOpen ? dt.colors.primaryBorder : dt.colors.outline,
            ),
          ),
          padding: kLangTriggerPadding,
          child: Row(
            mainAxisSize: MainAxisSize.min,
            children: [
              if (isLoading)
                SizedBox(
                  width: kLangLoadingSize,
                  height: kLangLoadingSize,
                  child: CircularProgressIndicator(
                    strokeWidth: kLangLoadingStrokeWidth,
                    color: dt.colors.onSurfaceSubtle,
                  ),
                )
              else if (selected != null)
                CountryFlag.fromCountryCode(
                  selected!.flagCode,
                  theme: ImageTheme(
                    shape: const RoundedRectangle(kLangFlagBorderRadius),
                    width: kLangFlagWidth,
                    height: kLangFlagHeight,
                  ),
                ),
              const SizedBox(width: kLangFlagTextSpacing),
              Text(
                isLoading ? '' : (selected?.name ?? ''),
                style: _kButtonLabelStyle(context),
              ),
              const SizedBox(width: kLangFlagTextSpacing),
              DTAnimatedChevron(
                isOpen: isOpen,
                size: coporDropdownChevronSize,
                color: dt.colors.onSurfaceSubtle,
                openColor: dt.colors.primary,
              ),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildCompactTrigger(
    BuildContext context,
    CoporTheme dt,
    CoporColors dc,
    bool isOpen,
    VoidCallback open,
  ) {
    return Material(
      color: dc.surfaceContainer,
      borderRadius: BorderRadius.circular(kInputBorderRadius),
      child: InkWell(
        onTap: open,
        borderRadius: BorderRadius.circular(kInputBorderRadius),
        overlayColor: WidgetStateProperty.resolveWith((states) {
          if (states.contains(WidgetState.hovered))
            return dt.colors.surfaceHovered;
          if (states.contains(WidgetState.pressed))
            return dt.colors.surfacePressed;
          return Colors.transparent;
        }),
        child: AnimatedContainer(
          duration: coporDropdownAnimDuration,
          curve: Curves.easeOut,
          decoration: BoxDecoration(
            borderRadius: BorderRadius.circular(kInputBorderRadius),
            border: Border.all(
              color: isOpen ? dt.colors.primaryBorder : dt.colors.outline,
            ),
          ),
          width: coporInputSmall,
          height: coporInputSmall,
          alignment: Alignment.center,
          child: isLoading
              ? SizedBox(
                  width: kLangLoadingSize,
                  height: kLangLoadingSize,
                  child: CircularProgressIndicator(
                    strokeWidth: kLangLoadingStrokeWidth,
                    color: dt.colors.onSurfaceSubtle,
                  ),
                )
              : selected != null
              ? CountryFlag.fromCountryCode(
                  selected!.flagCode,
                  theme: ImageTheme(
                    shape: const RoundedRectangle(kLangFlagBorderRadius),
                    width: kLangFlagWidth,
                    height: kLangFlagHeight,
                  ),
                )
              : const SizedBox.shrink(),
        ),
      ),
    );
  }
}

// ── Dropdown panel ────────────────────────────────────────────────────────────

class _DropdownPanel extends StatelessWidget {
  final List<DTLanguageItem> items;
  final DTLanguageItem? selected;
  final double maxHeight;
  final CoporTheme dt;
  final ValueChanged<DTLanguageItem> onSelect;

  const _DropdownPanel({
    required this.items,
    required this.selected,
    required this.maxHeight,
    required this.dt,
    required this.onSelect,
  });

  @override
  Widget build(BuildContext context) {
    return DTOverlayPanel(
      maxHeight: maxHeight,
      child: Column(
        mainAxisSize: MainAxisSize.min,
        children: [
          for (int i = 0; i < items.length; i++) ...[
            _LanguageRow(
              item: items[i],
              isSelected: items[i].code == selected?.code,
              dt: dt,
              onTap: () => onSelect(items[i]),
            ),
            if (i < items.length - 1)
              Divider(height: 1, thickness: 1, color: dt.colors.outlineSubtle),
          ],
        ],
      ),
    );
  }
}

// ── Language row ──────────────────────────────────────────────────────────────

class _LanguageRow extends StatelessWidget {
  final DTLanguageItem item;
  final bool isSelected;
  final CoporTheme dt;
  final VoidCallback onTap;
  final EdgeInsetsGeometry padding;

  const _LanguageRow({
    required this.item,
    required this.isSelected,
    required this.dt,
    required this.onTap,
    this.padding = coporDropdownItemPadding,
  });

  @override
  Widget build(BuildContext context) {
    return InkWell(
      onTap: onTap,
      overlayColor: WidgetStateProperty.resolveWith((states) {
        if (states.contains(WidgetState.hovered))
          return dt.colors.surfaceHovered;
        if (states.contains(WidgetState.pressed))
          return dt.colors.surfacePressed;
        return Colors.transparent;
      }),
      child: Ink(
        color: isSelected ? dt.colors.primaryContainer : Colors.transparent,
        padding: padding,
        child: Row(
          children: [
            CountryFlag.fromCountryCode(
              item.flagCode,
              theme: ImageTheme(
                shape: const RoundedRectangle(kLangFlagBorderRadius),
                width: kLangFlagWidth,
                height: kLangFlagHeight,
              ),
            ),
            const SizedBox(width: kLangFlagTextSpacing),
            Expanded(child: Text(item.name, style: _kItemStyle(context))),
            if (isSelected)
              Icon(
                DTIcons.confirm,
                size: coporDropdownChevronSize,
                color: dt.colors.onPrimaryContainer,
              ),
          ],
        ),
      ),
    );
  }
}

// ── Mobile row padding ────────────────────────────────────────────────────────
