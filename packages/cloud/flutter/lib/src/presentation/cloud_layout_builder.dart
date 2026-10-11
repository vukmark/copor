import 'package:copor_core/src/core/system/device_service.dart';
import 'package:copor_core/src/bloc/utils/bloc_context_extensions.dart';
import 'package:copor_core/src/modules/administration/administration_dashboard/presentation/widgets/applied_filters.dart';
import 'package:copor_cloud/src/data/model/translation/cloud_translation.dart';
import 'package:copor_cloud/src/presentation/cloud_scaffold.dart';
import 'package:copor_cloud/src/presentation/cubit/drive_page_cubit.dart';
import 'package:copor_cloud/src/presentation/screens/my_drive_view.dart';
import 'package:copor_cloud/src/presentation/widgets/folder_tree.dart';
import 'package:copor_cloud/src/presentation/widgets/cloud_filter_dialog.dart';
import 'package:copor_scaffold/copor_scaffold.dart';
import 'package:copor_theme/copor_theme.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_hooks/flutter_hooks.dart';

class CloudLayoutBuilder extends StatelessWidget {
  final CloudPageTranslation translations;

  const CloudLayoutBuilder({super.key, required this.translations});

  @override
  Widget build(BuildContext context) {
    if (context.isMobile) return _CloudMobileLayout(translations: translations);
    return _CloudDesktopLayout(translations: translations);
  }
}

// ── Mobile ────────────────────────────────────────────────────────────────────

class _CloudMobileLayout extends StatelessWidget {
  final CloudPageTranslation translations;

  const _CloudMobileLayout({required this.translations});

  @override
  Widget build(BuildContext context) {
    return Stack(
      children: [
        DSPageWrapper(
          isMobile: true,
          scrollable: false,
          children: [
            _CloudMobileToolbar(translations: translations),
            Expanded(child: MyDriveView(translations: translations)),
          ],
        ),
      ],
    );
  }
}

class _CloudMobileToolbar extends HookWidget {
  final CloudPageTranslation translations;

  const _CloudMobileToolbar({required this.translations});

  @override
  Widget build(BuildContext context) {
    final state = context.watch<DrivePageCubit>().state;
    final searchController = useTextEditingController(text: state.search);
    final cubit = context.read<DrivePageCubit>();
    final commonTranslation = context.getState.commonTranslation.ensuredData;

    return Column(
      children: [
        Row(
          children: [
            if (!state.showFlach) ...[
              DTButton.floating(
                icon: PhosphorIconsThin.sidebar,
                label: '',
                semanticLabel: translations.STRUCTURE_VIEW,
                onPressed: () {
                  context.read<DSScaffoldController>().selectDrawerSection(
                    cloudSidebarDrawerSectionKey,
                  );
                  Scaffold.of(context).openDrawer();
                },
              ),
              const SizedBox(width: 8),
            ],
            _CloudViewAction(
              translations: translations,
              isFlach: state.showFlach,
              onPressed: cubit.toggleFlach,
            ),
            const SizedBox(width: 8),
            _ItemsLayoutAction(onFilterPressed: () => showCloudFilterDialog(context)),
            const SizedBox(width: 8),
            Expanded(
              child: DTSearchBar(
                title: translations.SEARCH,
                controller: searchController,
                onSearchChanged: cubit.search,
              ),
            ),
          ],
        ),
        if (state.appliedFilters.isNotEmpty) ...[
          const SizedBox(height: 12),
          AppliedFilters(appliedFilters: state.appliedFilters, translation: commonTranslation),
        ],
      ],
    );
  }
}

// ── Desktop ───────────────────────────────────────────────────────────────────

class _CloudDesktopLayout extends StatelessWidget {
  final CloudPageTranslation translations;

  const _CloudDesktopLayout({required this.translations});

