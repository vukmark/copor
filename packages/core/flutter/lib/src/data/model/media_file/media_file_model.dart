import 'dart:typed_data';
import 'package:copor_core/src/data/model/base_model.dart';
import 'package:copor_core/src/data/model/media_file/file_types/document_file_model.dart';
import 'package:copor_core/src/data/model/media_file/file_types/unsupported_file_model.dart';
import 'package:copor_core/src/data/model/media_file/file_types/image_file_model/image_file_model.dart';
import 'package:copor_core/src/data/model/media_file/media_converters.dart';
import 'package:copor_core/src/modules/media_picker/domain/entities/media_picker_translations.dart';
import 'package:json_annotation/json_annotation.dart';
import 'package:flutter/material.dart';
import 'mime_type.dart';

part 'media_file_model.g.dart';

@JsonSerializable(createFactory: false)
abstract class MediaFileModel extends BaseModel {
  final String id;
  final String name;

  @JsonKey(name: 'mime_type')
  @MimeTypeConverter()
  final MimeType type;

  final int? size;

  @Uint8ListConverter()
  final Uint8List bytes;

  const MediaFileModel({
    required this.id,
    required this.name,
    required this.type,
    required this.bytes,
    this.size,
  });

  factory MediaFileModel.fromJson(Map<String, dynamic> json) {
    final mimeValue = json['mime_type'] as String;
    final MimeType mimeType = MimeType.fromValue(mimeValue);

    if (mimeType.isImage) {
      return ImageFileModel.fromJson(json);
    } else if (mimeType.isDocument) {
      return DocumentFileModel.fromJson(json);
    } else {
      return UnsupportedFileModel.fromJson(json);
    }
  }

  @override
  Map<String, dynamic> toJson() => _$MediaFileModelToJson(this);

  factory MediaFileModel.fromData({
    String? id,
    required String name,
    required MimeType type,
    required Uint8List bytes,
    String? path,
    int? size,
  }) {
    final String tempId = id ?? DateTime.now().millisecondsSinceEpoch.toString();

    if (type.isImage) {
      return ImageFileModel(
        id: tempId,
        name: name,
        type: type,
        bytes: bytes,
        path: path,
        size: size,
      );
    } else if (type.isDocument) {
      return DocumentFileModel(id: tempId, name: name, type: type, bytes: bytes, size: size);
    } else {
      return UnsupportedFileModel(id: tempId, name: name, type: type, bytes: bytes, size: size);
    }
  }

  Widget getPreview();

  Widget getDrivePreview();

  Widget getChatPreview(
    BuildContext context,
    MediaPickerTranslations translations, {
    BorderRadius? borderRadius,
    bool isOwnMessage = false,
  });

  String getSource();
}
