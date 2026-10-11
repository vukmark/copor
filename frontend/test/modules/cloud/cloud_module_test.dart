import 'package:copor_cloud/src/config/cloud_module.dart';
import 'package:copor_cloud/src/config/cloud_routes.dart';
import 'package:firebase_messaging/firebase_messaging.dart';
import 'package:flutter_test/flutter_test.dart';

void main() {
  const module = CloudModule();

  test('its bottom-nav entry refreshes Cloud when opened', () {
    final entry = module.navEntries.singleWhere((entry) => entry.route == CloudRoutes.cloud);

    expect(entry.onOpen, isNotNull);
  });

  test('its page is always accessible', () {
    expect(module.alwaysAccessibleRoutes, contains(CloudRoutes.cloud));
  });

  test('leaves other modules\' WebSocket messages and pushes alone', () async {
    expect(module.handleWebSocketMessage('VU_MEET_MESSAGE', const {}), isFalse);
    expect(await module.handleForegroundPush(const RemoteMessage(data: {'type': 'CHAT'})), isFalse);
    expect(module.openInboxNotification('chat-1'), isFalse);
  });
}
