import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {DeleteItem} from '@copor/core/domain/Core/Repository/DeleteItem';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {
	FakeDeleteFileInteractorRepo
} from '@copor/cloud/client/Cloud/DeleteFile/repo/fake/FakeDeleteFileInteractorRepo';
import {KyselyDeleteFileInteractorRepo} from '@copor/cloud/client/Cloud/DeleteFile/repo/kysely/KyselyDeleteFileInteractorRepo';

export class DeleteFileInteractorRepoPicker extends NewRepositoryPicker<DeleteItem> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) => DeleteItem> {
		return {
			[DBEnv.FAKE]: FakeDeleteFileInteractorRepo,
			[DBEnv.KYSELY]: KyselyDeleteFileInteractorRepo
		};
	}
}
