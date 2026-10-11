import {
	ValidateSearchMessagesInChatRepo
} from '@copor/vu_meet/domain/VuMeet/Message/repository/ValidateSearchMessagesInChatRepo';
import {ChatKyselyHelper} from '@copor/vu_meet/client/VuMeet/Chat/helper/ChatKyselyHelper';

export class KyselySearchMessagesInChatValidatorStorageRepo implements ValidateSearchMessagesInChatRepo {
	isUserNotInChat(userId: string | undefined, chatId: string | undefined): Promise<boolean> {
		return ChatKyselyHelper.isUserNotInChat(userId, chatId);
	}
	isInvalidChat(id: string | undefined): Promise<boolean> {
		return ChatKyselyHelper.isInvalidChat(id);
	}
}
