import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {FakeGetLogValidatorStorageRepo} from '../fake/FakeGetLogValidatorStorageRepo';
import {ValidateGetLogRepo} from '@copor/core/domain/Log/repository/ValidateGetLogRepo';
import {IsInvalidLogRepo} from '@copor/core/domain/Log/repository/IsInvalidLogRepo';
import {KyselyGetLogValidatorStorageRepo} from '@copor/core/client/Log/GetLog/repo/kysely/KyselyGetLogValidatorStorageRepo';

export class GetLogValidatorStorageRepoPicker extends NewRepositoryPicker<ValidateGetLogRepo> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) => IsInvalidLogRepo> {
		return {
			[DBEnv.FAKE]: FakeGetLogValidatorStorageRepo,
			[DBEnv.KYSELY]: KyselyGetLogValidatorStorageRepo
		};
	}
}
