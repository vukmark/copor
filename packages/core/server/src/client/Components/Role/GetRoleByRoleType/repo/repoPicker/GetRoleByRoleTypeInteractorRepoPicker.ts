import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {KyselyGetRoleByRoleTypeInteractorRepo}
	from '@copor/core/client/Components/Role/GetRoleByRoleType/repo/kysely/KyselyGetRoleByRoleTypeInteractorRepo';
import {GetRoleByRoleTypeRepo}
	from '@copor/core/domain/Components/Role/interactor/GetRoleByRoleType';
import {FakeGetRoleByRoleTypeInteractorRepo} from '../fake/FakeGetRoleByRoleTypeInteractorRepo';

export class GetRoleByRoleTypeInteractorRepoPicker extends NewRepositoryPicker<GetRoleByRoleTypeRepo> {
	protected getRepositoryList(): Record<string, new () => GetRoleByRoleTypeRepo> {
		return {
			[DBEnv.KYSELY]: KyselyGetRoleByRoleTypeInteractorRepo,
			[DBEnv.FAKE]: FakeGetRoleByRoleTypeInteractorRepo
		};
	}
}
