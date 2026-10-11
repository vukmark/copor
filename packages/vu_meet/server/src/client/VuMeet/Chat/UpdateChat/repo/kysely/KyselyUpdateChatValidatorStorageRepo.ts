import {ValidateUpdateChatRepo} from '@copor/vu_meet/domain/VuMeet/Chat/repository/ValidateUpdateChatRepo';
import {db} from '@copor/core/client/AppDataSource';
import {ChatKyselyHelper} from '@copor/vu_meet/client/VuMeet/Chat/helper/ChatKyselyHelper';
import {PermissionType} from '@copor/core/domain/Core/Permission/PermissionType';
import {KyselyVisibleUsersHelper} from '@copor/core/client/User/VisibleUsers/KyselyVisibleUsersHelper';


export class KyselyUpdateChatValidatorStorageRepo implements ValidateUpdateChatRepo {
	public async isInvalidChat(chatId: string): Promise<boolean> {
		const chat = await db.selectFrom('chat')
			.where('id', '=', chatId)
			.select('id')
			.executeTakeFirst();

		return !chat;
	}

	public isUserNotInChat(userId: string | undefined, chatId: string | undefined): Promise<boolean> {
		return ChatKyselyHelper.isUserNotInChat(userId, chatId);
	}

	public isUserNotVisible(
		actorId: string,
		userId: string | undefined,
		permissionType: PermissionType,
		activeOnly: boolean
	): Promise<boolean> {
		return KyselyVisibleUsersHelper.isUserNotVisible(actorId, userId, permissionType, activeOnly);
	}
}
