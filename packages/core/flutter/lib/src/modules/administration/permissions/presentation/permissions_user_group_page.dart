import 'dart:async';

import 'package:copor_core/src/bloc/utils/bloc_context_extensions.dart';
import 'package:copor_core/src/components/scaffold/app_appbar/app_bar_back_button.dart';
import 'package:copor_core/src/core/system/device_service.dart';
import 'package:copor_core/src/modules/administration/permissions/bloc/permission_admin/permissions_list_cubit.dart';
import 'package:copor_core/src/modules/administration/permissions/bloc/permission_admin/permissions_list_state.dart';
import 'package:copor_core/src/modules/administration/permissions/presentation/permissions_scaffold.dart';
import 'package:copor_core/src/modules/administration/permissions/data/model/role_permission_model.dart';
import 'package:copor_core/src/modules/administration/permissions/presentation/widgets/apply_permission_targets_modal.dart';
import 'package:copor_core/src/modules/administration/permissions/presentation/widgets/permissions_dependency_resolution_dialog.dart';
import 'package:copor_core/src/modules/administration/permissions/presentation/widgets/permissions_nested_table.dart';
import 'package:copor_core/src/modules/administration/permissions/presentation/widgets/permissions_unsaved_changes_dialog.dart';
import 'package:copor_core/src/modules/administration/permissions/utils/flatten_user_groups.dart';
import 'package:copor_core/src/modules/administration/permissions/utils/permission_dependency_warnings.dart';
import 'package:copor_core/src/modules/administration/user_groups/data/model/user_group_model.dart';
import 'package:copor_core/src/utils/dropdown_entries.dart';
import 'package:copor_scaffold/copor_scaffold.dart';
import 'package:copor_theme/copor_theme.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:get_it/get_it.dart';

import 'widgets/permission_highlighted_text.dart';

// Matches DTExpandableSection.splitHeader's own header height floor
// (dt_section.dart's _kHeaderPaddingV * 2 + _kIconSize).
const _kUserGroupRowHeight = 39.0;

class PermissionsUserGroupPage extends StatelessWidget {
  const PermissionsUserGroupPage({super.key});

  @override
  Widget build(BuildContext context) {
    return BlocProvider(
      create: (_) => GetIt.instance<PermissionsListCubit>()..getPermissionTree(),
      child: const _PermissionsUserGroupPageContent(),
    );
  }
}

enum _Step { list, permissions }

class _PermissionsUserGroupPageContent extends StatefulWidget {
  const _PermissionsUserGroupPageContent();

  @override
  State<_PermissionsUserGroupPageContent> createState() => _PermissionsUserGroupPageContentState();
}

class _PermissionsUserGroupPageContentState extends State<_PermissionsUserGroupPageContent> {
  final Set<String> _expandedGroupIds = {};
  final ScrollController _scrollController = ScrollController();
  final TextEditingController _treeSearchController = TextEditingController();
  final TextEditingController _permissionSearchController = TextEditingController();
  Timer? _treeSearchDebounce;
  Timer? _permissionSearchDebounce;
  DSScaffoldController? _scaffoldController;

  @override
  void initState() {
    super.initState();
    _scrollController.addListener(_onUserGroupScroll);
  }

  @override
  void didChangeDependencies() {
    super.didChangeDependencies();
    _scaffoldController = context.getBloc.appScaffold;
  }

  @override
  void dispose() {
    _treeSearchDebounce?.cancel();
    _permissionSearchDebounce?.cancel();
    _treeSearchController.dispose();
    _permissionSearchController.dispose();
    _scrollController.removeListener(_onUserGroupScroll);
    _scrollController.dispose();
    _scaffoldController?.updateAppBar(leading: const PermissionsScaffold().getLeading());
    super.dispose();
  }

  void _onUserGroupScroll() {
    if (!_scrollController.hasClients || _scrollController.position.extentAfter >= 200) return;

    context.read<PermissionsListCubit>().loadMorePermissionTree();
  }

  void _schedulePermissionTreeLoadMoreIfNotScrollable() {
    WidgetsBinding.instance.addPostFrameCallback((_) {
      if (!mounted || !_scrollController.hasClients) return;

      final cubit = context.read<PermissionsListCubit>();
      final state = cubit.state;
      if (state.selectedPermissionGroup != null ||
          state.isLoadingPermissionTree ||
          state.isPaginatingPermissionTree ||
          !state.hasMorePermissionTree ||
          _scrollController.position.maxScrollExtent > 0) {
        return;
      }

      cubit.loadMorePermissionTree();
    });
  }

