import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {
	KyselyGetContactInfoForUserValidatorStorageRepo
} from '@copor/contacts/client/Contacts/GetContactInfoForUser/repo/kysely/KyselyGetContactInfoForUserValidatorStorageRepo';
import {
	FakeGetContactInfoForUserValidatorStorageRepo
} from '@copor/contacts/client/Contacts/GetContactInfoForUser/repo/fake/FakeGetContactInfoForUserValidatorStorageRepo';
import {ValidateGetContactInfoForUserRepo} from '@copor/contacts/domain/Contacts/repository/ValidateGetContactInfoForUserRepo';

export class GetContactInfoForUserValidatorRepoPicker extends NewRepositoryPicker<ValidateGetContactInfoForUserRepo> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) => ValidateGetContactInfoForUserRepo> {
		return {
			[DBEnv.FAKE]: FakeGetContactInfoForUserValidatorStorageRepo,
			[DBEnv.KYSELY]: KyselyGetContactInfoForUserValidatorStorageRepo
		};
	}
}