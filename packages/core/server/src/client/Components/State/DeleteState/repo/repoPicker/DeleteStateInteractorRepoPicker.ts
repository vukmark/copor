import {AppContext} from '@copor/core/client/Interface/AppContext';
import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {DeleteItem} from '@copor/core/domain/Core/Repository/DeleteItem';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {
	FakeDeleteStateInteractorRepo
} from '@copor/core/client/Components/State/DeleteState/repo/fake/FakeDeleteStateInteractorRepo';
import {
	KyselyDeleteStateInteractorRepo
} from '@copor/core/client/Components/State/DeleteState/repo/kysely/KyselyDeleteStateInteractorRepo';

export class DeleteStateInteractorRepoPicker extends NewRepositoryPicker<DeleteItem> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) => DeleteItem> {
		return {
			[DBEnv.FAKE]: FakeDeleteStateInteractorRepo,
			[DBEnv.KYSELY]: KyselyDeleteStateInteractorRepo
		};
	}
}