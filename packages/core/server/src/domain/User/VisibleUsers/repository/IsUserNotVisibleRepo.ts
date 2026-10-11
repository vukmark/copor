import {PermissionType} from '@copor/core/domain/Core/Permission/PermissionType';

export interface IsUserNotVisibleRepo {
	// True when `userId` is not among the users ListVisibleUsers would list for
	// the actor under `permissionType` (unknown user, outside the scope, the
	// actor themselves, the permission not granted, or deactivated when
	// `activeOnly`).
	isUserNotVisible(
		actorId: string,
		userId: string | undefined,
		permissionType: PermissionType,
		activeOnly: boolean
	): Promise<boolean>;
}
