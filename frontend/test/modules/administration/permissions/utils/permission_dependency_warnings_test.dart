import 'package:copor_core/src/modules/administration/permissions/data/model/role_permission_model.dart';
import 'package:copor_core/src/modules/administration/permissions/utils/permission_dependency_warnings.dart';
import 'package:flutter_test/flutter_test.dart';

const _feature = RolePermissionFeatureModel(feature: 'contacts', name: 'Contacts');

RolePermissionModel _permission({
  required String permissionType,
  required String effect,
  String? effectiveEffect,
  List<String> dependsOn = const [],
}) {
  return RolePermissionModel(
    permissionType: permissionType,
    translation: 'permission $permissionType',
    scope: null,
    effect: effect,
    effectiveEffect: effectiveEffect,
    dependsOn: dependsOn,
  );
}

List<RoleFeaturePermissionsModel> _features(List<RolePermissionModel> permissions) => [
  RoleFeaturePermissionsModel(feature: _feature, permissionList: permissions),
];

void main() {
  group('findMissingDependencyWarnings', () {
    test('does not warn when an Inherit permission that already effectively resolves to '
        'Allow is switched to explicit Allow (no real change in effect)', () {
      const dependencyType = 'core.canGetContactList';
      const dependentType = 'core.canGetContactById';

      final original = _features([
        _permission(permissionType: dependencyType, effect: 'ALLOW'),
        _permission(
          permissionType: dependentType,
          effect: 'INHERIT',
          effectiveEffect: 'ALLOW',
          dependsOn: [dependencyType],
        ),
      ]);
      final current = _features([
        _permission(permissionType: dependencyType, effect: 'ALLOW'),
        _permission(permissionType: dependentType, effect: 'ALLOW', dependsOn: [dependencyType]),
      ]);

      final warnings = findMissingDependencyWarnings(current, original);

      expect(warnings, isEmpty);
    });

    test('does not warn when an explicit Allow permission that still effectively resolves to '
        'Allow is switched back to Inherit (no real change in effect)', () {
      const dependencyType = 'core.canGetContactList';
      const dependentType = 'core.canGetContactById';

      final original = _features([
        _permission(permissionType: dependencyType, effect: 'ALLOW'),
        _permission(permissionType: dependentType, effect: 'ALLOW', dependsOn: [dependencyType]),
      ]);
      final current = _features([
        _permission(permissionType: dependencyType, effect: 'ALLOW'),
        _permission(
          permissionType: dependentType,
          effect: 'INHERIT',
          effectiveEffect: 'ALLOW',
          dependsOn: [dependencyType],
        ),
      ]);

      final warnings = findMissingDependencyWarnings(current, original);

      expect(warnings, isEmpty);
    });

    test('still warns when a permission is genuinely switched from Deny to Allow '
        'while its prerequisite is not Allow', () {
      const dependencyType = 'core.canGetContactList';
      const dependentType = 'core.canGetContactById';

      final original = _features([
        _permission(permissionType: dependencyType, effect: 'DENY'),
        _permission(permissionType: dependentType, effect: 'DENY', dependsOn: [dependencyType]),
      ]);
      final current = _features([
        _permission(permissionType: dependencyType, effect: 'DENY'),
        _permission(permissionType: dependentType, effect: 'ALLOW', dependsOn: [dependencyType]),
      ]);

      final warnings = findMissingDependencyWarnings(current, original);

      expect(warnings, hasLength(1));
      expect(warnings.single.kind, PermissionDependencyWarningKind.missingPrerequisite);
      expect(warnings.single.permission.permissionType, dependentType);
    });
  });

  group('findStructuralDependencyWarnings', () {
    test('treats an Inherit permission that effectively resolves to Allow as Allow '
        'for the structural check', () {
      const dependencyType = 'core.canGetContactList';
      const dependentType = 'core.canGetContactById';

      final current = _features([
        _permission(permissionType: dependencyType, effect: 'DENY'),
        _permission(
          permissionType: dependentType,
          effect: 'INHERIT',
          effectiveEffect: 'ALLOW',
          dependsOn: [dependencyType],
        ),
      ]);

      final warnings = findStructuralDependencyWarnings(current);

      expect(warnings, hasLength(1));
      expect(warnings.single.kind, PermissionDependencyWarningKind.missingPrerequisite);
      expect(warnings.single.permission.permissionType, dependentType);
    });

    test('does not flag an Inherit permission that effectively resolves to Deny', () {
      const dependencyType = 'core.canGetContactList';
      const dependentType = 'core.canGetContactById';

      final current = _features([
        _permission(permissionType: dependencyType, effect: 'DENY'),
        _permission(
          permissionType: dependentType,
          effect: 'INHERIT',
          effectiveEffect: 'DENY',
          dependsOn: [dependencyType],
        ),
      ]);

      final warnings = findStructuralDependencyWarnings(current);

      expect(warnings, isEmpty);
    });
  });
}
