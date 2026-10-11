import 'dart:typed_data';
import 'send_vu_meet_message_req_body_dto.dart';
import 'package:copor_core/src/data/model/media_file/mime_type.dart';

class SendVuMeetFileReqBodyDto extends SendVuMeetMessageReqBodyDto {
  final String fileName;
  final Uint8List fileBytes;
  final MimeType mimeType;

  SendVuMeetFileReqBodyDto({
    required super.chatId,
    required super.content,
    required this.fileName,
    required this.fileBytes,
    required this.mimeType,
  });
}
