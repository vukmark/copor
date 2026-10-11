import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {ListItems} from '@copor/core/domain/Core/Repository/ListItems';
import {GetContentItemDTO} from '@copor/core/domain/ContentItem/interactor/dto/GetContentItemDTO';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {
	FakeGetContentItemListInteractorRepo
} from '@copor/core/client/ContentItem/GetContentItemList/fake/FakeGetContentItemListInteractorRepo';
import {
	KyselyGetContentItemListInteractorRepo
} from '@copor/core/client/ContentItem/GetContentItemList/kysely/KyselyGetContentItemListInteractorRepo';

export class GetContentItemListInteractorRepoPicker
	extends NewRepositoryPicker<ListItems<GetContentItemDTO>> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) => ListItems<GetContentItemDTO>> {
		return {
			[DBEnv.FAKE]: FakeGetContentItemListInteractorRepo,
			[DBEnv.KYSELY]: KyselyGetContentItemListInteractorRepo
		};
	}
}