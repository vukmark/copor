import 'dart:typed_data';

import 'package:copor_core/src/bloc/utils/bloc_context_extensions.dart';
import 'package:copor_core/src/components/highlighted_text.dart';
import 'package:copor_core/src/core/system/device_service.dart';
import 'package:copor_cloud/src/data/model/cloud_file.dart';
import 'package:copor_cloud/src/data/model/cloud_folder.dart';
import 'package:copor_cloud/src/data/model/translation/cloud_translation.dart';
import 'package:copor_cloud/src/presentation/cubit/drive_page_cubit.dart';
import 'package:copor_theme/copor_theme.dart';
import 'package:copor_scaffold/copor_scaffold.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:copor_core/src/utils/date_formatter.dart';

class CloudFileTable extends StatefulWidget {
  final List<CloudFolder> folders;
  final List<CloudFile> files;
  final CloudPageTranslation translations;
  final Map<CloudFile, List<String>> filePaths;
  final ValueChanged<List<CloudFile>>? onSelectionChanged;
  final bool showTypeAndSize;

  const CloudFileTable({
    required this.files,
    required this.translations,
    this.folders = const [],
    this.filePaths = const {},
    this.onSelectionChanged,
    this.showTypeAndSize = true,
    super.key,
  });

  @override
  State<CloudFileTable> createState() => _CloudFileTableState();
}

class _CloudFileTableState extends State<CloudFileTable> {
  String? _activeSortKey = _CloudFileSortKey.createdAt;
  String? _activeSortDir = _SortDirection.desc;
  final Set<String> _selectedItemKeys = {};

  @override
  Widget build(BuildContext context) {
    final isMobile = context.isMobile;
    final files = _sortedFiles(widget.files);
    final folders = _sortedFolders(widget.folders);
    final headers = _buildHeaders(isMobile: isMobile);
    final visibleItemKeys = {for (final file in widget.files) _fileKey(file)};
    _selectedItemKeys.removeWhere((key) => !visibleItemKeys.contains(key));
    final allSelected =
        visibleItemKeys.isNotEmpty && visibleItemKeys.every(_selectedItemKeys.contains);
    final someSelected = visibleItemKeys.any(_selectedItemKeys.contains);

    List<Widget> buildRow(int index) {
      if (index < folders.length) {
        return _buildFolderRow(folders[index], showCheckbox: !isMobile);
      }
      return _buildFileRow(context, files[index - folders.length], showCheckbox: !isMobile);
    }

    return Stack(
      children: [
        Column(
          children: [
            DTTable(
              headers: headers,
              rowBuilder: buildRow,
              rowCount: folders.length + files.length,
              noData: Text(widget.translations.FOLDER_IS_EMPTY),
              labels: const DTTableLabels.empty(),
              isMobile: isMobile,
              onSortClicked: (sortKey, order) {
                setState(() {
                  _activeSortKey = order == null ? null : sortKey;
                  _activeSortDir = order;
                });
              },
              activeSortKey: _activeSortKey,
              activeSortDir: _activeSortDir,
              dataRowMinHeight: 72,
            ),
          ],
        ),
        if (!isMobile && visibleItemKeys.isNotEmpty)
          Positioned(
            top: 4,
            right: 12,
            child: Checkbox(
              value: someSelected ? (allSelected ? true : null) : false,
              tristate: true,
              activeColor: CoporTheme.of(context).text.tableCell.color,
              side: BorderSide(color: CoporTheme.of(context).text.tableCell.color!),
              onChanged: (_) => _toggleAll(visibleItemKeys, allSelected),
            ),
          ),
      ],
    );
  }

