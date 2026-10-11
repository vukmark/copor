import 'package:copor_frontend/modules.dart';
import 'package:copor_core/src/components/scaffold/notification_destinations.dart';
import 'package:copor_core/src/config/router/routes.dart';
import 'package:copor_core/src/core/module/module_search_section.dart';
import 'package:copor_core/src/core/module/copor_module.dart';
import 'package:copor_core/src/data/model/filter/data/model/filter_dto/filter_list_dto.dart';
import 'package:copor_core/src/modules/search/data/model/translation/search_translation.dart';
import 'package:flutter/widgets.dart';
import 'package:provider/single_child_widget.dart';
import 'package:flutter_test/flutter_test.dart';

class _TestModule extends CoporModule {
  @override
  final String name;
  @override
  final List<String> dependsOn;

  @override
  final List<ModuleSearchSection> searchSections;

  const _TestModule(this.name, {this.dependsOn = const [], this.searchSections = const []});

  @override
  Future<void> registerDependencies() async {}
}

class _TestSearchSection extends ModuleSearchSection {
  @override
  final int order;

  const _TestSearchSection(this.order);

  @override
  List<SingleChildWidget> providers(BuildContext context) => const [];

  @override
  void search(BuildContext context, FilterListDTO filters) {}

  @override
  bool hasResults(BuildContext context) => false;

  @override
  Widget buildSection(BuildContext context, String query, SearchPageTranslation translation) =>
      const SizedBox.shrink();
}

void main() {
  group('validateModules', () {
    test('accepts modules whose dependencies are listed', () {
      expect(
        () => validateModules(const [
          _TestModule('todo', dependsOn: ['vu_meet']),
          _TestModule('vu_meet'),
        ]),
        returnsNormally,
      );
    });

    test('rejects a module listed twice', () {
      expect(
        () => validateModules(const [_TestModule('news'), _TestModule('news')]),
        throwsA(isA<StateError>().having((e) => e.message, 'message', 'Module "news" is registered more than once.')),
      );
    });

    test('rejects a module whose dependency is missing', () {
      expect(
        () => validateModules(const [
          _TestModule('todo', dependsOn: ['vu_meet']),
        ]),
        throwsA(
          isA<StateError>().having((e) => e.message, 'message', 'Module "todo" depends on missing module(s): vu_meet.'),
        ),
      );
    });

    test('accepts the enabled module list', () {
      expect(() => validateModules(enabledModules), returnsNormally);
    });
  });

  group('bottom navigation', () {
    test('lists core\'s and the modules\' entries sorted by order', () {
      final orders = AppRoutes.bottomNavBarItems.map((entry) => entry.order).toList();
      expect(orders, [...orders]..sort());
    });

    test('home is always shown and carries the desk badge; search is feature-gated', () {
      final byRoute = {for (final entry in AppRoutes.bottomNavBarItems) entry.route: entry};

      expect(byRoute[homeRoute]!.requiresFeature, isFalse);
      expect(byRoute[homeRoute]!.badgeKey, NotificationDestinations.desk.key);
      expect(byRoute['/search']!.requiresFeature, isTrue);
    });
  });

  group('moduleSearchSections', () {
    test('collects every module\'s sections in ascending order', () {
      const late = _TestSearchSection(20);
      const early = _TestSearchSection(5);
      const middle = _TestSearchSection(10);

      expect(
        moduleSearchSections(const [
          _TestModule('a', searchSections: [late, early]),
          _TestModule('b'),
          _TestModule('c', searchSections: [middle]),
        ]),
        [early, middle, late],
      );
    });
  });
}
