import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {ListItems} from '@copor/core/domain/Core/Repository/ListItems';
import {GetAiContextItemDTO} from '@copor/ai_context_item/domain/AiContextItem/interactor/dto/GetAiContextItemDTO';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {
	KyselyGetAiContextItemListInteractorRepo
} from '@copor/ai_context_item/client/AiContextItem/GetAiContextItemList/kysely/KyselyGetAiContextItemListInteractorRepo';
import {
	FakeGetAiContextItemListInteractorRepo
} from '@copor/ai_context_item/client/AiContextItem/GetAiContextItemList/fake/FakeGetAiContextItemListInteractorRepo';

export class GetAiContextItemListInteractorRepoPicker
	extends NewRepositoryPicker<ListItems<GetAiContextItemDTO>> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) => ListItems<GetAiContextItemDTO>> {
		return {
			[DBEnv.FAKE]: FakeGetAiContextItemListInteractorRepo,
			[DBEnv.KYSELY]: KyselyGetAiContextItemListInteractorRepo
		};
	}
}