  @override
  Widget build(BuildContext context) {
    return DSPageWrapper(
      isMobile: context.isMobile,
      children: [
        BlocListener<PermissionsListCubit, PermissionsListState>(
          listenWhen: (previous, current) =>
              (previous.selectedPermissionGroup != null) !=
              (current.selectedPermissionGroup != null),
          listener: (context, state) => _updateAppBarLeading(context, state),
          child: BlocConsumer<PermissionsListCubit, PermissionsListState>(
            listener: (context, state) {
              if (!state.isSaving && state.failure == null && !state.hasSelectedGroupChanges) {
                final translations = context.getState.commonTranslation.ensuredData;
                context.getBloc.appScaffold.addBanner(
                  DSBanner.success(
                    translations.UPDATE_SUCCESS_MESSAGE,
                    source: 'permissions_user_group_success',
                  ),
                );
              }
              if (state.pendingGroupDependencyWarnings != null) {
                showPermissionDependencyResolutionDialog(context, isGroupContext: true);
              }
            },
            listenWhen: (previous, current) =>
                (previous.isSaving && !current.isSaving) ||
                current.pendingGroupDependencyWarnings != previous.pendingGroupDependencyWarnings,
            builder: (context, state) {
              if (state.isLoadingPermissionTree && state.permissionTree == null) {
                return const Expanded(child: Center(child: DTRingLoader()));
              }

              if (state.failure != null && state.permissionTree == null) {
                return Expanded(child: Center(child: Text(state.failure.toString())));
              }

              final userGroupTree = state.permissionTree?.userGroupTree ?? [];
              final selectedUserGroup = state.selectedPermissionGroup;
              final step = selectedUserGroup != null ? _Step.permissions : _Step.list;

              return Expanded(
                child: DTStepContent(
                  stepIndex: step.index,
                  child: switch (step) {
                    _Step.list => _buildUserGroupTable(context, state, userGroupTree),
                    _Step.permissions => _buildPermissionView(context, state, selectedUserGroup!),
                  },
                ),
              );
            },
          ),
        ),
      ],
    );
  }

  void _updateAppBarLeading(BuildContext context, PermissionsListState state) {
    context.getBloc.appScaffold.updateAppBar(
      leading: state.selectedPermissionGroup != null
          ? AppBarBackButton(onPressed: () => _closePermissionView(context, state))
          : const PermissionsScaffold().getLeading(),
    );
  }

  Widget _buildHeader(
    BuildContext context,
    PermissionsListState state,
    UserGroupModel selectedUserGroup,
  ) {
    final translations = context.getState.commonTranslation.ensuredData;
    final cubit = context.read<PermissionsListCubit>();
    final hasUnresolvedDependencyWarnings = findMissingDependencyWarnings(
      state.selectedGroupDependencyValidationPermissions ?? const [],
      state.selectedGroupDependencyValidationOriginalPermissions ?? const [],
    ).isNotEmpty;

    return Row(
      crossAxisAlignment: CrossAxisAlignment.center,
      children: [
        Expanded(
          child: _UserGroupDropdown(
            userGroups: flattenUserGroups(state.permissionTree?.userGroupTree ?? []),
            label: translations.USER_GROUP,
            selectedUserGroupId: selectedUserGroup.id,
            isEnabled: !state.isSaving,
            onUserGroupSelected: (group) => _selectGroup(context, group),
          ),
        ),
        const SizedBox(width: 16),
        DTButton.toggle(
          icon: PhosphorIconsThin.magicWand,
          label: translations.PERMISSION_ASSISTANT,
          semanticLabel: translations.PERMISSION_ASSISTANT_TOOLTIP,
          isToggled: state.isPermissionAssistantEnabled,
          onPressed: cubit.togglePermissionAssistant,
          inputSize: DTInputSize.normal,
        ),
        const SizedBox(width: 8),
        if (hasUnresolvedDependencyWarnings)
          DTButton.secondary(
            icon: PhosphorIconsThin.warning,
            label: translations.SAVE,
            onPressed: cubit.saveSelectedGroupPermissions,
            enabled: state.hasSelectedGroupChanges && !state.isSaving,
            inputSize: context.isMobile ? DTInputSize.compact : DTInputSize.normal,
          )
        else
          DTButton.positive(
            icon: PhosphorIconsThin.floppyDisk,
            label: translations.SAVE,
            onPressed: cubit.saveSelectedGroupPermissions,
            enabled: state.hasSelectedGroupChanges && !state.isSaving,
            inputSize: context.isMobile ? DTInputSize.compact : DTInputSize.normal,
          ),
      ],
    );
  }

