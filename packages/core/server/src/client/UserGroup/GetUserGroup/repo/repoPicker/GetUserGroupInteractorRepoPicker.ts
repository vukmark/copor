import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {GetItem} from '@copor/core/domain/Core/Repository/GetItem';
import {GetUserGroupDTO} from '@copor/core/domain/UserGroup/interactor/dto/GetUserGroupDTO';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {FakeGetUserGroupInteractorRepo} from '../fake/FakeGetUserGroupInteractorRepo';
import {
	KyselyGetUserGroupInteractorRepo
} from '@copor/core/client/UserGroup/GetUserGroup/repo/kysely/KyselyGetUserGroupInteractorRepo';

export class GetUserGroupInteractorRepoPicker extends NewRepositoryPicker<GetItem<GetUserGroupDTO>> {
	protected getRepositoryList(): Record<string, new () => GetItem<GetUserGroupDTO>> {
		return {
			[DBEnv.FAKE]: FakeGetUserGroupInteractorRepo,
			[DBEnv.KYSELY]: KyselyGetUserGroupInteractorRepo
		};
	}
}
