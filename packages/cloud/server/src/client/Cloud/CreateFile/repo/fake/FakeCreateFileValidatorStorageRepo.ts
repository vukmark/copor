import {PermissionType} from '@copor/core/domain/Core/Permission/PermissionType';
import {ValidateCreateFileRepo} from '@copor/cloud/domain/Cloud/repository/ValidateCreateFileRepo';

export class FakeCreateFileValidatorStorageRepo implements ValidateCreateFileRepo {
	isUserNotInUserGroup(userId: string | undefined, userGroupId: string | undefined): Promise<boolean> {
		return Promise.resolve(false);
	}
	isInvalidUserGroup(id: string | undefined): Promise<boolean> {
		return Promise.resolve(false);
	}
	isInvalidFileSize(file: Buffer | undefined): Promise<boolean> {
		return Promise.resolve(false);
	}
	isUserNotVisible(
		actorId: string,
		userId: string | undefined,
		permissionType: PermissionType,
		activeOnly: boolean
	): Promise<boolean> {
		return Promise.resolve(false);
	}
}
