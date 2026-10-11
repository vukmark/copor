import {
	ValidateSetPermissionListToUserRepo
} from '@copor/core/domain/Components/Permission/repository/ValidateSetPermissionListToUserRepo';

export class FakeSetPermissionListToUserValidatorStorageRepo implements ValidateSetPermissionListToUserRepo {
	isNotValidUser(userId: string | undefined): Promise<boolean> {
		return Promise.resolve(false);
	}
}
