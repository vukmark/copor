import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {FakeUpdateTagInteractorRepo} from '../fake/FakeUpdateTagInteractorRepo';
import {SaveTagRepo} from '@copor/core/domain/Components/Tag/repository/SaveTagRepo';
import {
    KyselyUpdateTagInteractorRepo
} from '@copor/core/client/Components/Tag/UpdateTag/repo/kysely/KyselyUpdateTagInteractorRepo';

export class UpdateTagInteractorRepoPicker extends NewRepositoryPicker<SaveTagRepo> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) => SaveTagRepo> {
		return {
			[DBEnv.FAKE]: FakeUpdateTagInteractorRepo,
			[DBEnv.KYSELY]: KyselyUpdateTagInteractorRepo
		};
	}
}
