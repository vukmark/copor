import 'package:desktop_drop/desktop_drop.dart';
import 'package:copor_core/src/core/system/device_service.dart';
import 'package:copor_core/src/data/model/media_file/media_file_model.dart';
import 'package:copor_core/src/data/model/media_file/mime_type.dart';
import 'package:copor_cloud/src/data/model/translation/cloud_translation.dart';
import 'package:copor_cloud/src/presentation/cubit/drive_page_cubit.dart';
import 'package:copor_core/src/components/upload_drop_zone.dart';
import 'package:copor_theme/copor_theme.dart';
import 'package:flutter/material.dart';

Future<void> showUploadFileDialog(
  BuildContext context, {
  required DrivePageCubit drivePageCubit,
  required CloudPageTranslation translations,
  required String uploadingFilesLabel,
}) {
  return DTModalShell.show<void>(
    context,
    isMobile: context.isMobile,
    dismissOnScrimTap: true,
    builder: (_) => _UploadFileDialog(
      drivePageCubit: drivePageCubit,
      translations: translations,
      uploadingFilesLabel: uploadingFilesLabel,
    ),
  );
}

class _UploadFileDialog extends StatefulWidget {
  final DrivePageCubit drivePageCubit;
  final CloudPageTranslation translations;
  final String uploadingFilesLabel;

  const _UploadFileDialog({
    required this.drivePageCubit,
    required this.translations,
    required this.uploadingFilesLabel,
  });

  @override
  State<_UploadFileDialog> createState() => _UploadFileDialogState();
}

class _UploadFileDialogState extends State<_UploadFileDialog> {
  final _descriptionController = TextEditingController();
  final List<MediaFileModel> _files = [];
  bool _replaceConflicts = false;
  bool _sendNotification = true;
  bool _isSelecting = false;
  bool _isUploading = false;
  int _uploadingFileNumber = 0;

  @override
  void dispose() {
    _descriptionController.dispose();
    super.dispose();
  }

  Future<void> _browse() async {
    if (_isSelecting || _isUploading) return;
    setState(() => _isSelecting = true);
    final files = await widget.drivePageCubit.pickFilesForUpload();
    if (!mounted) return;
    _addFiles(files);
    setState(() => _isSelecting = false);
  }

  Future<void> _addDroppedFiles(List<DropItem> droppedItems) async {
    if (_isSelecting || _isUploading) return;
    setState(() => _isSelecting = true);

    final droppedFiles = <MediaFileModel>[];
    for (final item in droppedItems.whereType<DropItemFile>()) {
      final bytes = await item.readAsBytes();
      final extension = item.name.split('.').last.toLowerCase();
      var mimeType = MimeType.fromExtension(extension);
      if (mimeType == MimeType.unknown) {
        mimeType = MimeType.detectMimeTypeFromBytes(bytes);
      }
      droppedFiles.add(
        MediaFileModel.fromData(name: item.name, type: mimeType, bytes: bytes, size: bytes.length),
      );
    }

    final files = await widget.drivePageCubit.prepareFilesForUpload(droppedFiles);
    if (!mounted) return;
    _addFiles(files);
    setState(() => _isSelecting = false);
  }

  void _addFiles(List<MediaFileModel> files) {
    for (final file in files) {
      final existingIndex = _files.indexWhere((selected) => selected.name == file.name);
      if (existingIndex == -1) {
        _files.add(file);
      } else {
        _files[existingIndex] = file;
      }
    }
  }

  Future<void> _upload() async {
    if (_files.isEmpty || _isUploading) return;
    setState(() => _isUploading = true);
    await widget.drivePageCubit.uploadPreparedFiles(
      List.unmodifiable(_files),
      replaceConflicts: _replaceConflicts,
      description: _descriptionController.text,
      notifyReceivers: _sendNotification,
      onUploadStarted: (fileNumber) {
        if (mounted) setState(() => _uploadingFileNumber = fileNumber);
      },
    );
    if (mounted) Navigator.of(context, rootNavigator: true).pop();
  }

  @override
  Widget build(BuildContext context) {
    final translations = widget.translations;

    return Stack(
      children: [
        DTFloatingLayout(
          title: translations.UPLOAD_FILE,
          icon: PhosphorIconsThin.cloudArrowUp,
          isLoading: _isSelecting,
          leading: DTButton.surface(
            label: translations.CANCEL,
            enabled: !_isUploading,
            onPressed: () => Navigator.of(context, rootNavigator: true).pop(),
          ),
          trailing: DTButton.positive(
            label: translations.UPLOAD,
            enabled: _files.isNotEmpty && !_isSelecting && !_isUploading,
            onPressed: _upload,
          ),
          children: [
            DTInputField(
              controller: _descriptionController,
              label: translations.FILE_DESCRIPTION,
              minLines: 3,
              maxLines: 5,
            ),
            const SizedBox(height: 8),
            UploadDropZone(
              browseLabel: translations.BROWSE_FILES,
              dropFilesLabel: translations.DROP_FILES_HERE_TO_UPLOAD,
              onBrowse: _browse,
              onFilesDropped: _addDroppedFiles,
            ),
            if (_files.isNotEmpty) ...[
              const SizedBox(height: 16),
              Wrap(
                spacing: 8,
                runSpacing: 8,
                children: [
                  for (final file in _files)
                    Chip(
                      avatar: const Icon(Icons.attach_file, size: 16),
                      label: Text(file.name),
                      onDeleted: _isUploading ? null : () => setState(() => _files.remove(file)),
                    ),
                ],
              ),
            ],
            const SizedBox(height: 20),
            DTInputDecorator(
              label: translations.UPLOAD_OPTION,
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.stretch,
                children: [
                  DTRadioButton(
                    label: translations.AUTO_RENAME,
                    value: !_replaceConflicts,
                    expand: true,
                    onChanged: (_) => setState(() => _replaceConflicts = false),
                  ),
                  DTRadioButton(
                    label: translations.OVERRIDE,
                    value: _replaceConflicts,
                    expand: true,
                    onChanged: (_) => setState(() => _replaceConflicts = true),
                  ),
                ],
              ),
            ),
            const SizedBox(height: 12),
            DTCheckbox(
              label: translations.SEND_NOTIFICATION_TO_RECEIVING_USERS,
              value: _sendNotification,
              expand: true,
              onChanged: (value) => setState(() => _sendNotification = value ?? false),
            ),
          ],
        ),
        if (_isUploading)
          Positioned.fill(
            child: AbsorbPointer(
              child: ColoredBox(
                color: CoporTheme.of(context).colors.surface.withValues(alpha: 0.7),
                child: Center(
                  child: Column(
                    mainAxisSize: MainAxisSize.min,
                    children: [
                      const DTRingLoader(),
                      const SizedBox(height: 12),
                      Text(
                        '${widget.uploadingFilesLabel} $_uploadingFileNumber/${_files.length}',
                        style: CoporTheme.of(context).text.sectionTitle,
                      ),
                    ],
                  ),
                ),
              ),
            ),
          ),
      ],
    );
  }
}
