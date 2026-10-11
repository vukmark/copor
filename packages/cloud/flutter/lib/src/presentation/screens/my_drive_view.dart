import 'package:copor_cloud/src/data/model/cloud_file.dart';
import 'package:copor_core/src/bloc/utils/bloc_context_extensions.dart';
import 'package:copor_scaffold/copor_scaffold.dart';
import 'package:copor_core/src/core/system/device_service.dart';
import 'package:copor_cloud/src/data/model/translation/cloud_translation.dart';
import 'package:copor_cloud/src/presentation/cubit/drive_page_cubit.dart';
import 'package:copor_cloud/src/presentation/cubit/drive_page_state.dart';
import 'package:copor_cloud/src/presentation/screens/file_view_types/file_list_view.dart';
import 'package:copor_cloud/src/presentation/screens/file_view_types/flach_file_list_view.dart';
import 'package:copor_cloud/src/presentation/widgets/upload_floating_button.dart';
import 'package:copor_theme/copor_theme.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

class MyDriveView extends StatelessWidget {
  final CloudPageTranslation translations;

  const MyDriveView({required this.translations, super.key});

  @override
  Widget build(BuildContext context) {
    return BlocBuilder<DrivePageCubit, DrivePageState>(
      buildWhen: (previous, current) =>
          previous.folders != current.folders ||
          previous.navigationStack != current.navigationStack ||
          previous.isLoading != current.isLoading ||
          previous.error != current.error ||
          previous.showFlach != current.showFlach ||
          previous.search != current.search ||
          previous.modifiedDateFilters != current.modifiedDateFilters ||
          previous.fileTypeFilters != current.fileTypeFilters ||
          previous.fileSizeFilters != current.fileSizeFilters,
      builder: (context, state) {
        if (state.isLoading) {
          return const SizedBox.shrink();
        }

        if (state.error != null) {
          return Center(child: Text(translations.errorMessage(state.error!)));
        }

        return Stack(
          children: [
            Container(
              width: double.infinity,
              padding: coporPagePadding,
              decoration: BoxDecoration(
                color: CoporTheme.of(context).colors.surfaceContainer,
                borderRadius: BorderRadius.circular(coporBorderRadius),
              ),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Expanded(
                    child: FileViewer(state: state, translations: translations),
                  ),
                ],
              ),
            ),
            UploadFloatingButton(),
          ],
        );
      },
    );
  }
}

class FileViewer extends StatefulWidget {
  final DrivePageState state;
  final CloudPageTranslation translations;

  const FileViewer({required this.state, required this.translations, super.key});

  @override
  State<FileViewer> createState() => _FileViewerState();
}

class _FileViewerState extends State<FileViewer> {
  List<CloudFile> _selectedFiles = const [];

  @override
  void didUpdateWidget(covariant FileViewer oldWidget) {
    super.didUpdateWidget(oldWidget);
    if (oldWidget.state.navigationStack != widget.state.navigationStack ||
        oldWidget.state.showFlach != widget.state.showFlach) {
      _selectedFiles = const [];
    }
  }

  @override
  Widget build(BuildContext context) {
    final state = widget.state;
    final translations = widget.translations;
    final subfolders = state.visibleFolders;
    final files = state.visibleFiles;
    final flatFiles = state.flatFiles;
    final cubit = context.read<DrivePageCubit>();

    if (state.showFlach) {
      if (flatFiles.isEmpty) {
        return _EmptyFileView(translations: translations);
      }

      return CloudFileTable(
        files: flatFiles,
        translations: translations,
        filePaths: state.flatFilePaths,
        onSelectionChanged: _onSelectionChanged,
      );
    }

    if (state.navigationStack.isEmpty) {
      return _SelectFolderView(translations: translations);
    }

    final fileView = subfolders.isEmpty && files.isEmpty
        ? _EmptyFileView(translations: translations)
        : FileListView(
            subfolders: subfolders,
            files: files,
            translations: translations,
            onSelectionChanged: _onSelectionChanged,
          );

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Row(
          children: [
            Expanded(
              child: DTBreadcrumb(
                items: [
                  DTBreadcrumbItem(label: translations.HOME, onTap: cubit.navigateToRoot),
                  for (int i = 0; i < state.navigationStack.length; i++)
                    DTBreadcrumbItem(
                      label: state.navigationStack[i].name,
                      onTap: i < state.navigationStack.length - 1
                          ? () => cubit.navigateToDepth(i)
                          : null,
                    ),
                ],
              ),
            ),
            if (_selectedFiles.isNotEmpty && !context.isMobile) ...[
              const SizedBox(width: 12),
              CloudActionsMenu(
                triggerLabel: 'Bulk action',
                reverseTriggerContent: true,
                triggerInputSize: DTInputSize.normal,
                deleteLabel: translations.DELETE,
                onDelete: _deleteSelectedFiles,
              ),
            ],
          ],
        ),
        const SizedBox(height: 8),
        Expanded(child: fileView),
      ],
    );
  }

  void _onSelectionChanged(List<CloudFile> selectedFiles) {
    setState(() => _selectedFiles = selectedFiles);
  }

  Future<void> _deleteSelectedFiles() async {
    final success = await context.read<DrivePageCubit>().bulkDeleteFiles(_selectedFiles);
    if (!mounted) return;

    if (success) {
      setState(() => _selectedFiles = const []);
      context.getBloc.appScaffold.addBanner(
        DSBanner.success(
          widget.translations.FILE_DELETED_SUCCESSFULLY,
          source: 'cloud_bulk_file_delete',
        ),
      );
    } else {
      context.getBloc.appScaffold.addBanner(
        DSBanner.error(widget.translations.FAILED_TO_DELETE_FILE, source: 'cloud_bulk_file_delete'),
      );
    }
  }
}

class _SelectFolderView extends StatelessWidget {
  final CloudPageTranslation translations;

  const _SelectFolderView({required this.translations});

  @override
  Widget build(BuildContext context) {
    return Center(
      child: DTEmptyState(
        icon: PhosphorIconsThin.folderOpen,
        title: translations.SELECT_A_FOLDER_TO_SEE_FILES,
      ),
    );
  }
}

class _EmptyFileView extends StatelessWidget {
  final CloudPageTranslation translations;

  const _EmptyFileView({required this.translations});

  @override
  Widget build(BuildContext context) {
    return Center(
      child: DTEmptyState(icon: PhosphorIconsThin.folderOpen, title: translations.FOLDER_IS_EMPTY),
    );
  }
}
