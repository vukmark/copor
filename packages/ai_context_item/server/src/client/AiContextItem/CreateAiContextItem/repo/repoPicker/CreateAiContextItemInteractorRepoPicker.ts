import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {SaveItem} from '@copor/core/domain/Core/Repository/SaveItem';
import {SaveAiContextItemDTO} from '@copor/ai_context_item/domain/AiContextItem/interactor/dto/SaveAiContextItemDTO';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {
	FakeCreateAiContextItemInteractorRepo
} from '@copor/ai_context_item/client/AiContextItem/CreateAiContextItem/repo/fake/FakeCreateAiContextItemInteractorRepo';
import {
	KyselyCreateAiContextItemInteractorRepo
} from '@copor/ai_context_item/client/AiContextItem/CreateAiContextItem/repo/kysely/KyselyCreateAiContextItemInteractorRepo';

export class CreateAiContextItemInteractorRepoPicker
	extends NewRepositoryPicker<SaveItem<SaveAiContextItemDTO>> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) => SaveItem<SaveAiContextItemDTO>> {
		return {
			[DBEnv.FAKE]: FakeCreateAiContextItemInteractorRepo,
			[DBEnv.KYSELY]: KyselyCreateAiContextItemInteractorRepo
		};
	}
}