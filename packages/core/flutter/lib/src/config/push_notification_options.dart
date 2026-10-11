import 'package:copor_core/src/core/module/app_modules.dart';
import 'package:firebase_core/firebase_core.dart';
import 'package:firebase_messaging/firebase_messaging.dart';
import 'package:flutter/foundation.dart';
import 'package:flutter_local_notifications/flutter_local_notifications.dart';

final FlutterLocalNotificationsPlugin flutterLocalNotificationsPlugin =
    FlutterLocalNotificationsPlugin();

const AndroidNotificationChannel androidNotificationChannel = AndroidNotificationChannel(
  'high_importance_channel',
  'High Importance Notifications',
  description: 'This channel is used for important notifications.',
  importance: Importance.high,
);

class PushNotificationHelper {
  static const Set<TargetPlatform> _pushNotificationSupportedPlatforms = {
    TargetPlatform.android,
    TargetPlatform.iOS,
  };

  static bool isPushNotificationSupportedForThisPlatform() {
    return (kIsWeb || _pushNotificationSupportedPlatforms.contains(defaultTargetPlatform));
  }

  static bool isNativeCallSupportedOnThisPlatform() {
    return (_pushNotificationSupportedPlatforms.contains(defaultTargetPlatform));
  }
}

/// [firebaseOptions] and [backgroundHandler] (a top-level
/// `@pragma('vm:entry-point')` function) are the app's — core doesn't know
/// which Firebase project or background isolate entry the app uses.
Future<void> initialisePushNotifications({
  required FirebaseOptions firebaseOptions,
  required BackgroundMessageHandler backgroundHandler,
}) async {
  if (PushNotificationHelper.isPushNotificationSupportedForThisPlatform()) {
    try {
      await Firebase.initializeApp(options: firebaseOptions);
    } catch (error) {
      debugPrint('🚨 Notification error: $error');
      rethrow;
    }

    for (final module in AppModules.enabled) {
      await module.onPushNotificationsInit();
    }

    FirebaseMessaging.onBackgroundMessage(backgroundHandler);

    await flutterLocalNotificationsPlugin.initialize(
      const InitializationSettings(
        android: AndroidInitializationSettings('@mipmap/ic_launcher'),
        iOS: DarwinInitializationSettings(),
      ),
    );

    if (defaultTargetPlatform == TargetPlatform.android) {
      await flutterLocalNotificationsPlugin
          .resolvePlatformSpecificImplementation<AndroidFlutterLocalNotificationsPlugin>()
          ?.createNotificationChannel(androidNotificationChannel);
    }
  }
}
