import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {GetItem} from '@copor/core/domain/Core/Repository/GetItem';
import {GetAiContextItemDTO} from '@copor/ai_context_item/domain/AiContextItem/interactor/dto/GetAiContextItemDTO';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {
	KyselyGetAiContextItemInteractorRepo
} from '@copor/ai_context_item/client/AiContextItem/GetAiContextItem/kysely/KyselyGetAiContextItemInteractorRepo';
import {
	FakeGetAiContextItemInteractorRepo
} from '@copor/ai_context_item/client/AiContextItem/GetAiContextItem/fake/FakeGetAiContextItemInteractorRepo';

export class GetAiContextItemInteractorRepoPicker
	extends NewRepositoryPicker<GetItem<GetAiContextItemDTO>> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) => GetItem<GetAiContextItemDTO>> {
		return {
			[DBEnv.KYSELY]: KyselyGetAiContextItemInteractorRepo,
			[DBEnv.FAKE]: FakeGetAiContextItemInteractorRepo
		};
	}
}