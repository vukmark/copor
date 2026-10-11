import 'package:copor_core/src/bloc/utils/bloc_context_extensions.dart';
import 'package:copor_core/src/modules/administration/permissions/data/model/permission_effect_enum.dart';
import 'package:copor_core/src/modules/administration/permissions/data/model/role_permission_model.dart';
import 'package:copor_core/src/modules/administration/permissions/presentation/widgets/permission_value_cell.dart';
import 'package:copor_core/src/modules/administration/permissions/utils/permission_dependency_warnings.dart';
import 'package:copor_theme/copor_theme.dart';
import 'package:flutter/material.dart';

typedef PermissionTypeValueChanged = void Function(String permissionType, String value);

/// Expandable panel showing one permission's dependency relationships:
/// what it depends on (always, informational — resolved from its own
/// `dependsOn`), and — only when this exact permission is the subject of an
/// active warning this session — what's actually wrong and, for
/// orphanedDependent, what still needs it. Each related permission gets its
/// own effect (+scope) dropdown so the admin can fix things without leaving
/// the row.
class PermissionDependencyPanel extends StatelessWidget {
  final bool open;
  final RolePermissionModel permission;
  final Map<String, RolePermissionModel> permissionByType;
  final List<PermissionDependencyWarning> warnings;
  final List<PermissionEffect> effectValues;
  final PermissionTypeValueChanged onEffectChanged;
  final PermissionTypeValueChanged onScopeChanged;

  const PermissionDependencyPanel({
    super.key,
    required this.open,
    required this.permission,
    required this.permissionByType,
    required this.warnings,
    required this.effectValues,
    required this.onEffectChanged,
    required this.onScopeChanged,
  });

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
              key: const ValueKey('deps'),
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
              child: _buildContent(context),
            ),
    );
  }

  Widget _buildContent(BuildContext context) {
    final translations = context.getState.commonTranslation.ensuredData;
    final dependsOn = permission.dependsOn
        .map((type) => permissionByType[type])
        .whereType<RolePermissionModel>()
        .toList();

    // Only warnings where this exact permission is the one that was toggled
    // this session — not ones where it merely shows up as someone else's
    // related permission (that's shown from the other row's own panel).
    final ownWarnings = warnings.where(
      (warning) => warning.permission.permissionType == permission.permissionType,
    );

    final missingPrerequisiteTypes = <String>{
      for (final warning in ownWarnings)
        if (warning.kind == PermissionDependencyWarningKind.missingPrerequisite)
          for (final related in warning.relatedPermissions) related.permissionType,
    };
    final stillRequiredBy = [
      for (final warning in ownWarnings)
        if (warning.kind == PermissionDependencyWarningKind.orphanedDependent)
          ...warning.relatedPermissions,
    ];
    final reenableSuggestions = [
      for (final warning in ownWarnings)
        if (warning.kind == PermissionDependencyWarningKind.reenableSuggestion)
          ...warning.relatedPermissions,
    ];

    if (dependsOn.isEmpty && stillRequiredBy.isEmpty && reenableSuggestions.isEmpty) {
      return Text(
        translations.NO_PERMISSION_DEPENDENCIES,
        style: CoporTheme.of(context).text.bodyLight,
      );
    }

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      mainAxisSize: MainAxisSize.min,
      children: [
        if (dependsOn.isNotEmpty)
          _PermissionDependencySection(
            title: translations.PERMISSION_DEPENDS_ON_LABEL,
            permissions: dependsOn,
            highlightedTypes: missingPrerequisiteTypes,
            hint: missingPrerequisiteTypes.isEmpty
                ? null
                : translations.PERMISSION_DEPENDENCY_NEEDS_ENABLING_HINT,
            effectValues: effectValues,
            onEffectChanged: onEffectChanged,
            onScopeChanged: onScopeChanged,
          ),
        if (stillRequiredBy.isNotEmpty) ...[
          if (dependsOn.isNotEmpty) const SizedBox(height: 12),
          _PermissionDependencySection(
            title: translations.PERMISSION_STILL_REQUIRED_BY_LABEL,
            permissions: stillRequiredBy,
            highlightedTypes: {for (final p in stillRequiredBy) p.permissionType},
            hint: translations.PERMISSION_DEPENDENCY_NEEDS_DISABLING_HINT,
            effectValues: effectValues,
            onEffectChanged: onEffectChanged,
            onScopeChanged: onScopeChanged,
          ),
        ],
        if (reenableSuggestions.isNotEmpty) ...[
          if (dependsOn.isNotEmpty || stillRequiredBy.isNotEmpty) const SizedBox(height: 12),
          _PermissionDependencySection(
            title: translations.PERMISSION_REENABLE_SUGGESTION_LABEL,
            permissions: reenableSuggestions,
            highlightedTypes: const {},
            hint: null,
            effectValues: effectValues,
            onEffectChanged: onEffectChanged,
            onScopeChanged: onScopeChanged,
          ),
        ],
      ],
    );
  }
}

