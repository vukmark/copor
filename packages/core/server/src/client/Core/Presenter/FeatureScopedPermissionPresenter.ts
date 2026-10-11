import {PresenterInstance} from '@copor/core/client/Core/Presenter/Presenter';
import {ScopedPermission} from '@copor/core/domain/Components/Permission/interactor/dto/SetPermissionListToRoleDTO';
import {Feature} from '@copor/core/domain/FeatureList/enum/Feature';
import {getPermissionDefinitions} from '@copor/core/domain/Core/Permission/PermissionRegistry';
import i18next from 'i18next';
import {FeatureScopedPermissionViewModel} from '@copor/core/client/Components/Permission/GetRolePermissionList/FeatureScopedPermissionViewModel';
import {PermissionType} from '@copor/core/domain/Core/Permission/PermissionType';
import {getTransitiveDependencies} from '@copor/core/domain/Core/Permission/PermissionDependencyGraph';

export class FeatureScopedPermissionPresenter
	extends PresenterInstance<ScopedPermission[], FeatureScopedPermissionViewModel[]> {
	public present(): FeatureScopedPermissionViewModel[] {
		i18next.setDefaultNamespace('feature_flags');

		const permissionDefinitions = getPermissionDefinitions();
		const permissionFeatureMap = new Map<PermissionType, Feature>(
			permissionDefinitions.map((item) => [item.key, item.feature])
		);
		const requiresScopeMap = new Map<PermissionType, boolean>(
			permissionDefinitions.map((item) => [item.key, item.requiresScope === true])
		);

		const groupedPermissions = this.input.reduce<Map<Feature, ScopedPermission[]>>(
			(acc, permission) => {
				const feature = permissionFeatureMap.get(permission.permissionType);

				if (!feature) {
					return acc;
				}

				const permissionList = acc.get(feature) ?? [];

				permissionList.push(permission);

				acc.set(feature, permissionList);

				return acc;
			},
			new Map<Feature, ScopedPermission[]>()
		);

		return Array.from(groupedPermissions.entries()).map(([feature, permissionList]) => {
			i18next.setDefaultNamespace('feature_flags');
			return {
				feature: {
					feature,
					name: i18next.t('translationStringList.' + feature)
				},
				permissionList: permissionList.map((permission) => {
					i18next.setDefaultNamespace('permission');
					return {
						... permission,
						// `vu_meet.canGetChatInfo` -> translationStringList.vu_meet.canGetChatInfo
						translation: i18next.t('translationStringList.' + permission.permissionType),
						description: i18next.t(
							'descriptions.' + permission.permissionType,
							{defaultValue: ''}
						),
						requiresScope: requiresScopeMap.get(permission.permissionType) ?? false,
						dependsOn: getTransitiveDependencies(permission.permissionType)
					};
				})
			};
		}).sort((a, b) => a.feature.name.localeCompare(b.feature.name));
	}
}