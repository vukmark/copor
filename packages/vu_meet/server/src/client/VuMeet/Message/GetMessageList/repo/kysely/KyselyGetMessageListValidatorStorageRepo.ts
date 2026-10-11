import {
	ValidateGetMessageListRepo
} from '@copor/vu_meet/domain/VuMeet/Message/repository/ValidateGetMessageListRepo';
import {ChatKyselyHelper} from '@copor/vu_meet/client/VuMeet/Chat/helper/ChatKyselyHelper';

export class KyselyGetMessageListValidatorStorageRepo implements ValidateGetMessageListRepo {
	isInvalidChat(id: string | undefined): Promise<boolean> {
		return ChatKyselyHelper.isInvalidChat(id);
	}
	isUserNotInChat(userId: string | undefined, chatId: string | undefined): Promise<boolean> {
		return ChatKyselyHelper.isUserNotInChat(userId, chatId);
	}
}
