import 'package:copor_core/src/utils/date_formatter.dart';

class CloudNotificationContent {
  final String title;
  final String body;
  final bool hasFileDetails;

  const CloudNotificationContent({
    required this.title,
    required this.body,
    required this.hasFileDetails,
  });

  factory CloudNotificationContent.fromPayload({
    required Map<String, dynamic> payload,
    required String fallbackTitle,
    required String fallbackBody,
  }) {
    final uploadedAt = DateTime.tryParse(payload['uploadedAt'] as String? ?? '');

    final title = uploadedAt == null
        ? fallbackTitle
        : '$fallbackTitle ${formatDisplayDateTime(uploadedAt.toLocal())}';

    final uploaderName = payload['uploaderName'];
    final fileName = payload['fileName'];
    final hasFileDetails =
        uploaderName is String &&
        uploaderName.isNotEmpty &&
        fileName is String &&
        fileName.isNotEmpty;
    final body = hasFileDetails ? '$uploaderName added $fileName' : fallbackBody;

    return CloudNotificationContent(title: title, body: body, hasFileDetails: hasFileDetails);
  }
}
