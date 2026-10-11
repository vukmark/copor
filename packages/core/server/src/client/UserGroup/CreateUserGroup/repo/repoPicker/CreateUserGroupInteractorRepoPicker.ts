import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {SaveItem} from '@copor/core/domain/Core/Repository/SaveItem';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {
	FakeCreateUserGroupInteractorRepo
} from '@copor/core/client/UserGroup/CreateUserGroup/repo/fake/FakeCreateUserGroupInteractorRepo';
import {SaveUserGroupDTO} from '@copor/core/domain/UserGroup/interactor/dto/SaveUserGroupDTO';
import {
	KyselyCreateUserGroupInteractorRepo
} from '@copor/core/client/UserGroup/CreateUserGroup/repo/kysely/KyselyCreateUserGroupInteractorRepo';

export class CreateUserGroupInteractorRepoPicker extends NewRepositoryPicker<SaveItem<SaveUserGroupDTO>> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) => SaveItem<SaveUserGroupDTO>> {
		return {
			[DBEnv.FAKE]: FakeCreateUserGroupInteractorRepo,
			[DBEnv.KYSELY]: KyselyCreateUserGroupInteractorRepo
		};
	}
}
