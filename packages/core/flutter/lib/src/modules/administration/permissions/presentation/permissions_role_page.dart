import 'dart:async';

import 'package:copor_core/src/bloc/utils/bloc_context_extensions.dart';
import 'package:copor_core/src/core/system/device_service.dart';
import 'package:copor_core/src/modules/administration/permissions/bloc/permission_admin/permissions_list_cubit.dart';
import 'package:copor_core/src/modules/administration/permissions/bloc/permission_admin/permissions_list_state.dart';
import 'package:copor_core/src/modules/administration/permissions/data/model/permission_effect_enum.dart';
import 'package:copor_core/src/modules/administration/permissions/data/model/permission_model.dart';
import 'package:copor_core/src/modules/administration/permissions/data/model/role_permission_model.dart';
import 'package:copor_core/src/modules/administration/permissions/presentation/widgets/apply_permission_targets_modal.dart';
import 'package:copor_core/src/modules/administration/permissions/presentation/widgets/permissions_dependency_resolution_dialog.dart';
import 'package:copor_core/src/modules/administration/permissions/presentation/widgets/permissions_nested_table.dart';
import 'package:copor_core/src/modules/administration/permissions/presentation/widgets/permissions_unsaved_changes_dialog.dart';
import 'package:copor_core/src/modules/administration/permissions/utils/flatten_user_groups.dart';
import 'package:copor_core/src/modules/administration/permissions/utils/permission_dependency_warnings.dart';
import 'package:copor_core/src/utils/dropdown_entries.dart';
import 'package:copor_scaffold/copor_scaffold.dart';
import 'package:copor_theme/copor_theme.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:get_it/get_it.dart';

class PermissionsRolePage extends StatelessWidget {
  const PermissionsRolePage({super.key});

  @override
  Widget build(BuildContext context) {
    return BlocProvider(
      create: (_) => GetIt.instance<PermissionsListCubit>()..getPermissionList(),
      child: const _PermissionsRolePageContent(),
    );
  }
}

class _PermissionsRolePageContent extends StatefulWidget {
  const _PermissionsRolePageContent();

  @override
  State<_PermissionsRolePageContent> createState() => _PermissionsRolePageContentState();
}

class _PermissionsRolePageContentState extends State<_PermissionsRolePageContent> {
  final TextEditingController _searchController = TextEditingController();
  Timer? _searchDebounce;