class _PermissionDependencySection extends StatelessWidget {
  final String title;
  final List<RolePermissionModel> permissions;
  final Set<String> highlightedTypes;
  final String? hint;
  final List<PermissionEffect> effectValues;
  final PermissionTypeValueChanged onEffectChanged;
  final PermissionTypeValueChanged onScopeChanged;

  const _PermissionDependencySection({
    required this.title,
    required this.permissions,
    required this.highlightedTypes,
    required this.hint,
    required this.effectValues,
    required this.onEffectChanged,
    required this.onScopeChanged,
  });

  @override
  Widget build(BuildContext context) {
    final colors = CoporColors.of(context);

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      mainAxisSize: MainAxisSize.min,
      children: [
        Text(title, style: CoporTheme.of(context).text.bodyStrong),
        if (hint != null) ...[
          const SizedBox(height: 2),
          Text(
            hint!,
            style: CoporTheme.of(
              context,
            ).text.bodyLight.copyWith(color: colors.onSecondaryContainer),
          ),
        ],
        const SizedBox(height: 8),
        for (int i = 0; i < permissions.length; i++) ...[
          if (i > 0) const SizedBox(height: 8),
          _PermissionDependencyItemRow(
            permission: permissions[i],
            isHighlighted: highlightedTypes.contains(permissions[i].permissionType),
            effectValues: effectValues,
            onEffectChanged: onEffectChanged,
            onScopeChanged: onScopeChanged,
          ),
        ],
      ],
    );
  }
}

class _PermissionDependencyItemRow extends StatelessWidget {
  final RolePermissionModel permission;
  final bool isHighlighted;
  final List<PermissionEffect> effectValues;
  final PermissionTypeValueChanged onEffectChanged;
  final PermissionTypeValueChanged onScopeChanged;

  const _PermissionDependencyItemRow({
    required this.permission,
    required this.isHighlighted,
    required this.effectValues,
    required this.onEffectChanged,
    required this.onScopeChanged,
  });

  @override
  Widget build(BuildContext context) {
    final currentEffect = permission.permissionEffectEnum?.value ?? permission.effect;
    final currentScope = permission.permissionScopeEnum?.value ?? permission.scope ?? '';
    final isScopeVisible =
        permission.requiresScope && permission.permissionEffectEnum == PermissionEffect.allow;
    final colors = CoporColors.of(context);

    return Row(
      crossAxisAlignment: CrossAxisAlignment.center,
      children: [
        if (isHighlighted) ...[
          Icon(
            PhosphorIconsThin.warning,
            color: colors.onSecondaryContainer,
            size: 14,
          ),
          const SizedBox(width: 6),
        ],
        Expanded(child: Text(permission.translation, style: CoporTheme.of(context).text.tableCell)),
        const SizedBox(width: 12),
        SizedBox(
          width: 140,
          child: PermissionValueCell(
            value: currentEffect,
            items: permissionEffectItems(
              context,
              effectValues: effectValues,
              currentValue: currentEffect,
            ),
            enabled: true,
            onChanged: (newEffect) => onEffectChanged(permission.permissionType, newEffect),
          ),
        ),
        if (isScopeVisible) ...[
          const SizedBox(width: 8),
          SizedBox(
            width: 140,
            child: PermissionValueCell(
              value: currentScope,
              items: permissionScopeItems(context, currentValue: currentScope),
              enabled: true,
              onChanged: (newScope) => onScopeChanged(permission.permissionType, newScope),
            ),
          ),
        ],
      ],
    );
  }
}
