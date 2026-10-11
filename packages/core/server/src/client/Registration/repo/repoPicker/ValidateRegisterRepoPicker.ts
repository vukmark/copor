import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {ValidateRegisterRepo} from '@copor/core/domain/Registration/repository/ValidateRegisterRepo';
import {FakeValidateRegisterRepo} from '../fake/FakeRegistrationRepos';
import {KyselyValidateRegisterRepo} from '../kysely/KyselyValidateRegisterRepo';

export class ValidateRegisterRepoPicker extends NewRepositoryPicker<ValidateRegisterRepo> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) => ValidateRegisterRepo> {
		return {
			[DBEnv.FAKE]: FakeValidateRegisterRepo,
			[DBEnv.KYSELY]: KyselyValidateRegisterRepo
		};
	}
}
