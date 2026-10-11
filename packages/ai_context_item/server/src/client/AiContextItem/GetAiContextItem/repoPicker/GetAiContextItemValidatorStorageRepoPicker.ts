import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {ValidateGetAiContextItemRepo} from '@copor/ai_context_item/domain/AiContextItem/repository/ValidateGetAiContextItemRepo';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {
	FakeGetAiContextItemValidatorStorageRepo
} from '@copor/ai_context_item/client/AiContextItem/GetAiContextItem/fake/FakeGetAiContextItemValidatorStorageRepo';
import {
	KyselyGetAiContextItemValidatorStorageRepo
} from '@copor/ai_context_item/client/AiContextItem/GetAiContextItem/kysely/KyselyGetAiContextItemValidatorStorageRepo';

export class GetAiContextItemValidatorStorageRepoPicker
	extends NewRepositoryPicker<ValidateGetAiContextItemRepo> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) => ValidateGetAiContextItemRepo> {
		return {
			[DBEnv.KYSELY]: KyselyGetAiContextItemValidatorStorageRepo,
			[DBEnv.FAKE]: FakeGetAiContextItemValidatorStorageRepo
		};
	}
}