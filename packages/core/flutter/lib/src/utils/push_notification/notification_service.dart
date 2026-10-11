import 'package:copor_core/src/core/module/app_modules.dart';
import 'dart:async';


import 'package:copor_core/src/config/push_notification_options.dart';
import 'package:firebase_messaging/firebase_messaging.dart';
import 'package:flutter/foundation.dart';
import 'package:flutter_local_notifications/flutter_local_notifications.dart';


class NotificationService {
  static final NotificationService _instance = NotificationService._();

  factory NotificationService() => _instance;

  NotificationService._();

  final FirebaseMessaging _firebaseMessaging = FirebaseMessaging.instance;
  Future<String?>? _initialization;

  Future<String?> initNotifications() async {
    final existingInitialization = _initialization;
    if (existingInitialization != null) return existingInitialization;

    final initialization = _initializeNotifications();
    _initialization = initialization;
    try {
      return await initialization;
    } catch (_) {
      if (identical(_initialization, initialization)) _initialization = null;
      rethrow;
    }
  }

  Future<String?> _initializeNotifications() async {
    var settings = await _firebaseMessaging.getNotificationSettings();
    if (settings.authorizationStatus == AuthorizationStatus.denied) return null;

    if (settings.authorizationStatus == AuthorizationStatus.notDetermined) {
      settings = await _firebaseMessaging.requestPermission(
        alert: true,
        announcement: false,
        badge: true,
        carPlay: false,
        criticalAlert: false,
        provisional: false,
        sound: true,
      );
      if (settings.authorizationStatus == AuthorizationStatus.denied) return null;
    }

    final fcmToken = await _firebaseMessaging.getToken();

    if (fcmToken == null) {
      return null;
    }

    initPushNotifications();
    return fcmToken;
  }

  /// Shows [title] / [body] as a system notification on the high-importance
  /// channel. Not on web, where the browser shows pushes itself.
  static Future<void> showLocalNotification({
    required int id,
    required String title,
    required String body,
  }) async {
    if (kIsWeb) return;
    await flutterLocalNotificationsPlugin.show(
      id,
      title,
      body,
      NotificationDetails(
        android: AndroidNotificationDetails(
          androidNotificationChannel.id,
          androidNotificationChannel.name,
          channelDescription: androidNotificationChannel.description,
          importance: Importance.high,
          priority: Priority.high,
        ),
        iOS: const DarwinNotificationDetails(
          presentAlert: true,
          presentBadge: true,
          presentSound: true,
        ),
      ),
    );
  }

  void handleMessage(RemoteMessage? message) async {
    if (message == null) return;

    for (final module in AppModules.enabled) {
      if (await module.handleForegroundPush(message)) return;
    }
  }

  void _handleNotificationTap(RemoteMessage? message) {
    if (message == null) return;

    // The module the notification belongs to opens its page.
    for (final module in AppModules.enabled) {
      if (module.openPushNotification(message.data)) return;
    }
  }

  StreamSubscription? _onMessageOpenedSub;
  StreamSubscription? _onMessageSub;

  Future initPushNotifications() async {
    FirebaseMessaging.instance.getInitialMessage().then(_handleNotificationTap);

    _onMessageOpenedSub?.cancel();
    _onMessageOpenedSub = FirebaseMessaging.onMessageOpenedApp.listen(_handleNotificationTap);

    _onMessageSub?.cancel();
    _onMessageSub = FirebaseMessaging.onMessage.listen((message) {
      handleMessage(message);
    });
  }

  void dispose() {
    _onMessageOpenedSub?.cancel();
    _onMessageSub?.cancel();
    _initialization = null;
  }
}
