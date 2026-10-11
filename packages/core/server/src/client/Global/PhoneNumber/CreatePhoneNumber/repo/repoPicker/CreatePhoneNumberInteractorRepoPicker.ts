import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {SaveItem} from '@copor/core/domain/Core/Repository/SaveItem';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {FakeCreatePhoneNumberInteractorRepo} from '../fake/FakeCreatePhoneNumberInteractorRepo';
import {
    KyselyCreatePhoneNumberInteractorRepo
} from '@copor/core/client/Global/PhoneNumber/CreatePhoneNumber/repo/kysely/KyselyCreatePhoneNumberInteractorRepo';
import {SavePhoneNumberDTO} from '@copor/core/domain/Core/global/PhoneNumber/dto/SavePhoneNumberDTO';

export class CreatePhoneNumberInteractorRepoPicker extends NewRepositoryPicker<SaveItem<SavePhoneNumberDTO[]>> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) => SaveItem<SavePhoneNumberDTO[]>> {
		return {
			[DBEnv.FAKE]: FakeCreatePhoneNumberInteractorRepo,
			[DBEnv.KYSELY]: KyselyCreatePhoneNumberInteractorRepo
		};
	}
}
