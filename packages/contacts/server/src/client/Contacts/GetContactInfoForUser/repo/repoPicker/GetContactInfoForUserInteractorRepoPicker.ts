import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {
	FakeGetContactListInteractorRepo
} from '@copor/contacts/client/Contacts/GetContactInfoForUser/repo/fake/FakeGetContactInfoForUserInteractorRepo';
import {GetContactInfoForUserRepo} from '@copor/contacts/domain/Contacts/repository/GetContactInfoForUserRepo';
import {
    KyselyGetContactInfoForUserInteractorRepo
} from '@copor/contacts/client/Contacts/GetContactInfoForUser/repo/kysely/KyselyGetContactInfoForUserInteractorRepo';

export class GetContactInfoForUserInteractorRepoPicker extends NewRepositoryPicker<GetContactInfoForUserRepo> {
	protected getRepositoryList(): Record<string, new(appContext: AppContext) => GetContactInfoForUserRepo> {
		return {
			[DBEnv.FAKE]: FakeGetContactListInteractorRepo,
			[DBEnv.KYSELY]: KyselyGetContactInfoForUserInteractorRepo
		};
	}
}