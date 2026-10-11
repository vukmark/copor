import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {FakeCreatePhoneNumberValidatorStorageRepo} from '../fake/FakeCreatePhoneNumberValidatorStorageRepo';
import {ValidateCreatePhoneNumberRepo}
	from '@copor/core/domain/Core/global/PhoneNumber/repository/ValidateCreatePhoneNumberRepo';
import {KyselyCreatePhoneNumberValidatorStorageRepo}
	from '@copor/core/client/Global/PhoneNumber/CreatePhoneNumber/repo/kysely/KyselyCreatePhoneNumberValidatorStorageRepo';

export class CreatePhoneNumberValidatorStorageRepoPicker extends NewRepositoryPicker<ValidateCreatePhoneNumberRepo> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) => ValidateCreatePhoneNumberRepo> {
		return {
			[DBEnv.FAKE]: FakeCreatePhoneNumberValidatorStorageRepo,
			[DBEnv.KYSELY]: KyselyCreatePhoneNumberValidatorStorageRepo
		};
	}
}
