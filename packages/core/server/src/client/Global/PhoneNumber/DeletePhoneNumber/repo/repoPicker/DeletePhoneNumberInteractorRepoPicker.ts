import {NewRepositoryPicker} from '../../../../../Core/RepositoryPicker';
import {DeleteItem} from '@copor/core/domain/Core/Repository/DeleteItem';
import {AppContext} from '../../../../../Interface/AppContext';
import {DBEnv} from '../../../../../enum/DBEnv';
import {FakeDeletePhoneNumberInteractorRepo} from '../fake/FakeDeletePhoneNumberInteractorRepo';
import {
    KyselyDeletePhoneNumberInteractorRepo
} from '@copor/core/client/Global/PhoneNumber/DeletePhoneNumber/repo/kysely/KyselyDeletePhoneNumberInteractorRepo';

export class DeletePhoneNumberInteractorRepoPicker extends NewRepositoryPicker<DeleteItem> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) => DeleteItem> {
		return {
			[DBEnv.FAKE]: FakeDeletePhoneNumberInteractorRepo,
			[DBEnv.KYSELY]: KyselyDeletePhoneNumberInteractorRepo
		};
	}
}
