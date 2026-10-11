import 'dart:typed_data';

import 'package:flutter/material.dart';

enum MimeType {
  jpeg('image/jpeg', 'jpg'),
  png('image/png', 'png'),
  gif('image/gif', 'gif'),
  webp('image/webp', 'webp'),
  svg('image/svg+xml', 'svg'),
  mp4('video/mp4', 'mp4'),
  mov('video/quicktime', 'mov'),
  webm('video/webm', 'webm'),
  mp3('audio/mpeg', 'mp3'),
  wav('audio/wav', 'wav'),
  aac('audio/aac', 'aac'),
  pdf('application/pdf', 'pdf'),
  doc('application/msword', 'doc'),
  docx('application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'docx'),
  xls('application/vnd.ms-excel', 'xls'),
  xlsx('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'xlsx'),
  txt('text/plain', 'txt'),
  csv('text/csv', 'csv'),
  json('application/json', 'json'),
  zip('application/zip', 'zip'),
  tar('application/x-tar', 'tar'),
  unknown('application/octet-stream', '');

  final String value;
  final String extension;

  const MimeType(this.value, this.extension);

  static MimeType fromValue(String? value) {
    return MimeType.values.firstWhere(
      (type) => type.value == value?.toLowerCase(),
      orElse: () => MimeType.unknown,
    );
  }

  IconData get icon {
    if (isImage) return Icons.image;
    if (isVideo) return Icons.videocam;
    if (isAudio) return Icons.audiotrack;
    if (this == pdf) return Icons.picture_as_pdf;
    return Icons.insert_drive_file;
  }

  static MimeType fromExtension(String? ext) {
    if (ext == null) return MimeType.unknown;
    final cleanedExt = ext.replaceAll('.', '').toLowerCase();
    if (cleanedExt == 'jpeg') return MimeType.jpeg;
    return MimeType.values.firstWhere(
      (type) => type.extension == cleanedExt,
      orElse: () => MimeType.unknown,
    );
  }

  static MimeType detect(String fileName, Uint8List bytes) {
    final byExtension = fromExtension(fileName.split('.').last);
    if (byExtension != MimeType.unknown) return byExtension;
    return detectMimeTypeFromBytes(bytes);
  }

  bool get isImage => value.startsWith('image/');

  bool get isVideo => value.startsWith('video/');

  bool get isAudio => value.startsWith('audio/');

  bool get isDocument => !isImage && !isVideo && !isAudio && this != unknown;

  static MimeType detectMimeTypeFromBytes(Uint8List bytes) {
    if (bytes.length < 12) return MimeType.unknown;

    // JPEG: FF D8 FF
    if (bytes[0] == 0xFF && bytes[1] == 0xD8 && bytes[2] == 0xFF) {
      return MimeType.jpeg;
    }
    // PNG: 89 50 4E 47 0D 0A 1A 0A
    if (bytes[0] == 0x89 && bytes[1] == 0x50 && bytes[2] == 0x4E && bytes[3] == 0x47) {
      return MimeType.png;
    }
    // GIF: 47 49 46 38
    if (bytes[0] == 0x47 && bytes[1] == 0x49 && bytes[2] == 0x46 && bytes[3] == 0x38) {
      return MimeType.gif;
    }
    // WebP: 52 49 46 46 ... 57 45 42 50
    if (bytes[0] == 0x52 &&
        bytes[1] == 0x49 &&
        bytes[2] == 0x46 &&
        bytes[3] == 0x46 &&
        bytes[8] == 0x57 &&
        bytes[9] == 0x45 &&
        bytes[10] == 0x42 &&
        bytes[11] == 0x50) {
      return MimeType.webp;
    }
    // PDF: 25 50 44 46 (%PDF)
    if (bytes[0] == 0x25 && bytes[1] == 0x50 && bytes[2] == 0x44 && bytes[3] == 0x46) {
      return MimeType.pdf;
    }
    // MP4: ... 66 74 79 70 (ftyp) at offset 4
    if (bytes.length > 7 &&
        bytes[4] == 0x66 &&
        bytes[5] == 0x74 &&
        bytes[6] == 0x79 &&
        bytes[7] == 0x70) {
      return MimeType.mp4;
    }

    return MimeType.unknown;
  }
}
