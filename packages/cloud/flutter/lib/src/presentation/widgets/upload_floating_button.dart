import 'package:copor_core/src/bloc/global_blocs/translation_bloc/translation_bloc.dart';
import 'package:copor_core/src/bloc/utils/bloc_context_extensions.dart';
import 'package:copor_cloud/src/data/model/cloud_folder.dart';
import 'package:copor_cloud/src/data/model/translation/cloud_translation.dart';
import 'package:copor_cloud/src/presentation/cubit/drive_page_cubit.dart';
import 'package:copor_cloud/src/presentation/cubit/drive_page_state.dart';
import 'package:copor_cloud/src/presentation/widgets/share_to_user_dialog.dart';
import 'package:copor_cloud/src/presentation/widgets/upload_file_dialog.dart';
import 'package:copor_core/src/utils/helper_functions.dart';
import 'package:copor_scaffold/copor_scaffold.dart';
import 'package:copor_theme/copor_theme.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

class UploadFloatingButton extends StatelessWidget {
  const UploadFloatingButton({super.key});

  void _showFileTooLargeDialog(BuildContext context, String message) {
    final maxFileSize = context.read<DrivePageCubit>().maxFileSize;
    final translations = context.read<TranslationBloc<CloudPageTranslation>>().state.ensuredData;

    showDialog<void>(
      context: context,
      builder: (context) => AlertDialog(
        title: Text(translations.FILE_TOO_LARGE),
        content: Text('$message\n${translations.maximumFileSizeMessage(maxFileSize)}'),
        actions: [
          TextButton(onPressed: () => Navigator.of(context).pop(), child: Text(translations.OK)),
        ],
      ),
    );
  }

  Future<void> _showFileConflictDialog(BuildContext context, UploadConflict conflict) async {
    final cubit = context.read<DrivePageCubit>();
    final translations = context.read<TranslationBloc<CloudPageTranslation>>().state.ensuredData;

    final resolution = await DTDialog.show<_UploadConflictResolution>(
      context,
      maxWidth: 480,
      barrierDismissible: true,
      builder: (_) => _UploadConflictDialog(conflict: conflict, translations: translations),
    );

    switch (resolution) {
      case _UploadConflictResolution.replace:
        await cubit.resolveUploadConflict(replace: true);
      case _UploadConflictResolution.keepBoth:
        await cubit.resolveUploadConflict(replace: false);
      case _UploadConflictResolution.cancel:
      case null:
        await cubit.cancelConflictingUpload();
    }
  }

  @override
  Widget build(BuildContext context) {
    return BlocListener<DrivePageCubit, DrivePageState>(
      listenWhen: (prev, curr) => curr.uploadStatus != prev.uploadStatus,
      listener: (context, state) {
        switch (state.uploadStatus) {
          case UploadSuccess():
            break;
          case UploadFailure(:final failure):
            if (failure.responseCode == 413) {
              _showFileTooLargeDialog(context, failure.message);
            } else {
              context.getBloc.appScaffold.addBanner(
                DSBanner.error(failure.message, source: 'cloud_upload'),
              );
            }
          case UploadConflict():
            _showFileConflictDialog(context, state.uploadStatus as UploadConflict);
          case UploadIdle():
            break;
        }
      },
      child: Positioned(right: 16, bottom: 16, child: const _UploadDropdownButton()),
    );
  }
}

enum _UploadConflictResolution { replace, keepBoth, cancel }

class _UploadConflictDialog extends StatefulWidget {
  final UploadConflict conflict;
  final CloudPageTranslation translations;

  const _UploadConflictDialog({required this.conflict, required this.translations});

  @override
  State<_UploadConflictDialog> createState() => _UploadConflictDialogState();
}

class _UploadConflictDialogState extends State<_UploadConflictDialog> {
  _UploadConflictResolution _resolution = _UploadConflictResolution.replace;

