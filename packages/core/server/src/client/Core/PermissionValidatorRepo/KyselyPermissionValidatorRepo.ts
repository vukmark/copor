import {PermissionRepository} from '@copor/core/domain/Core/Validations/PermissionRepository';
import {PermissionType} from '@copor/core/domain/Core/Permission/PermissionType';
import {PermissionEffect} from '@copor/core/domain/Core/Permission/PermissionEffect';
import {KyselyPermissionHelper} from '@copor/core/client/Core/Helpers/KyselyPermissionHelper';

export class KyselyPermissionValidatorRepo implements PermissionRepository {
	async isAllowed(userId: string, action: PermissionType): Promise<boolean> {
		const permission = await KyselyPermissionHelper.getPermission(userId, action);
		if (permission.effect == PermissionEffect.ALLOW)
			return true;
		return false;
	}
}