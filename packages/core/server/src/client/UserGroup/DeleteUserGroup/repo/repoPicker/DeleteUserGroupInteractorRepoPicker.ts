import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {DeleteItem} from '@copor/core/domain/Core/Repository/DeleteItem';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {
	FakeDeleteUserGroupInteractorRepo
} from '@copor/core/client/UserGroup/DeleteUserGroup/repo/fake/FakeDeleteUserGroupInteractorRepo';
import {
	KyselyDeleteUserGroupInteractorRepo
} from '@copor/core/client/UserGroup/DeleteUserGroup/repo/kysely/KyselyDeleteUserGroupInteractorRepo';

export class DeleteUserGroupInteractorRepoPicker extends NewRepositoryPicker<DeleteItem> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) => DeleteItem> {
		return {
			[DBEnv.FAKE]: FakeDeleteUserGroupInteractorRepo,
			[DBEnv.KYSELY]: KyselyDeleteUserGroupInteractorRepo
		};
	}
}
