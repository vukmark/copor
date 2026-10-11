import {GetUserIdByCredentialsRepo} from '@copor/core/domain/Login/repository/GetUserIdByCredentialsRepo';
import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {FakeLoginRepository} from '@copor/core/client/Login/Login/repo/fake/FakeLoginRepository';
import {KyselyGetUserIdByCredentialsRepo} from '@copor/core/client/Login/Login/repo/kysely/KyselyLoginRepo';

export class LoginStorageRepoPicker extends NewRepositoryPicker<GetUserIdByCredentialsRepo> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) => GetUserIdByCredentialsRepo> {
		return {
			[DBEnv.FAKE]: FakeLoginRepository,
			[DBEnv.KYSELY]: KyselyGetUserIdByCredentialsRepo
		};
	}
}
