import {ValidateStartPrivateCallRepo} from '@copor/vu_meet/domain/VuMeet/Chat/repository/ValidateStartPrivateCallRepo';
import {ChatKyselyHelper} from '@copor/vu_meet/client/VuMeet/Chat/helper/ChatKyselyHelper';

// A "group" call is just a call in a chat with more than two members —
// chats (private or group) are all the same chat/chat_user_map
// entity, so this reuses the same membership checks Chat uses (and the
// same repo interface as the private-call path — see ValidateStartGroupCall).
export class KyselyStartGroupCallValidatorStorageRepo implements ValidateStartPrivateCallRepo {
	isInvalidChat(chatId: string | undefined): Promise<boolean> {
		return ChatKyselyHelper.isInvalidChat(chatId);
	}
	isUserNotInChat(userId: string | undefined, chatId: string | undefined): Promise<boolean> {
		return ChatKyselyHelper.isUserNotInChat(userId, chatId);
	}
}
