import 'package:copor_core/src/data/model/media_file/fallback_icon.dart';
import 'package:copor_core/src/data/model/media_file/file_types/image_file_model/fullscreen_image_viewer.dart';
import 'package:copor_core/src/data/model/media_file/media_converters.dart';
import 'package:copor_core/src/data/model/media_file/media_file_model.dart';
import 'package:copor_core/src/modules/media_picker/domain/entities/media_picker_translations.dart';
import 'package:copor_core/src/utils/name_spaces.dart';
import 'package:flutter/material.dart';
import 'package:json_annotation/json_annotation.dart';

part 'image_file_model.g.dart';

@JsonSerializable(explicitToJson: true)
class ImageFileModel extends MediaFileModel {
  static const String namespaceStatic = ModelNamespaces.ImageUpload;
  final String? path;

  const ImageFileModel({
    required super.id,
    required super.name,
    required super.type,
    super.size,
    required super.bytes,
    this.path,
  });

  factory ImageFileModel.fromJson(Map<String, dynamic> json) => _$ImageFileModelFromJson(json);

  @override
  Map<String, dynamic> toJson() => _$ImageFileModelToJson(this);

  @override
  Widget getPreview({double size = 72.0}) {
    return Image(
      image: _imageProvider,
      fit: BoxFit.cover,
      width: size,
      height: size,
      errorBuilder: (context, _, _) => FallbackIcon(type: type, size: size),
    );
  }

  @override
  Widget getDrivePreview() {
    return ClipRRect(
      borderRadius: BorderRadius.circular(8),
      child: Image(
        image: AssetImage(getSource()),
        fit: BoxFit.cover,
        width: double.infinity,
        height: double.infinity,
        errorBuilder: (context, _, _) => Container(
          decoration: BoxDecoration(
            color: const Color(0xFFF3E5F5),
            borderRadius: BorderRadius.circular(8),
          ),
          child: const Center(child: Icon(Icons.image_rounded, size: 28, color: Color(0xFF7B1FA2))),
        ),
      ),
    );
  }

  ImageProvider get _imageProvider {
    if (bytes.isNotEmpty) {
      return MemoryImage(bytes);
    }
    return AssetImage(getSource());
  }

  @override
  Widget getChatPreview(
    BuildContext context,
    MediaPickerTranslations translations, {
    BorderRadius? borderRadius,
    bool isOwnMessage = false,
  }) {
    return Builder(
      builder: (context) {
        return MouseRegion(
          cursor: SystemMouseCursors.click,
          child: GestureDetector(
            onTap: () => FullscreenImageViewer.show(context, _imageProvider, name),
            child: SizedBox(
              height: 200,
              width: 300,
              child: ClipRRect(
                borderRadius: borderRadius ?? BorderRadius.circular(15),
                child: Image(
                  image: _imageProvider,
                  fit: BoxFit.cover,
                  errorBuilder: (context, _, _) => FallbackIcon(type: type, size: 72),
                ),
              ),
            ),
          ),
        );
      },
    );
  }

  @override
  String getSource() => path ?? name;

  @override
  String get namespace => namespaceStatic;
}
