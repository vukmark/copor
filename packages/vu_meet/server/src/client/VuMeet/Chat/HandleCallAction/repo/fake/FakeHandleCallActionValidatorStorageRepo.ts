import {ValidateStartPrivateCallRepo} from '@copor/vu_meet/domain/VuMeet/Chat/repository/ValidateStartPrivateCallRepo';

export class FakeHandleCallActionValidatorStorageRepo implements ValidateStartPrivateCallRepo {
	isInvalidChat(id: string | undefined): Promise<boolean> {
		return Promise.resolve(false);
	}
	isUserNotInChat(userId: string | undefined, chatId: string | undefined): Promise<boolean> {
		return Promise.resolve(false);
	}
}