import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {FakeUpdateChecklistItemInteractorRepo} from '../fake/FakeUpdateChecklistItemInteractorRepo';
import {SaveChecklistItemRepo} from '@copor/checklist/domain/ChecklistItem/repository/SaveChecklistItemRepo';
import {
    KyselyUpdateChecklistItemInteractorRepo
} from '@copor/checklist/client/ChecklistItem/UpdateChecklistItem/repo/kysely/KyselyUpdateChecklistItemInteractorRepo';

export class UpdateChecklistItemInteractorRepoPicker extends NewRepositoryPicker<SaveChecklistItemRepo> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) => SaveChecklistItemRepo> {
		return {
			[DBEnv.FAKE]: FakeUpdateChecklistItemInteractorRepo,
			[DBEnv.KYSELY]: KyselyUpdateChecklistItemInteractorRepo
		};
	}
}
