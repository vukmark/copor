import {ValidateGetChatInfoRepo} from '@copor/vu_meet/domain/VuMeet/Chat/repository/ValidateGetChatInfoRepo';
import {ChatKyselyHelper} from '@copor/vu_meet/client/VuMeet/Chat/helper/ChatKyselyHelper';

export class KyselyGetChatInfoValidatorStorageRepo implements ValidateGetChatInfoRepo {
	isInvalidChat(chatId: string | undefined): Promise<boolean> {
		return ChatKyselyHelper.isInvalidChat(chatId);
	}
	isUserNotInChat(userId: string | undefined, chatId: string | undefined): Promise<boolean> {
		return ChatKyselyHelper.isUserNotInChat(userId, chatId);
	}
}
