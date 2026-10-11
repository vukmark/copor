import 'package:copor_core/src/bloc/utils/bloc_context_extensions.dart';
import 'package:copor_core/src/modules/administration/permissions/bloc/permission_admin/permissions_list_cubit.dart';
import 'package:copor_core/src/modules/administration/permissions/bloc/permission_admin/permissions_list_state.dart';
import 'package:copor_core/src/modules/administration/permissions/data/model/permission_effect_enum.dart';
import 'package:copor_core/src/modules/administration/permissions/data/model/role_permission_model.dart';
import 'package:copor_core/src/modules/administration/permissions/presentation/widgets/permission_value_cell.dart';
import 'package:copor_core/src/modules/administration/permissions/utils/permission_dependency_warnings.dart';
import 'package:copor_theme/copor_theme.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

Future<void> showPermissionDependencyResolutionDialog(
  BuildContext context, {
  required bool isGroupContext,
}) {
  final cubit = context.read<PermissionsListCubit>();
  final currentFeatures =
      (isGroupContext
          ? cubit.state.selectedGroupFeaturePermissions
          : cubit.state.roleFeaturePermissions) ??
      const <RoleFeaturePermissionsModel>[];
  final snapshot = List<RoleFeaturePermissionsModel>.from(currentFeatures);
  final currentValidationFeatures =
      (isGroupContext
          ? cubit.state.selectedGroupDependencyValidationPermissions
          : cubit.state.roleDependencyValidationPermissions) ??
      currentFeatures;
  final validationSnapshot = List<RoleFeaturePermissionsModel>.from(currentValidationFeatures);
  final originalValidationFeatures =
      (isGroupContext
          ? cubit.state.selectedGroupDependencyValidationOriginalPermissions
          : cubit.state.roleDependencyValidationOriginalPermissions) ??
      const <RoleFeaturePermissionsModel>[];
  final pendingWarnings =
      (isGroupContext
          ? cubit.state.pendingGroupDependencyWarnings
          : cubit.state.pendingRoleDependencyWarnings) ??
      findMissingDependencyWarnings(currentValidationFeatures, originalValidationFeatures);
  final affectedPermissionTypes = <String>{
    for (final warning in pendingWarnings) ...[
      warning.permission.permissionType,
      for (final related in warning.relatedPermissions) related.permissionType,
    ],
  };

  return DTDialog.show<void>(
    context,
    maxWidth: 480,
    builder: (_) => _DependencyResolutionContent(
      cubit: cubit,
      isGroupContext: isGroupContext,
      affectedPermissionTypes: affectedPermissionTypes,
      snapshot: snapshot,
      validationSnapshot: validationSnapshot,
    ),
  );
}

class _DependencyResolutionContent extends StatefulWidget {
  final PermissionsListCubit cubit;
  final bool isGroupContext;
  final Set<String> affectedPermissionTypes;
  final List<RoleFeaturePermissionsModel> snapshot;
  final List<RoleFeaturePermissionsModel> validationSnapshot;

  const _DependencyResolutionContent({
    required this.cubit,
    required this.isGroupContext,
    required this.affectedPermissionTypes,
    required this.snapshot,
    required this.validationSnapshot,
  });

  @override
  State<_DependencyResolutionContent> createState() => _DependencyResolutionContentState();
}

class _DependencyResolutionContentState extends State<_DependencyResolutionContent> {
  final Set<String> _openInfoPermissionTypes = {};

