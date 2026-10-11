import 'dart:io';
import 'package:copor_core/src/bloc/utils/bloc_context_extensions.dart';
import 'package:copor_core/src/data/model/media_file/media_file_model.dart';
import 'package:copor_core/src/data/model/media_file/media_converters.dart';
import 'package:copor_core/src/data/model/media_file/mime_type.dart';
import 'package:copor_core/src/utils/file_download.dart';
import 'package:copor_core/src/modules/media_picker/domain/entities/media_picker_translations.dart';
import 'package:copor_core/src/utils/name_spaces.dart';
import 'package:copor_scaffold/copor_scaffold.dart' show DSBanner;
import 'package:copor_theme/copor_theme.dart';
import 'package:flutter/foundation.dart' show kIsWeb;
import 'package:flutter/material.dart';
import 'package:json_annotation/json_annotation.dart';
import 'package:path_provider/path_provider.dart';
import 'package:permission_handler/permission_handler.dart';

part 'document_file_model.g.dart';

@JsonSerializable(explicitToJson: true)
class DocumentFileModel extends MediaFileModel {
  static const String namespaceStatic = ModelNamespaces.DocumentUpload;

  const DocumentFileModel({
    required super.id,
    required super.name,
    required super.type,
    super.size,
    required super.bytes,
  });

  factory DocumentFileModel.fromJson(Map<String, dynamic> json) =>
      _$DocumentFileModelFromJson(json);

  @override
  Widget getPreview({double size = 72.0}) {
    return Icon(type.icon, size: size, color: Colors.grey);
  }

