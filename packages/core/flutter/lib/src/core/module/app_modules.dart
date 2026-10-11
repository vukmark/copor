import 'package:copor_core/src/core/module/copor_module.dart';

/// The modules and home route of the running app, set once by the app's
/// `main()` (and by `test/flutter_test_config.dart` for tests). Core reads
/// them here — it never imports the app's `modules.dart`.
class AppModules {
  AppModules._();

  static List<CoporModule> _enabled = const [];
  static String _homeRoute = '/';

  /// The optional modules the app includes, in its order.
  static List<CoporModule> get enabled => _enabled;

  /// Where a signed-in user lands.
  static String get homeRoute => _homeRoute;

  static void register({required List<CoporModule> modules, required String homeRoute}) {
    validateModules(modules);
    _enabled = List.unmodifiable(modules);
    _homeRoute = homeRoute;
  }
}