  Widget _buildUserGroupTable(
    BuildContext context,
    PermissionsListState state,
    List<UserGroupModel> userGroups,
  ) {
    final translations = context.getState.commonTranslation.ensuredData;

    _schedulePermissionTreeLoadMoreIfNotScrollable();

    return Column(
      children: [
        DTSearchBar(
          title: translations.SEARCH,
          controller: _treeSearchController,
          inputSize: context.isMobile ? DTInputSize.compact : DTInputSize.normal,
          onSearchChanged: (search) {
            _treeSearchDebounce?.cancel();
            _treeSearchDebounce = Timer(
              const Duration(milliseconds: 400),
              () => _searchPermissionTree(search),
            );
          },
        ),
        const SizedBox(height: 10),
        if (state.isLoadingPermissionTree)
          const Expanded(child: Center(child: DTRingLoader()))
        else
          DTTable(
            headers: [DTColumnHeader(name: translations.USER_GROUP, size: DTColumnSize.col24)],
            rows: _buildRows(
              userGroups,
              searchQuery: state.permissionTreeSearch,
              isPaginating: state.isPaginatingPermissionTree,
              onUserGroupSelected: (userGroup) {
                _selectGroup(context, userGroup);
              },
            ),
            noData: Text(translations.NO_RESULTS_FOUND),
            labels: buildPermissionsTableLabels(translations),
            isMobile: false,
            scrollController: _scrollController,
            minWidth: 680,
          ),
      ],
    );
  }

  Widget _buildPermissionView(
    BuildContext context,
    PermissionsListState state,
    UserGroupModel userGroup,
  ) {
    final translations = context.getState.commonTranslation.ensuredData;

    return Column(
      children: [
        _buildHeader(context, state, userGroup),
        const DTDivider.subtle(),
        if (state.supportsSelectedGroupPermissionSearch)
          DTSearchBar(
            title: translations.SEARCH,
            controller: _permissionSearchController,
            inputSize: context.isMobile ? DTInputSize.compact : DTInputSize.normal,
            onSearchChanged: (search) {
              _permissionSearchDebounce?.cancel();
              _permissionSearchDebounce = Timer(
                const Duration(milliseconds: 400),
                () => _searchSelectedGroupPermissions(search),
              );
            },
          ),
        if (state.supportsSelectedGroupPermissionSearch) const SizedBox(height: 10),
        _buildPermissionTable(context, state, userGroup),
      ],
    );
  }

  Future<void> _closePermissionView(BuildContext context, PermissionsListState state) async {
    if (state.hasSelectedGroupChanges && !await confirmDiscardPermissionChanges(context)) return;
    if (!context.mounted) return;

    _permissionSearchDebounce?.cancel();
    _permissionSearchController.clear();
    context.read<PermissionsListCubit>().clearSelectedGroup();
  }

  Future<void> _selectGroup(BuildContext context, UserGroupModel userGroup) async {
    final cubit = context.read<PermissionsListCubit>();
    if (cubit.state.hasSelectedGroupChanges && !await confirmDiscardPermissionChanges(context)) {
      return;
    }
    if (!context.mounted) return;

    _permissionSearchDebounce?.cancel();
    _permissionSearchController.clear();
    await cubit.selectGroupPermissions(userGroup);
  }

  Future<void> _searchPermissionTree(String search) async {
    if (!mounted) return;

    setState(_expandedGroupIds.clear);
    await context.read<PermissionsListCubit>().searchPermissionTree(search);
  }

  Future<void> _searchSelectedGroupPermissions(String search) async {
    if (!mounted) return;

    final cubit = context.read<PermissionsListCubit>();
    if (cubit.state.hasSelectedGroupChanges && !await confirmDiscardPermissionChanges(context)) {
      _permissionSearchController.text = cubit.state.selectedGroupPermissionSearch;
      return;
    }

    if (mounted) await cubit.searchSelectedGroupPermissions(search);
  }

