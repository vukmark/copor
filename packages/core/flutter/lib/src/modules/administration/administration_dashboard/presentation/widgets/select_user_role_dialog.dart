import 'package:copor_core/src/data/model/translation/common_translation.dart';
import 'package:copor_theme/copor_theme.dart';
import 'package:flutter/material.dart';

class SelectUserRoleDialog extends StatelessWidget {
  final CommonTranslation translation;
  final void Function(String roleType) onRoleSelected;

  const SelectUserRoleDialog({super.key, required this.translation, required this.onRoleSelected});

  List<_UserRoleOption> _roles() => [
    _UserRoleOption('USER', translation.USER, PhosphorIconsThin.user),
    _UserRoleOption('ADMIN', translation.ADMIN, PhosphorIconsThin.userGear),
  ];

  @override
  Widget build(BuildContext context) {
    void closeDialog() => Navigator.of(context, rootNavigator: true).pop();

    return DTFloatingLayout(
      actionPosition: FloatingContainerActionPosition.bottom,
      title: translation.SELECT_USER_ROLE,
      icon: PhosphorIconsThin.shieldStar,
      leading: DTButton.surface(
        onPressed: closeDialog,
        label: translation.CANCEL,
        semanticLabel: translation.CANCEL,
      ),
      children: [
        ..._roles().map(
          (role) => Padding(
            padding: const EdgeInsets.only(bottom: 8),
            child: DTListTile.surface(
              icon: role.icon,
              label: role.label,
              trailing: const Icon(PhosphorIconsThin.caretRight, size: 14),
              onPressed: () {
                closeDialog();
                onRoleSelected(role.value);
              },
            ),
          ),
        ),
      ],
    );
  }
}

class _UserRoleOption {
  final String value;
  final String label;
  final IconData icon;

  const _UserRoleOption(this.value, this.label, this.icon);
}