  List<DTColumnHeader> _buildHeaders({required bool isMobile}) {
    return [
      DTColumnHeader(
        key: _CloudFileSortKey.name,
        name: _textOrFallback(widget.translations.NAME, 'Name'),
        sortKey: _CloudFileSortKey.name,
        size: widget.showTypeAndSize ? DTColumnSize.col7 : DTColumnSize.col13,
      ),
      if (!widget.showTypeAndSize)
        DTColumnHeader(
          key: _CloudFileSortKey.creatorName,
          name: _textOrFallback(widget.translations.CREATOR, 'Creator'),
          sortKey: _CloudFileSortKey.creatorName,
          size: DTColumnSize.col6,
        ),
      DTColumnHeader(
        key: _CloudFileSortKey.createdAt,
        name: _textOrFallback(widget.translations.CREATED, 'Created'),
        sortKey: _CloudFileSortKey.createdAt,
        size: DTColumnSize.col5,
      ),
      if (widget.showTypeAndSize) ...[
        DTColumnHeader(
          key: _CloudFileSortKey.size,
          name: _textOrFallback(widget.translations.SIZE, 'Size'),
          sortKey: _CloudFileSortKey.size,
          size: DTColumnSize.col3,
        ),
        DTColumnHeader(
          key: _CloudFileSortKey.extension,
          name: _textOrFallback(widget.translations.TYPE, 'Type'),
          sortKey: _CloudFileSortKey.extension,
          size: DTColumnSize.col3,
        ),
      ],
      if (widget.showTypeAndSize)
        DTColumnHeader(
          key: _CloudFileSortKey.creatorName,
          name: _textOrFallback(widget.translations.CREATOR, 'Creator'),
          sortKey: _CloudFileSortKey.creatorName,
          size: DTColumnSize.col6,
        ),
      DTColumnHeader(name: _textOrFallback(widget.translations.ACTIONS, 'Actions'), fixedWidth: 90),
      if (!isMobile) DTColumnHeader(name: '', fixedWidth: 56),
    ];
  }

  List<Widget> _buildFolderRow(CloudFolder folder, {required bool showCheckbox}) {
    return [
      _CloudFolderNameCell(folder: folder),
      if (!widget.showTypeAndSize) const SizedBox.shrink(),
      const SizedBox.shrink(),
      if (widget.showTypeAndSize) ...[const SizedBox.shrink(), const SizedBox.shrink()],
      if (widget.showTypeAndSize) const SizedBox.shrink(),
      DTActionCell(
        children: [
          if (folder.isCarrierBacked)
            DTButton.surface(
              icon: DTIcons.close,
              label: '',
              semanticLabel: widget.translations.DELETE,
              inputSize: DTInputSize.small,
              onPressed: () => _confirmDeleteFolder(folder),
            ),
        ],
      ),
      if (showCheckbox) const SizedBox.shrink(),
    ];
  }

  Future<void> _confirmDeleteFolder(CloudFolder folder) async {
    final confirmed = await DTDialog.showDelete(
      context,
      title: widget.translations.DELETE_FILE_TITLE,
      content: widget.translations.deleteFileMessage(folder.name),
      cancelLabel: widget.translations.CANCEL,
      deleteLabel: widget.translations.DELETE,
    );
    if (confirmed != true || !mounted) return;

    final success = await context.read<DrivePageCubit>().deleteFolderRecursively(folder);
    if (!mounted) return;

    if (success) {
      context.getBloc.appScaffold.addBanner(
        DSBanner.success(
          widget.translations.FOLDER_DELETED_SUCCESSFULLY,
          source: 'user_folder_delete',
        ),
      );
    } else {
      context.getBloc.appScaffold.addBanner(
        DSBanner.error(widget.translations.FAILED_TO_DELETE_FOLDER, source: 'user_folder_delete'),
      );
    }
  }

  List<Widget> _buildFileRow(BuildContext context, CloudFile file, {required bool showCheckbox}) {
    return [
      _CloudFileNameCell(
        file: file,
        translations: widget.translations,
        path: widget.filePaths[file],
        showSize: !widget.showTypeAndSize,
      ),
      if (!widget.showTypeAndSize) _CloudFileTextCell(text: file.creatorName),
      _CloudFileTextCell(text: _formatCreatedAt(file.createdAt)),
      if (widget.showTypeAndSize) ...[
        _CloudFileTextCell(text: file.size),
        _CloudFileTextCell(text: file.extension),
      ],
      if (widget.showTypeAndSize) _CloudFileTextCell(text: file.creatorName),
      DTActionCell(
        children: [
          if (file.canDelete(context))
            DTButton.surface(
              icon: DTIcons.close,
              label: '',
              semanticLabel: widget.translations.DELETE,
              inputSize: DTInputSize.small,
              onPressed: () =>
                  file.confirmDelete(context, context.read<DrivePageCubit>(), widget.translations),
            ),
        ],
      ),
      if (showCheckbox) _buildItemCheckbox(_fileKey(file)),
    ];
  }

