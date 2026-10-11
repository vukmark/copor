import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {ValidateVerifyRegistrationRepo} from '@copor/core/domain/Registration/repository/ValidateVerifyRegistrationRepo';
import {FakeValidateVerifyRegistrationRepo} from '../fake/FakeRegistrationRepos';
import {KyselyValidateVerifyRegistrationRepo} from '../kysely/KyselyValidateVerifyRegistrationRepo';

export class ValidateVerifyRegistrationRepoPicker extends NewRepositoryPicker<ValidateVerifyRegistrationRepo> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) => ValidateVerifyRegistrationRepo> {
		return {
			[DBEnv.FAKE]: FakeValidateVerifyRegistrationRepo,
			[DBEnv.KYSELY]: KyselyValidateVerifyRegistrationRepo
		};
	}
}
