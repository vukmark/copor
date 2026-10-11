import {PermissionRepository} from '@copor/core/domain/Core/Validations/PermissionRepository';
import {PermissionType} from '@copor/core/domain/Core/Permission/PermissionType';

export class FakePermissionValidatorRepo implements PermissionRepository {
	isAllowed(userId: string, action: PermissionType): Promise<boolean> {
		return Promise.resolve(true);
	}
}
