import 'package:copor_core/src/modules/search/data/model/translation/search_translation.dart';
import 'package:copor_theme/copor_theme.dart';
import 'package:flutter/material.dart';

class SectionHeader extends StatelessWidget {
  final String title;
  final IconData icon;
  final VoidCallback? onFilterPressed;
  final VoidCallback? onSortPressed;
  final String? filterButtonLabel;
  final SearchPageTranslation translation;

  const SectionHeader({
    super.key,
    required this.title,
    required this.icon,
    this.onFilterPressed,
    this.onSortPressed,
    this.filterButtonLabel,
    required this.translation,
  });

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 8),
      child: Row(
        children: [
          IgnorePointer(
            child: DTButton.surface(label: title, onPressed: () {}, icon: icon, border: false),
          ),
          const Spacer(),
          if (onSortPressed != null)
            DTButton.surface(
              icon: DTIcons.sort,
              label: translation.SORT,
              semanticLabel: '',
              border: false,
              onPressed: onSortPressed!,
            ),
          if (onFilterPressed != null)
            DTButton.surface(
              icon: DTIcons.filter,
              label: filterButtonLabel ?? translation.FILTER,
              semanticLabel: '',
              border: false,
              onPressed: onFilterPressed!,
            ),
        ],
      ),
    );
  }
}
