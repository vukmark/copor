import {GetItem} from '@copor/core/domain/Core/Repository/GetItem';
import {GetFeatureListDTO} from '@copor/core/domain/FeatureList/interactor/dto/GetFeatureListDTO';
import {PermissionType} from '@copor/core/domain/Core/Permission/PermissionType';
import {Feature} from '@copor/core/domain/FeatureList/enum/Feature';
import {getFeatureDefinitions} from '@copor/core/domain/FeatureList/FeatureRegistry';
import {KyselyPermissionHelper} from '@copor/core/client/Core/Helpers/KyselyPermissionHelper';
import {PermissionEffect} from '@copor/core/domain/Core/Permission/PermissionEffect';

export class KyselyGetFeatureListInteractorRepo implements GetItem<GetFeatureListDTO> {
	public async load(userId: string): Promise<GetFeatureListDTO> {
		const permissions = await KyselyPermissionHelper.getAllPermissionsForUser(userId);
		const featureByViewPermission = new Map<PermissionType, Feature>(
			getFeatureDefinitions()
				.filter((definition) => definition.viewPermission)
				.map((definition) => [definition.viewPermission!, definition.key])
		);

		const featureList = permissions
			.filter(
				(permission) => permission.effect === PermissionEffect.ALLOW
					&& featureByViewPermission.has(permission.permissionType)
			)
			.map((permission) => featureByViewPermission.get(permission.permissionType)!);

		return {
			featureList: [... new Set(featureList)]
		};
	}
}
