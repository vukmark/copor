import 'package:copor_theme/src/components/inputs/dt_dropdown.dart';
import 'package:copor_theme/src/components/inputs/dt_input_decorator.dart';
import 'package:copor_theme/src/models/dt_option.dart';
import 'package:copor_theme/src/models/dt_tag.dart';
import 'package:copor_theme/src/utils/dt_colors.dart';
import 'package:copor_theme/src/utils/dt_icons.dart';
import 'package:flutter/material.dart';

class _ColorSwatch extends StatelessWidget {
  final Color color;

  const _ColorSwatch({required this.color});

  @override
  Widget build(BuildContext context) {
    final luminance = color.computeLuminance();
    final border = luminance > 0.85
        ? Colors.grey.shade800
        : luminance < 0.2
            ? Colors.white
            : color;
    return Container(
      width: 18,
      height: 18,
      decoration: BoxDecoration(
        color: color,
        borderRadius: BorderRadius.circular(100),
        border: Border.all(color: border),
      ),
    );
  }
}

/// Multi-select tag field.
///
/// Shows selected tags as removable chips above a search input.
/// When [onAction] is provided the field is wrapped in a
/// [DTInputDecorator.withAction] that opens a tag-management screen:
///
/// ```dart
/// DTTagDropdown(
///   label: translation.TAGS,
///   searchLabel: translation.SELECT_TAGS,
///   selectedValues: state.selectedTags.map(_toDTTag).toList(),
///   items: availableTags.map(_toDTTag).toList(),
///   onChanged: (tags) => ...,
///   onAction: () => _showTagsScreen(context),
/// )
/// ```
class DTTagDropdown extends StatelessWidget {
  final List<DTTag> selectedValues;
  final List<DTTag> items;
  final ValueChanged<List<DTTag>> onChanged;

  /// Label shown in the [DTInputDecorator.withAction] header (e.g. "Tags").
  final String label;

  /// Floating label on the inner search input (e.g. "Select tags").
  final String searchLabel;

  final bool enabled;
  final bool enableSearch;
  final String? required;

  /// When provided the field is wrapped in a [DTInputDecorator.withAction]
  /// with a tag icon and this callback.
  final VoidCallback? onAction;
  final String? actionButtonLabel;

  const DTTagDropdown({
    super.key,
    required this.selectedValues,
    required this.items,
    required this.onChanged,
    this.label = 'Tags',
    this.searchLabel = 'Select tags',
    this.enabled = true,
    this.enableSearch = true,
    this.required,
    this.onAction,
    this.actionButtonLabel,
  });

  @override
  Widget build(BuildContext context) {
    return DTDropdown<DTTag>.chips(
      selectedValues: selectedValues,
      items: items
          .map((tag) => DTOption(
                value: tag,
                label: tag.name,
                leading: _ColorSwatch(color: colorMap[tag.color] ?? Colors.grey),
              ))
          .toList(),
      onChanged: onChanged,
      label: label,
      enabled: enabled,
      enableSearch: enableSearch,
      onAction: onAction,
      actionIcon: DTIcons.tag,
      actionButtonLabel: actionButtonLabel,
      required: required,
      inputLabel: searchLabel,
      padding: EdgeInsets.zero,
    );
  }
}
