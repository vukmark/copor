import 'package:copor_core/src/components/buttons/copor_button.dart';
import 'package:copor_core/src/data/model/translation/common_translation.dart';
import 'package:copor_core/src/modules/administration/feature_flags/data/model/feature_model.dart';
import 'package:flutter/material.dart';

class FeatureCardMobile extends StatelessWidget {
  final FeatureModel feature;
  final CommonTranslation translation;
  final void Function(bool) onToggleAll;
  final void Function(int roleIndex, bool enabled) onToggleRole;

  const FeatureCardMobile({
    super.key,
    required this.feature,
    required this.onToggleAll,
    required this.onToggleRole,
    required this.translation,
  });

  @override
  Widget build(BuildContext context) {
    final isAllRolesOn = feature.roleList.every((r) => r.enabled);

    return Card(
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
      clipBehavior: Clip.antiAlias,
      margin: const EdgeInsets.symmetric(vertical: 6, horizontal: 12),
      elevation: 0,
      child: ExpansionTile(
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
        collapsedShape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
        tilePadding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
        childrenPadding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
        title: Text(feature.featureName, style: Theme.of(context).textTheme.titleMedium),
        children: [
          Align(
            alignment: Alignment.centerLeft,
            child: CoporButton(
              onPressed: () => onToggleAll(!isAllRolesOn),
              label: translation.TOGGLE_ALL,
              outlined: true,
            ),
          ),
          const SizedBox(height: 8),
          ...feature.roleList.asMap().entries.map((entry) {
            final index = entry.key;
            final role = entry.value;

            return Column(
              children: [
                ListTile(
                  title: Text(role.roleName),
                  trailing: Switch(
                    value: role.enabled,
                    onChanged: (val) => onToggleRole(index, val),
                  ),
                ),
                if (index != feature.roleList.length - 1) const Divider(height: 1),
              ],
            );
          }),
          const SizedBox(height: 8),
        ],
      ),
    );
  }
}
