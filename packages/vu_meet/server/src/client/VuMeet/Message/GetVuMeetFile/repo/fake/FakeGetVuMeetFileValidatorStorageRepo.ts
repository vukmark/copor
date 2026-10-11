import {ValidateGetVuMeetFileRepo} from '@copor/vu_meet/domain/VuMeet/Message/repository/ValidateGetVuMeetFileRepo';

export class FakeGetVuMeetFileValidatorStorageRepo implements ValidateGetVuMeetFileRepo {
	isUserNotInChatOfMessage(userId: string | undefined, messageId: string | undefined): Promise<boolean> {
		return Promise.resolve(false);
	}
}
