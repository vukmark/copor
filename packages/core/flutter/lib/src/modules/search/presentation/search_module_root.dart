import 'dart:async';
import 'package:copor_core/src/bloc/global_blocs/translation_bloc/translation_bloc.dart';
import 'package:copor_core/src/data/model/filter/data/model/filter_dto/filter_list_dto.dart';
import 'package:copor_core/src/modules/administration/user/bloc/user_list/user_list_bloc.dart';
import 'package:copor_core/src/modules/administration/user/bloc/user_list/user_list_event.dart';
import 'package:copor_core/src/modules/search/bloc/search_bloc.dart';
import 'package:copor_core/src/modules/search/bloc/search_event.dart';
import 'package:copor_core/src/modules/search/data/model/translation/search_translation.dart';
import 'package:copor_core/src/modules/search/presentation/hooks/use_search_data.dart';
import 'package:copor_core/src/modules/search/presentation/search_layout_builder.dart';
import 'package:flutter/widgets.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_hooks/flutter_hooks.dart';

class SearchPage extends HookWidget {
  const SearchPage({super.key});

  @override
  Widget build(BuildContext context) {
    final searchController = useTextEditingController();
    final translationState = context.watch<TranslationBloc<SearchPageTranslation>>().state;
    final debounceTimer = useRef<Timer?>(null);

    useEffect(() {
      WidgetsBinding.instance.addPostFrameCallback((_) {
        if (context.mounted) {
          context.read<UserListBloc>().add(GetUserSearchList(FilterListDTO.empty()));
        }
      });
      return () => debounceTimer.value?.cancel();
    }, const []);

    final hasTranslation = translationState.result?.data != null;
    final translation = translationState.result?.data;

    final searchData = useSearchData(context);

    return SearchLayoutBuilder(
      translation: translation,
      hasTranslation: hasTranslation,
      searchController: searchController,
      usersToShow: searchData.usersToShow,
      finalFilteredUsers: searchData.allUsers,
      searchState: context.watch<SearchUiBloc>().state,
      onSearchChanged: (query) {
        debounceTimer.value?.cancel();
        debounceTimer.value = Timer(const Duration(milliseconds: 400), () {
          if (context.mounted) {
            context.read<SearchUiBloc>().add(SearchQueryChanged(query));
          }
        });
      },
    );
  }
}
