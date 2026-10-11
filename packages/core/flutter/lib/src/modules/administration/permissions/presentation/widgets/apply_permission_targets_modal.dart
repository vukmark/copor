import 'package:copor_core/src/bloc/utils/bloc_context_extensions.dart';
import 'package:copor_theme/copor_theme.dart';
import 'package:flutter/material.dart';

// A selectable role or user group, normalized to the id/name shape the
// picker needs — callers map their own PermissionModel/UserGroupModel/
// PermissionTreeRoleModel into this before opening the modal.
class ApplyTargetOption {
  final String id;
  final String name;

  const ApplyTargetOption({required this.id, required this.name});
}

// Lets the admin pick additional roles/user groups to copy one permission's
// current value onto, then fires them all through [onApply] in one go.
// Opened from a permission row's "Apply to..." action in the Role/User
// Group permission editors.
class ApplyPermissionTargetsModal extends StatefulWidget {
  final String permissionName;
  final List<ApplyTargetOption> roleOptions;
  final List<ApplyTargetOption> userGroupOptions;
  final Future<bool> Function(Set<String> roleIds, Set<String> userGroupIds) onApply;

  const ApplyPermissionTargetsModal({
    super.key,
    required this.permissionName,
    required this.roleOptions,
    required this.userGroupOptions,
    required this.onApply,
  });

  @override
  State<ApplyPermissionTargetsModal> createState() => _ApplyPermissionTargetsModalState();
}

class _ApplyPermissionTargetsModalState extends State<ApplyPermissionTargetsModal> {
  final Set<String> _selectedRoleIds = {};
  final Set<String> _selectedUserGroupIds = {};
  bool _isApplying = false;

  @override
  Widget build(BuildContext context) {
    final translations = context.getState.commonTranslation.ensuredData;
    final hasSelection = _selectedRoleIds.isNotEmpty || _selectedUserGroupIds.isNotEmpty;

    return LayoutBuilder(
      builder: (context, constraints) => DTModalShell(
        isMobile: constraints.maxWidth < kMobileBreakpoint,
        desktopHeight: 560,
        builder: (context) => DTFloatingLayout(
          title: widget.permissionName,
          icon: PhosphorIconsThin.shareNetwork,
          leading: DTButton.surface(
            label: translations.CANCEL,
            onPressed: () => Navigator.of(context).pop(),
          ),
          trailing: _isApplying
              ? const Padding(
                  padding: EdgeInsets.symmetric(horizontal: 12),
                  child: DTRingLoader.inline(),
                )
              : DTButton.positive(
                  icon: PhosphorIconsThin.shareNetwork,
                  label: translations.APPLY,
                  onPressed: _apply,
                  enabled: hasSelection,
                ),
          expandedChild: ListView(
            children: [
              Padding(
                padding: const EdgeInsets.only(bottom: 12),
                child: Text(
                  translations.APPLY_PERMISSION_TO_TITLE,
                  style: CoporTheme.of(context).text.bodyLight,
                ),
              ),
              if (widget.roleOptions.isEmpty && widget.userGroupOptions.isEmpty)
                Text(translations.NO_RESULTS_FOUND),
              if (widget.roleOptions.isNotEmpty) ...[
                Text(translations.ROLE, style: CoporTheme.of(context).text.bodyStrong),
                const SizedBox(height: 4),
                for (final role in widget.roleOptions)
                  DTCheckbox(
                    expand: true,
                    label: role.name,
                    value: _selectedRoleIds.contains(role.id),
                    onChanged: (checked) => setState(() {
                      if (checked == true) {
                        _selectedRoleIds.add(role.id);
                      } else {
                        _selectedRoleIds.remove(role.id);
                      }
                    }),
                  ),
                const SizedBox(height: 12),
              ],
              if (widget.userGroupOptions.isNotEmpty) ...[
                Text(translations.USER_GROUP, style: CoporTheme.of(context).text.bodyStrong),
                const SizedBox(height: 4),
                for (final userGroup in widget.userGroupOptions)
                  DTCheckbox(
                    expand: true,
                    label: userGroup.name,
                    value: _selectedUserGroupIds.contains(userGroup.id),
                    onChanged: (checked) => setState(() {
                      if (checked == true) {
                        _selectedUserGroupIds.add(userGroup.id);
                      } else {
                        _selectedUserGroupIds.remove(userGroup.id);
                      }
                    }),
                  ),
              ],
            ],
          ),
          children: const [],
        ),
      ),
    );
  }

  Future<void> _apply() async {
    setState(() => _isApplying = true);

    final success = await widget.onApply(_selectedRoleIds, _selectedUserGroupIds);

    if (!mounted) return;
    setState(() => _isApplying = false);
    if (success) {
      Navigator.of(context).pop();
    }
  }
}
