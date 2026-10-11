import {FakeGetUserValidatorStorageRepo} from '../fake/FakeGetUserValidatorStorageRepo';
import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {IsNotValidUserRepo} from '@copor/core/domain/User/repository/IsNotValidUserRepo';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {ValidateGetUserRepo} from '@copor/core/domain/User/repository/ValidateGetUserRepo';

export class GetUserValidatorStorageRepoPicker extends NewRepositoryPicker<ValidateGetUserRepo> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) => IsNotValidUserRepo> {
		return {
			[DBEnv.KYSELY]: FakeGetUserValidatorStorageRepo,
			[DBEnv.FAKE]: FakeGetUserValidatorStorageRepo
		};
	}
}