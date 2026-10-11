import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {GetUserGroupUserListRepo} from '@copor/core/domain/UserGroup/repository/GetUserGroupUserListRepo';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {
	KyselyGetUserGroupUserListInteractorRepo
} from '@copor/core/client/UserGroup/GetUpdateUserGroupForm/repo/kysely/KyselyGetUserGroupUserListInteractorRepo';
import {
	FakeGetUserGroupUserListInteractorRepo
} from '@copor/core/client/UserGroup/GetUpdateUserGroupForm/repo/fake/FakeGetUserGroupUserListInteractorRepo';

export class GetUserGroupUserListInteractorRepoPicker extends NewRepositoryPicker<GetUserGroupUserListRepo> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) => GetUserGroupUserListRepo> {
		return {
			[DBEnv.FAKE]: FakeGetUserGroupUserListInteractorRepo,
			[DBEnv.KYSELY]: KyselyGetUserGroupUserListInteractorRepo
		};
	}
}