import {SaveFileRepo} from '@copor/cloud/domain/Cloud/repository/SaveFileRepo';
import {SaveFileDTO} from '@copor/cloud/domain/Cloud/interactor/dto/SaveFileDTO';


export class FakeCreateFileInteractorRepo implements SaveFileRepo {
	findUserGroupFileId(): Promise<string | undefined> {
		return Promise.resolve(undefined);
	}

	save(saveDTO: SaveFileDTO): Promise<void> {
		return Promise.resolve();
	}
}
