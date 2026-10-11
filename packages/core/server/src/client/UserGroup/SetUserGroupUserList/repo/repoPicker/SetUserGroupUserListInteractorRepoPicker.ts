import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {SetUserGroupUserListRepo} from '@copor/core/domain/UserGroup/repository/SetUserGroupUserListRepo';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {
	FakeSetUserGroupUserListInteractorRepo
} from '@copor/core/client/UserGroup/SetUserGroupUserList/repo/fake/FakeSetUserGroupUserListInteractorRepo';
import {
	KyselySetUserGroupUserListInteractorRepo
} from '@copor/core/client/UserGroup/SetUserGroupUserList/repo/kysely/KyselySetUserGroupUserListInteractorRepo';

export class SetUserGroupUserListInteractorRepoPicker extends NewRepositoryPicker<SetUserGroupUserListRepo> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) => SetUserGroupUserListRepo> {
		return {
			[DBEnv.FAKE]: FakeSetUserGroupUserListInteractorRepo,
			[DBEnv.KYSELY]: KyselySetUserGroupUserListInteractorRepo
		};
	}
}