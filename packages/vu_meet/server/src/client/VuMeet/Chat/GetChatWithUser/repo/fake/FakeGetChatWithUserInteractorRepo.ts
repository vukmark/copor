import {GetChatWithUserRepo} from '@copor/vu_meet/domain/VuMeet/Chat/repository/GetChatWithUserRepo';

export class FakeGetChatWithUserInteractorRepo implements GetChatWithUserRepo {
	load(id: string): Promise<string> {
		return Promise.resolve(id);
	}
}
