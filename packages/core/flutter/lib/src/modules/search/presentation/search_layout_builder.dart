import 'package:copor_core/src/core/system/device_service.dart';
import 'package:copor_core/src/modules/search/bloc/search_state.dart';
import 'package:copor_core/src/modules/search/data/model/translation/search_translation.dart';
import 'package:copor_core/src/modules/search/data/model/user_model.dart';
import 'package:copor_core/src/modules/search/presentation/widgets/search_page/search_results.dart';
import 'package:copor_scaffold/copor_scaffold.dart';
import 'package:copor_theme/copor_theme.dart';
import 'package:flutter/material.dart';

class SearchLayoutBuilder extends StatelessWidget {
  final SearchPageTranslation? translation;
  final bool hasTranslation;
  final TextEditingController searchController;
  final List<User> usersToShow;
  final List<User> finalFilteredUsers;
  final SearchUiState searchState;
  final void Function(String) onSearchChanged;

  const SearchLayoutBuilder({
    super.key,
    required this.translation,
    required this.hasTranslation,
    required this.searchController,
    required this.usersToShow,
    required this.finalFilteredUsers,
    required this.searchState,
    required this.onSearchChanged,
  });

  @override
  Widget build(BuildContext context) {
    return DSPageWrapper(
      isMobile: context.isMobile,
      children: [
        _SearchToolbar(
          translation: translation,
          searchController: searchController,
          onSearchChanged: onSearchChanged,
        ),
        const SizedBox(height: 12),
        if (hasTranslation)
          SearchResults(
            state: searchState,
            translation: translation!,
            usersToShow: usersToShow,
            finalFilteredUsers: finalFilteredUsers,
          ),
      ],
    );
  }
}

class _SearchToolbar extends StatelessWidget {
  final SearchPageTranslation? translation;
  final TextEditingController searchController;
  final void Function(String) onSearchChanged;

  const _SearchToolbar({
    required this.translation,
    required this.searchController,
    required this.onSearchChanged,
  });

  @override
  Widget build(BuildContext context) {
    return DTSearchBar(
      title: translation?.SEARCH ?? 'Search...',
      controller: searchController,
      onSearchChanged: onSearchChanged,
    );
  }
}
