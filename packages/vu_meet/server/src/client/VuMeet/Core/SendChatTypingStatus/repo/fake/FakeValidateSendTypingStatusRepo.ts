import {ValidateSendTypingStatusRepo} from '@copor/vu_meet/domain/VuMeet/Core/TypingStatus/repository/ValidateSendTypingStatusRepo';

export class FakeValidateSendTypingStatusRepo implements ValidateSendTypingStatusRepo {
	isInvalidChat(chatId: string | undefined): Promise<boolean> {
		return Promise.resolve(false);
	}

	isUserNotInChat(userId: string | undefined, chatId: string | undefined): Promise<boolean> {
		return Promise.resolve(false);
	}
}
