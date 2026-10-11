import 'package:copor_core/src/bloc/utils/bloc_context_extensions.dart';
import 'package:copor_core/src/modules/administration/permissions/data/model/permission_effect_enum.dart';
import 'package:copor_core/src/modules/administration/permissions/data/model/permission_scope_enum.dart';
import 'package:copor_core/src/utils/dropdown_entries.dart';
import 'package:copor_theme/copor_theme.dart';
import 'package:flutter/material.dart';

String permissionScopeLabel(BuildContext context, PermissionScope scope) {
  final translations = context.getState.commonTranslation.ensuredData;

  return switch (scope) {
    PermissionScope.own => translations.OWN,
    PermissionScope.tenant => translations.TENANT,
    PermissionScope.all => translations.ALL,
  };
}

String permissionEffectLabel(BuildContext context, PermissionEffect effect) {
  final translations = context.getState.commonTranslation.ensuredData;

  return switch (effect) {
    PermissionEffect.allow => translations.ALLOW,
    PermissionEffect.deny => translations.DENY,
    PermissionEffect.inherit => translations.INHERIT,
  };
}

List<DropdownItem<String>> permissionScopeItems(
  BuildContext context, {
  required String currentValue,
}) {
  final items = PermissionScope.values
      .map(
        (scope) =>
            DropdownItem<String>(value: scope.value, label: permissionScopeLabel(context, scope)),
      )
      .toList();

  if (!items.any((item) => item.value == currentValue)) {
    items.insert(0, DropdownItem<String>(value: currentValue, label: currentValue));
  }

  return items;
}

List<DropdownItem<String>> permissionEffectItems(
  BuildContext context, {
  required List<PermissionEffect> effectValues,
  required String currentValue,
}) {
  final items = effectValues
      .map(
        (effect) => DropdownItem<String>(
          value: effect.value,
          label: permissionEffectLabel(context, effect),
        ),
      )
      .toList();

  if (!items.any((item) => item.value == currentValue)) {
    items.insert(0, DropdownItem<String>(value: currentValue, label: currentValue));
  }

  return items;
}

class PermissionValueCell extends StatelessWidget {
  final String value;
  final List<DropdownItem<String>> items;
  final bool enabled;
  final ValueChanged<String> onChanged;
  final String? effectiveLabel;
  final Color? effectiveLabelColor;

  const PermissionValueCell({
    super.key,
    required this.value,
    required this.items,
    required this.enabled,
    required this.onChanged,
    this.effectiveLabel,
    this.effectiveLabelColor,
  });

  @override
  Widget build(BuildContext context) {
    final dropdown = DTDropdown<String>.single(
      label: '',
      padding: EdgeInsets.zero,
      value: value,
      enabled: enabled,
      isMobile: false,
      menuElevation: 8,
      items: items,
      onChanged: (String? newScope) {
        if (newScope != null) {
          onChanged(newScope);
        }
      },
    );

    if (effectiveLabel == null) {
      return dropdown;
    }

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      mainAxisSize: MainAxisSize.min,
      children: [
        dropdown,
        Padding(
          padding: const EdgeInsets.only(top: 2, left: 4),
          child: Text(
            effectiveLabel!,
            style: CoporTheme.of(context).text.inputHelper.copyWith(
              color: effectiveLabelColor ?? CoporTheme.of(context).colors.onSurfaceSubtle,
            ),
          ),
        ),
      ],
    );
  }
}

class PermissionInfoPanel extends StatelessWidget {
  final bool open;
  final String description;

  const PermissionInfoPanel({super.key, required this.open, required this.description});

  @override
  Widget build(BuildContext context) {
    return AnimatedSwitcher(
      duration: kInputAnimDuration,
      transitionBuilder: (child, animation) => SizeTransition(
        sizeFactor: CurvedAnimation(parent: animation, curve: Curves.easeInOut),
        child: FadeTransition(opacity: animation, child: child),
      ),
      child: !open
          ? const SizedBox.shrink(key: ValueKey('none'))
          : Container(
              key: const ValueKey('help'),
              width: double.infinity,
              margin: const EdgeInsets.only(top: kDecoratorHelpMarginTop),
              padding: const EdgeInsets.symmetric(
                horizontal: kDecoratorHelpPaddingH,
                vertical: kDecoratorHelpPaddingV,
              ),
              decoration: BoxDecoration(
                color: CoporColors.of(context).surfaceContainer,
                border: Border.all(color: CoporColors.of(context).outlineSubtle),
                borderRadius: BorderRadius.circular(kInputBorderRadius),
              ),
              child: Text(
                description.isEmpty
                    ? context.getState.commonTranslation.ensuredData.NO_DESCRIPTION_AVAILABLE
                    : description,
                style: CoporTheme.of(context).text.bodyLight,
              ),
            ),
    );
  }
}
