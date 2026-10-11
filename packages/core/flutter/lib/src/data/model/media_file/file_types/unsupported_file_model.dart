import 'package:copor_core/src/modules/media_picker/domain/entities/media_picker_translations.dart';
import 'package:copor_core/src/utils/name_spaces.dart';
import 'package:copor_theme/copor_theme.dart';
import 'package:json_annotation/json_annotation.dart';
import 'package:flutter/material.dart';
import '../media_converters.dart';
import '../media_file_model.dart';

part 'unsupported_file_model.g.dart';

@JsonSerializable()
class UnsupportedFileModel extends MediaFileModel {
  static const String namespaceStatic = ModelNamespaces.UnknownUpload;

  const UnsupportedFileModel({
    required super.id,
    required super.name,
    required super.type,
    super.size,
    required super.bytes,
  });

  factory UnsupportedFileModel.fromJson(Map<String, dynamic> json) =>
      _$UnsupportedFileModelFromJson(json);

  @override
  Map<String, dynamic> toJson() => _$UnsupportedFileModelToJson(this);

  @override
  Widget getPreview({double size = 72.0}) {
    return Icon(PhosphorIconsThin.file, size: size, color: Colors.grey);
  }

  @override
  Widget getDrivePreview() {
    final onSurface = CoporColorScheme.light().onSurface!;
    return Container(
      decoration: BoxDecoration(
        color: onSurface.withValues(alpha: 0.1),
        borderRadius: BorderRadius.circular(8),
      ),
      child: Center(child: Icon(PhosphorIconsThin.file, size: 28, color: onSurface)),
    );
  }

  @override
  Widget getChatPreview(
    BuildContext context,
    MediaPickerTranslations translations, {
    BorderRadius? borderRadius,
    bool isOwnMessage = false,
    double size = 72.0,
  }) {
    final colors = CoporColors.of(context);
    final backgroundColor = isOwnMessage ? colors.primaryContainer : colors.surfaceContainer;
    final borderColor = isOwnMessage
        ? colors.primaryBorder.withValues(alpha: 0.1)
        : colors.outline.withValues(alpha: 0.3);

    return Container(
      width: size,
      height: size,
      decoration: BoxDecoration(
        color: backgroundColor,
        borderRadius: borderRadius ?? BorderRadius.circular(12),
        border: Border.all(color: borderColor),
      ),
      child: Icon(PhosphorIconsThin.file, size: size * 0.55, color: colors.onSurface),
    );
  }

  @override
  String getSource() => name;

  @override
  String get namespace => namespaceStatic;
}
