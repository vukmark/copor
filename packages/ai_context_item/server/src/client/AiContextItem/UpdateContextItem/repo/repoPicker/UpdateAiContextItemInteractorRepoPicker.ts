import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {SaveAiContextItemRepo} from '@copor/ai_context_item/domain/AiContextItem/repository/SaveAiContextItemRepo';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {
	FakeUpdateAiContextItemInteractorRepo
} from '@copor/ai_context_item/client/AiContextItem/UpdateContextItem/repo/fake/FakeUpdateAiContextItemInteractorRepo';
import {
	KyselyUpdateAiContextItemInteractorRepo
} from '@copor/ai_context_item/client/AiContextItem/UpdateContextItem/repo/kysely/KyselyUpdateAiContextItemInteractorRepo';

export class UpdateAiContextItemInteractorRepoPicker
	extends NewRepositoryPicker<SaveAiContextItemRepo> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) => SaveAiContextItemRepo> {
		return {
			[DBEnv.FAKE]: FakeUpdateAiContextItemInteractorRepo,
			[DBEnv.KYSELY]: KyselyUpdateAiContextItemInteractorRepo
		};
	}
}