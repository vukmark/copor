import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {AddUserToUserGroupRepo} from '@copor/core/domain/UserGroup/repository/AddUserToUserGroupRepo';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {
	FakeAddUserToUserGroupInteractorRepo
} from '@copor/core/client/UserGroup/AddUserToUserGroup/repo/fake/FakeAddUserToUserGroupInteractorRepo';
import {
	KyselyAddUserToUserGroupInteractorRepo
} from '@copor/core/client/UserGroup/AddUserToUserGroup/repo/kysely/KyselyAddUserToUserGroupInteractorRepo';

export class AddUserToUserGroupInteractorRepoPicker extends NewRepositoryPicker<AddUserToUserGroupRepo> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) => AddUserToUserGroupRepo> {
		return {
			[DBEnv.FAKE]: FakeAddUserToUserGroupInteractorRepo,
			[DBEnv.KYSELY]: KyselyAddUserToUserGroupInteractorRepo
		};
	}
}