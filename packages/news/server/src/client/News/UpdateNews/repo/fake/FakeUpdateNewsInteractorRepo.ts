import {SaveNewsRepo} from '@copor/news/domain/News/repository/SaveNewsRepo';
import {SaveNewsDTO} from '@copor/news/domain/News/interactor/dto/SaveNewsDTO';

export class FakeUpdateNewsInteractorRepo
implements SaveNewsRepo {
	save(saveDTO: SaveNewsDTO): Promise<void> {
		return Promise.resolve(undefined);
	}
}