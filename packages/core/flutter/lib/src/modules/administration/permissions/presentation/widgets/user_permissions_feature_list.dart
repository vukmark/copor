import 'package:copor_core/src/bloc/utils/bloc_context_extensions.dart';
import 'package:copor_core/src/modules/administration/permissions/data/model/permission_effect_enum.dart';
import 'package:copor_core/src/modules/administration/permissions/data/model/role_permission_model.dart';
import 'package:copor_theme/copor_theme.dart';
import 'package:flutter/material.dart';

import 'permission_value_cell.dart';

// Read-only, single-column list of a user's resolved effective permissions,
// grouped by feature. Deliberately not the DTTable-based
// PermissionsNestedTableWidget used by the Role/User Group editors: that
// widget enforces a minimum table width (for its scope/effect dropdown
// columns) which forces horizontal scrolling once squeezed into a modal.
// This view has nothing to edit, so it can just stack full-width sections
// that wrap to whatever width the containing dialog gives them.
class UserPermissionsFeatureList extends StatefulWidget {
  final List<RoleFeaturePermissionsModel> featurePermissions;

  const UserPermissionsFeatureList({super.key, required this.featurePermissions});

  @override
  State<UserPermissionsFeatureList> createState() => _UserPermissionsFeatureListState();
}

class _UserPermissionsFeatureListState extends State<UserPermissionsFeatureList> {
  final Set<String> _expandedFeatures = {};

  @override
  Widget build(BuildContext context) {
    final translations = context.getState.commonTranslation.ensuredData;

    if (widget.featurePermissions.isEmpty) {
      return Center(child: Text(translations.NO_RESULTS_FOUND));
    }

    return ListView.builder(
      itemCount: widget.featurePermissions.length,
      itemBuilder: (context, index) {
        final feature = widget.featurePermissions[index];
        final featureId = feature.feature.feature;
        final isExpanded = _expandedFeatures.contains(featureId);

        return DTExpandableSection.slim(
          title: feature.feature.name,
          isExpanded: isExpanded,
          reverseHeader: true,
          onExpansionChanged: (expanded) => setState(() {
            if (expanded) {
              _expandedFeatures.add(featureId);
            } else {
              _expandedFeatures.remove(featureId);
            }
          }),
          child: Padding(
            padding: const EdgeInsets.only(left: 16, top: 4, bottom: 4),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.stretch,
              children: [
                for (final permission in feature.permissionList)
                  _UserPermissionRow(permission: permission),
              ],
            ),
          ),
        );
      },
    );
  }
}

class _UserPermissionRow extends StatefulWidget {
  final RolePermissionModel permission;

  const _UserPermissionRow({required this.permission});

  @override
  State<_UserPermissionRow> createState() => _UserPermissionRowState();
}

class _UserPermissionRowState extends State<_UserPermissionRow> {
  bool _infoOpen = false;

  @override
  Widget build(BuildContext context) {
    final permission = widget.permission;
    final effect = permission.permissionEffectEnum;
    final showScope = permission.requiresScope && effect == PermissionEffect.allow;
    final scopeValue = permission.permissionScopeEnum?.value ?? permission.scope ?? '';
    final effectValue = effect?.value ?? permission.effect;

    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 8),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Expanded(
                child: Text(permission.translation, style: CoporTheme.of(context).text.tableCell),
              ),
              const SizedBox(width: 4),
              DTCommonButtons.info(
                isActive: _infoOpen,
                semanticLabel: permission.translation,
                onPressed: () => setState(() => _infoOpen = !_infoOpen),
              ),
            ],
          ),
          PermissionInfoPanel(open: _infoOpen, description: permission.description),
          const SizedBox(height: 8),
          Row(
            children: [
              if (showScope) ...[
                SizedBox(
                  width: 180,
                  child: PermissionValueCell(
                    value: scopeValue,
                    items: permissionScopeItems(context, currentValue: scopeValue),
                    enabled: false,
                    onChanged: (_) {},
                  ),
                ),
                const SizedBox(width: 12),
              ],
              SizedBox(
                width: 180,
                child: PermissionValueCell(
                  value: effectValue,
                  items: permissionEffectItems(
                    context,
                    effectValues: PermissionEffect.values,
                    currentValue: effectValue,
                  ),
                  enabled: false,
                  onChanged: (_) {},
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }
}
