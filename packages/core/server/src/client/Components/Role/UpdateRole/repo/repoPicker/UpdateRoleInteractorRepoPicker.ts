import {NewRepositoryPicker} from '../../../../../Core/RepositoryPicker';
import {SaveRoleRepo} from '@copor/core/domain/Components/Role/repository/SaveRoleRepo';
import {AppContext} from '../../../../../Interface/AppContext';
import {DBEnv} from '../../../../../enum/DBEnv';
import {FakeUpdateRoleInteractorRepo} from '../fake/FakeUpdateRoleInteractorRepo';
import {KyselyUpdateRoleInteractorRepo} from '@copor/core/client/Components/Role/UpdateRole/repo/kysely/KyselyUpdateRoleInteractorRepo';

export class UpdateRoleInteractorRepoPicker extends NewRepositoryPicker<SaveRoleRepo> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) => SaveRoleRepo> {
		return {
			[DBEnv.FAKE]: FakeUpdateRoleInteractorRepo,
			[DBEnv.KYSELY]: KyselyUpdateRoleInteractorRepo
		};
	}
}
