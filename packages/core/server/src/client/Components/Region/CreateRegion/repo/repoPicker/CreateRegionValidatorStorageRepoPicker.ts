import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {ValidateCreateRegionRepo} from '@copor/core/domain/Components/Region/repository/ValidateCreateRegionRepo';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {FakeCreateRegionValidatorStorageRepo} from '../fake/FakeCreateRegionValidatorStorageRepo';
import {
	KyselyCreateRegionValidatorStorageRepo
} from '@copor/core/client/Components/Region/CreateRegion/repo/kysely/KyselyCreateRegionValidatorStorageRepo';

export class CreateRegionValidatorStorageRepoPicker
	extends NewRepositoryPicker<ValidateCreateRegionRepo> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext)
	=> ValidateCreateRegionRepo> {
		return {
			[DBEnv.FAKE]: FakeCreateRegionValidatorStorageRepo,
			[DBEnv.KYSELY]: KyselyCreateRegionValidatorStorageRepo
		};
	}
}
