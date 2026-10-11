import {SaveTagRepo} from '@copor/core/domain/Components/Tag/repository/SaveTagRepo';
import {SaveTagDTO} from '@copor/core/domain/Components/Tag/interactor/dto/SaveTagDTO';

export class FakeUpdateTagInteractorRepo implements SaveTagRepo {
	save(saveDTO: SaveTagDTO): Promise<void> {
		return Promise.resolve(undefined);
	}
}
