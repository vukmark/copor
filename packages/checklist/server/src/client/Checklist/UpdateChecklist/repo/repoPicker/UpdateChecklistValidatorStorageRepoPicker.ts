import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {
	ValidateUpdateChecklistRepo
} from '@copor/checklist/domain/Checklist/repository/ValidateUpdateChecklistRepo';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {FakeUpdateChecklistValidatorStorageRepo} from '../fake/FakeUpdateChecklistValidatorStorageRepo';
import {
	KyselyUpdateChecklistValidatorStorageRepo
} from '@copor/checklist/client/Checklist/UpdateChecklist/repo/kysely/KyselyUpdateChecklistValidatorStorageRepo';

export class UpdateChecklistValidatorStorageRepoPicker extends NewRepositoryPicker<ValidateUpdateChecklistRepo> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) => ValidateUpdateChecklistRepo> {
		return {
			[DBEnv.FAKE]: FakeUpdateChecklistValidatorStorageRepo,
			[DBEnv.KYSELY]: KyselyUpdateChecklistValidatorStorageRepo
		};
	}
}
