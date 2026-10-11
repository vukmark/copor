import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {GetItem} from '@copor/core/domain/Core/Repository/GetItem';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {FakeGetTagInteractorRepo} from '../fake/FakeGetTagInteractorRepo';
import {GetTagDTO} from '@copor/core/domain/Components/Tag/interactor/dto/GetTagDTO';
import {KyselyGetTagInteractorRepo} from '@copor/core/client/Components/Tag/GetTag/repo/kysely/KyselyGetTagInteractorRepo';

export class GetTagInteractorRepoPicker extends NewRepositoryPicker<GetItem<GetTagDTO>> {
	protected getRepositoryList(): Record<string, new () => GetItem<GetTagDTO>> {
		return {
			[DBEnv.FAKE]: FakeGetTagInteractorRepo,
			[DBEnv.KYSELY]: KyselyGetTagInteractorRepo
		};
	}
}