  @override
  Widget getDrivePreview() {
    final onSurface = CoporColorScheme.light().onSurface!;
    final bgColor = onSurface.withValues(alpha: 0.1);
    final fgColor = onSurface;
    final icon = switch (type) {
      MimeType.pdf => Icons.picture_as_pdf_rounded,
      MimeType.doc || MimeType.docx => Icons.article_rounded,
      MimeType.xls || MimeType.xlsx => Icons.grid_on_rounded,
      MimeType.csv => Icons.table_rows_rounded,
      MimeType.txt => Icons.text_snippet_rounded,
      MimeType.json => Icons.data_object_rounded,
      MimeType.zip || MimeType.tar => Icons.folder_zip_rounded,
      _ => Icons.insert_drive_file_rounded,
    };

    return Container(
      decoration: BoxDecoration(color: bgColor, borderRadius: BorderRadius.circular(8)),
      child: Center(
        child: FittedBox(
          fit: BoxFit.scaleDown,
          child: Padding(
            padding: const EdgeInsets.all(4),
            child: Column(
              mainAxisSize: MainAxisSize.min,
              children: [
                Icon(icon, size: 28, color: fgColor),
                const SizedBox(height: 2),
                Text(
                  type.extension.toUpperCase(),
                  style: TextStyle(
                    fontSize: 9,
                    fontWeight: FontWeight.w700,
                    color: fgColor,
                    letterSpacing: 0.5,
                  ),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }

  @override
  Widget getChatPreview(
    BuildContext context,
    MediaPickerTranslations translations, {
    BorderRadius? borderRadius,
    bool isOwnMessage = false,
  }) {
    final colors = CoporColors.of(context);
    final theme = CoporTheme.of(context);
    final backgroundColor = isOwnMessage ? colors.primaryContainer : colors.surfaceContainer;
    final borderColor = isOwnMessage
        ? colors.primaryBorder.withValues(alpha: 0.1)
        : colors.outline.withValues(alpha: 0.3);
    final iconBackgroundColor = isOwnMessage
        ? colors.primaryBorder.withValues(alpha: 0.08)
        : colors.outline.withValues(alpha: 0.08);

    return MouseRegion(
      cursor: SystemMouseCursors.click,
      child: GestureDetector(
        onTap: () async {
          final shouldDownload = await DTDialog.showConfirm(
            context,
            title: translations.CONFIRM_DOWNLOAD,
            content: translations.DO_YOU_WANT_TO_DOWNLOAD,
            cancelLabel: translations.CANCEL,
            confirmLabel: translations.DOWNLOAD_FILE,
          );

          if (shouldDownload == true) {
            if (!context.mounted) return;
            await _downloadFile(context, translations);
          }
        },
        child: ConstrainedBox(
          constraints: const BoxConstraints(maxWidth: 250),
          child: Container(
            padding: const EdgeInsets.symmetric(horizontal: 12.0, vertical: 10.0),
            decoration: BoxDecoration(
              color: backgroundColor,
              borderRadius: borderRadius ?? BorderRadius.circular(12.0),
              border: Border.all(color: borderColor),
            ),
            child: Row(
              mainAxisSize: MainAxisSize.min,
              children: [
                Container(
                  width: 34,
                  height: 34,
                  decoration: BoxDecoration(
                    color: iconBackgroundColor,
                    borderRadius: BorderRadius.circular(8),
                  ),
                  child: Icon(type.icon, size: 20, color: colors.onSurface),
                ),
                const SizedBox(width: 10.0),
                Flexible(
                  child: Column(
                    mainAxisSize: MainAxisSize.min,
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        name,
                        style: theme.text.body.copyWith(color: colors.onSurface),
                        overflow: TextOverflow.ellipsis,
                      ),
                      Text(
                        type.extension.toUpperCase(),
                        style: theme.text.bodySecondary.copyWith(
                          color: colors.onSurface.withValues(alpha: 0.65),
                        ),
                        overflow: TextOverflow.ellipsis,
                      ),
                    ],
                  ),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }

  Future<void> _downloadFile(BuildContext context, MediaPickerTranslations translations) async {
    try {
      if (kIsWeb) {
        FileDownloadWeb.downloadFile(bytes, name);
        if (!context.mounted) return;
        _showSuccessBanner(context, translations.FILE_DOWNLOADED_SUCCESSFULLY);
        return;
      }

      if (Platform.isAndroid) {
        final status = await Permission.storage.request();
        if (!context.mounted) return;

        if (status.isPermanentlyDenied) {
          _showErrorBanner(context, translations.STORAGE_PERMISSION_PERMANENTLY_DENIED);
          openAppSettings();
          return;
        }
        if (!status.isGranted && !status.isLimited) {
          _showErrorBanner(context, translations.STORAGE_PERMISSION_DENIED);
          return;
        }

        final downloadsDir = Directory('/storage/emulated/0/Download');
        final savePath = '${downloadsDir.path}/$name';
        final file = File(savePath);
        await file.writeAsBytes(bytes);
        if (!context.mounted) return;
        _showSuccessBanner(context, translations.FILE_DOWNLOADED_SUCCESSFULLY);
      } else if (Platform.isIOS) {
        final documentsDir = await getApplicationDocumentsDirectory();
        final savePath = '${documentsDir.path}/$name';
        final file = File(savePath);
        await file.writeAsBytes(bytes);
        if (!context.mounted) return;
        _showSuccessBanner(context, translations.FILE_DOWNLOADED_SUCCESSFULLY);
      }
    } catch (_) {
      if (!context.mounted) return;
      _showErrorBanner(context, translations.FILE_DOWNLOAD_FAILED);
    }
  }

  void _showSuccessBanner(BuildContext context, String message) {
    context.getBloc.appScaffold.addBanner(
      DSBanner.success(message, source: 'vu_meet_file_download_success'),
    );
  }

  void _showErrorBanner(BuildContext context, String message) {
    context.getBloc.appScaffold.addBanner(
      DSBanner.error(message, source: 'vu_meet_file_download_error'),
    );
  }

  @override
  String getSource() => name;

  @override
  Map<String, dynamic> toJson() => _$DocumentFileModelToJson(this);

  @override
  String get namespace => throw UnimplementedError();
}
