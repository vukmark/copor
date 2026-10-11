import 'package:copor_core/src/config/router/helper_pages/no_animation_page.dart';
import 'package:copor_core/src/config/router/routes.dart';
import 'package:copor_core/src/modules/my_account/config/scopes/my_account_page_scope.dart';
import 'package:copor_core/src/modules/my_account/presentation/my_account_page.dart';
import 'package:go_router/go_router.dart';

StatefulShellBranch createMyAccountRoute() {
  return StatefulShellBranch(
    routes: [
      GoRoute(
        path: AppRoutes.myAccount,
        pageBuilder: (context, state) => NoAnimationPage(
          key: state.pageKey,
          child: MyAccountPageScope(
            id: MyAccountPageScope.myAccountPageScopeString,
            child: MyAccountPage(
              initialTab: MyAccountTab.fromSlug(
                state.uri.queryParameters[MyAccountRoutes.tabQueryParameter],
              ),
            ),
          ),
        ),
      ),
    ],
  );
}

class MyAccountRoutes {
  static final String edit = 'edit';
  static const String tabQueryParameter = 'tab';

  static String withTab(MyAccountTab tab) =>
      '${AppRoutes.myAccount}?$tabQueryParameter=${tab.slug}';
}