  @override
  Widget build(BuildContext context) {
    final state = context.watch<DrivePageCubit>().state;

    return Stack(
      children: [
        DSPageWrapper(
          isMobile: false,
          scrollable: false,
          children: [
            Expanded(
              child: Row(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  ClipRect(
                    child: AnimatedAlign(
                      alignment: Alignment.centerLeft,
                      widthFactor: state.showFlach ? 0.0 : 1.0,
                      duration: const Duration(milliseconds: 250),
                      curve: Curves.easeInOut,
                      child: Row(
                        children: [
                          SizedBox(width: 240, child: _CloudSidebar()),
                          DTDivider.vertical(height: double.infinity, padding: 12),
                        ],
                      ),
                    ),
                  ),
                  Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        _CloudDesktopToolbar(translations: translations),
                        const SizedBox(height: 12),
                        Expanded(child: MyDriveView(translations: translations)),
                      ],
                    ),
                  ),
                ],
              ),
            ),
          ],
        ),
      ],
    );
  }
}

// ── Sidebar ───────────────────────────────────────────────────────────────────

class _CloudSidebar extends StatelessWidget {
  const _CloudSidebar();

  @override
  Widget build(BuildContext context) {
    final state = context.watch<DrivePageCubit>().state;

    return Column(
      crossAxisAlignment: CrossAxisAlignment.stretch,
      children: [
        const FolderTreeHeader(),
        const SizedBox(height: 8),
        Expanded(child: FolderTreeWidget(folders: state.folders)),
      ],
    );
  }
}

// ── Desktop toolbar ───────────────────────────────────────────────────────────

class _CloudDesktopToolbar extends HookWidget {
  final CloudPageTranslation translations;

  const _CloudDesktopToolbar({required this.translations});

  @override
  Widget build(BuildContext context) {
    final state = context.watch<DrivePageCubit>().state;
    final searchController = useTextEditingController(text: state.search);
    final cubit = context.read<DrivePageCubit>();
    final commonTranslation = context.getState.commonTranslation.ensuredData;

    return Column(
      children: [
        Row(
          children: [
            _CloudViewAction(
              translations: translations,
              isFlach: state.showFlach,
              onPressed: cubit.toggleFlach,
            ),
            const SizedBox(width: 8),
            _ItemsLayoutAction(onFilterPressed: () => showCloudFilterDialog(context)),
            const SizedBox(width: 8),
            Expanded(
              child: DTSearchBar(
                title: translations.SEARCH,
                controller: searchController,
                onSearchChanged: cubit.search,
              ),
            ),
          ],
        ),
        if (state.appliedFilters.isNotEmpty) ...[
          const SizedBox(height: 12),
          AppliedFilters(appliedFilters: state.appliedFilters, translation: commonTranslation),
        ],
      ],
    );
  }
}

class _CloudViewAction extends StatelessWidget {
  final CloudPageTranslation translations;
  final bool isFlach;
  final VoidCallback onPressed;

  const _CloudViewAction({
    required this.translations,
    required this.isFlach,
    required this.onPressed,
  });

  @override
  Widget build(BuildContext context) {
    return DTButton.toggle(
      icon: PhosphorIconsThin.sidebar,
      iconToggled: PhosphorIconsThin.stack,
      label: translations.STRUCTURE_VIEW,
      labelToggled: translations.FLAT_VIEW,
      isToggled: isFlach,
      highlightToggled: false,
      onPressed: onPressed,
      inputSize: DTInputSize.normal,
    );
  }
}

class _ItemsLayoutAction extends StatelessWidget {
  final VoidCallback onFilterPressed;

  const _ItemsLayoutAction({required this.onFilterPressed});

  @override
  Widget build(BuildContext context) {
    return DTButton.surface(
      icon: DTIcons.filter,
      label: context.isMobile ? '' : 'Filter',
      semanticLabel: 'Filter',
      onPressed: onFilterPressed,
      inputSize: context.isMobile ? DTInputSize.compact : DTInputSize.normal,
    );
  }
}

// ── Mobile toolbar ────────────────────────────────────────────────────────────
