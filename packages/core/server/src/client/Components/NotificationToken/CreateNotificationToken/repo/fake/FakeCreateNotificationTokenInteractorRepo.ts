import {SaveItem} from '@copor/core/domain/Core/Repository/SaveItem';
import {SaveNotificationTokenDTO}
	from '@copor/core/domain/Components/NotificationToken/interactor/dto/SaveNotificationTokenDTO';
import {UniqueIdGenerator} from '@copor/core/domain/Core/Repository/UniqueIdGenerator';

export class FakeCreateNotificationTokenInteractorRepo implements SaveItem<SaveNotificationTokenDTO>, UniqueIdGenerator {
	getNewId(): Promise<string> {
		return Promise.resolve('unique-id');
	}
	save(saveDTO: SaveNotificationTokenDTO): Promise<void> {
		return Promise.resolve();
	}
}
