import {NewRepositoryPicker} from '../../../../Core/RepositoryPicker';
import {DBEnv} from '../../../../enum/DBEnv';
import {FakeGetUserFullNameInteractorRepo} from '../fake/FakeGetUserFullNameInteractorRepo';
import {AppContext} from '../../../../Interface/AppContext';
import {GetUserFullNameRepo} from '@copor/core/domain/User/repository/GetUserFullNameRepo';
import {
	KyselyGetUserFullNameInteractorRepo
} from '@copor/core/client/User/GetUserFullName/repo/kysely/KyselyGetUserFullNameInteractorRepo';

export class GetUserFullNameInteractorRepoPicker extends NewRepositoryPicker<GetUserFullNameRepo> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) => GetUserFullNameRepo> {
		return {
			[DBEnv.KYSELY]: KyselyGetUserFullNameInteractorRepo,
			[DBEnv.FAKE]: FakeGetUserFullNameInteractorRepo
		};
	}
}
