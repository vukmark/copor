import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {DeleteItem} from '@copor/core/domain/Core/Repository/DeleteItem';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {
	FakeDeleteAiContextItemInteractorRepo
} from '@copor/ai_context_item/client/AiContextItem/DeleteAiContextItem/repo/fake/FakeDeleteAiContextItemInteractorRepo';
import {
	KyselyDeleteAiContextItemInteractorRepo
} from '@copor/ai_context_item/client/AiContextItem/DeleteAiContextItem/repo/kysely/KyselyDeleteAiContextItemInteractorRepo';
import {DBEnv} from '@copor/core/client/enum/DBEnv';

export class DeleteAiContextItemInteractorRepoPicker
	extends NewRepositoryPicker<DeleteItem> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) => DeleteItem> {
		return {
			[DBEnv.FAKE]: FakeDeleteAiContextItemInteractorRepo,
			[DBEnv.KYSELY]: KyselyDeleteAiContextItemInteractorRepo
		};
	}
}