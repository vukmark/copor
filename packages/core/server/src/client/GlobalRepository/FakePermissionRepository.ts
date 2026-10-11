import {PermissionRepository} from '@copor/core/domain/Core/Validations/PermissionRepository';
import {PermissionType} from '@copor/core/domain/Core/Permission/PermissionType';

export class FakePermissionRepository implements PermissionRepository {
	isAllowed(userId: string, action: PermissionType): Promise<boolean> {
		return new Promise<boolean>((resolve) => {
			resolve(true);
			resolve(false);
		});
	}
}