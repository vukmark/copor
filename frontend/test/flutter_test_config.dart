import 'dart:async';

import 'package:copor_frontend/modules.dart';
import 'package:copor_core/src/core/module/app_modules.dart';

/// Runs before every test file: registers the app's modules the way `main()`
/// does, so core code that reads `AppModules` sees them.
Future<void> testExecutable(FutureOr<void> Function() testMain) async {
  AppModules.register(modules: enabledModules, homeRoute: homeRoute);
  await testMain();
}