  List<List<Widget>> _buildRows(
    List<UserGroupModel> userGroups, {
    required String searchQuery,
    required bool isPaginating,
    required ValueChanged<UserGroupModel> onUserGroupSelected,
  }) {
    final isSearching = searchQuery.trim().isNotEmpty;

    final rows = <List<Widget>>[
      for (final group in userGroups)
        [
          _UserGroupTile(
            group: group,
            searchQuery: searchQuery,
            isSearching: isSearching,
            expandedGroupIds: _expandedGroupIds,
            onToggleExpanded: (groupId) {
              setState(() {
                if (!_expandedGroupIds.remove(groupId)) {
                  _expandedGroupIds.add(groupId);
                }
              });
            },
            onEnterGroup: onUserGroupSelected,
          ),
        ],
    ];

    if (isPaginating) {
      rows.add([const Center(child: DTRingLoader.inline())]);
    }

    return rows;
  }

  Widget _buildPermissionTable(
    BuildContext context,
    PermissionsListState state,
    UserGroupModel userGroup,
  ) {
    if (state.isLoadingSelectedGroupPermissions || state.isSaving) {
      return const Expanded(child: Center(child: DTRingLoader()));
    }

    final featurePermissions = state.selectedGroupFeaturePermissions;

    if (state.failure != null && featurePermissions == null) {
      return Expanded(child: Center(child: Text(state.failure.toString())));
    }

    if (featurePermissions == null) {
      return const Expanded(child: SizedBox.shrink());
    }

    final cubit = context.read<PermissionsListCubit>();
    final dependencyWarnings = findMissingDependencyWarnings(
      state.selectedGroupDependencyValidationPermissions ?? const [],
      state.selectedGroupDependencyValidationOriginalPermissions ?? const [],
    );
    final structuralWarnings = state.isPermissionAssistantEnabled
        ? findStructuralDependencyWarnings(
            state.selectedGroupDependencyValidationPermissions ?? const [],
          )
        : const <PermissionDependencyWarning>[];
    final combinedDependencyWarnings = [...dependencyWarnings, ...structuralWarnings];
    final dependencyPermissionByType = <String, RolePermissionModel>{
      for (final feature in state.selectedGroupDependencyValidationPermissions ?? const [])
        for (final permission in feature.permissionList) permission.permissionType: permission,
    };

    return PermissionsNestedTableWidget(
      key: ValueKey('${userGroup.groupType}_${state.selectedPermissionGroupId}'),
      featurePermissions: featurePermissions,
      valueType: PermissionFeaturePermissionsValueType.scopeAndEffect,
      onLoadMore: state.supportsSelectedGroupPermissionSearch
          ? cubit.loadMoreSelectedGroupPermissions
          : null,
      isPaginating: state.isPaginatingSelectedGroupPermissions,
      searchQuery: state.selectedGroupPermissionSearch,
      onPermissionScopeChanged: cubit.updateSelectedGroupPermissionScope,
      onPermissionEffectChanged: cubit.updateSelectedGroupPermissionEffect,
      dependencyPermissionByType: dependencyPermissionByType,
      dependencyWarnings: combinedDependencyWarnings,
      onDependencyEffectChanged: cubit.updateSelectedGroupPermissionEffectByType,
      onDependencyScopeChanged: cubit.updateSelectedGroupPermissionScopeByType,
      onApplyToTargets: (permission) =>
          _showApplyPermissionModal(context, cubit, permission, excludeUserGroupId: userGroup.id),
    );
  }

  Future<void> _showApplyPermissionModal(
    BuildContext context,
    PermissionsListCubit cubit,
    RolePermissionModel permission, {
    required String? excludeUserGroupId,
  }) async {
    final translations = context.getState.commonTranslation.ensuredData;

    final roleOptions = (cubit.state.permissionTree?.roleList ?? const [])
        .map((role) => ApplyTargetOption(id: role.id, name: role.name))
        .toList();
    final userGroupOptions =
        flattenUserGroups(cubit.state.permissionTree?.userGroupTree ?? const [])
            .where((group) => group.id != excludeUserGroupId)
            .map((group) => ApplyTargetOption(id: group.id, name: group.name))
            .toList();

    await showDialog<void>(
      context: context,
      builder: (dialogContext) => ApplyPermissionTargetsModal(
        permissionName: permission.translation,
        roleOptions: roleOptions,
        userGroupOptions: userGroupOptions,
        onApply: (roleIds, userGroupIds) async {
          final success = await cubit.applyPermissionToTargets(
            permission: permission,
            roleIds: roleIds,
            userGroupIds: userGroupIds,
          );
          if (context.mounted) {
            context.getBloc.appScaffold.addBanner(
              success
                  ? DSBanner.success(
                      translations.APPLY_PERMISSION_SUCCESS_MESSAGE,
                      source: 'apply_permission_to_targets',
                    )
                  : DSBanner.error(
                      translations.APPLY_PERMISSION_FAILURE_MESSAGE,
                      source: 'apply_permission_to_targets',
                    ),
            );
          }
          return success;
        },
      ),
    );
  }
}

