import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {
	ValidateDeleteRoleRepo
} from '@copor/core/domain/Components/Role/repository/ValidateDeleteRoleRepo';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {FakeDeleteRoleValidatorStorageRepo} from '../fake/FakeDeleteRoleValidatorStorageRepo';
import {KyselyDeleteRoleValidatorStorageRepo} from '@copor/core/client/Components/Role/DeleteRole/repo/kysely/KyselyDeleteRoleValidatorStorageRepo';

export class DeleteRoleValidatorStorageRepoPicker extends NewRepositoryPicker<ValidateDeleteRoleRepo> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) => ValidateDeleteRoleRepo> {
		return {
			[DBEnv.FAKE]: FakeDeleteRoleValidatorStorageRepo,
			[DBEnv.KYSELY]: KyselyDeleteRoleValidatorStorageRepo
		};
	}
}