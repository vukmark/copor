import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {DeleteItem} from '@copor/core/domain/Core/Repository/DeleteItem';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {FakeDeleteTagInteractorRepo} from '../fake/FakeDeleteTagInteractorRepo';
import {
    KyselyDeleteTagInteractorRepo
} from '@copor/core/client/Components/Tag/DeleteTag/repo/kysely/KyselyDeleteTagInteractorRepo';

export class DeleteTagInteractorRepoPicker extends NewRepositoryPicker<DeleteItem> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) => DeleteItem> {
		return {
			[DBEnv.FAKE]: FakeDeleteTagInteractorRepo,
			[DBEnv.KYSELY]: KyselyDeleteTagInteractorRepo
		};
	}
}
