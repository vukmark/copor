import {
	ValidateSearchMessagesInChatRepo
} from '@copor/vu_meet/domain/VuMeet/Message/repository/ValidateSearchMessagesInChatRepo';

export class FakeSearchMessagesInChatValidatorStorageRepo implements ValidateSearchMessagesInChatRepo {
	isUserNotInChat(userId: string | undefined, chatId: string | undefined): Promise<boolean> {
		return Promise.resolve(false);
	}
	isInvalidChat(id: string | undefined): Promise<boolean> {
		return Promise.resolve(false);
	}
}
