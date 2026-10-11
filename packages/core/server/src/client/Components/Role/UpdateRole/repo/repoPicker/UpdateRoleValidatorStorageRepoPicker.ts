import {NewRepositoryPicker} from '../../../../../Core/RepositoryPicker';
import {
	ValidateUpdateRoleRepo
} from '@copor/core/domain/Components/Role/repository/ValidateUpdateRoleRepo';
import {AppContext} from '../../../../../Interface/AppContext';
import {DBEnv} from '../../../../../enum/DBEnv';
import {FakeUpdateRoleValidatorStorageRepo} from '../fake/FakeUpdateRoleValidatorStorageRepo';
import {KyselyUpdateRoleValidatorStorageRepo} from '@copor/core/client/Components/Role/UpdateRole/repo/kysely/KyselyUpdateRoleValidatorStorageRepo';

export class UpdateRoleValidatorStorageRepoPicker extends NewRepositoryPicker<ValidateUpdateRoleRepo> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) => ValidateUpdateRoleRepo> {
		return {
			[DBEnv.FAKE]: FakeUpdateRoleValidatorStorageRepo,
			[DBEnv.KYSELY]: KyselyUpdateRoleValidatorStorageRepo
		};
	}
}
