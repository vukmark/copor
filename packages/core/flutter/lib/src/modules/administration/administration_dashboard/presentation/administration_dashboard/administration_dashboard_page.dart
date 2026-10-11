import 'package:copor_core/src/bloc/utils/bloc_reactions.dart';
import 'package:copor_core/src/bloc/utils/bloc_state_conditions.dart';
import 'package:copor_core/src/core/system/device_service.dart';
import 'package:copor_core/src/modules/administration/administration_dashboard/bloc/dashboard_menu/dashboard_menu_bloc.dart';
import 'package:copor_core/src/modules/administration/administration_dashboard/bloc/dashboard_menu/dashboard_menu_state.dart';
import 'package:copor_core/src/modules/administration/administration_dashboard/data/dashboard_menu_icons.dart';
import 'package:copor_core/src/modules/administration/administration_dashboard/data/model/dashboard_models.dart';
import 'package:copor_core/src/modules/administration/administration_dashboard/presentation/widgets/category_layout.dart';
import 'package:copor_scaffold/copor_scaffold.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_hooks/flutter_hooks.dart';

class AdministrationDashboardPage extends HookWidget {
  const AdministrationDashboardPage({super.key});

  static double _lastScrollOffset = 0;

  @override
  Widget build(BuildContext context) {
    final scrollController = useMemoized(
      () => ScrollController(initialScrollOffset: _lastScrollOffset),
    );

    useEffect(() {
      void saveScrollOffset() {
        _lastScrollOffset = scrollController.offset;
      }

      scrollController.addListener(saveScrollOffset);
      return () {
        if (scrollController.hasClients) {
          _lastScrollOffset = scrollController.offset;
        }
        scrollController.removeListener(saveScrollOffset);
        scrollController.dispose();
      };
    }, [scrollController]);

    return BlocListener<DashboardMenuBloc, DashboardMenuState>(
      listener: (context, dashboardMenuState) {
        BlocReactions.common.addPageLoadingToScaffold(
          context,
          dashboardMenuState,
          'administrationDashboardLoadingView',
        );
        BlocReactions.common.addFailureToScaffold(
          context,
          dashboardMenuState,
          'administrationDashboardErrorView',
        );
      },
      child: BlocBuilder<DashboardMenuBloc, DashboardMenuState>(
        builder: (context, dashboardMenuState) {
          final isLoading = BlocStateConditions.hasInitialStates([dashboardMenuState]);

          if (isLoading) return const SizedBox.shrink();

          final categories = dashboardMenuState.ensuredData.categories
              .map(
                (category) => DashboardCategory(
                  title: category.title,
                  items: category.items
                      .map(
                        (item) => DashboardItem(
                          icon: dashboardMenuIcon(item.icon),
                          title: item.title,
                          route: item.route,
                          isExternalLink: item.isExternalLink ?? false,
                          badgeCount: item.badgeCount,
                        ),
                      )
                      .toList(),
                ),
              )
              .toList();

          return DSPageWrapper(
            isMobile: context.isMobile,
            scrollable: true,
            scrollController: scrollController,
            children: [CategoryLayout(categories: categories)],
          );
        },
      ),
    );
  }
}
