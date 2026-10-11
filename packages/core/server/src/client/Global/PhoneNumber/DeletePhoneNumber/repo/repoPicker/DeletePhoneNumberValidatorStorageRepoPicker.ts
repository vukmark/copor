import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {FakeDeletePhoneNumberValidatorStorageRepo} from '../fake/FakeDeletePhoneNumberValidatorStorageRepo';
import {KyselyDeletePhoneNumberValidatorStorageRepo}
	from '@copor/core/client/Global/PhoneNumber/DeletePhoneNumber/repo/kysely/KyselyDeletePhoneNumberValidatorStorageRepo';
import {ValidateDeletePhoneNumberRepo}
	from '@copor/core/domain/Core/global/PhoneNumber/repository/ValidateDeletePhoneNumberRepo';

export class DeletePhoneNumberValidatorStorageRepoPicker extends NewRepositoryPicker<ValidateDeletePhoneNumberRepo> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) => ValidateDeletePhoneNumberRepo> {
		return {
			[DBEnv.FAKE]: FakeDeletePhoneNumberValidatorStorageRepo,
			[DBEnv.KYSELY]: KyselyDeletePhoneNumberValidatorStorageRepo
		};
	}
}