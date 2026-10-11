import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {ValidateGetChecklistRepo} from '@copor/checklist/domain/Checklist/repository/ValidateGetChecklistRepo';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {FakeGetChecklistValidatorStorageRepo} from '../fake/FakeGetChecklistValidatorStorageRepo';
import {IsInvalidChecklistRepo} from '@copor/checklist/domain/Checklist/repository/IsInvalidChecklistRepo';
import {
	KyselyGetChecklistValidatorStorageRepo
} from '@copor/checklist/client/Checklist/GetChecklist/repo/kysely/KyselyGetChecklistValidatorStorageRepo';

export class GetChecklistValidatorStorageRepoPicker extends NewRepositoryPicker<ValidateGetChecklistRepo> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) => IsInvalidChecklistRepo> {
		return {
			[DBEnv.KYSELY]: KyselyGetChecklistValidatorStorageRepo,
			[DBEnv.FAKE]: FakeGetChecklistValidatorStorageRepo
		};
	}
}