  Widget _buildItemCheckbox(String itemKey) {
    final checkboxColor = CoporTheme.of(context).text.tableCell.color!;

    return Padding(
      padding: const EdgeInsets.only(right: 8),
      child: Checkbox(
        value: _selectedItemKeys.contains(itemKey),
        activeColor: checkboxColor,
        side: BorderSide(color: checkboxColor),
        onChanged: (_) {
          setState(() {
            if (!_selectedItemKeys.add(itemKey)) _selectedItemKeys.remove(itemKey);
          });
          _notifySelectionChanged();
        },
      ),
    );
  }

  void _toggleAll(Set<String> visibleItemKeys, bool allSelected) {
    setState(() {
      if (allSelected) {
        _selectedItemKeys.removeAll(visibleItemKeys);
      } else {
        _selectedItemKeys.addAll(visibleItemKeys);
      }
    });
    _notifySelectionChanged();
  }

  void _notifySelectionChanged() {
    widget.onSelectionChanged?.call(
      widget.files.where((file) => _selectedItemKeys.contains(_fileKey(file))).toList(),
    );
  }

  String _fileKey(CloudFile file) =>
      'file:${file.downloadURL}:${file.creatorId}:${file.name}:${file.createdAt ?? ''}';

  List<CloudFolder> _sortedFolders(List<CloudFolder> folders) {
    if (_activeSortKey != _CloudFileSortKey.name || _activeSortDir == null) return folders;

    final sortedFolders = [...folders];
    sortedFolders.sort(
      (left, right) => _compareNullableText(left.name, right.name, _activeSortDir!),
    );
    return sortedFolders;
  }

  List<CloudFile> _sortedFiles(List<CloudFile> files) {
    final sortKey = _activeSortKey;
    final sortDir = _activeSortDir;
    if (sortKey == null || sortDir == null) return files;

    final sortedFiles = [...files];
    sortedFiles.sort((left, right) {
      return _compareFiles(left, right, sortKey, sortDir);
    });
    return sortedFiles;
  }

  int _compareFiles(CloudFile left, CloudFile right, String sortKey, String sortDir) {
    return switch (sortKey) {
      _CloudFileSortKey.createdAt => _compareNullable(
        _parseDate(left.createdAt),
        _parseDate(right.createdAt),
        sortDir,
      ),
      _CloudFileSortKey.size => _compareNullable(
        _parseFileSize(left.size),
        _parseFileSize(right.size),
        sortDir,
      ),
      _CloudFileSortKey.name => _compareNullableText(left.name, right.name, sortDir),
      _CloudFileSortKey.extension => _compareNullableText(left.extension, right.extension, sortDir),
      _CloudFileSortKey.creatorName => _compareNullableText(
        left.creatorName,
        right.creatorName,
        sortDir,
      ),
      _ => 0,
    };
  }

  int _compareNullable<T extends Comparable<T>>(T? left, T? right, String sortDir) {
    if (left == null && right == null) return 0;
    if (left == null) return 1;
    if (right == null) return -1;

    final result = left.compareTo(right);
    return sortDir == _SortDirection.desc ? -result : result;
  }

  int _compareNullableText(String? left, String? right, String sortDir) {
    return _compareNullable(_normalizedText(left), _normalizedText(right), sortDir);
  }

  String? _normalizedText(String? value) {
    final trimmed = value?.trim();
    if (trimmed == null || trimmed.isEmpty) return null;

    return trimmed.toLowerCase();
  }

  DateTime? _parseDate(String? value) {
    return parseFlexibleDate(value);
  }

  int? _parseFileSize(String? value) {
    final trimmed = value?.trim();
    if (trimmed == null || trimmed.isEmpty) return null;

    final match = RegExp(r'^([\d.,]+)\s*([A-Za-z]+)?$').firstMatch(trimmed);
    if (match == null) return null;

    final number = double.tryParse(match.group(1)!.replaceAll(',', '.'));
    if (number == null) return null;

    final unit = (match.group(2) ?? 'B').toUpperCase();
    final multiplier = switch (unit) {
      'B' || 'BYTE' || 'BYTES' => 1,
      'KB' || 'KIB' => 1024,
      'MB' || 'MIB' => 1024 * 1024,
      'GB' || 'GIB' => 1024 * 1024 * 1024,
      'TB' || 'TIB' => 1024 * 1024 * 1024 * 1024,
      _ => null,
    };
    if (multiplier == null) return null;

    return (number * multiplier).round();
  }

