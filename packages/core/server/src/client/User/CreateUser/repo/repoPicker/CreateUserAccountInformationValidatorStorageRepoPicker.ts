import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {ValidateCreateUserAccountInformationRepo} from '@copor/core/domain/User/AccountInformation/repository/ValidateCreateUserAccountInformationRepo';
import {FakeCreateUserAccountInformationValidatorStorageRepo} from '../fake/FakeCreateUserAccountInformationValidatorStorageRepo';
import {KyselyCreateUserAccountInformationValidatorStorageRepo} from '../kysely/KyselyCreateUserAccountInformationValidatorStorageRepo';

export class CreateUserAccountInformationValidatorStorageRepoPicker
	extends NewRepositoryPicker<ValidateCreateUserAccountInformationRepo> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) => ValidateCreateUserAccountInformationRepo> {
		return {
			[DBEnv.FAKE]: FakeCreateUserAccountInformationValidatorStorageRepo,
			[DBEnv.KYSELY]: KyselyCreateUserAccountInformationValidatorStorageRepo
		};
	}
}
