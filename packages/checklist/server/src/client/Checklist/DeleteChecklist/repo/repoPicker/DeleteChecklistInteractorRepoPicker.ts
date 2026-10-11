import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {DeleteItem} from '@copor/core/domain/Core/Repository/DeleteItem';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {
    FakeDeleteChecklistInteractorRepo
} from '@copor/checklist/client/Checklist/DeleteChecklist/repo/fake/FakeDeleteChecklistInteractorRepo';
import {
    KyselyDeleteChecklistInteractorRepo
} from '@copor/checklist/client/Checklist/DeleteChecklist/repo/kysely/KyselyDeleteChecklistInteractorRepo';

export class DeleteChecklistInteractorRepoPicker extends NewRepositoryPicker<DeleteItem> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) => DeleteItem> {
		return {
			[DBEnv.FAKE]: FakeDeleteChecklistInteractorRepo,
			[DBEnv.KYSELY]: KyselyDeleteChecklistInteractorRepo
		};
	}
}
