import 'package:copor_core/src/core/module/app_modules.dart';
import 'package:copor_core/src/core/module/copor_module.dart';
import 'package:copor_core/src/modules/search/bloc/search_bloc.dart';
import 'package:copor_core/src/modules/search/bloc/search_event.dart';
import 'package:copor_core/src/modules/search/bloc/search_state.dart';
import 'package:copor_core/src/modules/search/components/search_section.dart';
import 'package:copor_core/src/modules/search/components/user_card.dart';
import 'package:copor_core/src/modules/search/data/model/user_model.dart';
import 'package:copor_core/src/modules/search/data/model/translation/search_translation.dart';
import 'package:copor_theme/copor_theme.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

class SearchResults extends StatelessWidget {
  final SearchUiState state;
  final SearchPageTranslation translation;
  final List<User> usersToShow;
  final List<User> finalFilteredUsers;

  const SearchResults({
    super.key,
    required this.state,
    required this.translation,
    required this.usersToShow,
    required this.finalFilteredUsers,
  });

  @override
  Widget build(BuildContext context) {
    if (state.searchQuery.isEmpty) {
      return Expanded(
        child: Center(
          child: DTEmptyState(icon: DTIcons.search, title: translation.LOOKING_FOR_SOMETHING),
        ),
      );
    }

    final sectionsWithResults = moduleSearchSections(
      AppModules.enabled,
    ).where((section) => section.hasResults(context)).toList();

    if (finalFilteredUsers.isEmpty && sectionsWithResults.isEmpty) {
      return Expanded(
        child: Center(
          child: DTEmptyState(icon: DTIcons.search, title: translation.NO_RESULTS_TRY_AGAIN),
        ),
      );
    }

    return Expanded(
      child: ListView(
        children: [
          if (finalFilteredUsers.isNotEmpty)
            SearchSection(
              title: translation.USERS,
              icon: DTIcons.users,
              translation: translation,
              items: usersToShow
                  .map(
                    (user) => UserCard(
                      user: user,
                      highlight: state.searchQuery,
                    ),
                  )
                  .toList(),
              currentItemCount: usersToShow.length,
              totalItemCount: finalFilteredUsers.length,
              initialLimit: SearchUiBloc.userInitialLimit,
              onShowMore: () => context.read<SearchUiBloc>().add(ShowMoreUsers()),
              onShowLess: () => context.read<SearchUiBloc>().add(ResetUserCount()),
            ),
          for (final section in sectionsWithResults)
            section.buildSection(context, state.searchQuery, translation),
        ],
      ),
    );
  }
}
