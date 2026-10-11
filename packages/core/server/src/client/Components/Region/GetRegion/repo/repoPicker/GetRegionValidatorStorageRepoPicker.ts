import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {ValidateGetRegionRepo} from '@copor/core/domain/Components/Region/repository/ValidateGetRegionRepo';
import {IsInvalidRegionRepo} from '@copor/core/domain/Components/Region/repository/IsInvalidRegionRepo';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {FakeGetRegionValidatorStorageRepo} from '../fake/FakeGetRegionValidatorStorageRepo';
import {
	KyselyGetRegionValidatorStorageRepo
} from '@copor/core/client/Components/Region/GetRegion/repo/kysely/KyselyGetRegionValidatorStorageRepo';

export class GetRegionValidatorStorageRepoPicker extends NewRepositoryPicker<ValidateGetRegionRepo> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) => IsInvalidRegionRepo> {
		return {
			[DBEnv.FAKE]: FakeGetRegionValidatorStorageRepo,
			[DBEnv.KYSELY]: KyselyGetRegionValidatorStorageRepo
		};
	}
}
