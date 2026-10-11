import {GetMessageDTO} from '@copor/vu_meet/domain/VuMeet/Message/interactor/dto/GetMessageDTO';
import {MessageContentType} from '@copor/vu_meet/domain/VuMeet/Core/enum/MessageContentType';
import {GetMessageListRepo} from '@copor/vu_meet/domain/VuMeet/Message/repository/GetMessageListRepo';


export class FakeGetMessageListInteractorRepo implements GetMessageListRepo {
	public list(chatId: string, beforeDate: string, afterDate: string, actorId: string): Promise<GetMessageDTO[]> {
		return new Promise((resolve) => {
			resolve([{
				id: 'id',
				content: 'message',
				type: MessageContentType.TEXT,
				senderId: 'sid',
				seen: true,
				senderPictureName: 'picture',
				senderFirstName: 'Kostadinka',
				senderLastName: 'Trnavcevic',
				createdAt: new Date(),
				isPrivate: true
			}]
			);
		});
	}
}
