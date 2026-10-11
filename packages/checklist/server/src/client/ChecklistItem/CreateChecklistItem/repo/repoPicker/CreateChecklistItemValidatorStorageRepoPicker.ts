import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {
	FakeCreateChecklistItemValidatorStorageRepo
} from '@copor/checklist/client/ChecklistItem/CreateChecklistItem/repo/fake/FakeCreateChecklistItemValidatorStorageRepo';
import {ValidateCreateChecklistItemRepo} from '@copor/checklist/domain/ChecklistItem/repository/ValidateCreateChecklistItemRepo';
import {
	KyselyCreateChecklistItemValidatorStorageRepo
} from '@copor/checklist/client/ChecklistItem/CreateChecklistItem/repo/kysely/KyselyCreateChecklistItemValidatorStorageRepo';

export class CreateChecklistItemValidatorStorageRepoPicker extends
	NewRepositoryPicker<ValidateCreateChecklistItemRepo> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) => ValidateCreateChecklistItemRepo> {
		return {
			[DBEnv.FAKE]: FakeCreateChecklistItemValidatorStorageRepo,
			[DBEnv.KYSELY]: KyselyCreateChecklistItemValidatorStorageRepo
		};
	}
}
