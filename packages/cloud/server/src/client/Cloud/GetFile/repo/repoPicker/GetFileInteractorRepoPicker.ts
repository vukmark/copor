import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {GetItem} from '@copor/core/domain/Core/Repository/GetItem';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {FakeGetFileInteractorRepo} from '../fake/FakeGetFileInteractorRepo';
import {GetFileDTO} from '@copor/cloud/domain/Cloud/interactor/dto/GetFileDTO';
import {KyselyGetFileInteractorRepo} from '@copor/cloud/client/Cloud/GetFile/repo/kysely/KyselyGetFileInteractorRepo';

export class GetFileInteractorRepoPicker extends NewRepositoryPicker<GetItem<GetFileDTO>> {
	protected getRepositoryList(): Record<string, new () => GetItem<GetFileDTO>> {
		return {
			[DBEnv.FAKE]: FakeGetFileInteractorRepo,
			[DBEnv.KYSELY]: KyselyGetFileInteractorRepo
		};
	}
}