class _UserGroupDropdown extends StatelessWidget {
  final List<UserGroupModel> userGroups;
  final String? selectedUserGroupId;
  final String label;
  final bool isEnabled;
  final ValueChanged<UserGroupModel> onUserGroupSelected;

  const _UserGroupDropdown({
    required this.userGroups,
    required this.label,
    this.selectedUserGroupId,
    required this.isEnabled,
    required this.onUserGroupSelected,
  });

  @override
  Widget build(BuildContext context) {
    return DTDropdown<String>.single(
      label: label,
      value: selectedUserGroupId,
      padding: EdgeInsets.zero,
      enabled: isEnabled,
      isMobile: context.isMobile,
      items: userGroups
          .map((group) => DropdownItem<String>(value: group.id, label: group.name))
          .toList(),
      onChanged: (String? groupId) {
        if (groupId == null || groupId == selectedUserGroupId) return;
        final group = userGroups.firstWhere((group) => group.id == groupId);
        onUserGroupSelected(group);
      },
    );
  }
}

class _UserGroupTile extends StatelessWidget {
  final UserGroupModel group;
  final String searchQuery;
  final bool isSearching;
  final Set<String> expandedGroupIds;
  final ValueChanged<String> onToggleExpanded;
  final ValueChanged<UserGroupModel> onEnterGroup;

  const _UserGroupTile({
    required this.group,
    required this.searchQuery,
    required this.isSearching,
    required this.expandedGroupIds,
    required this.onToggleExpanded,
    required this.onEnterGroup,
  });

  @override
  Widget build(BuildContext context) {
    if (group.children.isEmpty) {
      // Matches DTExpandableSection.splitHeader's own header height floor, so a
      // leaf row's hover/tap area lines up with an expandable row's title zone.
      return SizedBox(
        height: _kUserGroupRowHeight,
        child: _UserGroupEnterLabel(
          name: group.name,
          searchQuery: searchQuery,
          onTap: () => onEnterGroup(group),
          fillAvailableSpace: true,
        ),
      );
    }

    return DTExpandableSection.splitHeader(
      title: group.name,
      titleWidget: _UserGroupEnterLabel(
        name: group.name,
        searchQuery: searchQuery,
        onTap: () => onEnterGroup(group),
        fillAvailableSpace: true,
      ),
      isExpanded: isSearching || expandedGroupIds.contains(group.id),
      enabled: !isSearching,
      reverseHeader: true,
      onExpansionChanged: isSearching ? null : (_) => onToggleExpanded(group.id),
      child: Padding(
        padding: const EdgeInsets.only(left: 24),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          mainAxisSize: MainAxisSize.min,
          children: [
            for (final child in group.children)
              _UserGroupTile(
                group: child,
                searchQuery: searchQuery,
                isSearching: isSearching,
                expandedGroupIds: expandedGroupIds,
                onToggleExpanded: onToggleExpanded,
                onEnterGroup: onEnterGroup,
              ),
          ],
        ),
      ),
    );
  }
}

class _UserGroupEnterLabel extends StatelessWidget {
  final String name;
  final String searchQuery;
  final VoidCallback onTap;
  final bool fillAvailableSpace;

  const _UserGroupEnterLabel({
    required this.name,
    required this.searchQuery,
    required this.onTap,
    this.fillAvailableSpace = false,
  });

  @override
  Widget build(BuildContext context) {
    const borderRadius = BorderRadius.all(Radius.circular(6));

    final content = Material(
      color: Colors.transparent,
      borderRadius: borderRadius,
      child: InkWell(
        borderRadius: borderRadius,
        hoverColor: Theme.of(context).colorScheme.primary.withValues(alpha: 0.06),
        mouseCursor: SystemMouseCursors.click,
        onTap: onTap,
        child: Align(
          alignment: Alignment.centerLeft,
          child: Padding(
            padding: const EdgeInsets.symmetric(horizontal: 16),
            child: PermissionHighlightedText(
              text: name,
              searchQuery: searchQuery,
              maxLines: 3,
              style: CoporTheme.of(context).text.tableCell,
            ),
          ),
        ),
      ),
    );

    return fillAvailableSpace ? SizedBox.expand(child: content) : content;
  }
}
