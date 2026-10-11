import 'package:flutter_test/flutter_test.dart';
import 'package:copor_core/src/config/router/routes.dart';
import 'package:copor_help/src/config/help_module.dart';
import 'package:copor_help/src/config/help_routes.dart';
import 'package:copor_core/src/network/public_routes.dart';

void main() {
  const module = HelpModule();

  test('is named after its server module', () {
    expect(module.name, 'help');
  });

  test('its app installation page is public', () {
    expect(module.publicRoutes.map((route) => route.path), [HelpRoutes.appInstallationPage]);
    expect(AppRoutes.publicRoutes, contains(HelpRoutes.appInstallationPage));
  });

  test('its pages are always accessible', () {
    expect(
      AppRoutes.alwaysAccessibleRoutes,
      containsAll([HelpRoutes.about, HelpRoutes.helpDashboard, HelpRoutes.toolsDashboard]),
    );
  });

  test('adds About to the drawer footer and nothing to the Dev menu', () {
    expect(module.drawerFooterLinks.map((link) => link.route), [HelpRoutes.about]);
    expect(module.devMenuLinks, isEmpty);
  });

  test('reads the changelog from a public server route', () {
    expect(PublicRoutes.isPublic('/help/changelog', 'GET'), isTrue);
    expect(PublicRoutes.isPublic('/help/changelog/latest', 'GET'), isTrue);
  });
}
