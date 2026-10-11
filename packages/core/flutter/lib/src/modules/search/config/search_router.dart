import 'package:copor_core/src/core/module/app_modules.dart';
import 'package:copor_core/src/bloc/global_blocs/config_bloc/config_bloc.dart';
import 'package:copor_core/src/bloc/global_blocs/translation_bloc/translation_bloc.dart';
import 'package:copor_core/src/bloc/global_blocs/translation_bloc/translation_event.dart';
import 'package:copor_core/src/bloc/global_blocs/translation_bloc/translation_state.dart';
import 'package:copor_core/src/bloc/utils/bloc_listeners.dart';
import 'package:copor_core/src/config/dependency_injection.dart';
import 'package:copor_core/src/config/router/routes.dart';
import 'package:copor_core/src/core/module/copor_module.dart';
import 'package:copor_core/src/data/model/filter/data/model/filter_dto/filter_list_dto.dart';
import 'package:copor_core/src/data/model/filter/data/model/filter_dto/filter_model_dto.dart';
import 'package:copor_core/src/data/repository_impl/translation/translation_repository.dart';
import 'package:copor_core/src/modules/administration/user/bloc/user_list/user_list_bloc.dart';
import 'package:copor_core/src/modules/administration/user/bloc/user_list/user_list_event.dart';
import 'package:copor_core/src/modules/administration/user/bloc/user_list/user_list_state.dart';
import 'package:copor_core/src/modules/search/bloc/search_bloc.dart';
import 'package:copor_core/src/modules/search/bloc/search_state.dart';
import 'package:copor_core/src/modules/search/config/search_keys.dart';
import 'package:copor_core/src/modules/search/data/model/translation/search_translation.dart';
import 'package:copor_core/src/modules/search/presentation/search_module_root.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:go_router/go_router.dart';

StatefulShellBranch createSearchRoute() {
  return StatefulShellBranch(
    routes: [
      GoRoute(
        path: AppRoutes.search,
        builder: (context, builder) {
          final sections = moduleSearchSections(AppModules.enabled);
          return MultiBlocProvider(
            providers: [
              BlocProvider<TranslationBloc<SearchPageTranslation>>(
                create: (context) {
                  final language = context.read<ConfigBloc>().state.ensuredData.language;
                  return TranslationBloc<SearchPageTranslation>(
                    translationRepository: getIt<TranslationRepository>(),
                  )..add(
                    GetTranslationEvent<SearchPageTranslation>(
                      namespace: SearchPageTranslation.namespaceStatic,
                      languageModel: language,
                      constructor: (stringMap) =>
                          SearchPageTranslation(translationStringList: stringMap),
                    ),
                  );
                },
              ),
              BlocProvider<SearchUiBloc>(create: (context) => SearchUiBloc()),
              BlocProvider<UserListBloc>(create: (context) => getIt<UserListBloc>()),
              for (final section in sections) ...section.providers(context),
            ],
            child: MultiBlocListener(
              listeners: [
                LanguageChangeListener(
                  additionalLogic: (context, configState) {
                    final language = configState.ensuredData.language;
                    context.read<TranslationBloc<SearchPageTranslation>>().add(
                      GetTranslationEvent<SearchPageTranslation>(
                        namespace: SearchPageTranslation.namespaceStatic,
                        languageModel: language,
                        constructor: (stringMap) =>
                            SearchPageTranslation(translationStringList: stringMap),
                      ),
                    );
                  },
                ),
                LoadingListener<
                  TranslationBloc<SearchPageTranslation>,
                  TranslationState<SearchPageTranslation>
                >(loadingKey: SearchKeys.searchPageLoading),
                FailureListener<
                  TranslationBloc<SearchPageTranslation>,
                  TranslationState<SearchPageTranslation>
                >(failureKey: SearchKeys.searchPageError),
                LoadingListener<UserListBloc, UserListState>(
                  loadingKey: SearchKeys.searchPageLoading,
                ),
                for (final section in sections) ...section.listeners(),
                BlocListener<SearchUiBloc, SearchUiState>(
                  listenWhen: (prev, curr) => prev.searchQuery != curr.searchQuery,
                  listener: (context, state) {
                    final query = state.searchQuery.trim();
                    final filterListDto = FilterListDTO(
                      filterList: [
                        if (query.isNotEmpty) FilterModelDTO(name: 'SEARCH', values: [query]),
                      ],
                      limit: '15',
                      offset: '0',
                    );
                    context.read<UserListBloc>().add(GetUserSearchList(filterListDto));
                    for (final section in sections) {
                      section.search(context, filterListDto);
                    }
                  },
                ),
              ],
              child: const SearchPage(),
            ),
          );
        },
        routes: [GoRoute(path: AppRoutes.search, builder: (context, state) => const SearchPage())],
      ),
    ],
  );
}
