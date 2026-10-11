import 'dart:typed_data';
import 'package:desktop_drop/desktop_drop.dart';
import 'package:copor_core/src/data/model/media_file/media_file_model.dart';
import 'package:copor_core/src/data/model/media_file/mime_type.dart';
import 'package:copor_core/src/components/upload_drop_zone.dart';
import 'package:copor_theme/copor_theme.dart';
import 'package:file_picker/file_picker.dart';
import 'package:flutter/material.dart';

class TodoAttachmentPicker extends StatefulWidget {
  final String browseLabel;
  final String dropFilesLabel;
  final ValueChanged<List<MediaFileModel>> onChanged;

  const TodoAttachmentPicker({
    super.key,
    required this.browseLabel,
    required this.dropFilesLabel,
    required this.onChanged,
  });

  @override
  State<TodoAttachmentPicker> createState() => _TodoAttachmentPickerState();
}

class _TodoAttachmentPickerState extends State<TodoAttachmentPicker> {
  final List<MediaFileModel> _attachments = [];
  bool _isSelecting = false;

  MediaFileModel _mediaFileFromData(String name, Uint8List bytes) {
    final extension = name.contains('.') ? name.split('.').last.toLowerCase() : '';
    var mimeType = MimeType.fromExtension(extension);
    if (mimeType == MimeType.unknown) {
      mimeType = MimeType.detectMimeTypeFromBytes(bytes);
    }
    return MediaFileModel.fromData(name: name, type: mimeType, bytes: bytes, size: bytes.length);
  }

  void _addAttachments(Iterable<MediaFileModel> attachments) {
    setState(() => _attachments.addAll(attachments));
    widget.onChanged(List.unmodifiable(_attachments));
  }

  void _removeAttachment(MediaFileModel attachment) {
    setState(() => _attachments.remove(attachment));
    widget.onChanged(List.unmodifiable(_attachments));
  }

  Future<void> _browse() async {
    if (_isSelecting) return;
    setState(() => _isSelecting = true);
    final result = await FilePicker.platform.pickFiles(allowMultiple: true, withData: true);
    if (!mounted) return;
    final attachments = result?.files
        .where((file) => file.bytes != null)
        .map((file) => _mediaFileFromData(file.name, file.bytes!));
    if (attachments != null) {
      _addAttachments(attachments);
    }
    setState(() => _isSelecting = false);
  }

  Future<void> _addDroppedFile(List<DropItem> items) async {
    if (_isSelecting) return;
    final files = items.whereType<DropItemFile>().toList();
    if (files.isEmpty) return;
    setState(() => _isSelecting = true);
    final attachments = await Future.wait(
      files.map((file) async {
        final bytes = await file.readAsBytes();
        return _mediaFileFromData(file.name, bytes);
      }),
    );
    if (!mounted) return;
    _addAttachments(attachments);
    setState(() => _isSelecting = false);
  }

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.only(top: kInputLabelTopPadding, bottom: kInputBottomPadding),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          if (_attachments.isNotEmpty) ...[
            Wrap(
              spacing: 8,
              runSpacing: 8,
              children: _attachments
                  .map(
                    (attachment) => Chip(
                      avatar: const Icon(Icons.attach_file, size: 16),
                      label: Text(attachment.name),
                      onDeleted: _isSelecting ? null : () => _removeAttachment(attachment),
                    ),
                  )
                  .toList(),
            ),
            const SizedBox(height: kInputLabelTopPadding + kInputBottomPadding),
          ],
          UploadDropZone(
            browseLabel: widget.browseLabel,
            dropFilesLabel: widget.dropFilesLabel,
            onBrowse: _browse,
            onFilesDropped: _addDroppedFile,
            icon: PhosphorIconsThin.fileArrowUp,
          ),
        ],
      ),
    );
  }
}
