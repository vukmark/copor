import {ValidateStartPrivateCallRepo} from '@copor/vu_meet/domain/VuMeet/Chat/repository/ValidateStartPrivateCallRepo';
import {ChatKyselyHelper} from '@copor/vu_meet/client/VuMeet/Chat/helper/ChatKyselyHelper';

export class KyselyHandleCallActionValidatorStorageRepo implements ValidateStartPrivateCallRepo {
	isInvalidChat(chatId: string | undefined): Promise<boolean> {
		return ChatKyselyHelper.isInvalidChat(chatId);
	}
	isUserNotInChat(userId: string | undefined, chatId: string | undefined): Promise<boolean> {
		return ChatKyselyHelper.isUserNotInChat(userId, chatId);
	}
}
