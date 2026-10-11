import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {ValidateCreateAiContextItemRepo} from '@copor/ai_context_item/domain/AiContextItem/repository/ValidateCreateAiContextItemRepo';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {
	FakeCreateAiContextItemValidatorStorageRepo
} from '@copor/ai_context_item/client/AiContextItem/CreateAiContextItem/repo/fake/FakeCreateAiContextItemValidatorStorageRepo';
import {
	KyselyCreateAiContextItemValidatorStorageRepo
} from '@copor/ai_context_item/client/AiContextItem/CreateAiContextItem/repo/kysely/KyselyCreateAiContextItemValidatorStorageRepo';

export class CreateAiContextItemValidatorStorageRepoPicker
	extends NewRepositoryPicker<ValidateCreateAiContextItemRepo> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) => ValidateCreateAiContextItemRepo> {
		return {
			[DBEnv.FAKE]: FakeCreateAiContextItemValidatorStorageRepo,
			[DBEnv.KYSELY]: KyselyCreateAiContextItemValidatorStorageRepo
		};
	}
}