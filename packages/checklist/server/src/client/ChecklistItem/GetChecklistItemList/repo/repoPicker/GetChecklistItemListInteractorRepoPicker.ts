import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {FakeGetChecklistItemListInteractorRepo} from '../fake/FakeGetChecklistItemListInteractorRepo';
import {GetChecklistItemListRepo} from '@copor/checklist/domain/ChecklistItem/repository/GetChecklistItemListRepo';
import {
    KyselyGetChecklistItemListInteractorRepo
} from '@copor/checklist/client/ChecklistItem/GetChecklistItemList/repo/kysely/KyselyGetChecklistItemListInteractorRepo';

export class GetChecklistItemListInteractorRepoPicker extends NewRepositoryPicker<GetChecklistItemListRepo> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) => GetChecklistItemListRepo> {
		return {
			[DBEnv.FAKE]: FakeGetChecklistItemListInteractorRepo,
			[DBEnv.KYSELY]: KyselyGetChecklistItemListInteractorRepo
		};
	}
}
