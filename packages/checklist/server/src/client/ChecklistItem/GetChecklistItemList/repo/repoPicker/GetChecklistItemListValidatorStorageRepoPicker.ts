import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {IsInvalidChecklistRepo} from '@copor/checklist/domain/Checklist/repository/IsInvalidChecklistRepo';
import {ValidateGetChecklistItemListRepo} from '@copor/checklist/domain/ChecklistItem/repository/ValidateGetChecklistItemListRepo';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {
	FakeGetChecklistItemListValidatorStorageRepo
} from '@copor/checklist/client/ChecklistItem/GetChecklistItemList/repo/fake/FakeGetChecklistItemListValidatorStorageRepo';
import {
	KyselyGetChecklistItemListValidatorStorageRepo
} from '@copor/checklist/client/ChecklistItem/GetChecklistItemList/repo/kysely/KyselyGetChecklistItemListValidatorStorageRepo';

export class GetChecklistItemListValidatorStorageRepoPicker extends NewRepositoryPicker<ValidateGetChecklistItemListRepo> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) => IsInvalidChecklistRepo> {
		return {
			[DBEnv.FAKE]: FakeGetChecklistItemListValidatorStorageRepo,
			[DBEnv.KYSELY]: KyselyGetChecklistItemListValidatorStorageRepo
		};
	}
}