import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {SaveUserGroupRepo} from '@copor/core/domain/UserGroup/repository/SaveUserGroupRepo';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {FakeUpdateUserGroupInteractorRepo} from '../fake/FakeUpdateUserGroupInteractorRepo';
import {
	KyselyUpdateUserGroupInteractorRepo
} from '@copor/core/client/UserGroup/UpdateUserGroup/repo/kysely/KyselyUpdateUserGroupInteractorRepo';

export class UpdateUserGroupInteractorRepoPicker extends NewRepositoryPicker<SaveUserGroupRepo> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) => SaveUserGroupRepo> {
		return {
			[DBEnv.FAKE]: FakeUpdateUserGroupInteractorRepo,
			[DBEnv.KYSELY]: KyselyUpdateUserGroupInteractorRepo
		};
	}
}
