import {
	ValidateGetMessageListRepo
} from '@copor/vu_meet/domain/VuMeet/Message/repository/ValidateGetMessageListRepo';

export class FakeGetMessageListValidatorStorageRepo implements ValidateGetMessageListRepo {
	isInvalidChat(id: string | undefined): Promise<boolean> {
		return Promise.resolve(false);
	}
	isUserNotInChat(userId: string | undefined, chatId: string | undefined): Promise<boolean> {
		return Promise.resolve(false);
	}
}
