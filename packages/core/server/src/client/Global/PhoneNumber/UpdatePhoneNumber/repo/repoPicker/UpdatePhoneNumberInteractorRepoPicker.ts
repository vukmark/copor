import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {FakeUpdatePhoneNumberInteractorRepo} from '../fake/FakeUpdatePhoneNumberInteractorRepo';
import {
	KyselyUpdatePhoneNumberInteractorRepo
} from '@copor/core/client/Global/PhoneNumber/UpdatePhoneNumber/repo/kysely/KyselyUpdatePhoneNumberInteractorRepo';
import {
	SavePhoneNumberRepo
} from '@copor/core/domain/Core/global/PhoneNumber/repository/SavePhoneNumberRepo';

export class UpdatePhoneNumberInteractorRepoPicker extends NewRepositoryPicker<SavePhoneNumberRepo> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) => SavePhoneNumberRepo> {
		return {
			[DBEnv.FAKE]: FakeUpdatePhoneNumberInteractorRepo,
			[DBEnv.KYSELY]: KyselyUpdatePhoneNumberInteractorRepo
		};
	}
}
