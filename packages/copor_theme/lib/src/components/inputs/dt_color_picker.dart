import 'package:copor_theme/src/components/buttons/dt_action_footer.dart';
import 'package:copor_theme/src/components/inputs/dt_dropdown_overlay.dart';
import 'package:copor_theme/src/components/inputs/dt_input_constants.dart';
import 'package:copor_theme/src/components/layout/dt_draggable_sheet.dart';
import 'package:copor_theme/src/theme/extensions/copor_theme.dart';
import 'package:copor_theme/src/theme/tokens/spacing.dart';
import 'package:copor_theme/src/utils/dt_colors.dart';
import 'package:copor_theme/src/utils/dt_icons.dart';
import 'package:flutter/material.dart';
import 'package:flutter_hooks/flutter_hooks.dart';

// ── Constants ─────────────────────────────────────────────────────────────────

const double _kCircleSize = 16.0;
const double _kPanelWidth = 200.0;
const double _kCircleSpacing = 8.0;

// ── DTColorPicker ─────────────────────────────────────────────────────────────

class DTColorPicker extends HookWidget {
  final Map<int, Color> availableColors;
  final int? selectedColorEnum;
  final ValueChanged<int?> onColorSelected;
  final bool enabled;
  final EdgeInsetsGeometry? padding;
  final bool isMobile;
  final String cancelLabel;

  const DTColorPicker({
    super.key,
    required this.availableColors,
    required this.selectedColorEnum,
    required this.onColorSelected,
    this.enabled = true,
    this.padding,
    this.isMobile = false,
    this.cancelLabel = 'Cancel',
  });

  @override
  Widget build(BuildContext context) {
    final dt = CoporTheme.of(context);
    final overlay = useDropdownOverlay(preferredMaxHeight: coporDropdownMaxHeight);
    final searchQuery = useState('');
    final searchController = useTextEditingController();

    void close() => overlay.hide();

    void open() {
      if (!enabled) return;

      if (isMobile) {
        DTDraggableScrollableSheet.show<void>(
          context,
          initialSize: 0.4,
          maxSize: 0.65,
          footer: DTActionFooter.single(
            label: cancelLabel,
            onPressed: () => Navigator.of(context).pop(),
          ),
          contentBuilder: (_, scrollController) => _ColorSheet(
            availableColors: availableColors,
            selectedColorEnum: selectedColorEnum,
            scrollController: scrollController,
            dt: dt,
            onSelect: (colorEnum) {
              Navigator.of(context).pop();
              onColorSelected(colorEnum);
            },
          ),
        );
        return;
      }

      if (overlay.isOpen) return;
      searchController.clear();
      searchQuery.value = '';
      // + a fixed row for the panel's own search field (see _ColorPanel).
      overlay.show(
        contentHeight:
            coporDropdownEstimatedItemHeight + availableColors.length * coporDropdownEstimatedItemHeight,
      );
    }

    void select(int colorEnum) {
      onColorSelected(colorEnum);
      close();
    }

    final selectedColor = selectedColorEnum != null ? availableColors[selectedColorEnum] : null;
    final filteredEntries = availableColors.entries.where((e) {
      final name = colorNameMap[e.key] ?? '';
      return searchQuery.value.isEmpty ||
          name.toLowerCase().contains(searchQuery.value.toLowerCase());
    }).toList();

    return Padding(
      padding: padding ?? const EdgeInsets.only(bottom: kInputBottomPadding, top: kInputLabelTopPadding),
      child: LayoutBuilder(
        builder: (context, constraints) {
          return DTDropdownAnchor(
            handle: overlay,
            panelBuilder: (context, maxHeight) => SizedBox(
              width: constraints.maxWidth.isFinite ? constraints.maxWidth : _kPanelWidth,
              child: _ColorPanel(
                entries: filteredEntries,
                selectedColorEnum: selectedColorEnum,
                searchController: searchController,
                searchQuery: searchQuery.value,
                onSearchChanged: (v) => searchQuery.value = v,
                onSelect: select,
                dt: dt,
                maxHeight: maxHeight,
              ),
            ),
            trigger: _ColorTrigger(
              selectedColor: selectedColor,
              isOpen: overlay.isOpen,
              enabled: enabled,
              onTap: open,
              dt: dt,
            ),
          );
        },
      ),
    );
  }
}

