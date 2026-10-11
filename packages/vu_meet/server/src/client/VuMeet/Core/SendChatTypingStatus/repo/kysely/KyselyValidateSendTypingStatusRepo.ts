import {ValidateSendTypingStatusRepo} from '@copor/vu_meet/domain/VuMeet/Core/TypingStatus/repository/ValidateSendTypingStatusRepo';
import {ChatKyselyHelper} from '@copor/vu_meet/client/VuMeet/Chat/helper/ChatKyselyHelper';

export class KyselyValidateSendTypingStatusRepo implements ValidateSendTypingStatusRepo {
	isInvalidChat(chatId: string | undefined): Promise<boolean> {
		return ChatKyselyHelper.isInvalidChat(chatId);
	}

	isUserNotInChat(userId: string | undefined, chatId: string | undefined): Promise<boolean> {
		return ChatKyselyHelper.isUserNotInChat(userId, chatId);
	}
}
