import {ValidateStartPrivateCallRepo} from '@copor/vu_meet/domain/VuMeet/Chat/repository/ValidateStartPrivateCallRepo';

export class FakeStartGroupCallValidatorStorageRepo implements ValidateStartPrivateCallRepo {
	isInvalidChat(chatId: string | undefined): Promise<boolean> {
		return Promise.resolve(false);
	}
	isUserNotInChat(userId: string | undefined, chatId: string | undefined): Promise<boolean> {
		return Promise.resolve(false);
	}
}