import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {PermissionRepository} from '@copor/core/domain/Core/Validations/PermissionRepository';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {FakePermissionRepository} from '@copor/core/client/GlobalRepository/FakePermissionRepository';
import {KyselyUpdateTagValidatorPermissionRepo} from '@copor/core/client/Components/Tag/UpdateTag/repo/kysely/KyselyUpdateTagValidatorPermissionRepo';
import {ValidateCanEditTagContext} from '@copor/core/domain/Components/Tag/validation/permissions/ValidateCanEditTag';

export class UpdateTagValidatorPermissionRepoPicker
	extends NewRepositoryPicker<PermissionRepository<ValidateCanEditTagContext>> {
	protected getRepositoryList()
	: Record<string, new (appContext: AppContext) => PermissionRepository<ValidateCanEditTagContext>> {
		return {
			[DBEnv.KYSELY]: KyselyUpdateTagValidatorPermissionRepo,
			[DBEnv.FAKE]: FakePermissionRepository
		};
	}
}