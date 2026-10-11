import {ValidateGetChatInfoRepo} from '@copor/vu_meet/domain/VuMeet/Chat/repository/ValidateGetChatInfoRepo';

export class FakeGetChatInfoValidatorStorageRepo implements ValidateGetChatInfoRepo {
	isInvalidChat(chatId: string | undefined): Promise<boolean> {
		return Promise.resolve(false);
	}
	isUserNotInChat(userId: string | undefined, chatId: string | undefined): Promise<boolean> {
		return Promise.resolve(false);
	}
}