// ── Trigger ───────────────────────────────────────────────────────────────────

class _ColorTrigger extends StatelessWidget {
  final Color? selectedColor;
  final bool isOpen;
  final bool enabled;
  final VoidCallback onTap;
  final CoporTheme dt;

  const _ColorTrigger({
    required this.selectedColor,
    required this.isOpen,
    required this.enabled,
    required this.onTap,
    required this.dt,
  });

  @override
  Widget build(BuildContext context) {
    final bgColor = selectedColor ?? dt.colors.surfaceContainer;

    return Material(
      color: bgColor,
      borderRadius: BorderRadius.circular(kInputBorderRadius),
      child: InkWell(
        onTap: enabled ? onTap : null,
        borderRadius: BorderRadius.circular(kInputBorderRadius),
        overlayColor: WidgetStateProperty.resolveWith((states) {
          if (states.contains(WidgetState.hovered)) return Colors.black.withValues(alpha: 0.06);
          if (states.contains(WidgetState.pressed)) return Colors.black.withValues(alpha: 0.12);
          return Colors.transparent;
        }),
        child: AnimatedContainer(
          duration: coporDropdownAnimDuration,
          curve: Curves.easeOut,
          width: coporInputSmall,
          height: coporInputSmall,
          decoration: BoxDecoration(
            borderRadius: BorderRadius.circular(kInputBorderRadius),
            border: Border.all(
              color: isOpen ? dt.colors.primaryBorder : dt.colors.outline,
            ),
          ),
        ),
      ),
    );
  }
}

// ── Dropdown panel ────────────────────────────────────────────────────────────

class _ColorPanel extends StatelessWidget {
  final List<MapEntry<int, Color>> entries;
  final int? selectedColorEnum;
  final TextEditingController searchController;
  final String searchQuery;
  final ValueChanged<String> onSearchChanged;
  final ValueChanged<int> onSelect;
  final CoporTheme dt;
  final double maxHeight;

  const _ColorPanel({
    required this.entries,
    required this.selectedColorEnum,
    required this.searchController,
    required this.searchQuery,
    required this.onSearchChanged,
    required this.onSelect,
    required this.dt,
    required this.maxHeight,
  });

  @override
  Widget build(BuildContext context) {
    return DTOverlayPanel(
      maxHeight: maxHeight,
      header: Padding(
        padding: const EdgeInsets.all(8),
        child: TextField(
          controller: searchController,
          onChanged: onSearchChanged,
          autofocus: true,
          style: dt.text.body,
          decoration: InputDecoration(
            isDense: true,
            hintText: 'Search…',
            hintStyle: dt.text.body.copyWith(color: dt.colors.onSurfaceSubtle),
            prefixIcon: Icon(DTIcons.search, size: 16, color: dt.colors.onSurfaceSubtle),
            contentPadding: const EdgeInsets.symmetric(horizontal: 8, vertical: 8),
            border: OutlineInputBorder(
              borderRadius: BorderRadius.circular(kInputBorderRadius),
              borderSide: BorderSide(color: dt.colors.outline),
            ),
            enabledBorder: OutlineInputBorder(
              borderRadius: BorderRadius.circular(kInputBorderRadius),
              borderSide: BorderSide(color: dt.colors.outline),
            ),
            focusedBorder: OutlineInputBorder(
              borderRadius: BorderRadius.circular(kInputBorderRadius),
              borderSide: BorderSide(color: dt.colors.primaryBorder),
            ),
          ),
        ),
      ),
      child: Column(
        mainAxisSize: MainAxisSize.min,
        children: [
          for (int i = 0; i < entries.length; i++) ...[
            if (i > 0) Divider(height: 1, thickness: 1, color: dt.colors.outlineSubtle),
            _ColorRow(
              colorEnum: entries[i].key,
              color: entries[i].value,
              name: colorNameMap[entries[i].key] ?? '',
              isSelected: entries[i].key == selectedColorEnum,
              dt: dt,
              onTap: () => onSelect(entries[i].key),
            ),
          ],
        ],
      ),
    );
  }
}

// ── Mobile sheet ──────────────────────────────────────────────────────────────

class _ColorSheet extends HookWidget {
  final Map<int, Color> availableColors;
  final int? selectedColorEnum;
  final ScrollController scrollController;
  final CoporTheme dt;
  final ValueChanged<int> onSelect;

