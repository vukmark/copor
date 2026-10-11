
import {
	ValidateGetRolePermissionListRepo
} from '@copor/core/domain/Components/Permission/repository/ValidateGetRolePermissionListRepo';

export class FakeGetRolePermissionListValidatorStorageRepo implements ValidateGetRolePermissionListRepo {
	isInvalidRole(roleId: string | undefined): Promise<boolean> {
		return Promise.resolve(false);
	}
}
