import {NewRepositoryPicker} from '../../../../../Core/RepositoryPicker';
import {AppContext} from '../../../../../Interface/AppContext';
import {DBEnv} from '../../../../../enum/DBEnv';
import {FakeUpdatePhoneNumberValidatorStorageRepo} from '../fake/FakeUpdatePhoneNumberValidatorStorageRepo';
import {
    KyselyUpdatePhoneNumberValidatorStorageRepo
} from '@copor/core/client/Global/PhoneNumber/UpdatePhoneNumber/repo/kysely/KyselyUpdatePhoneNumberValidatorStorageRepo';
import {
    ValidateUpdatePhoneNumberRepo
} from '@copor/core/domain/Core/global/PhoneNumber/repository/ValidateUpdatePhoneNumberRepo';


export class UpdatePhoneNumberValidatorStorageRepoPicker extends NewRepositoryPicker<ValidateUpdatePhoneNumberRepo> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) => ValidateUpdatePhoneNumberRepo> {
		return {
			[DBEnv.FAKE]: FakeUpdatePhoneNumberValidatorStorageRepo,
			[DBEnv.KYSELY]: KyselyUpdatePhoneNumberValidatorStorageRepo
		};
	}
}
