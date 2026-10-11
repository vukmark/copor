import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {GetUserRoleTypeRepo} from '@copor/core/domain/Components/Role/interactor/GetUserRoleType';
import {KyselyGetUserRoleTypeInteractorRepo} from '../kysely/KyselyGetUserRoleTypeInteractorRepo';
import {FakeGetUserRoleTypeInteractorRepo} from '../fake/FakeGetUserRoleTypeInteractorRepo';

export class GetUserRoleTypeInteractorRepoPicker extends NewRepositoryPicker<GetUserRoleTypeRepo> {
	protected getRepositoryList(): Record<string, new () => GetUserRoleTypeRepo> {
		return {
			[DBEnv.KYSELY]: KyselyGetUserRoleTypeInteractorRepo,
			[DBEnv.FAKE]: FakeGetUserRoleTypeInteractorRepo
		};
	}
}
