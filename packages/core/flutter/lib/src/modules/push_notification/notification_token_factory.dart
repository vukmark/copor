import 'dart:io';
import 'package:copor_core/src/modules/push_notification/model/push_notification_token_save_android_model.dart';
import 'package:copor_core/src/modules/push_notification/model/push_notification_token_save_ios_model.dart';
import 'package:copor_core/src/modules/push_notification/model/push_notification_token_save_model.dart';
import 'package:copor_core/src/modules/push_notification/model/push_notification_token_save_web_model.dart';
import 'package:copor_core/src/utils/push_notification/notification_service.dart';
import 'package:flutter/foundation.dart';

class NotificationTokenFactory {
  static Future<PushNotificationTokenSaveModel?> getToken() async {
    final token = await NotificationService().initNotifications();
    if (token != null) {
      if (kIsWeb) {
        return PushNotificationTokenSaveWebModel(token: token);
      }
      if (Platform.isAndroid) {
        return PushNotificationTokenSaveAndroidModel(token: token);
      }
      if (Platform.isIOS) {
        return PushNotificationTokenSaveIosModel(token: token);
      }
    }
    return null;
  }
}
