import 'dart:typed_data';
import 'package:copor_core/src/bloc/utils/bloc_context_extensions.dart';
import 'package:copor_core/src/components/highlighted_text.dart';
import 'package:copor_core/src/data/model/media_file/file_types/image_file_model/fullscreen_image_viewer.dart';
import 'package:copor_cloud/src/data/model/translation/cloud_translation.dart';
import 'package:copor_cloud/src/presentation/widgets/fullscreen_file_viewer.dart';
import 'package:copor_cloud/src/presentation/cubit/drive_page_cubit.dart';
import 'package:copor_core/src/utils/helper_functions.dart';
import 'package:copor_scaffold/copor_scaffold.dart';
import 'package:copor_theme/copor_theme.dart';
import 'package:equatable/equatable.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:json_annotation/json_annotation.dart';

part 'cloud_file.g.dart';

@JsonSerializable()
class CloudFile extends Equatable {
  final String? id;
  final String name;
  final String size;
  final String description;
  final String extension;
  final String thumbnail;
  final String downloadURL;
  final String creatorId;
  final String creatorName;
  final String? createdAt;
  @JsonKey(includeFromJson: false, includeToJson: false)
  final Uint8List? bytes;
  @JsonKey(includeFromJson: false, includeToJson: false)
  final bool isRestrictedFolder;

  const CloudFile({
    this.id,
    required this.name,
    required this.size,
    required this.description,
    required this.extension,
    required this.thumbnail,
    required this.downloadURL,
    required this.creatorId,
    required this.creatorName,
    this.createdAt,
    this.bytes,
    this.isRestrictedFolder = false,
  });

  factory CloudFile.fromJson(Map<String, dynamic> json) => _$CloudFileFromJson(json);

  Map<String, dynamic> toJson() => _$CloudFileToJson(this);

  String get bulkDeleteId {
    final fileId = id?.trim();
    if (fileId != null && fileId.isNotEmpty) return fileId;

    final pathSegments = Uri.parse(downloadURL).pathSegments;
    return pathSegments.isEmpty ? downloadURL : pathSegments.last;
  }

  CloudFile copyWith({
    String? id,
    String? name,
    String? size,
    String? description,
    String? extension,
    String? thumbnail,
    String? downloadURL,
    String? creatorId,
    String? creatorName,
    String? createdAt,
    Uint8List? bytes,
    bool? isRestrictedFolder,
  }) {
    return CloudFile(
      id: id ?? this.id,
      name: name ?? this.name,
      size: size ?? this.size,
      description: description ?? this.description,
      extension: extension ?? this.extension,
      thumbnail: thumbnail ?? this.thumbnail,
      downloadURL: downloadURL ?? this.downloadURL,
      creatorId: creatorId ?? this.creatorId,
      creatorName: creatorName ?? this.creatorName,
      createdAt: createdAt ?? this.createdAt,
      bytes: bytes ?? this.bytes,
      isRestrictedFolder: isRestrictedFolder ?? this.isRestrictedFolder,
    );
  }

  @override
  List<Object?> get props => [
    id,
    name,
    size,
    description,
    extension,
    thumbnail,
    downloadURL,
    creatorId,
    creatorName,
    createdAt,
  ];

  bool canDelete(BuildContext context) =>
      !isRestrictedFolder || isAdmin(context) || creatorId == currentUserId(context);

  Widget fileListPreview(BuildContext context, CloudPageTranslation translations) {
    final cubit = context.read<DrivePageCubit>();

    return DTListTile.surface(
      leading: FileExtensionIcon(thumbnail: thumbnail),
      label: '',
      labelWidget: CoporHighlightedText(
        text: name,
        searchQuery: cubit.state.search,
        style: CoporTheme.of(context).text.body,
        maxLines: 1,
      ),
      border: false,
      height: 55,
      onPressed: () async {
        final Uint8List? downloadedBytes = await cubit.downloadFile(this);
        if (!context.mounted) return;
        if (downloadedBytes != null) {
          _openCloudFilePreview(context, downloadedBytes, this, translations);
        }
      },
      trailing: canDelete(context)
          ? Row(
              mainAxisSize: MainAxisSize.min,
              children: [
                DTDivider.vertical(height: 10, padding: 10),
                DTButton.surface(
                  icon: DTIcons.delete,
                  label: '',
                  semanticLabel: translations.DELETE,
                  inputSize: DTInputSize.small,
                  onPressed: () => confirmDelete(context, cubit, translations),
                ),
              ],
            )
          : null,
    );
  }

  Future<void> confirmDelete(
    BuildContext context,
    DrivePageCubit cubit,
    CloudPageTranslation translations,
  ) async {
    final confirmed = await DTDialog.showDelete(
      context,
      title: translations.DELETE_FILE_TITLE,
      content: translations.deleteFileMessage(name),
      cancelLabel: translations.CANCEL,
      deleteLabel: translations.DELETE,
    );
    if (confirmed != true || !context.mounted) return;

    final success = await cubit.deleteFile(this);
    if (!context.mounted) return;

    if (success) {
      context.getBloc.appScaffold.addBanner(
        DSBanner.success(translations.FILE_DELETED_SUCCESSFULLY, source: 'cloud_file_delete'),
      );
    } else {
      context.getBloc.appScaffold.addBanner(
        DSBanner.error(translations.FAILED_TO_DELETE_FILE, source: 'cloud_file_delete'),
      );
    }
  }

  void openPreview(
    BuildContext context,
    Uint8List downloadedBytes,
    CloudPageTranslation translations,
  ) {
    _openCloudFilePreview(context, downloadedBytes, this, translations);
  }
}

void _openCloudFilePreview(
  BuildContext context,
  Uint8List bytes,
  CloudFile file,
  CloudPageTranslation translations,
) {
  if (file.thumbnail == 'IMAGE') {
    FullscreenImageViewer.show(context, MemoryImage(bytes), file.name);
    return;
  }

  FullscreenFileViewer.show(context, bytes, file.thumbnail, file.name, translations);
}

class FileExtensionIcon extends StatelessWidget {
  final String thumbnail;
  final double size;

  const FileExtensionIcon({super.key, required this.thumbnail, this.size = 24});

  @override
  Widget build(BuildContext context) {
    final color = CoporColors.of(context).onSurface;
    final icon = switch (thumbnail) {
      'PDF' => PhosphorIconsThin.filePdf,
      'DOC' => PhosphorIconsThin.fileDoc,
      'XLS' => PhosphorIconsThin.file,
      'PPT' => PhosphorIconsThin.file,
      'IMAGE' => PhosphorIconsThin.fileImage,
      'VIDEO' => PhosphorIconsThin.fileVideo,
      'AUDIO' => PhosphorIconsThin.fileAudio,
      'TXT' => PhosphorIconsThin.fileText,
      'ARCHIVE' => PhosphorIconsThin.fileZip,
      _ => PhosphorIconsThin.folder,
    };

    return Icon(icon, size: size, color: color);
  }
}
