import 'package:copor_core/src/bloc/global_blocs/translation_bloc/translation_bloc.dart';
import 'package:copor_core/src/data/model/translation/common_translation.dart';
import 'package:copor_cloud/src/data/model/cloud_folder.dart';
import 'package:copor_cloud/src/presentation/cubit/drive_page_cubit.dart';
import 'package:copor_cloud/src/presentation/cubit/drive_page_state.dart';
import 'package:copor_theme/copor_theme.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

/// Same floating-pill header style as `AppNotificationsPanel` and same icon
/// as the toggle button that opens the folder tree (the mobile drawer
/// toggle, `regularSidebar`) — shared by the desktop/tablet in-content
/// sidebar and the mobile drawer section so both look identical.
class FolderTreeHeader extends StatelessWidget {
  const FolderTreeHeader({super.key});

  @override
  Widget build(BuildContext context) {
    final translationState = context.watch<TranslationBloc<CommonTranslation>>().state;

    return Align(
      alignment: Alignment.centerLeft,
      child: IgnorePointer(
        child: DTButton.floating(
          icon: PhosphorIconsThin.sidebar,
          label: translationState.ensuredData.FOLDER_TREE,
          border: false,
          onPressed: () {},
        ),
      ),
    );
  }
}

class FolderTreeWidget extends StatelessWidget {
  final List<CloudFolder> folders;

  /// Closes the enclosing drawer when a folder is actually navigated to.
  /// Expanding/collapsing a folder with subfolders never closes it — the
  /// user still needs to pick a subfolder next.
  final bool closeDrawerOnSelect;

  const FolderTreeWidget({super.key, required this.folders, this.closeDrawerOnSelect = false});

  @override
  Widget build(BuildContext context) {
    final colors = CoporColors.of(context);
    final state = context.watch<DrivePageCubit>().state;

    return Container(
      decoration: BoxDecoration(
        color: colors.surfaceContainer,
        borderRadius: BorderRadius.circular(coporBorderRadius),
      ),
      child: ListView(
        children: [for (final folder in folders) _buildMenuItem(context, folder, const [], state)],
      ),
    );
  }

  DTListTile _buildMenuItem(
    BuildContext context,
    CloudFolder folder,
    List<CloudFolder> ancestorPath,
    DrivePageState state,
  ) {
    final cubit = context.read<DrivePageCubit>();
    final fullPath = [...ancestorPath, folder];

    if (folder.subfolders.isEmpty) {
      return DTListTile.toggle(
        icon: PhosphorIconsThin.folder,
        label: folder.name,
        isToggled: state.currentFolder == folder,
        onPressed: () {
          cubit.navigateToPath(fullPath);
          if (closeDrawerOnSelect) Navigator.of(context).pop();
        },
        border: false,
      );
    }

    return DTListTile.expandable(
      icon: PhosphorIconsThin.folder,
      iconExpanded: PhosphorIconsThin.folderOpen,
      label: folder.name,
      children: [
        for (final subfolder in folder.subfolders)
          _buildMenuItem(context, subfolder, fullPath, state),
      ],
    );
  }
}