  @override
  Widget build(BuildContext context) {
    final translations = context.getState.commonTranslation.ensuredData;

    return BlocBuilder<PermissionsListCubit, PermissionsListState>(
      bloc: widget.cubit,
      builder: (context, state) {
        final validationFeatures =
            (widget.isGroupContext
                ? state.selectedGroupDependencyValidationPermissions
                : state.roleDependencyValidationPermissions) ??
            const <RoleFeaturePermissionsModel>[];
        final validationOriginalFeatures =
            (widget.isGroupContext
                ? state.selectedGroupDependencyValidationOriginalPermissions
                : state.roleDependencyValidationOriginalPermissions) ??
            const <RoleFeaturePermissionsModel>[];
        final permissionByType = <String, RolePermissionModel>{
          for (final feature in validationFeatures)
            for (final permission in feature.permissionList) permission.permissionType: permission,
        };
        final warnings = findMissingDependencyWarnings(
          validationFeatures,
          validationOriginalFeatures,
        );
        // Only the permissions actually still causing a violation (i.e. showing up as
        // someone's unmet dependency) are "broken" — a permission that's merely
        // depending on one of those, but is itself set correctly, is fine on its own.
        final brokenPermissionTypes = <String>{
          for (final warning in warnings)
            for (final related in warning.relatedPermissions) related.permissionType,
        };
        // For rows shown in both roles (rare, but possible when several
        // permissions were changed this session), prefer the row's warning
        // kind so the copy explains what actually needs fixing.
        final warningKindByPermissionType = <String, PermissionDependencyWarningKind>{
          for (final warning in warnings)
            for (final related in warning.relatedPermissions) related.permissionType: warning.kind,
        };
        final hasRemainingWarnings = warnings.isNotEmpty;

        return DTFloatingLayout(
          padding: const EdgeInsets.symmetric(vertical: 20),
          title: translations.MISSING_PERMISSION_DEPENDENCIES_TITLE,
          icon: PhosphorIconsThin.warning,
          leading: DTButton.surface(
            label: translations.CANCEL,
            onPressed: () {
              if (widget.isGroupContext) {
                widget.cubit.dismissPendingGroupDependencyWarnings(
                  revertTo: widget.snapshot,
                  revertAllTo: widget.validationSnapshot,
                );
              } else {
                widget.cubit.dismissPendingRoleDependencyWarnings(
                  revertTo: widget.snapshot,
                  revertAllTo: widget.validationSnapshot,
                );
              }
              Navigator.of(context, rootNavigator: true).pop();
            },
          ),
          trailing: DTButton.positive(
            label: hasRemainingWarnings ? translations.SAVE_ANYWAY : translations.SAVE,
            onPressed: () async {
              if (widget.isGroupContext) {
                await widget.cubit.saveSelectedGroupPermissions(forceSave: true);
              } else {
                await widget.cubit.saveRolePermissions(forceSave: true);
              }
              if (context.mounted) {
                Navigator.of(context, rootNavigator: true).pop();
              }
            },
          ),
          children: [
            Text(
              translations.MISSING_PERMISSION_DEPENDENCIES_MESSAGE,
              style: CoporTheme.of(context).text.bodyLight,
            ),
            const SizedBox(height: 16),
            for (final permissionType in widget.affectedPermissionTypes)
              if (permissionByType[permissionType] case final permission?)
                Padding(
                  padding: const EdgeInsets.only(bottom: 12),
                  child: _DependencyPermissionRow(
                    permission: permission,
                    isBroken: brokenPermissionTypes.contains(permissionType),
                    warningKind: warningKindByPermissionType[permissionType],
                    isGroupContext: widget.isGroupContext,
                    infoOpen: _openInfoPermissionTypes.contains(permissionType),
                    onToggleInfo: () => setState(() {
                      if (!_openInfoPermissionTypes.remove(permissionType)) {
                        _openInfoPermissionTypes.add(permissionType);
                      }
                    }),
                    onEffectChanged: (newEffect) => widget.isGroupContext
                        ? widget.cubit.updateSelectedGroupPermissionEffectByType(
                            permissionType,
                            newEffect,
                          )
                        : widget.cubit.updatePermissionEffectByType(permissionType, newEffect),
                    onScopeChanged: (newScope) => widget.isGroupContext
                        ? widget.cubit.updateSelectedGroupPermissionScopeByType(
                            permissionType,
                            newScope,
                          )
                        : widget.cubit.updatePermissionScopeByType(permissionType, newScope),
                  ),
                ),
          ],
        );
      },
    );
  }
}

