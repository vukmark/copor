import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {FakeGetUserContactInformationValidatorStorageRepo}
	from '../fake/FakeGetUserContactInformationValidatorStorageRepo';
import {IsNotValidUserRepo} from '@copor/core/domain/User/repository/IsNotValidUserRepo';

export class GetUserContactInformationValidatorStorageRepoPicker
	extends NewRepositoryPicker<IsNotValidUserRepo> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) => IsNotValidUserRepo> {
		return {
			[DBEnv.KYSELY]: FakeGetUserContactInformationValidatorStorageRepo,
			[DBEnv.FAKE]: FakeGetUserContactInformationValidatorStorageRepo
		};
	}
}
