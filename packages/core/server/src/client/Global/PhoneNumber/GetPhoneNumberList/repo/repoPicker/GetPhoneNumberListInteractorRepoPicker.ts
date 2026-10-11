import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {FakeGetPhoneNumberListInteractorRepo} from '../fake/FakeGetPhoneNumberListInteractorRepo';
import {
	KyselyGetPhoneNumberListInteractorRepo
} from '@copor/core/client/Global/PhoneNumber/GetPhoneNumberList/repo/kysely/KyselyGetPhoneNumberListInteractorRepo';
import {GetPhoneNumberListRepo} from '@copor/core/domain/Core/global/PhoneNumber/repository/GetPhoneNumberListRepo';

export class GetPhoneNumberListInteractorRepoPicker extends NewRepositoryPicker<GetPhoneNumberListRepo> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) => GetPhoneNumberListRepo> {
		return {
			[DBEnv.FAKE]: FakeGetPhoneNumberListInteractorRepo,
			[DBEnv.KYSELY]: KyselyGetPhoneNumberListInteractorRepo
		};
	}
}
