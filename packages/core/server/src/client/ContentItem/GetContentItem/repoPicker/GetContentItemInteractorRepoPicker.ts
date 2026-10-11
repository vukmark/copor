import {GetContentItemDTO} from '@copor/core/domain/ContentItem/interactor/dto/GetContentItemDTO';
import {GetItem} from '@copor/core/domain/Core/Repository/GetItem';
import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {
	KyselyGetContentItemInteractorRepo
} from '@copor/core/client/ContentItem/GetContentItem/kysely/KyselyGetContentItemInteractorRepo';
import {
	FakeGetContentItemInteractorRepo
} from '@copor/core/client/ContentItem/GetContentItem/fake/FakeGetContentItemInteractorRepo';

export class GetContentItemInteractorRepoPicker
	extends NewRepositoryPicker<GetItem<GetContentItemDTO>> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) => GetItem<GetContentItemDTO>> {
		return {
			[DBEnv.KYSELY]: KyselyGetContentItemInteractorRepo,
			[DBEnv.FAKE]: FakeGetContentItemInteractorRepo
		};
	}
}