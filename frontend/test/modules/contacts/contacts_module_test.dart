import 'package:flutter_test/flutter_test.dart';
import 'package:go_router/go_router.dart';
import 'package:copor_frontend/modules.dart';
import 'package:copor_contacts/src/config/contact_routes.dart';
import 'package:copor_contacts/src/config/contacts_module.dart';

Iterable<String> _paths(List<RouteBase> routes) sync* {
  for (final route in routes) {
    if (route is GoRoute) yield route.path;
    if (route is StatefulShellRoute) {
      for (final branch in route.branches) {
        yield* _paths(branch.routes);
      }
    }
    yield* _paths(route.routes);
  }
}

void main() {
  const module = ContactsModule();

  test('is named after its server module', () {
    expect(module.name, 'contacts');
  });

  test('brings its own /contacts route', () {
    final paths = module.routeBranches.expand((branch) => _paths(branch.routes)).toList();

    expect(paths, contains(ContactRoutes.contacts));
  });

  test('is one of the enabled modules', () {
    expect(enabledModules.whereType<ContactsModule>(), hasLength(1));
  });
}
