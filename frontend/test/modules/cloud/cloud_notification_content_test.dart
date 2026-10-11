import 'package:copor_cloud/src/helpers/cloud_notification_content.dart';
import 'package:flutter_test/flutter_test.dart';

void main() {
  group('CloudNotificationContent', () {
    test('formats the date and builds the body from file details', () {
      final content = CloudNotificationContent.fromPayload(
        payload: const {
          'filePath': '/cloud/materials',
          'fileName': 'report.pdf',
          'uploaderName': 'Jane Doe',
          'uploadedAt': '2026-08-18T10:15:30.000Z',
        },
        fallbackTitle: 'Cloud update',
        fallbackBody: 'New materials added to cloud',
      );

      expect(content.title, startsWith('Cloud update 18.08.2026 '));
      expect(content.body, 'Jane Doe added report.pdf');
      expect(content.hasFileDetails, isTrue);
    });

    test('uses original content when file details are incomplete', () {
      final content = CloudNotificationContent.fromPayload(
        payload: const {},
        fallbackTitle: 'Cloud update',
        fallbackBody: 'New materials added to cloud',
      );

      expect(content.title, 'Cloud update');
      expect(content.body, 'New materials added to cloud');
      expect(content.hasFileDetails, isFalse);
    });
  });
}
