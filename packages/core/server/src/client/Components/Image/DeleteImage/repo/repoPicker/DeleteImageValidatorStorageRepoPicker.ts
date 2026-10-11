import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {
	ValidateDeleteImageRepo
} from '@copor/core/domain/Components/Image/repository/ValidateDeleteImageRepo';
import {IsInvalidImageRepo} from '@copor/core/domain/Components/Image/repository/IsInvalidImageRepo';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {FakeDeleteImageValidatorStorageRepo} from '../fake/FakeDeleteImageValidatorStorageRepo';
import {KyselyDeleteImageValidatorStorageRepo}
	from '@copor/core/client/Components/Image/DeleteImage/repo/kysely/KyselyDeleteImageValidatorStorageRepo';

export class DeleteImageValidatorStorageRepoPicker extends NewRepositoryPicker<ValidateDeleteImageRepo> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) => IsInvalidImageRepo> {
		return {
			[DBEnv.FAKE]: FakeDeleteImageValidatorStorageRepo,
			[DBEnv.KYSELY]: KyselyDeleteImageValidatorStorageRepo
		};
	}
}