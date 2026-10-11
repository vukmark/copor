import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {FakeListVisibleUsersRepo} from '../fake/FakeListVisibleUsersRepo';
import {KyselyListVisibleUsersRepo} from '../kysely/KyselyListVisibleUsersRepo';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {ListVisibleUsersRepo} from '@copor/core/domain/User/VisibleUsers/repository/ListVisibleUsersRepo';

export class ListVisibleUsersRepoPicker extends NewRepositoryPicker<ListVisibleUsersRepo> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) => ListVisibleUsersRepo> {
		return {
			[DBEnv.FAKE]: FakeListVisibleUsersRepo,
			[DBEnv.KYSELY]: KyselyListVisibleUsersRepo
		};
	}
}
