import 'package:copor_core/src/core/system/device_service.dart';
import 'package:copor_cloud/src/presentation/cubit/drive_page_cubit.dart';
import 'package:copor_cloud/src/presentation/cubit/drive_page_state.dart';
import 'package:copor_theme/copor_theme.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

void showCloudFilterDialog(BuildContext context) {
  final cubit = context.read<DrivePageCubit>();

  if (context.isMobile) {
    DTDraggableScrollableSheet.show<void>(
      context,
      useRootNavigator: true,
      contentBuilder: (sheetContext, scrollController) => BlocProvider.value(
        value: cubit,
        child: _CloudFilterDialogContent(
          isDialog: false,
          scrollController: scrollController,
          onClose: () => Navigator.of(sheetContext).pop(),
        ),
      ),
    );
    return;
  }

  DTDialog.show<void>(
    context,
    barrierDismissible: true,
    builder: (dialogContext) => BlocProvider.value(
      value: cubit,
      child: _CloudFilterDialogContent(
        isDialog: true,
        onClose: () => Navigator.of(dialogContext).pop(),
      ),
    ),
  );
}

class _CloudFilterDialogContent extends StatefulWidget {
  final bool isDialog;
  final VoidCallback onClose;
  final ScrollController? scrollController;

  const _CloudFilterDialogContent({
    required this.isDialog,
    required this.onClose,
    this.scrollController,
  });

  @override
  State<_CloudFilterDialogContent> createState() => _CloudFilterDialogContentState();
}

class _CloudFilterDialogContentState extends State<_CloudFilterDialogContent> {
  late Set<CloudModifiedDateFilter> _modifiedDateFilters;
  late Set<CloudFileTypeFilter> _fileTypeFilters;
  late Set<CloudFileSizeFilter> _fileSizeFilters;

  @override
  void initState() {
    super.initState();
    final state = context.read<DrivePageCubit>().state;
    _modifiedDateFilters = Set.of(state.modifiedDateFilters);
    _fileTypeFilters = Set.of(state.fileTypeFilters);
    _fileSizeFilters = Set.of(state.fileSizeFilters);
  }

  void _toggleModifiedDate(CloudModifiedDateFilter filter) {
    setState(() {
      if (filter == CloudModifiedDateFilter.all) {
        _modifiedDateFilters = {filter};
        return;
      }

      _modifiedDateFilters = {filter};
    });
  }

  void _toggleFileType(CloudFileTypeFilter filter) {
    setState(() => _toggleSetValue(_fileTypeFilters, filter));
  }

  void _toggleFileSize(CloudFileSizeFilter filter) {
    setState(() => _toggleSetValue(_fileSizeFilters, filter));
  }

  void _toggleSetValue<T>(Set<T> values, T value) {
    if (!values.add(value)) values.remove(value);
  }

  void _apply() {
    context.read<DrivePageCubit>().applyFilters(
      modifiedDateFilters: _modifiedDateFilters,
      fileTypeFilters: _fileTypeFilters,
      fileSizeFilters: _fileSizeFilters,
    );
    widget.onClose();
  }

  void _clear() {
    context.read<DrivePageCubit>().applyFilters(
      modifiedDateFilters: const {},
      fileTypeFilters: const {},
      fileSizeFilters: const {},
    );
    widget.onClose();
  }

  @override
  Widget build(BuildContext context) {
    final filters = _CloudFilterGroups(
      modifiedDateFilters: _modifiedDateFilters,
      fileTypeFilters: _fileTypeFilters,
      fileSizeFilters: _fileSizeFilters,
      onModifiedDateChanged: _toggleModifiedDate,
      onFileTypeChanged: _toggleFileType,
      onFileSizeChanged: _toggleFileSize,
    );

    if (widget.isDialog) {
      return DTFloatingLayout(
        padding: const EdgeInsets.symmetric(vertical: 20),
        title: 'Filter',
        icon: DTIcons.filter,
        leading: Row(
          mainAxisSize: MainAxisSize.min,
          spacing: 8,
          children: [
            DTButton.surface(label: 'Cancel', onPressed: widget.onClose),
            DTButton.primary(icon: DTIcons.clear, label: 'Clear', onPressed: _clear, border: false),
          ],
        ),
        trailing: DTButton.positive(label: 'Apply', onPressed: _apply),
        children: [filters],
      );
    }

    final colors = CoporColors.of(context);
    return Column(
      children: [
        Expanded(
          child: SingleChildScrollView(
            controller: widget.scrollController,
            padding: const EdgeInsets.only(left: 16, right: 16, top: 5),
            child: filters,
          ),
        ),
        Divider(height: 1, thickness: 1, color: colors.outlineSubtle),
        DTActionFooter.dual(
          leadingLabel: 'Clear',
          trailingLabel: 'Apply',
          onLeading: _clear,
          onTrailing: _apply,
        ),
      ],
    );
  }
}

class _CloudFilterGroups extends StatelessWidget {
  final Set<CloudModifiedDateFilter> modifiedDateFilters;
  final Set<CloudFileTypeFilter> fileTypeFilters;
  final Set<CloudFileSizeFilter> fileSizeFilters;
  final ValueChanged<CloudModifiedDateFilter> onModifiedDateChanged;
  final ValueChanged<CloudFileTypeFilter> onFileTypeChanged;
  final ValueChanged<CloudFileSizeFilter> onFileSizeChanged;

  const _CloudFilterGroups({
    required this.modifiedDateFilters,
    required this.fileTypeFilters,
    required this.fileSizeFilters,
    required this.onModifiedDateChanged,
    required this.onFileTypeChanged,
    required this.onFileSizeChanged,
  });

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      width: double.infinity,
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        mainAxisSize: MainAxisSize.min,
        children: [
          _FilterGroup<CloudModifiedDateFilter>(
            label: 'Modified date',
            options: const {
              CloudModifiedDateFilter.all: 'All',
              CloudModifiedDateFilter.today: 'Today',
              CloudModifiedDateFilter.last7Days: 'Last 7 days',
            },
            selected: modifiedDateFilters,
            onChanged: onModifiedDateChanged,
          ),
          const SizedBox(height: 20),
          _FilterGroup<CloudFileTypeFilter>(
            label: 'File type',
            options: const {
              CloudFileTypeFilter.images: 'Images',
              CloudFileTypeFilter.videos: 'Videos',
              CloudFileTypeFilter.pdf: 'PDF',
            },
            selected: fileTypeFilters,
            onChanged: onFileTypeChanged,
          ),
          const SizedBox(height: 20),
          _FilterGroup<CloudFileSizeFilter>(
            label: 'File size',
            options: const {
              CloudFileSizeFilter.under200Kb: '<200KB',
              CloudFileSizeFilter.under1Mb: '<1MB',
              CloudFileSizeFilter.over4Mb: '>4MB',
            },
            selected: fileSizeFilters,
            onChanged: onFileSizeChanged,
          ),
        ],
      ),
    );
  }
}

class _FilterGroup<T> extends StatelessWidget {
  final String label;
  final Map<T, String> options;
  final Set<T> selected;
  final ValueChanged<T> onChanged;

  const _FilterGroup({
    required this.label,
    required this.options,
    required this.selected,
    required this.onChanged,
  });

  @override
  Widget build(BuildContext context) {
    return DTInputDecorator(
      label: label,
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          for (final option in options.entries)
            DTCheckbox(
              label: option.value,
              value: selected.contains(option.key),
              onChanged: (_) => onChanged(option.key),
            ),
        ],
      ),
    );
  }
}
