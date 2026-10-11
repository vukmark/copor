import 'package:copor_core/src/core/module/app_modules.dart';
import 'package:copor_frontend/modules.dart';
import 'package:copor_core/src/utils/console_log_filter.dart';
import 'package:copor_core/src/utils/error_evader.dart';
import 'package:copor_core/src/utils/escape_fallback.dart';
import 'package:copor_core/copor_app.dart';
import 'package:copor_core/src/config/dependency_injection.dart';
import 'package:copor_core/src/config/push_notification_options.dart';
import 'package:copor_core/src/bloc/global_blocs/authorization_bloc/authorization_event.dart';
import 'package:copor_core/src/network/add_interceptors.dart';
import 'package:copor_core/src/bloc/global_blocs/authorization_bloc/authorization_bloc.dart';
import 'package:dio/dio.dart';
import 'package:firebase_core/firebase_core.dart';
import 'package:firebase_messaging/firebase_messaging.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_web_plugins/url_strategy.dart';
import 'package:go_router/go_router.dart';
import 'package:intl/date_symbol_data_local.dart';
import 'package:copor_core/src/bloc/global_blocs/navigation_bloc/navigation_history.dart';
import 'package:copor_core/src/config/dependency_injection.dart' as di;
import 'firebase_options.dart';

@pragma('vm:entry-point')
Future<void> firebaseMessagingBackgroundHandler(RemoteMessage message) async {
  try {
    await Firebase.initializeApp(options: DefaultFirebaseOptions.currentPlatform);
  } catch (error) {
    debugPrint('🚨 Firebase background initialization error: $error');
    return;
  }
  try {
    await di.init();
    addInterceptors(di.getIt<Dio>());
  } catch (error) {
    debugPrint("di.init error: $error");
  }
  for (final module in enabledModules) {
    if (await module.handleBackgroundPush(message)) return;
  }
}

void main() async {
  // First: core reads the app's modules and home route from here.
  AppModules.register(modules: enabledModules, homeRoute: homeRoute);
  WidgetsFlutterBinding.ensureInitialized();
  ErrorEvader.evade('_handledContextLostEvent');
  SystemChrome.setSystemUIOverlayStyle(
    const SystemUiOverlayStyle(statusBarColor: Colors.transparent),
  );
  ConsoleLogFilter.init();
  installEscapeFallback();
  GoRouter.optionURLReflectsImperativeAPIs = true;
  setUrlStrategy(PathUrlStrategy());
  await Future.wait([initializeDateFormatting('en', null), initializeDateFormatting('de', null)]);
  await di.init();
  addInterceptors(di.getIt<Dio>());
  // NavigationHistory.init() (local-storage read) and initialisePushNotifications()
  // (Firebase/CallKit/local-notifications setup) don't depend on each other —
  // only on di.init() above — so they can run concurrently instead of blocking
  // the first frame in sequence.
  await Future.wait([getIt<NavigationHistory>().init(), initialisePushNotifications(
      firebaseOptions: DefaultFirebaseOptions.currentPlatform,
      backgroundHandler: firebaseMessagingBackgroundHandler,
    ),
  ]);
  getIt<AuthorizationBloc>().add(GetTokens());
  await getIt.allReady();

  runApp(const CoporApp());
}
