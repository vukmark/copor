import 'package:copor_core/src/modules/search/components/section_header.dart';
import 'package:copor_core/src/modules/search/data/model/translation/search_translation.dart';
import 'package:copor_theme/copor_theme.dart';
import 'package:flutter/material.dart';

class SearchSection extends StatelessWidget {
  final String title;
  final IconData icon;
  final List<Widget> items;
  final int currentItemCount;
  final int totalItemCount;
  final int initialLimit;
  final VoidCallback onShowMore;
  final VoidCallback onShowLess;
  final VoidCallback? onFilterPressed;
  final String? filterButtonLabel;
  final VoidCallback? onSortPressed;
  final SearchPageTranslation translation;

  const SearchSection({
    super.key,
    required this.title,
    required this.icon,
    required this.items,
    required this.currentItemCount,
    required this.totalItemCount,
    required this.initialLimit,
    required this.onShowMore,
    required this.onShowLess,
    this.onFilterPressed,
    this.filterButtonLabel,
    this.onSortPressed,
    required this.translation,
  });

  @override
  Widget build(BuildContext context) {
    final showLessIsVisible = currentItemCount >= totalItemCount;

    return Container(
      margin: const EdgeInsets.only(bottom: 16),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          SectionHeader(
            title: title,
            icon: icon,
            translation: translation,
            onFilterPressed: onFilterPressed,
            filterButtonLabel: filterButtonLabel,
            onSortPressed: onSortPressed,
          ),
          AnimatedSize(
            duration: const Duration(milliseconds: 250),
            curve: Curves.easeInOut,
            alignment: Alignment.topCenter,
            child: Column(crossAxisAlignment: CrossAxisAlignment.stretch, children: items),
          ),
          if (totalItemCount > initialLimit)
            Center(
              child: DTButton.toggle(
                label: !showLessIsVisible ? translation.SHOW_MORE : translation.SHOW_LESS,
                labelToggled: showLessIsVisible ? translation.SHOW_LESS : translation.SHOW_MORE,
                semanticLabel: '',
                animatedIcon: DTAnimatedChevron(isOpen: showLessIsVisible),
                reverseContent: true,
                isToggled: showLessIsVisible,
                onPressed: showLessIsVisible ? onShowLess : onShowMore,
              ),
            ),
        ],
      ),
    );
  }
}
