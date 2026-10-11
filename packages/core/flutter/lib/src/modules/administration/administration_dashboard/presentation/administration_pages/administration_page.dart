import 'package:copor_core/src/bloc/global_blocs/navigation_bloc/navigation_bloc.dart';
import 'package:copor_core/src/bloc/global_blocs/translation_bloc/translation_bloc.dart';
import 'package:copor_core/src/core/system/device_service.dart';
import 'package:copor_core/src/data/model/filter/bloc/filter_bloc.dart';
import 'package:copor_core/src/data/model/filter/presentation/utils/filter_utils.dart';
import 'package:copor_core/src/data/model/filter/presentation/utils/search_handler.dart';
import 'package:copor_core/src/data/model/translation/common_translation.dart';
import 'package:copor_core/src/modules/administration/administration_dashboard/data/administration_namespaces.dart';
import 'package:copor_core/src/modules/administration/administration_dashboard/presentation/widgets/administration_toolbar.dart';
import 'package:copor_core/src/modules/administration/administration_dashboard/presentation/widgets/applied_filters.dart';
import 'package:copor_core/src/modules/administration/administration_dashboard/presentation/widgets/select_user_role_dialog.dart';
import 'package:copor_core/src/modules/table/bloc/table_bloc.dart';
import 'package:copor_core/src/modules/table/dt_table_connector.dart';
import 'package:copor_scaffold/copor_scaffold.dart';
import 'package:copor_theme/copor_theme.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_hooks/flutter_hooks.dart';

class AdministrationPage extends HookWidget {
  final String namespace;

  const AdministrationPage({super.key, required this.namespace});

  static final Map<String, double> _lastScrollOffsets = {};

  @override
  Widget build(BuildContext context) {
    final search = useMemoized(() => setupSearchHandler(context));
    final scrollController = useMemoized(
      () => ScrollController(initialScrollOffset: _lastScrollOffsets[namespace] ?? 0),
      [namespace],
    );

    useEffect(() {
      void saveScrollOffset() {
        _lastScrollOffsets[namespace] = scrollController.offset;
      }

      scrollController.addListener(saveScrollOffset);
      return () {
        if (scrollController.hasClients) {
          _lastScrollOffsets[namespace] = scrollController.offset;
        }
        scrollController.removeListener(saveScrollOffset);
        scrollController.dispose();
      };
    }, [scrollController, namespace]);

    final route = AdministrationNamespaces.getRoute(namespace);
    final createRoute = '$route/create';

    final tableState = context.watch<TableBloc>().state;
    final filterState = context.watch<FilterBloc>().state;
    final translation = context.watch<TranslationBloc<CommonTranslation>>().state.ensuredData;

    if (tableState.result == null || filterState.result == null) {
      return Container();
    }

    return DSPageWrapper(
      isMobile: context.isMobile,
      children: [
        if (!AdministrationNamespaces.noSearchBarPages.contains(namespace))
          AdministrationToolbar(
            searchController: search.controller,
            onSearchChanged: search.onSearchChanged,
            onAdd: !AdministrationNamespaces.noAddButtonPages.contains(namespace)
                ? () => namespace == AdministrationNamespaces.user
                      ? DTModalShell.show<void>(
                          context,
                          isMobile: context.isMobile,
                          builder: (dialogContext) => SelectUserRoleDialog(
                            translation: translation,
                            onRoleSelected: (roleType) => goToPage('$createRoute?role=$roleType'),
                          ),
                        )
                      : goToPage(createRoute)
                : null,
            onFilter: !AdministrationNamespaces.noFilterButtonPages.contains(namespace)
                ? () => FilterUtils.showFilterUI(context)
                : null,
            onSort: () => FilterUtils.showSortUI(context),
            translation: translation,
            filterState: filterState,
          ),
        const SizedBox(height: 12),
        if (filterState.appliedInFilters.isNotEmpty) ...[
          AppliedFilters(appliedFilters: filterState.appliedInFilters, translation: translation),
          const SizedBox(height: 16),
        ],
        DTTableConnector(
          tableDTO: tableState.ensuredData,
          scrollController: scrollController,
          tableEndpoint: namespace,
          labels: DTTableLabels.empty(),
          noData: Text(translation.NO_RESULTS_FOUND),
        ),
      ],
    );
  }
}