  @override
  Widget build(BuildContext context) {
    return DTFloatingLayout(
      padding: const EdgeInsets.symmetric(vertical: 20),
      title: widget.translations.FILE_ALREADY_EXISTS,
      icon: PhosphorIconsThin.files,
      leading: DTButton.surface(
        label: widget.translations.CANCEL,
        onPressed: () =>
            Navigator.of(context, rootNavigator: true).pop(_UploadConflictResolution.cancel),
      ),
      trailing: DTButton.primary(
        label: widget.translations.UPLOAD,
        onPressed: () => Navigator.of(context, rootNavigator: true).pop(_resolution),
      ),
      children: [
        Text(
          '${widget.translations.fileAlreadyExistsInFolderMessage(widget.conflict.fileName)}\n'
          '${widget.translations.CHOOSE_HOW_TO_CONTINUE}',
          style: CoporTheme.of(context).text.bodyLight,
        ),
        const SizedBox(height: 20),
        DTInputDecorator(
          label: widget.translations.UPLOAD_OPTION,
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              DTRadioButton(
                label: widget.translations.REPLACE_FILE,
                value: _resolution == _UploadConflictResolution.replace,
                expand: true,
                onChanged: (_) => setState(() => _resolution = _UploadConflictResolution.replace),
              ),
              DTRadioButton(
                label:
                    '${widget.translations.KEEP_BOTH} '
                    '(${widget.conflict.suggestedFileName})',
                value: _resolution == _UploadConflictResolution.keepBoth,
                expand: true,
                onChanged: (_) => setState(() => _resolution = _UploadConflictResolution.keepBoth),
              ),
            ],
          ),
        ),
      ],
    );
  }
}

class _UploadDropdownButton extends StatefulWidget {
  const _UploadDropdownButton();

  @override
  State<_UploadDropdownButton> createState() => _UploadDropdownButtonState();
}

