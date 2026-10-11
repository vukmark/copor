import {ValidateUpdateChatRepo} from '@copor/vu_meet/domain/VuMeet/Chat/repository/ValidateUpdateChatRepo';
import {PermissionType} from '@copor/core/domain/Core/Permission/PermissionType';

export class FakeUpdateChatValidatorStorageRepo implements ValidateUpdateChatRepo {
	public isInvalidChat(ChatId: string): Promise<boolean> {
		return Promise.resolve(false);
	}

	public isUserNotInChat(userId: string | undefined, chatId: string | undefined): Promise<boolean> {
		return Promise.resolve(false);
	}

	public isUserNotVisible(
		actorId: string,
		userId: string | undefined,
		permissionType: PermissionType,
		activeOnly: boolean
	): Promise<boolean> {
		return Promise.resolve(false);
	}
}