class _DependencyPermissionRow extends StatelessWidget {
  final RolePermissionModel permission;
  final bool isBroken;
  // Only set for rows that are actually the "needs fixing" side of a
  // warning (i.e. when `isBroken` is true) — tells the hint text whether
  // this permission needs to be turned on (a missing prerequisite) or off
  // (an orphaned dependent of something just disabled).
  final PermissionDependencyWarningKind? warningKind;
  final bool isGroupContext;
  final bool infoOpen;
  final VoidCallback onToggleInfo;
  final ValueChanged<String> onEffectChanged;
  final ValueChanged<String> onScopeChanged;

  const _DependencyPermissionRow({
    required this.permission,
    required this.isBroken,
    this.warningKind,
    required this.isGroupContext,
    required this.infoOpen,
    required this.onToggleInfo,
    required this.onEffectChanged,
    required this.onScopeChanged,
  });

  @override
  Widget build(BuildContext context) {
    final translations = context.getState.commonTranslation.ensuredData;
    final currentEffect = permission.permissionEffectEnum?.value ?? permission.effect;
    final currentScope = permission.permissionScopeEnum?.value ?? permission.scope ?? '';
    final effectValues = isGroupContext
        ? PermissionEffect.values
        : const [PermissionEffect.allow, PermissionEffect.deny];
    final isScopeVisible =
        permission.requiresScope && permission.permissionEffectEnum == PermissionEffect.allow;
    final colors = CoporColors.of(context);
    final statusIconColor = isBroken ? colors.onSecondaryContainer : colors.onSuccessContainer;
    final hint = !isBroken
        ? null
        : switch (warningKind) {
            PermissionDependencyWarningKind.missingPrerequisite =>
              translations.PERMISSION_DEPENDENCY_NEEDS_ENABLING_HINT,
            PermissionDependencyWarningKind.orphanedDependent =>
              translations.PERMISSION_DEPENDENCY_NEEDS_DISABLING_HINT,
            PermissionDependencyWarningKind.reenableSuggestion =>
              translations.PERMISSION_DEPENDENCY_REENABLE_SUGGESTION_HINT,
            null => null,
          };

    return Padding(
      padding: const EdgeInsets.all(12),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        mainAxisSize: MainAxisSize.min,
        children: [
          Row(
            crossAxisAlignment: CrossAxisAlignment.center,
            children: [
              Icon(
                isBroken ? PhosphorIconsThin.warning : PhosphorIconsThin.checkCircle,
                color: statusIconColor,
                size: 16,
              ),
              const SizedBox(width: 8),
              Expanded(
                child: Text(permission.translation, style: CoporTheme.of(context).text.tableCell),
              ),
              const SizedBox(width: 4),
              DTCommonButtons.info(
                isActive: infoOpen,
                semanticLabel: permission.translation,
                onPressed: onToggleInfo,
              ),
            ],
          ),
          if (hint != null) ...[
            const SizedBox(height: 4),
            Text(
              hint,
              style: CoporTheme.of(context).text.bodyLight.copyWith(color: statusIconColor),
            ),
          ],
          PermissionInfoPanel(open: infoOpen, description: permission.description),
          const SizedBox(height: 8),
          Row(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Expanded(
                child: PermissionValueCell(
                  value: currentEffect,
                  items: permissionEffectItems(
                    context,
                    effectValues: effectValues,
                    currentValue: currentEffect,
                  ),
                  enabled: true,
                  onChanged: onEffectChanged,
                ),
              ),
              if (isScopeVisible) ...[
                const SizedBox(width: 12),
                Expanded(
                  child: PermissionValueCell(
                    value: currentScope,
                    items: permissionScopeItems(context, currentValue: currentScope),
                    enabled: true,
                    onChanged: onScopeChanged,
                  ),
                ),
              ],
            ],
          ),
        ],
      ),
    );
  }
}
