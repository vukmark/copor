import {ValidateDeleteAiContextItemRepo} from '@copor/ai_context_item/domain/AiContextItem/repository/ValidateDeleteAiContextItemRepo';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {
	FakeDeleteAiContextItemValidatorStorageRepo
} from '@copor/ai_context_item/client/AiContextItem/DeleteAiContextItem/repo/fake/FakeDeleteAiContextItemValidatorStorageRepo';
import {
	KyselyDeleteAiContextItemValidatorStorageRepo
} from '@copor/ai_context_item/client/AiContextItem/DeleteAiContextItem/repo/kysely/KyselyDeleteAiContextItemValidatorStorageRepo';

export class DeleteAiContextItemValidatorStorageRepoPicker extends
	NewRepositoryPicker<ValidateDeleteAiContextItemRepo> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) => ValidateDeleteAiContextItemRepo> {
		return {
			[DBEnv.FAKE]: FakeDeleteAiContextItemValidatorStorageRepo,
			[DBEnv.KYSELY]: KyselyDeleteAiContextItemValidatorStorageRepo
		};
	}
}