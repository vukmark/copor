import {ValidateGetVuMeetFileRepo} from '@copor/vu_meet/domain/VuMeet/Message/repository/ValidateGetVuMeetFileRepo';
import {db} from '@copor/core/client/AppDataSource';


export class KyselyGetVuMeetFileValidatorStorageRepo implements ValidateGetVuMeetFileRepo {
	async isUserNotInChatOfMessage(userId: string | undefined, messageId: string | undefined): Promise<boolean> {
		if (!userId || !messageId)
			return true;

		const result = await db
			.selectFrom('message as pm')
			.innerJoin('chatUserMap as cmap', 'cmap.chatId', 'pm.chatId')
			.select('pm.id')
			.where('pm.id', '=', messageId)
			.where('cmap.userId', '=', userId)
			.executeTakeFirst();

		return !result;
	}
}
