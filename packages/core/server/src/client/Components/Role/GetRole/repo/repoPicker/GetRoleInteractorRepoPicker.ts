import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {GetItem} from '@copor/core/domain/Core/Repository/GetItem';
import {GetRoleDTO} from '@copor/core/domain/Components/Role/interactor/dto/GetRoleDTO';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {KyselyGetRoleInteractorRepo} from '@copor/core/client/Components/Role/GetRole/repo/kysely/KyselyGetRoleInteractorRepo';
import {FakeGetRoleInteractorRepo} from '../fake/FakeGetRoleInteractorRepo';

export class GetRoleInteractorRepoPicker extends NewRepositoryPicker<GetItem<GetRoleDTO>> {
	protected getRepositoryList(): Record<string, new () => GetItem<GetRoleDTO>> {
		return {
			[DBEnv.KYSELY]: KyselyGetRoleInteractorRepo,
			[DBEnv.FAKE]: FakeGetRoleInteractorRepo
		};
	}
}
