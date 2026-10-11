import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {FakeUpdateChecklistItemValidatorStorageRepo} from '../fake/FakeUpdateChecklistItemValidatorStorageRepo';
import {ValidateUpdateChecklistItemRepo} from '@copor/checklist/domain/ChecklistItem/repository/ValidateUpdateChecklistItemRepo';
import {KyselyUpdateChecklistItemValidatorStorageRepo}
	from '@copor/checklist/client/ChecklistItem/UpdateChecklistItem/repo/kysely/KyselyUpdateChecklistItemValidatorStorageRepo';

export class UpdateChecklistItemValidatorStorageRepoPicker extends NewRepositoryPicker<ValidateUpdateChecklistItemRepo> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) => ValidateUpdateChecklistItemRepo> {
		return {
			[DBEnv.FAKE]: FakeUpdateChecklistItemValidatorStorageRepo,
			[DBEnv.KYSELY]: KyselyUpdateChecklistItemValidatorStorageRepo
		};
	}
}
