import {PermissionType} from '@copor/core/domain/Core/Permission/PermissionType';
import {ValidateGetChatWithUserRepo} from '@copor/vu_meet/domain/VuMeet/Chat/repository/ValidateGetChatWithUserRepo';

export class FakeGetChatWithUserValidatorStorageRepo implements ValidateGetChatWithUserRepo {
	isUserNotVisible(
		actorId: string,
		userId: string | undefined,
		permissionType: PermissionType,
		activeOnly: boolean
	): Promise<boolean> {
		return Promise.resolve(false);
	}
}
