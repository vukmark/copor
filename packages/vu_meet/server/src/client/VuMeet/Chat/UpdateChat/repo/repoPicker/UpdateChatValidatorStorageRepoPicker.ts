import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {FakeUpdateChatValidatorStorageRepo} from '../fake/FakeUpdateChatValidatorStorageRepo';
import {KyselyUpdateChatValidatorStorageRepo} from '../kysely/KyselyUpdateChatValidatorStorageRepo';
import {ValidateUpdateChatRepo} from '@copor/vu_meet/domain/VuMeet/Chat/repository/ValidateUpdateChatRepo';

export class UpdateChatValidatorStorageRepoPicker extends NewRepositoryPicker<ValidateUpdateChatRepo> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) => ValidateUpdateChatRepo> {
		return {
			[DBEnv.FAKE]: FakeUpdateChatValidatorStorageRepo,
			[DBEnv.KYSELY]: KyselyUpdateChatValidatorStorageRepo
		};
	}
}
