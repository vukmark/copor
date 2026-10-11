import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {ValidateGetImageRepo} from '@copor/core/domain/Components/Image/repository/ValidateGetImageRepo';
import {IsInvalidImageRepo} from '@copor/core/domain/Components/Image/repository/IsInvalidImageRepo';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {FakeGetImageValidatorStorageRepo} from '../fake/FakeGetImageValidatorStorageRepo';
import {KyselyGetImageValidatorStorageRepo} from '@copor/core/client/Components/Image/GetImage/repo/kysely/KyselyGetImageValidatorStorageRepo';

export class GetImageValidatorStorageRepoPicker extends NewRepositoryPicker<ValidateGetImageRepo> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) => IsInvalidImageRepo> {
		return {
			[DBEnv.FAKE]: FakeGetImageValidatorStorageRepo,
			[DBEnv.KYSELY]: KyselyGetImageValidatorStorageRepo
		};
	}
}
