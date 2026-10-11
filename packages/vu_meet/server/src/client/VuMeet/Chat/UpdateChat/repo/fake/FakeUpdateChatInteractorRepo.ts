import {SaveChatRepo} from '@copor/vu_meet/domain/VuMeet/Chat/repository/SaveChatRepo';
import {SaveChatDTO} from '@copor/vu_meet/domain/VuMeet/Chat/interactor/dto/SaveChatDTO';


export class FakeUpdateChatInteractorRepo implements SaveChatRepo {
	save(saveDTO: SaveChatDTO): Promise<void> {
		return Promise.resolve(undefined);
	}
}
