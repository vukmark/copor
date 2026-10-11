import {SaveStateRepo} from '@copor/core/domain/Components/State/repository/SaveStateRepo';
import {SaveStateDTO} from '@copor/core/domain/Components/State/interactor/dto/SaveStateDTO';

export class FakeUpdateStateInteractorRepo implements SaveStateRepo {
	save(saveDTO: SaveStateDTO): Promise<void> {
		return Promise.resolve(undefined);
	}
}
