import {PermissionType} from '@copor/core/domain/Core/Permission/PermissionType';
import {ValidateGetChatWithUserRepo} from '@copor/vu_meet/domain/VuMeet/Chat/repository/ValidateGetChatWithUserRepo';
import {KyselyVisibleUsersHelper} from '@copor/core/client/User/VisibleUsers/KyselyVisibleUsersHelper';

export class KyselyGetChatWithUserValidatorStorageRepo implements ValidateGetChatWithUserRepo {
	isUserNotVisible(
		actorId: string,
		userId: string | undefined,
		permissionType: PermissionType,
		activeOnly: boolean
	): Promise<boolean> {
		return KyselyVisibleUsersHelper.isUserNotVisible(actorId, userId, permissionType, activeOnly);
	}
}
