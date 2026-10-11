import 'package:copor_core/src/components/scaffold/scaffold_updater.dart';
import 'package:copor_core/src/components/scaffold/app_appbar/scaffold_title_pill.dart';
import 'package:copor_core/src/config/dependency_injection.dart';
import 'package:copor_cloud/src/presentation/cubit/drive_page_cubit.dart';
import 'package:copor_cloud/src/presentation/widgets/folder_tree.dart';
import 'package:copor_theme/copor_theme.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

/// Section key the folder-tree sidebar is registered under in the main
/// drawer (see [CloudScaffold.getDrawerSections]) — used by the mobile
/// sidebar toggle in `cloud_layout_builder.dart` to select this section
/// before opening the drawer.
const String cloudSidebarDrawerSectionKey = 'cloud-sidebar';

class CloudScaffold implements DSPageDrawer, DSAppBarTitle, DSPageDrawerSections {
  const CloudScaffold();

  @override
  Widget getTitle() =>
      ScaffoldTitlePill(icon: (_) => PhosphorIconsThin.cloud, label: (t) => t.CLOUD);

  // On desktop/tablet the folder tree lives in-content (toggled beside the
  // page, see `_CloudDesktopLayout`). On mobile there's no room for that —
  // the drawer slot is already the app's main menu — so it's contributed
  // here as a second drawer section instead, the same way `DSPageEndDrawer`
  // sections share the end drawer.
  @override
  List<DSDrawerSection> getDrawerSections() => [
    DSDrawerSection(
      key: cloudSidebarDrawerSectionKey,
      child: BlocProvider.value(value: getIt<DrivePageCubit>(), child: const _CloudDrawerSidebar()),
    ),
  ];
}

class _CloudDrawerSidebar extends StatelessWidget {
  const _CloudDrawerSidebar();

  @override
  Widget build(BuildContext context) {
    final state = context.watch<DrivePageCubit>().state;
    // Same `DTMenuDrawer` shell `AppMenuDrawer` itself uses (fixed width,
    // rounded corner, elevation) — without it `Scaffold.drawer` just renders
    // the raw content full-bleed with none of that chrome.
    return DTMenuDrawer(
      header: const FolderTreeHeader(),
      content: FolderTreeWidget(folders: state.folders, closeDrawerOnSelect: true),
      footer: const SizedBox.shrink(),
    );
  }
}
