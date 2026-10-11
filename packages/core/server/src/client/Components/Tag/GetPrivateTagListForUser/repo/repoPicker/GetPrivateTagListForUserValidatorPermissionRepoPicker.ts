import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {PermissionRepository} from '@copor/core/domain/Core/Validations/PermissionRepository';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {FakePermissionRepository} from '@copor/core/client/GlobalRepository/FakePermissionRepository';
import {ValidateCanGetPrivateTagListForUserContext} from '@copor/core/domain/Core/Validations/Validators/ValidateCanGetPrivateTagListForUser';
import {KyselyGetPrivateTagListForUserValidatorPermissionRepo}
	from '@copor/core/client/Components/Tag/GetPrivateTagListForUser/repo/kysely/KyselyGetPrivateTagListForUserValidatorPermissionRepo';

export class GetPrivateTagListForUserValidatorPermissionRepoPicker
	extends NewRepositoryPicker<PermissionRepository<ValidateCanGetPrivateTagListForUserContext>> {
	protected getRepositoryList()
	: Record<string, new (appContext: AppContext) => PermissionRepository<ValidateCanGetPrivateTagListForUserContext>> {
		return {
			[DBEnv.KYSELY]: KyselyGetPrivateTagListForUserValidatorPermissionRepo,
			[DBEnv.FAKE]: FakePermissionRepository
		};
	}
}