import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {DeleteItem} from '@copor/core/domain/Core/Repository/DeleteItem';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {FakeDeleteUserInteractorRepo} from '@copor/core/client/User/DeleteUser/repo/fake/FakeDeleteUserInteractorRepo';
import {KyselyDeleteUserInteractorRepo} from '@copor/core/client/User/DeleteUser/repo/kysely/KyselyDeleteUserInteractorRepo';

export class DeleteUserInteractorRepoPicker extends NewRepositoryPicker<DeleteItem> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) => DeleteItem> {
		return {
			[DBEnv.FAKE]: FakeDeleteUserInteractorRepo,
			[DBEnv.KYSELY]: KyselyDeleteUserInteractorRepo
		};
	}
}
