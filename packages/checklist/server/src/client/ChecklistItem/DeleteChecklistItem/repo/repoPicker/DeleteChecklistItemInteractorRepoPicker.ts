import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {DeleteItem} from '@copor/core/domain/Core/Repository/DeleteItem';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {
    FakeDeleteChecklistItemInteractorRepo
} from '@copor/checklist/client/ChecklistItem/DeleteChecklistItem/repo/fake/FakeDeleteChecklistItemInteractorRepo';
import {
    KyselyDeleteChecklistItemInteractorRepo
} from '@copor/checklist/client/ChecklistItem/DeleteChecklistItem/repo/kysely/KyselyDeleteChecklistItemInteractorRepo';

export class DeleteChecklistItemInteractorRepoPicker extends NewRepositoryPicker<DeleteItem> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) => DeleteItem> {
		return {
			[DBEnv.FAKE]: FakeDeleteChecklistItemInteractorRepo,
			[DBEnv.KYSELY]: KyselyDeleteChecklistItemInteractorRepo
		};
	}
}
