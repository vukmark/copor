import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {SaveItem} from '@copor/core/domain/Core/Repository/SaveItem';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {
    FakeCreateChecklistItemInteractorRepo
} from '@copor/checklist/client/ChecklistItem/CreateChecklistItem/repo/fake/FakeCreateChecklistItemInteractorRepo';
import {SaveChecklistItemDTO} from '@copor/checklist/domain/Checklist/interactor/dto/SaveChecklistItemDTO';
import {
    KyselyCreateChecklistItemInteractorRepo
} from '@copor/checklist/client/ChecklistItem/CreateChecklistItem/repo/kysely/KyselyCreateChecklistItemInteractorRepo';

export class CreateChecklistItemInteractorRepoPicker extends NewRepositoryPicker<SaveItem<SaveChecklistItemDTO>> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) => SaveItem<SaveChecklistItemDTO>> {
		return {
			[DBEnv.FAKE]: FakeCreateChecklistItemInteractorRepo,
			[DBEnv.KYSELY]: KyselyCreateChecklistItemInteractorRepo
		};
	}
}
