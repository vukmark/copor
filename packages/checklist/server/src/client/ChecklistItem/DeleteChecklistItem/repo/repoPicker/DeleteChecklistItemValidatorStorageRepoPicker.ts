import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {
	FakeDeleteChecklistItemValidatorStorageRepo
} from '@copor/checklist/client/ChecklistItem/DeleteChecklistItem/repo/fake/FakeDeleteChecklistItemValidatorStorageRepo';
import {ValidateDeleteChecklistItemRepo} from '@copor/checklist/domain/ChecklistItem/repository/ValidateDeleteChecklistItemRepo';
import {
	KyselyDeleteChecklistItemValidatorStorageRepo
} from '@copor/checklist/client/ChecklistItem/DeleteChecklistItem/repo/kysely/KyselyDeleteChecklistItemValidatorStorageRepo';


export class DeleteChecklistItemValidatorStorageRepoPicker extends
	NewRepositoryPicker<ValidateDeleteChecklistItemRepo> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) => ValidateDeleteChecklistItemRepo> {
		return {
			[DBEnv.FAKE]: FakeDeleteChecklistItemValidatorStorageRepo,
			[DBEnv.KYSELY]: KyselyDeleteChecklistItemValidatorStorageRepo
		};
	}
}