  const _ColorSheet({
    required this.availableColors,
    required this.selectedColorEnum,
    required this.scrollController,
    required this.dt,
    required this.onSelect,
  });

  @override
  Widget build(BuildContext context) {
    final searchQuery = useState('');
    final searchController = useTextEditingController();

    final filteredEntries = availableColors.entries.where((e) {
      final name = colorNameMap[e.key] ?? '';
      return searchQuery.value.isEmpty ||
          name.toLowerCase().contains(searchQuery.value.toLowerCase());
    }).toList();

    return Column(
      children: [
        Padding(
          padding: const EdgeInsets.fromLTRB(16, 0, 16, 8),
          child: TextField(
            controller: searchController,
            onChanged: (v) => searchQuery.value = v,
            style: dt.text.body,
            decoration: InputDecoration(
              isDense: true,
              hintText: 'Search…',
              hintStyle: dt.text.body.copyWith(color: dt.colors.onSurfaceSubtle),
              prefixIcon: Icon(DTIcons.search, size: 16, color: dt.colors.onSurfaceSubtle),
              contentPadding: const EdgeInsets.symmetric(horizontal: 8, vertical: 8),
              border: OutlineInputBorder(
                borderRadius: BorderRadius.circular(kInputBorderRadius),
                borderSide: BorderSide(color: dt.colors.outline),
              ),
              enabledBorder: OutlineInputBorder(
                borderRadius: BorderRadius.circular(kInputBorderRadius),
                borderSide: BorderSide(color: dt.colors.outline),
              ),
              focusedBorder: OutlineInputBorder(
                borderRadius: BorderRadius.circular(kInputBorderRadius),
                borderSide: BorderSide(color: dt.colors.primaryBorder),
              ),
            ),
          ),
        ),
        Expanded(
          child: SingleChildScrollView(
            controller: scrollController,
            child: Column(
              mainAxisSize: MainAxisSize.min,
              children: [
                for (int i = 0; i < filteredEntries.length; i++) ...[
                  if (i > 0) Divider(height: 1, thickness: 1, color: dt.colors.outlineSubtle),
                  _ColorRow(
                    colorEnum: filteredEntries[i].key,
                    color: filteredEntries[i].value,
                    name: colorNameMap[filteredEntries[i].key] ?? '',
                    isSelected: filteredEntries[i].key == selectedColorEnum,
                    dt: dt,
                    onTap: () => onSelect(filteredEntries[i].key),
                  ),
                ],
              ],
            ),
          ),
        ),
      ],
    );
  }
}

// ── Color row ─────────────────────────────────────────────────────────────────

class _ColorRow extends StatelessWidget {
  final int colorEnum;
  final Color color;
  final String name;
  final bool isSelected;
  final CoporTheme dt;
  final VoidCallback onTap;

  const _ColorRow({
    required this.colorEnum,
    required this.color,
    required this.name,
    required this.isSelected,
    required this.dt,
    required this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    return InkWell(
      onTap: onTap,
      overlayColor: WidgetStateProperty.resolveWith((states) {
        if (states.contains(WidgetState.hovered)) return dt.colors.surfaceHovered;
        if (states.contains(WidgetState.pressed)) return dt.colors.surfacePressed;
        return Colors.transparent;
      }),
      child: Ink(
        color: isSelected ? dt.colors.primaryContainer : Colors.transparent,
        padding: coporDropdownItemPadding,
        child: Row(
          children: [
            _ColorCircle(color: color),
            const SizedBox(width: _kCircleSpacing),
            Expanded(
              child: Text(name, style: dt.text.body),
            ),
            if (isSelected)
              Icon(DTIcons.confirm, size: coporDropdownChevronSize, color: dt.colors.onPrimaryContainer),
          ],
        ),
      ),
    );
  }
}

// ── Color circle ──────────────────────────────────────────────────────────────

class _ColorCircle extends StatelessWidget {
  final Color color;

  const _ColorCircle({required this.color});

  @override
  Widget build(BuildContext context) {
    return Container(
      width: _kCircleSize,
      height: _kCircleSize,
      decoration: BoxDecoration(
        color: color,
        shape: BoxShape.circle,
        border: Border.all(color: Theme.of(context).colorScheme.outlineVariant),
      ),
    );
  }
}
