import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {ValidateUpdateAiContextItemRepo} from '@copor/ai_context_item/domain/AiContextItem/repository/ValidateUpdateAiContextItemRepo';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {
	FakeUpdateAiContextItemValidatorStorageRepo
} from '@copor/ai_context_item/client/AiContextItem/UpdateContextItem/repo/fake/FakeUpdateAiContextItemValidatorStorageRepo';
import {
	KyselyUpdateAiContextItemValidatorStorageRepo
} from '@copor/ai_context_item/client/AiContextItem/UpdateContextItem/repo/kysely/KyselyUpdateAiContextItemValidatorStorageRepo';

export class UpdateAiContextItemValidatorStorageRepoPicker extends
	NewRepositoryPicker<ValidateUpdateAiContextItemRepo> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) => ValidateUpdateAiContextItemRepo> {
		return {
			[DBEnv.FAKE]: FakeUpdateAiContextItemValidatorStorageRepo,
			[DBEnv.KYSELY]: KyselyUpdateAiContextItemValidatorStorageRepo
		};
	}
}