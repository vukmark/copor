import 'package:copor_core/src/modules/administration/permissions/data/model/permission_effect_enum.dart';
import 'package:copor_core/src/modules/administration/permissions/data/model/role_permission_model.dart';
import 'package:equatable/equatable.dart';

enum PermissionDependencyWarningKind {
  // `permission` was just switched on (Deny -> Allow) and still requires a
  // permission in `relatedPermissions` that isn't Allow.
  missingPrerequisite,
  // `permission` was just switched off (Allow -> Deny) while a permission in
  // `relatedPermissions` still depends on it and is still Allow.
  orphanedDependent,
  // `permission` was just switched on (Deny -> Allow); `relatedPermissions`
  // are things that depend on it and are still not Allow. Unlike the two
  // kinds above, this isn't an invariant violation — Allow(P) with Deny(Q)
  // where Q needs P is a perfectly valid state, it just means Q's access
  // hasn't been granted. This is a reminder, not a correctness check: it
  // exists so re-enabling a permission surfaces the things you may have
  // turned off alongside it earlier, in case you meant to restore those too.
  reenableSuggestion,
}

class PermissionDependencyWarning extends Equatable {
  final PermissionDependencyWarningKind kind;
  // The permission actually changed this session that triggered the warning.
  final RolePermissionModel permission;
  // For `missingPrerequisite`: the still-not-Allow prerequisites `permission`
  // needs. For `orphanedDependent`: the still-Allow permissions that need
  // `permission`, which was just turned off.
  final List<RolePermissionModel> relatedPermissions;

  const PermissionDependencyWarning({
    required this.kind,
    required this.permission,
    required this.relatedPermissions,
  });

  @override
  List<Object?> get props => [kind, permission, relatedPermissions];
}

// Callers should pass the complete, unpaginated current AND original
// permission sets for the role/group being edited (see
// `roleDependencyValidationPermissions` / `roleDependencyValidationOriginalPermissions`
// and their group equivalents on PermissionsListState), not whatever
// page/search result happens to be on screen — otherwise a dependency
// belonging to an unloaded page or a different feature tab won't be seen.
//
// Only permissions actually toggled this session (current effect differs
// from the original, session-start effect) can produce a warning. A
// permission nobody touched never triggers one, even if it's already
// inconsistent with something else — that's a pre-existing state the admin
// didn't just cause, so this dialog leaves it alone.
//
// Three independent checks, run only against the changed set:
//   - Just turned ON: does it still need something that's not Allow?
//     -> `missingPrerequisite` (invariant violation), suggests enabling the
//        prerequisite.
//   - Just turned OFF: does something still Allow still need it?
//     -> `orphanedDependent` (invariant violation), suggests disabling the
//        dependent.
//   - Just turned ON: does something that depends on it still sit at
//     not-Allow? -> `reenableSuggestion` (not a violation — Allow(P) with
//     Deny(Q) where Q needs P is a perfectly valid state), a reminder in
//     case Q was turned off alongside P earlier and should come back too.
// None of these ever walks "the other direction" from the changed permission
// (e.g. turning off A never looks at what A itself depends on), so disabling
// one permission never suggests disabling a shared prerequisite that another,
// untouched, still-Allow permission legitimately still needs.
List<PermissionDependencyWarning> findMissingDependencyWarnings(
  List<RoleFeaturePermissionsModel> features,
  List<RoleFeaturePermissionsModel> originalFeatures,
) {
  final permissionByType = <String, RolePermissionModel>{
    for (final feature in features)
      for (final permission in feature.permissionList) permission.permissionType: permission,
  };
  final originalByType = <String, RolePermissionModel>{
    for (final feature in originalFeatures)
      for (final permission in feature.permissionList) permission.permissionType: permission,
  };

  bool isAllow(RolePermissionModel? permission) {
    final explicit = permission?.permissionEffectEnum;
    if (explicit == PermissionEffect.inherit) {
      return permission?.effectiveEffectEnum == PermissionEffect.allow;
    }
    return explicit == PermissionEffect.allow;
  }

  // Every permission's `dependsOn` is already the transitive closure of what
  // it needs, so inverting it once yields the fully transitive "what needs
  // me" map too — no recursive graph walk required in either direction.
  final dependentTypesByType = <String, List<String>>{};
  for (final permission in permissionByType.values) {
    for (final dependencyType in permission.dependsOn) {
      dependentTypesByType.putIfAbsent(dependencyType, () => []).add(permission.permissionType);
    }
  }

  final warnings = <PermissionDependencyWarning>[];

  for (final permission in permissionByType.values) {
    final wasAllow = isAllow(originalByType[permission.permissionType]);
    final nowAllow = isAllow(permission);
    if (wasAllow == nowAllow) continue;

    if (nowAllow) {
      final missingPrerequisites = permission.dependsOn
          .map((dependencyType) => permissionByType[dependencyType])
          .whereType<RolePermissionModel>()
          .where((dependency) => !isAllow(dependency))
          .toList();

      if (missingPrerequisites.isNotEmpty) {
        warnings.add(
          PermissionDependencyWarning(
            kind: PermissionDependencyWarningKind.missingPrerequisite,
            permission: permission,
            relatedPermissions: missingPrerequisites,
          ),
        );
      }

      final reenableSuggestions = (dependentTypesByType[permission.permissionType] ?? const [])
          .map((dependentType) => permissionByType[dependentType])
          .whereType<RolePermissionModel>()
          .where((dependent) => !isAllow(dependent))
          .toList();

      if (reenableSuggestions.isNotEmpty) {
        warnings.add(
          PermissionDependencyWarning(
            kind: PermissionDependencyWarningKind.reenableSuggestion,
            permission: permission,
            relatedPermissions: reenableSuggestions,
          ),
        );
      }
    } else {
      final orphanedDependents = (dependentTypesByType[permission.permissionType] ?? const [])
          .map((dependentType) => permissionByType[dependentType])
          .whereType<RolePermissionModel>()
          .where(isAllow)
          .toList();

      if (orphanedDependents.isNotEmpty) {
        warnings.add(
          PermissionDependencyWarning(
            kind: PermissionDependencyWarningKind.orphanedDependent,
            permission: permission,
            relatedPermissions: orphanedDependents,
          ),
        );
      }
    }
  }

  return warnings;
}

