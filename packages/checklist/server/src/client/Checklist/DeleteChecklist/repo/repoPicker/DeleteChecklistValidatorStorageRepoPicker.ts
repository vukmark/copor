import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {FakeDeleteChecklistValidatorStorageRepo}
	from '@copor/checklist/client/Checklist/DeleteChecklist/repo/fake/FakeDeleteChecklistValidatorStorageRepo';
import {ValidateDeleteChecklistRepo} from '@copor/checklist/domain/Checklist/repository/ValidateDeleteChecklistRepo';
import {KyselyDeleteChecklistValidatorStorageRepo}
	from '@copor/checklist/client/Checklist/DeleteChecklist/repo/kysely/KyselyDeleteChecklistValidatorStorageRepo';

export class DeleteChecklistValidatorStorageRepoPicker extends
	NewRepositoryPicker<ValidateDeleteChecklistRepo> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) => ValidateDeleteChecklistRepo> {
		return {
			[DBEnv.FAKE]: FakeDeleteChecklistValidatorStorageRepo,
			[DBEnv.KYSELY]: KyselyDeleteChecklistValidatorStorageRepo
		};
	}
}
