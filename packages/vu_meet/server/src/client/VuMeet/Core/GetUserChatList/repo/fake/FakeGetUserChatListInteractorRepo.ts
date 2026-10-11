import {GetUserChatListRepo} from '@copor/vu_meet/domain/VuMeet/Core/repository/GetUserChatListRepo';
import {GetUserChatDTO} from '@copor/vu_meet/domain/VuMeet/Core/interactor/dto/GetUserChatDTO';

export class FakeGetUserChatListInteractorRepo implements GetUserChatListRepo {
	public list(userId: string, prompt: string): Promise<GetUserChatDTO[]> {
		return new Promise((resolve) => {
			resolve([{
				id: '1',
				isPrivate: false,
				name: 'Name of chat',
				pictureName: '',
				lastMessage: 'id of last message',
				createdAt: new Date(),
				numberOfUnseenMessages: 1
			}]
			);
		});
	}
}