  String _formatCreatedAt(String? value) {
    final parsed = _parseDate(value);
    if (parsed == null) return value ?? '';

    return formatDisplayDate(parsed.toLocal());
  }

  String _textOrFallback(String text, String fallback) {
    final trimmed = text.trim();
    return trimmed.isEmpty ? fallback : trimmed;
  }
}

class CloudActionsMenu extends StatefulWidget {
  final String deleteLabel;
  final VoidCallback onDelete;
  final String triggerLabel;
  final bool reverseTriggerContent;
  final DTInputSize triggerInputSize;

  const CloudActionsMenu({
    required this.deleteLabel,
    required this.onDelete,
    this.triggerLabel = '',
    this.reverseTriggerContent = false,
    this.triggerInputSize = DTInputSize.small,
    super.key,
  });

  @override
  State<CloudActionsMenu> createState() => _CloudActionsMenuState();
}

class _CloudActionsMenuState extends State<CloudActionsMenu> with SingleTickerProviderStateMixin {
  final _layerLink = LayerLink();
  final _overlayController = OverlayPortalController();
  late final AnimationController _animationController;
  late final Animation<double> _fadeAnimation;
  late final Animation<Offset> _slideAnimation;
  bool _isOpen = false;

  @override
  void initState() {
    super.initState();
    _animationController = AnimationController(vsync: this, duration: coporDropdownAnimDuration);
    _fadeAnimation = CurvedAnimation(parent: _animationController, curve: Curves.easeOut);
    _slideAnimation = Tween<Offset>(
      begin: const Offset(0, -0.04),
      end: Offset.zero,
    ).animate(CurvedAnimation(parent: _animationController, curve: Curves.easeOut));
  }

  @override
  void dispose() {
    _animationController.dispose();
    super.dispose();
  }

  void _open() {
    if (_isOpen) return;
    setState(() => _isOpen = true);
    _overlayController.show();
    _animationController.forward(from: 0);
  }

  void _close() {
    if (!_isOpen) return;
    setState(() => _isOpen = false);
    _animationController.reverse().then((_) {
      if (mounted) _overlayController.hide();
    });
  }

  void _delete() {
    _close();
    widget.onDelete();
  }

  @override
  Widget build(BuildContext context) {
    final colors = CoporColors.of(context);
    final borderRadius = BorderRadius.circular(coporBorderRadius);

    return CompositedTransformTarget(
      link: _layerLink,
      child: OverlayPortal(
        controller: _overlayController,
        overlayChildBuilder: (_) => Stack(
          children: [
            Positioned.fill(
              child: GestureDetector(
                behavior: HitTestBehavior.opaque,
                onTap: _close,
                child: const SizedBox.expand(),
              ),
            ),
            CompositedTransformFollower(
              link: _layerLink,
              targetAnchor: Alignment.bottomRight,
              followerAnchor: Alignment.topRight,
              offset: const Offset(0, coporDropdownOffset),
              child: FadeTransition(
                opacity: _fadeAnimation,
                child: SlideTransition(
                  position: _slideAnimation,
                  child: Material(
                    elevation: 0,
                    color: colors.surface,
                    borderRadius: borderRadius,
                    clipBehavior: Clip.antiAlias,
                    child: DecoratedBox(
                      decoration: BoxDecoration(
                        border: Border.all(color: colors.outlineSubtle),
                        borderRadius: borderRadius,
                      ),
                      child: InkWell(
                        onTap: _delete,
                        overlayColor: WidgetStateProperty.resolveWith((states) {
                          if (states.contains(WidgetState.hovered)) return colors.surfaceHovered;
                          if (states.contains(WidgetState.pressed)) return colors.surfacePressed;
                          return Colors.transparent;
                        }),
                        child: Padding(
                          padding: coporDropdownItemPadding,
                          child: Row(
                            mainAxisSize: MainAxisSize.min,
                            children: [
                              const Icon(DTIcons.delete, size: 14),
                              const SizedBox(width: 8),
                              Text(
                                widget.deleteLabel,
                                style: const TextStyle(fontWeight: FontWeight.w400),
                              ),
                            ],
                          ),
                        ),
                      ),
                    ),
                  ),
                ),
              ),
            ),
          ],
        ),
        child: DTButton.surface(
          icon: Icons.more_vert,
          label: widget.triggerLabel,
          reverseContent: widget.reverseTriggerContent,
          inputSize: widget.triggerInputSize,
          onPressed: _isOpen ? _close : _open,
        ),
      ),
    );
  }
}

