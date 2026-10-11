import {
	ValidateMarkChatMessagesSeenRepo
} from '@copor/vu_meet/domain/VuMeet/Chat/validations/dto/ValidateMarkChatMessagesSeenRepo';

export class FakeMarkChatMessagesSeenValidatorStorageRepo implements ValidateMarkChatMessagesSeenRepo {
	isInvalidChat(id: string | undefined): Promise<boolean> {
		return Promise.resolve(false);
	}
	isUserNotInChat(userId: string | undefined, chatId: string | undefined): Promise<boolean> {
		return Promise.resolve(false);
	}
}
