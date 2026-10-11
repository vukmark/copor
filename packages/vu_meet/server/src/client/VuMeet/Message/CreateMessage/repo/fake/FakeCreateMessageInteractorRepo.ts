import {SaveItem} from '@copor/core/domain/Core/Repository/SaveItem';
import {UniqueIdGenerator} from '@copor/core/domain/Core/Repository/UniqueIdGenerator';
import {
	SaveMessageDTO
} from '@copor/vu_meet/domain/VuMeet/Message/interactor/dto/SaveMessageDTO';

export class FakeCreateMessageInteractorRepo implements SaveItem<SaveMessageDTO>, UniqueIdGenerator {
	getNewId(): Promise<string> {
		return Promise.resolve('unique-id');
	}
	save(saveDTO: SaveMessageDTO): Promise<void> {
		return Promise.resolve();
	}
}
