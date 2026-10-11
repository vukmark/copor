import {NewRepositoryPicker} from '../../../../Core/RepositoryPicker';
import {AppContext} from '../../../../Interface/AppContext';
import {DBEnv} from '../../../../enum/DBEnv';
import {FakeUpdateUserAccountInformationValidatorStorageRepo} from '../fake/FakeUpdateUserAccountInformationValidatorStorageRepo';
import {KyselyUpdateUserAccountInformationValidatorStorageRepo} from '../kysely/KyselyUpdateUserAccountInformationValidatorStorageRepo';
import {ValidateUpdateUserAccountInformationRepo}
	from '@copor/core/domain/User/AccountInformation/repository/ValidateUpdateUserAccountInformationRepo';


export class UpdateUserAccountInformationValidatorStorageRepoPicker extends NewRepositoryPicker<ValidateUpdateUserAccountInformationRepo> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) => ValidateUpdateUserAccountInformationRepo> {
		return {
			[DBEnv.FAKE]: FakeUpdateUserAccountInformationValidatorStorageRepo,
			[DBEnv.KYSELY]: KyselyUpdateUserAccountInformationValidatorStorageRepo
		};
	}
}
