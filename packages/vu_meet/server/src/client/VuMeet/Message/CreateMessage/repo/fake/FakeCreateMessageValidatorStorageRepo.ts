import {
	ValidateCreateMessageRepo
} from '@copor/vu_meet/domain/VuMeet/Message/repository/ValidateCreateMessageRepo';


export class FakeCreateMessageValidatorStorageRepo implements ValidateCreateMessageRepo {
	isInvalidFileSize(file: Buffer | undefined): Promise<boolean> {
		return Promise.resolve(false);
	}
	isUserNotInChat(userId: string | undefined, chatId: string | undefined): Promise<boolean> {
		return Promise.resolve(false);
	}
	isInvalidChat(id: string | undefined): Promise<boolean> {
		return Promise.resolve(false);
	}
	isNotValidUser(userId: string | undefined): Promise<boolean> {
		return Promise.resolve(false);
	}
}
