import 'package:desktop_drop/desktop_drop.dart';
import 'package:copor_core/src/bloc/utils/bloc_context_extensions.dart';
import 'package:copor_core/src/components/presence_avatar.dart';
import 'package:copor_core/src/components/user_picker/user_picker_list.dart';
import 'package:copor_core/src/core/system/device_service.dart';
import 'package:copor_core/src/data/model/media_file/media_file_model.dart';
import 'package:copor_core/src/data/model/media_file/mime_type.dart';
import 'package:copor_core/src/data/model/user_picker/user_picker_item_model.dart';
import 'package:copor_cloud/src/data/model/translation/cloud_translation.dart';
import 'package:copor_cloud/src/presentation/cubit/drive_page_cubit.dart';
import 'package:copor_cloud/src/presentation/cubit/drive_page_state.dart';
import 'package:copor_core/src/components/upload_drop_zone.dart';
import 'package:copor_scaffold/copor_scaffold.dart';
import 'package:copor_theme/copor_theme.dart';
import 'package:flutter/material.dart';

/// Cloud's user picker route: whom the actor may send a file to, scoped by
/// `cloud.canGetShareRecipientList`.
const String _shareRecipientsPath = '/cloud/recipients';

/// "Send a file to a person" flow. The recipients are chosen from
/// [_shareRecipientsPath]; the file is then uploaded into each selected user's Public folder via
/// `POST /cloud/PUBLIC/USER/:userId/*` (see [DrivePageCubit.uploadPreparedFiles]
/// `targetUserId`).
Future<void> showShareToUserDialog(
  BuildContext context, {
  required DrivePageCubit drivePageCubit,
  required CloudPageTranslation translations,
  required String uploadingFilesLabel,
}) {
  return DTModalShell.show<void>(
    context,
    isMobile: context.isMobile,
    dismissOnScrimTap: true,
    builder: (_) => _ShareToUserDialog(
      drivePageCubit: drivePageCubit,
      translations: translations,
      uploadingFilesLabel: uploadingFilesLabel,
    ),
  );
}

class _ShareToUserDialog extends StatefulWidget {
  final DrivePageCubit drivePageCubit;
  final CloudPageTranslation translations;
  final String uploadingFilesLabel;

  const _ShareToUserDialog({
    required this.drivePageCubit,
    required this.translations,
    required this.uploadingFilesLabel,
  });

  @override
  State<_ShareToUserDialog> createState() => _ShareToUserDialogState();
}

class _ShareToUserDialogState extends State<_ShareToUserDialog> {
  final TextEditingController _descriptionController = TextEditingController();
  final List<MediaFileModel> _files = [];

  final List<UserPickerItemModel> _recipients = [];
  bool _isRecipientStep = true;
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

  // ---- recipient picking -------------------------------------------------

  void _toggleRecipient(UserPickerItemModel person) {
    setState(() {
      final index = _recipients.indexWhere((recipient) => recipient.id == person.id);
      if (index == -1) {
        _recipients.add(person);
      } else {
        _recipients.removeAt(index);
      }
    });
  }

  void _showRecipientStep() {
    setState(() => _isRecipientStep = true);
  }

  void _showFileStep() {
    if (_recipients.isEmpty) return;
    setState(() => _isRecipientStep = false);
  }

  // ---- file picking ----------------------------------------------------

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

  Future<void> _send() async {
    if (_recipients.isEmpty || _files.isEmpty || _isUploading) return;

    setState(() => _isUploading = true);
    var uploadFailed = false;
    for (var recipientIndex = 0; recipientIndex < _recipients.length; recipientIndex++) {
      await widget.drivePageCubit.uploadPreparedFiles(
        List.unmodifiable(_files),
        replaceConflicts: _replaceConflicts,
        description: _descriptionController.text,
        notifyReceivers: _sendNotification,
        targetUserId: _recipients[recipientIndex].id,
        onUploadStarted: (fileNumber) {
          if (!mounted) return;
          setState(() => _uploadingFileNumber = recipientIndex * _files.length + fileNumber);
        },
      );
      uploadFailed = uploadFailed || widget.drivePageCubit.state.uploadStatus is UploadFailure;
    }
    if (!mounted) return;

    if (!uploadFailed) {
      context.getBloc.appScaffold.addBanner(
        DSBanner.success(widget.translations.FILE_SENT_SUCCESSFULLY, source: 'cloud_share'),
      );
    }
    // Failures surface through the existing upload BlocListener.
    Navigator.of(context, rootNavigator: true).pop();
  }

  // ---- build --------------------------------------------------------

  @override
  Widget build(BuildContext context) {
    return Stack(
      children: [
        _isRecipientStep ? _buildRecipientStep() : _buildFileStep(),
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
                        '${widget.uploadingFilesLabel} $_uploadingFileNumber/'
                        '${_files.length * _recipients.length}',
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

  Widget _buildRecipientStep() {
    final translations = widget.translations;
    final dt = CoporTheme.of(context);

    return DTFloatingLayout(
      title: translations.SEND_FILE_TO_USER,
      icon: PhosphorIconsThin.paperPlaneRight,
      isLoading: false,
      leading: DTButton.surface(
        label: translations.CANCEL,
        onPressed: () => Navigator.of(context, rootNavigator: true).pop(),
      ),
      trailing: DTButton.positive(
        label: translations.NEXT,
        enabled: _recipients.isNotEmpty,
        onPressed: _showFileStep,
      ),
      expandedChild: UserPickerList(
        path: _shareRecipientsPath,
        isSelected: (person) => _recipients.any((recipient) => recipient.id == person.id),
        onTap: _toggleRecipient,
        searchLabel: translations.SEARCH_USERS,
        noUsersLabel: translations.NO_USERS_FOUND,
      ),
      children: [
        Text(translations.SELECT_RECIPIENT, style: dt.text.body),
        const SizedBox(height: 8),
      ],
    );
  }

  Widget _buildFileStep() {
    final translations = widget.translations;
    final dt = CoporTheme.of(context);
    return DTFloatingLayout(
      title: translations.SEND_FILE_TO_USER,
      icon: PhosphorIconsThin.paperPlaneRight,
      isLoading: _isSelecting,
      leading: DTButton.surface(
        label: translations.BACK,
        enabled: !_isUploading,
        onPressed: _showRecipientStep,
      ),
      trailing: DTButton.positive(
        label: translations.SEND,
        enabled: _files.isNotEmpty && !_isSelecting && !_isUploading,
        onPressed: _send,
      ),
      children: [
        DTInputDecorator(
          label: translations.SEND_TO,
          child: Column(
            children: [
              for (final recipient in _recipients)
                Padding(
                  padding: const EdgeInsets.symmetric(vertical: 4),
                  child: Row(
                    children: [
                      PresenceAvatar(
                        userId: recipient.id,
                        userFullName: recipient.fullName,
                        picture: recipient.picture,
                        radius: 18,
                      ),
                      const SizedBox(width: 10),
                      Expanded(
                        child: Text(
                          recipient.isActive == false
                              ? '[${recipient.fullName}]'
                              : recipient.fullName,
                          style: dt.text.body.copyWith(fontWeight: FontWeight.w600),
                          overflow: TextOverflow.ellipsis,
                        ),
                      ),
                    ],
                  ),
                ),
            ],
          ),
        ),
        const SizedBox(height: 8),
        DTInputField(
          controller: _descriptionController,
          label: translations.FILE_DESCRIPTION,
          minLines: 2,
          maxLines: 4,
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
    );
  }
}
