import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {KyselyGetPhoneNumberListValidatorRepo}
	from '@copor/core/client/Global/PhoneNumber/GetPhoneNumberList/repo/kysely/KyselyGetPhoneNumberListValidatorRepo';
import {FakeGetPhoneNumberListValidatorRepo} from '../fake/FakeGetPhoneNumberListValidatorRepo';
import {ValidateGetPhoneNumberListRepo}
	from '@copor/core/domain/Core/global/PhoneNumber/repository/ValidateGetPhoneNumberListRepo';

export class GetPhoneNumberListValidatorRepoPicker extends NewRepositoryPicker<ValidateGetPhoneNumberListRepo> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) => ValidateGetPhoneNumberListRepo> {
		return {
			[DBEnv.FAKE]: FakeGetPhoneNumberListValidatorRepo,
			[DBEnv.KYSELY]: KyselyGetPhoneNumberListValidatorRepo
		};
	}
}