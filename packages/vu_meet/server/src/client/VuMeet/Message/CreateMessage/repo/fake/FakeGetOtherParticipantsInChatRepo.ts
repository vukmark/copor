import {
	GetOtherParticipantsInChatRepo
} from '@copor/vu_meet/domain/VuMeet/Core/repository/GetOtherParticipantsInChatRepo';

export class FakeGetOtherParticipantsInChatRepo implements GetOtherParticipantsInChatRepo {
	load(userId: string, chatId: string): Promise<string[]> {
		return Promise.resolve([]);
	}
}
