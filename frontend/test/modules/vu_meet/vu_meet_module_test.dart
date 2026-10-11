import 'package:copor_core/src/components/scaffold/notification_destinations.dart';
import 'package:copor_vu_meet/src/config/vu_meet_module.dart';
import 'package:copor_vu_meet/src/config/vu_meet_routes.dart';
import 'package:copor_vu_meet/src/presentation/components/call/title_or_return_to_call_pill.dart';
import 'package:firebase_messaging/firebase_messaging.dart';
import 'package:flutter/widgets.dart';
import 'package:flutter_test/flutter_test.dart';

void main() {
  const module = VuMeetModule();

  test('its bottom-nav entry is feature-gated and shows the VuMeet badge as a dot', () {
    final entry = module.navEntries.singleWhere((entry) => entry.route == VuMeetRoutes.vuMeet);

    expect(entry.requiresFeature, isTrue);
    expect(entry.badgeKey, NotificationDestinations.vuMeet.key);
    expect(entry.showNotificationDot, isTrue);
  });

  test('its page is always accessible', () {
    expect(module.alwaysAccessibleRoutes, contains(VuMeetRoutes.vuMeet));
  });

  test('leaves other modules\' pushes alone, in the foreground and the background', () async {
    const cloudPush = RemoteMessage(data: {'type': 'CLOUD', 'fileId': 'file-1'});

    expect(await module.handleForegroundPush(cloudPush), isFalse);
    expect(await module.handleBackgroundPush(cloudPush), isFalse);
  });

  test('wraps the app-bar title so a connected call can replace it', () {
    const title = Text('Search');

    final wrapped = module.wrapAppBarTitle(title);

    expect(wrapped, isA<TitleOrReturnToCallPill>());
    expect((wrapped as TitleOrReturnToCallPill).title, same(title));
  });
}
