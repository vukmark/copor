import 'package:copor_core/src/bloc/utils/bloc_context_extensions.dart';
import 'package:copor_cloud/src/data/model/translation/cloud_translation.dart';
import 'package:copor_cloud/src/presentation/widgets/fullscreen_file_viewer.dart';
import 'package:copor_todo/src/data/model/todo_attachment_model.dart';
import 'package:copor_todo/src/data/model/todo_model.dart';
import 'package:copor_todo/src/data/model/translation/todo_translation.dart';
import 'package:copor_todo/src/logic/todo_attachment/todo_attachment_cubit.dart';
import 'package:copor_scaffold/copor_scaffold.dart';
import 'package:copor_theme/copor_theme.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

const _fileViewerTranslations = CloudPageTranslation(
  translationStringList: {
    'PDF_LOAD_ERROR': 'PDF could not be loaded',
    'INVALID_PDF_DATA': 'Invalid PDF data',
    'BYTES_TOO_SHORT': 'File data is incomplete',
    'PREVIEW_NOT_AVAILABLE': 'Preview is not available for this file',
    'DOWNLOADED_SUCCESSFULLY': 'File downloaded successfully',
    'STORAGE_PERMISSION_DENIED': 'Storage permission denied',
    'DOWNLOAD_FAILED': 'File download failed',
  },
);

void showTodoDetailsDialog(
  BuildContext context,
  TodoModel todo,
  TodoPageTranslation translation,
) {
  final attachmentCubit = context.read<TodoAttachmentCubit>();
  DTModalShell.show<void>(
    context,
    isMobile: MediaQuery.sizeOf(context).width < kMobileBreakpoint,
    builder: (dialogContext) => BlocProvider.value(
      value: attachmentCubit,
      child: DTTableLabelsProvider(
        labels: _tableLabels(translation),
        isMobile: false,
        child: DTFloatingLayout(
          title: translation.TODO,
          icon: Icons.checklist_outlined,
          leading: DTButton.surface(
            label: translation.CANCEL,
            onPressed: () => Navigator.of(dialogContext, rootNavigator: true).pop(),
          ),
          children: [
            _DetailField(label: translation.DESCRIPTION, child: SelectableText(todo.title)),
            Row(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Expanded(
                  child: _DetailField(
                    label: translation.PRIORITY,
                    child: DTPriorityCell(priority: _priority(todo)),
                  ),
                ),
                const SizedBox(width: 16),
                Expanded(
                  child: _DetailField(
                    label: translation.PROGRESS,
                    child: DTProgressCell(progress: _progress(todo)),
                  ),
                ),
                const SizedBox(width: 16),
                Expanded(
                  child: _DetailField(
                    label: translation.DUE_DATE,
                    child: SelectableText(_formatDeadline(todo.deadline)),
                  ),
                ),
              ],
            ),
            if (todo.attachmentList.isNotEmpty) ...[
              Text(translation.ATTACHMENTS, style: CoporTextStyles.of(context).bodyLight),
              const SizedBox(height: 8),
              ...todo.attachmentList.map((attachment) => _AttachmentRow(attachment: attachment)),
            ],
          ],
        ),
      ),
    ),
  );
}

class _DetailField extends StatelessWidget {
  final String label;
  final Widget child;

  const _DetailField({required this.label, required this.child});

  @override
  Widget build(BuildContext context) {
    final textStyles = CoporTextStyles.of(context);
    return Padding(
      padding: const EdgeInsets.only(bottom: 20),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(label, style: textStyles.bodyLight),
          const SizedBox(height: 6),
          child,
        ],
      ),
    );
  }
}

DTPriority _priority(TodoModel todo) => switch (todo.priority.id.toUpperCase()) {
  'HIGH' => DTPriority.high,
  'URGENT' => DTPriority.urgent,
  _ => DTPriority.normal,
};

DTProgress _progress(TodoModel todo) => switch (todo.progress.toUpperCase()) {
  'STARTED' => DTProgress.started,
  'HALF_WAY' => DTProgress.halfWay,
  'ALMOST_DONE' => DTProgress.almostDone,
  'FINISHED' => DTProgress.finished,
  _ => DTProgress.toDo,
};

String _formatDeadline(String? deadline) {
  if (deadline == null || deadline.isEmpty) return '—';
  try {
    final date = DateTime.parse(deadline).toLocal();
    final day = date.day.toString().padLeft(2, '0');
    final month = date.month.toString().padLeft(2, '0');
    return '$day.$month.${date.year}.';
  } catch (_) {
    return deadline;
  }
}

DTTableLabels _tableLabels(TodoPageTranslation translation) => DTTableLabels(
  noDataFound: '',
  todo: translation.TODO,
  started: translation.STARTED,
  halfway: translation.HALFWAY,
  almostDone: translation.ALMOST_DONE,
  finished: translation.FINISHED,
  normal: translation.NORMAL,
  high: translation.HIGH,
  urgent: translation.URGENT,
  published: '',
  unpublished: '',
  draft: '',
  copy: '',
  copyToClipboard: '',
  trueLabel: '',
  falseLabel: '',
  currentPeriodLabel: '',
);

class _AttachmentRow extends StatelessWidget {
  final TodoAttachmentModel attachment;

  const _AttachmentRow({required this.attachment});

  Future<void> _open(BuildContext context) async {
    final downloaded = await context.read<TodoAttachmentCubit>().download(attachment.id);
    if (!context.mounted) return;
    if (downloaded == null) {
      final failure = context.read<TodoAttachmentCubit>().state.failure;
      context.getBloc.appScaffold.addBanner(
        DSBanner.error(
          failure?.message ?? 'Attachment could not be downloaded',
          source: 'todo_attachment_download',
        ),
      );
      return;
    }
    FullscreenFileViewer.show(
      context,
      downloaded.bytes,
      _thumbnail(downloaded.type.value),
      downloaded.name,
      _fileViewerTranslations,
    );
  }

  @override
  Widget build(BuildContext context) {
    final colors = CoporColors.of(context);
    return Padding(
      padding: const EdgeInsets.only(bottom: 8),
      child: Material(
        color: colors.surface,
        borderRadius: BorderRadius.circular(coporBorderRadius),
        child: InkWell(
          borderRadius: BorderRadius.circular(coporBorderRadius),
          onTap: () => _open(context),
          child: Padding(
            padding: const EdgeInsets.all(12),
            child: Row(
              children: [
                const Icon(Icons.attach_file),
                const SizedBox(width: 8),
                Expanded(child: Text(attachment.name)),
              ],
            ),
          ),
        ),
      ),
    );
  }
}

String _thumbnail(String mimeType) {
  if (mimeType.startsWith('image/')) return 'IMAGE';
  if (mimeType == 'application/pdf') return 'PDF';
  return 'FILE';
}