class _UploadDropdownButtonState extends State<_UploadDropdownButton>
    with SingleTickerProviderStateMixin {
  final _layerLink = LayerLink();
  final _overlayController = OverlayPortalController();
  late final AnimationController _animController;
  late final Animation<double> _fadeAnim;
  late final Animation<Offset> _slideAnim;
  bool _isOpen = false;

  @override
  void initState() {
    super.initState();
    _animController = AnimationController(vsync: this, duration: coporDropdownAnimDuration);
    _fadeAnim = CurvedAnimation(parent: _animController, curve: Curves.easeOut);
    _slideAnim = Tween<Offset>(
      begin: const Offset(0, 0.04),
      end: Offset.zero,
    ).animate(CurvedAnimation(parent: _animController, curve: Curves.easeOut));
  }

  @override
  void dispose() {
    _animController.dispose();
    super.dispose();
  }

  void _open() {
    if (_isOpen) return;
    setState(() => _isOpen = true);
    _overlayController.show();
    _animController.forward(from: 0);
  }

  void _close() {
    if (!_isOpen) return;
    setState(() => _isOpen = false);
    _animController.reverse().then((_) {
      if (mounted) {
        _overlayController.hide();
      }
    });
  }

  void _showAddFolderDialog(BuildContext context) {
    final drivePageCubit = context.read<DrivePageCubit>();
    final translations = context.read<TranslationBloc<CloudPageTranslation>>().state.ensuredData;
    final commonTranslations = context.getState.commonTranslation.ensuredData;

    showDialog<void>(
      context: context,
      builder: (dialogContext) => _AddFolderDialog(
        drivePageCubit: drivePageCubit,
        title: translations.ADD_FOLDER,
        folderNameLabel: translations.FOLDER_NAME,
        cancelLabel: translations.CANCEL,
        addLabel: commonTranslations.ADD,
      ),
    );
  }

  void _openUploadFileDialog(BuildContext context) {
    final drivePageCubit = context.read<DrivePageCubit>();
    final translations = context.read<TranslationBloc<CloudPageTranslation>>().state.ensuredData;
    final commonTranslations = context.getState.commonTranslation.ensuredData;
    showUploadFileDialog(
      context,
      drivePageCubit: drivePageCubit,
      translations: translations,
      uploadingFilesLabel: commonTranslations.UPLOADING_FILES,
    );
  }

  void _openShareToUserDialog(BuildContext context) {
    final drivePageCubit = context.read<DrivePageCubit>();
    final translations = context.read<TranslationBloc<CloudPageTranslation>>().state.ensuredData;
    final commonTranslations = context.getState.commonTranslation.ensuredData;
    showShareToUserDialog(
      context,
      drivePageCubit: drivePageCubit,
      translations: translations,
      uploadingFilesLabel: commonTranslations.UPLOADING_FILES,
    );
  }

  @override
  Widget build(BuildContext context) {
    final colors = CoporColors.of(context);
    final borderRadius = BorderRadius.circular(coporBorderRadius);
    final translations = context.read<TranslationBloc<CloudPageTranslation>>().state.ensuredData;
    final state = context.watch<DrivePageCubit>().state;
    final canUseFolderActions = _canUseFolderActions(context, state);

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
              targetAnchor: Alignment.topRight,
              followerAnchor: Alignment.bottomRight,
              offset: const Offset(0, -coporDropdownOffset),
              child: Align(
                alignment: Alignment.bottomRight,
                child: FadeTransition(
                  opacity: _fadeAnim,
                  child: SlideTransition(
                    position: _slideAnim,
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
                        child: IntrinsicWidth(
                          child: Column(
                            mainAxisSize: MainAxisSize.min,
                            crossAxisAlignment: CrossAxisAlignment.stretch,
                            children: [
                              _UploadMenuItem(
                                icon: PhosphorIconsThin.cloudArrowUp,
                                label: translations.UPLOAD_FILE,
                                enabled: canUseFolderActions,
                                onTap: () {
                                  _close();
                                  _openUploadFileDialog(context);
                                },
                              ),
                              Divider(height: 1, thickness: 1, color: colors.outlineSubtle),
                              _UploadMenuItem(
                                icon: PhosphorIconsThin.folderPlus,
                                label: translations.ADD_FOLDER,
                                enabled: canUseFolderActions,
                                onTap: () {
                                  _close();
                                  _showAddFolderDialog(context);
                                },
                              ),
                              Divider(height: 1, thickness: 1, color: colors.outlineSubtle),
                              _UploadMenuItem(
                                icon: PhosphorIconsThin.paperPlaneRight,
                                label: translations.SEND_FILE_TO_USER,
                                onTap: () {
                                  _close();
                                  _openShareToUserDialog(context);
                                },
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
        child: DecoratedBox(
          decoration: BoxDecoration(color: colors.surface, borderRadius: borderRadius),
          child: DTButton.primary(
            icon: Icons.add,
            label: '',
            inputSize: DTInputSize.normal,
            onPressed: _isOpen ? _close : _open,
          ),
        ),
      ),
    );
  }

  bool _canUseFolderActions(BuildContext context, DrivePageState state) {
    if (state.showFlach || state.navigationStack.isEmpty) return false;

    final uploadEndpoint = state.currentFolder?.uploadEndpoint;
    if (uploadEndpoint == null || uploadEndpoint.isEmpty) return false;

    return !CloudFolder.isRestrictedUploadEndpoint(uploadEndpoint) || isAdmin(context);
  }
}

class _AddFolderDialog extends StatefulWidget {
  final DrivePageCubit drivePageCubit;
  final String title;
  final String folderNameLabel;
  final String cancelLabel;
  final String addLabel;

  const _AddFolderDialog({
    required this.drivePageCubit,
    required this.title,
    required this.folderNameLabel,
    required this.cancelLabel,
    required this.addLabel,
  });

  @override
  State<_AddFolderDialog> createState() => _AddFolderDialogState();
}

class _AddFolderDialogState extends State<_AddFolderDialog> {
  final _nameController = TextEditingController();

  bool get _canAdd => _nameController.text.trim().isNotEmpty;

  @override
  void initState() {
    super.initState();
    _nameController.addListener(() => setState(() {}));
  }

  @override
  void dispose() {
    _nameController.dispose();
    super.dispose();
  }

  Future<void> _addFolder() async {
    final folderName = _nameController.text.trim();
    if (folderName.isEmpty) return;

    await widget.drivePageCubit.addFolderCarrierFile(folderName);
    if (!mounted) return;
    Navigator.of(context).pop();
  }

  @override
  Widget build(BuildContext context) {
    return AlertDialog(
      title: Text(widget.title),
      content: TextField(
        controller: _nameController,
        autofocus: true,
        decoration: InputDecoration(
          border: const OutlineInputBorder(),
          labelText: widget.folderNameLabel,
        ),
        onSubmitted: (_) => _addFolder(),
      ),
      actions: [
        TextButton(onPressed: () => Navigator.of(context).pop(), child: Text(widget.cancelLabel)),
        TextButton(onPressed: _canAdd ? _addFolder : null, child: Text(widget.addLabel)),
      ],
    );
  }
}

class _UploadMenuItem extends StatelessWidget {
  final IconData icon;
  final String label;
  final VoidCallback onTap;
  final bool enabled;

  const _UploadMenuItem({
    required this.icon,
    required this.label,
    required this.onTap,
    this.enabled = true,
  });

  @override
  Widget build(BuildContext context) {
    final colors = CoporColors.of(context);

    return InkWell(
      onTap: enabled ? onTap : null,
      overlayColor: WidgetStateProperty.resolveWith((states) {
        if (states.contains(WidgetState.hovered)) return colors.surfaceHovered;
        if (states.contains(WidgetState.pressed)) return colors.surfacePressed;
        return Colors.transparent;
      }),
      child: Opacity(
        opacity: enabled ? 1 : 0.5,
        child: Padding(
          padding: coporDropdownItemPadding,
          child: Row(
            mainAxisSize: MainAxisSize.min,
            children: [
              Icon(icon, size: 14),
              const SizedBox(width: 8),
              Text(label, style: const TextStyle(fontWeight: FontWeight.w400)),
            ],
          ),
        ),
      ),
    );
  }
}