class _CloudFolderNameCell extends StatelessWidget {
  final CloudFolder folder;

  const _CloudFolderNameCell({required this.folder});

  @override
  Widget build(BuildContext context) {
    return InkWell(
      onTap: () => context.read<DrivePageCubit>().openFolder(folder),
      child: Row(
        children: [
          const SizedBox(
            width: 44,
            height: 44,
            child: Center(child: Icon(PhosphorIconsThin.folder, size: 28)),
          ),
          const SizedBox(width: 12),
          Expanded(
            child: CoporHighlightedText(
              text: folder.name,
              searchQuery: context.read<DrivePageCubit>().state.search,
              maxLines: 1,
              style: CoporTheme.of(context).text.tableCell,
            ),
          ),
        ],
      ),
    );
  }
}

class _CloudFileNameCell extends StatelessWidget {
  final CloudFile file;
  final CloudPageTranslation translations;
  final List<String>? path;
  final bool showSize;

  const _CloudFileNameCell({
    required this.file,
    required this.translations,
    this.path,
    this.showSize = false,
  });

  @override
  Widget build(BuildContext context) {
    final description = file.description.trim();

    return InkWell(
      onTap: () => _openFile(context),
      child: Row(
        children: [
          SizedBox(
            width: 44,
            height: 44,
            child: Center(child: FileExtensionIcon(thumbnail: file.thumbnail, size: 28)),
          ),
          const SizedBox(width: 12),
          Expanded(
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                CoporHighlightedText(
                  text: file.name,
                  searchQuery: context.read<DrivePageCubit>().state.search,
                  maxLines: 1,
                  style: CoporTheme.of(context).text.tableCell,
                ),
                if (showSize && file.size.trim().isNotEmpty) ...[
                  const SizedBox(height: 2),
                  Text(
                    file.size,
                    maxLines: 1,
                    overflow: TextOverflow.ellipsis,
                    style: Theme.of(context).textTheme.bodySmall?.copyWith(
                      color: CoporTheme.of(context).colors.onSurfaceSubtle,
                    ),
                  ),
                ],
                if (description.isNotEmpty) ...[
                  const SizedBox(height: 2),
                  Text(
                    description,
                    maxLines: 3,
                    overflow: TextOverflow.ellipsis,
                    style: CoporTheme.of(context).text.tableCell,
                  ),
                ],
                if (path != null && path!.isNotEmpty) ...[
                  const SizedBox(height: 2),
                  Row(
                    children: [
                      Icon(
                        PhosphorIconsThin.folder,
                        size: 12,
                        color: CoporTheme.of(context).colors.onSurfaceSubtle,
                      ),
                      const SizedBox(width: 4),
                      Expanded(
                        child: Text(
                          [translations.HOME, ...path!].join(' / '),
                          maxLines: 1,
                          overflow: TextOverflow.ellipsis,
                          style: Theme.of(context).textTheme.bodySmall?.copyWith(
                            color: CoporTheme.of(context).colors.onSurfaceSubtle,
                          ),
                        ),
                      ),
                    ],
                  ),
                ],
              ],
            ),
          ),
        ],
      ),
    );
  }

  Future<void> _openFile(BuildContext context) async {
    final Uint8List? downloadedBytes = await context.read<DrivePageCubit>().downloadFile(file);
    if (!context.mounted || downloadedBytes == null) return;

    file.openPreview(context, downloadedBytes, translations);
  }
}

class _CloudFileTextCell extends StatelessWidget {
  final String? text;

  const _CloudFileTextCell({required this.text});

  @override
  Widget build(BuildContext context) {
    if (text == null || text!.isEmpty) {
      return const SizedBox.shrink();
    }

    return Text(
      text!,
      maxLines: 1,
      overflow: TextOverflow.ellipsis,
      style: CoporTheme.of(context).text.tableCell,
    );
  }
}

abstract final class _CloudFileSortKey {
  static const String name = 'name';
  static const String createdAt = 'createdAt';
  static const String size = 'size';
  static const String extension = 'extension';
  static const String creatorName = 'creatorName';
}

abstract final class _SortDirection {
  static const String desc = 'desc';
}
