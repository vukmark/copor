import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {ValidateGetChatWithUserRepo} from '@copor/vu_meet/domain/VuMeet/Chat/repository/ValidateGetChatWithUserRepo';
import {FakeGetChatWithUserValidatorStorageRepo} from '../fake/FakeGetChatWithUserValidatorStorageRepo';
import {KyselyGetChatWithUserValidatorStorageRepo} from '../kysely/KyselyGetChatWithUserValidatorStorageRepo';

export class GetChatWithUserValidatorStorageRepoPicker extends NewRepositoryPicker<ValidateGetChatWithUserRepo> {
	protected getRepositoryList(): Record<string, new () => ValidateGetChatWithUserRepo> {
		return {
			[DBEnv.FAKE]: FakeGetChatWithUserValidatorStorageRepo,
			[DBEnv.KYSELY]: KyselyGetChatWithUserValidatorStorageRepo
		};
	}
}
