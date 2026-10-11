import {
	ValidateMarkChatMessagesSeenRepo
} from '@copor/vu_meet/domain/VuMeet/Chat/validations/dto/ValidateMarkChatMessagesSeenRepo';
import {ChatKyselyHelper} from '@copor/vu_meet/client/VuMeet/Chat/helper/ChatKyselyHelper';


export class KyselyMarkChatMessagesSeenValidatorStorageRepo implements ValidateMarkChatMessagesSeenRepo {
	isInvalidChat(id: string | undefined): Promise<boolean> {
		return ChatKyselyHelper.isInvalidChat(id);
	}
	isUserNotInChat(userId: string | undefined, chatId: string | undefined): Promise<boolean> {
		return ChatKyselyHelper.isUserNotInChat(userId, chatId);
	}
}
