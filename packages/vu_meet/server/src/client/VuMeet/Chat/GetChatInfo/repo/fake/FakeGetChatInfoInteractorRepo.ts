import {GetItem} from '@copor/core/domain/Core/Repository/GetItem';
import {GetChatInfoDTO} from '@copor/vu_meet/domain/VuMeet/Chat/interactor/dto/GetChatInfoDTO';

export class FakeGetChatInfoInteractorRepo implements GetItem<GetChatInfoDTO> {
	load(id: string): Promise<GetChatInfoDTO> {
		return new Promise((resolve) => {
			resolve(
				{
					id: 'id',
					name: 'Chat Name',
					firstName: '',
					lastName: '',
					isPrivate: false,
					chatPicture: '',
					chatPictureExtension: '',
					isActive: true,
					members: [{
						id: 'id',
						firstName: 'fn',
						lastName: 'ln',
						picture: 'pn',
						pictureExtension: 'pe',
						roleName: 'User'
					}]
				}
			);
		});
	}
}