// Structural check: does the CURRENT permission set violate any dependency
// invariant, regardless of what changed this session? Every Allow permission
// must have all of its (transitively closed) `dependsOn` prerequisites also
// Allow. Unlike `findMissingDependencyWarnings`, this doesn't diff against an
// "original" snapshot, so it also catches permissions that were already
// inconsistent before this session started — left over from before this
// dependency system existed, or introduced by a group-level override — not
// just ones the admin just toggled. Used by the Permission Assistant to
// surface findings proactively, on load, without requiring an edit first.
List<PermissionDependencyWarning> findStructuralDependencyWarnings(
  List<RoleFeaturePermissionsModel> features,
) {
  final permissionByType = <String, RolePermissionModel>{
    for (final feature in features)
      for (final permission in feature.permissionList) permission.permissionType: permission,
  };

  bool isAllow(RolePermissionModel? permission) {
    final explicit = permission?.permissionEffectEnum;
    if (explicit == PermissionEffect.inherit) {
      return permission?.effectiveEffectEnum == PermissionEffect.allow;
    }
    return explicit == PermissionEffect.allow;
  }

  final warnings = <PermissionDependencyWarning>[];

  for (final permission in permissionByType.values) {
    if (!isAllow(permission)) continue;

    final missingPrerequisites = permission.dependsOn
        .map((dependencyType) => permissionByType[dependencyType])
        .whereType<RolePermissionModel>()
        .where((dependency) => !isAllow(dependency))
        .toList();

    if (missingPrerequisites.isNotEmpty) {
      warnings.add(
        PermissionDependencyWarning(
          kind: PermissionDependencyWarningKind.missingPrerequisite,
          permission: permission,
          relatedPermissions: missingPrerequisites,
        ),
      );
    }
  }

  return warnings;
}

// True when `permissionType` currently has an unmet dependency — an active
// missingPrerequisite or orphanedDependent warning with itself as the
// subject (the permission that was actually just toggled). Excludes
// reenableSuggestion, which isn't a correctness problem, just a reminder.
// Used to decide whether a row's dependency-toggle button should render in
// warning colors.
bool hasUnmetPermissionDependency(List<PermissionDependencyWarning> warnings, String permissionType) {
  return warnings.any(
    (warning) =>
        warning.permission.permissionType == permissionType &&
        warning.kind != PermissionDependencyWarningKind.reenableSuggestion,
  );
}
