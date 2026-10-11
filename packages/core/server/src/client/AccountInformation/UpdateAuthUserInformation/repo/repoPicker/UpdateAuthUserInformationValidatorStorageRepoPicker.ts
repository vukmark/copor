import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {ValidateUpdateAuthUserInformationRepo}
	from '@copor/core/domain/User/repository/ValidateUpdateAuthUserInformationRepo';
import {FakeUpdateAuthUserInformationValidatorStorageRepo}
	from '../fake/FakeUpdateAuthUserInformationValidatorStorageRepo';
import {KyselyUpdateAuthUserInformationValidatorStorageRepo}
	from '../kysely/KyselyUpdateAuthUserInformationValidatorStorageRepo';

export class UpdateAuthUserInformationValidatorStorageRepoPicker
	extends NewRepositoryPicker<ValidateUpdateAuthUserInformationRepo> {
	protected getRepositoryList(): Record<
		string,
		new (appContext: AppContext) => ValidateUpdateAuthUserInformationRepo
	> {
		return {
			[DBEnv.FAKE]: FakeUpdateAuthUserInformationValidatorStorageRepo,
			[DBEnv.KYSELY]: KyselyUpdateAuthUserInformationValidatorStorageRepo
		};
	}
}