  @override
  void dispose() {
    _searchDebounce?.cancel();
    _searchController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return DSPageWrapper(
      isMobile: context.isMobile,
      children: [
        Expanded(
          child: BlocConsumer<PermissionsListCubit, PermissionsListState>(
            listener: (context, state) {
              if (!state.isSaving && state.failure == null && !state.hasChanges) {
                final translations = context.getState.commonTranslation.ensuredData;
                context.getBloc.appScaffold.addBanner(
                  DSBanner.success(
                    translations.UPDATE_SUCCESS_MESSAGE,
                    source: 'permissions_role_success',
                  ),
                );
              }
              if (state.pendingRoleDependencyWarnings != null) {
                showPermissionDependencyResolutionDialog(context, isGroupContext: false);
              }
            },
            listenWhen: (previous, current) =>
                (previous.isSaving && !current.isSaving) ||
                current.pendingRoleDependencyWarnings != previous.pendingRoleDependencyWarnings,
            builder: (context, state) {
              if (state.isLoading) {
                return const Center(child: DTRingLoader());
              }

              if (state.failure != null && state.result == null) {
                return Center(child: Text(state.failure.toString()));
              }

              if (state.result == null) {
                return const SizedBox.shrink();
              }

              final roles = state.result!.data;
              final translations = context.getState.commonTranslation.ensuredData;
              final dependencyWarnings = findMissingDependencyWarnings(
                state.roleDependencyValidationPermissions ?? const [],
                state.roleDependencyValidationOriginalPermissions ?? const [],
              );
              final structuralWarnings = state.isPermissionAssistantEnabled
                  ? findStructuralDependencyWarnings(
                      state.roleDependencyValidationPermissions ?? const [],
                    )
                  : const <PermissionDependencyWarning>[];
              final combinedDependencyWarnings = [...dependencyWarnings, ...structuralWarnings];
              final dependencyPermissionByType = <String, RolePermissionModel>{
                for (final feature in state.roleDependencyValidationPermissions ?? const [])
                  for (final permission in feature.permissionList)
                    permission.permissionType: permission,
              };
              final hasUnresolvedDependencyWarnings = dependencyWarnings.isNotEmpty;
              final cubit = context.read<PermissionsListCubit>();

              return Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Row(
                    crossAxisAlignment: CrossAxisAlignment.center,
                    children: [
                      Expanded(
                        child: _RoleDropdown(
                          roles: roles,
                          roleLabel: translations.ROLE,
                          selectedRoleId: state.selectedRoleId,
                          isEnabled: !state.isSaving,
                          onRoleSelected: _selectRole,
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
                          onPressed: () => cubit.saveRolePermissions(),
                          enabled: state.hasChanges && !state.isSaving,
                          inputSize: context.isMobile ? DTInputSize.compact : DTInputSize.normal,
                        )
                      else
                        DTButton.positive(
                          icon: PhosphorIconsThin.floppyDisk,
                          label: translations.SAVE,
                          onPressed: () => cubit.saveRolePermissions(),
                          enabled: state.hasChanges && !state.isSaving,
                          inputSize: context.isMobile ? DTInputSize.compact : DTInputSize.normal,
                        ),
                    ],
                  ),
                  const DTDivider.subtle(),
                  DTSearchBar(
                    title: translations.SEARCH,
                    controller: _searchController,
                    inputSize: context.isMobile ? DTInputSize.compact : DTInputSize.normal,
                    onSearchChanged: (search) {
                      _searchDebounce?.cancel();
                      _searchDebounce = Timer(
                        const Duration(milliseconds: 400),
                        () => _searchRolePermissions(search),
                      );
                    },
                  ),
                  const SizedBox(height: 10),
                  if (state.isLoadingRolePermissions || state.isSaving)
                    const Expanded(child: Center(child: DTRingLoader()))
                  else if (state.failure != null && state.roleFeaturePermissions == null)
                    Expanded(child: Center(child: Text(state.failure.toString())))
                  else if (state.roleFeaturePermissions != null)
                    PermissionsNestedTableWidget(
                      key: ValueKey(state.selectedRoleId),
                      featurePermissions: state.roleFeaturePermissions!,
                      valueType: PermissionFeaturePermissionsValueType.scopeAndEffect,
                      effectValues: const [PermissionEffect.allow, PermissionEffect.deny],
                      onLoadMore: cubit.loadMoreRolePermissions,
                      isPaginating: state.isPaginatingRolePermissions,
                      searchQuery: state.rolePermissionSearch,
                      onPermissionScopeChanged: (featureIndex, permissionIndex, newScope) =>
                          cubit.updatePermissionScope(featureIndex, permissionIndex, newScope),
                      onPermissionEffectChanged: (featureIndex, permissionIndex, newEffect) =>
                          cubit.updatePermissionEffect(featureIndex, permissionIndex, newEffect),
                      dependencyPermissionByType: dependencyPermissionByType,
                      dependencyWarnings: combinedDependencyWarnings,
                      onDependencyEffectChanged: cubit.updatePermissionEffectByType,
                      onDependencyScopeChanged: cubit.updatePermissionScopeByType,
                      onApplyToTargets: (permission) => _showApplyPermissionModal(
                        context,
                        cubit,
                        permission,
                        excludeRoleId: state.selectedRoleId,
                      ),
                    )
                  else
                    const Expanded(child: SizedBox.shrink()),
                ],
              );
            },
          ),
        ),
      ],
    );
  }

  Future<void> _searchRolePermissions(String search) async {
    if (!mounted) return;

    final cubit = context.read<PermissionsListCubit>();
    if (cubit.state.hasChanges && !await confirmDiscardPermissionChanges(context)) {
      _searchController.text = cubit.state.rolePermissionSearch;
      return;
    }

    if (mounted) await cubit.searchRolePermissions(search);
  }

  Future<void> _selectRole(String roleId) async {
    _searchDebounce?.cancel();
    final cubit = context.read<PermissionsListCubit>();
    if (cubit.state.hasChanges && !await confirmDiscardPermissionChanges(context)) return;
    if (!mounted) return;

    _searchController.clear();
    await cubit.getRolePermissions(roleId);
  }

  Future<void> _showApplyPermissionModal(
    BuildContext context,
    PermissionsListCubit cubit,
    RolePermissionModel permission, {
    required String? excludeRoleId,
  }) async {
    final translations = context.getState.commonTranslation.ensuredData;

    await cubit.ensurePermissionTreeLoaded();
    if (!context.mounted) return;

    final roleOptions = (cubit.state.result?.data ?? const [])
        .where((role) => role.id != excludeRoleId)
        .map((role) => ApplyTargetOption(id: role.id, name: role.name))
        .toList();
    final userGroupOptions = flattenUserGroups(
      cubit.state.permissionTree?.userGroupTree ?? const [],
    ).map((group) => ApplyTargetOption(id: group.id, name: group.name)).toList();

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

class _RoleDropdown extends StatelessWidget {
  final List<PermissionModel> roles;
  final String? selectedRoleId;
  final String roleLabel;
  final bool isEnabled;
  final ValueChanged<String> onRoleSelected;

  const _RoleDropdown({
    required this.roles,
    required this.roleLabel,
    this.selectedRoleId,
    required this.isEnabled,
    required this.onRoleSelected,
  });

  @override
  Widget build(BuildContext context) {
    return DTDropdown<String>.single(
      label: roleLabel,
      value: selectedRoleId,
      padding: EdgeInsets.zero,
      enabled: isEnabled,
      isMobile: context.isMobile,
      items: roles.map((role) => DropdownItem<String>(value: role.id, label: role.name)).toList(),
      onChanged: (String? roleId) {
        if (roleId != null && roleId != selectedRoleId) {
          onRoleSelected(roleId);
        }
      },
    );
  }
}
