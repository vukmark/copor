import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {FakeGetAllToDosForUserInteractorRepo} from '../fake/FakeGetAllToDosForUserInteractorRepo';
import {GetAllToDosForUserRepo} from '@copor/todo/domain/ToDo/Core/repository/GetAllToDosForUserRepo';
import {
	KyselyGetAllToDosForUserInteractorRepo
} from '@copor/todo/client/ToDo/GetAllToDosForUser/repo/kysely/KyselyGetAllToDosForUserInteractorRepo';

export class GetAllToDosForUserInteractorRepoPicker extends NewRepositoryPicker<GetAllToDosForUserRepo> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) => GetAllToDosForUserRepo> {
		return {
			[DBEnv.FAKE]: FakeGetAllToDosForUserInteractorRepo,
			[DBEnv.KYSELY]: KyselyGetAllToDosForUserInteractorRepo
		};
	}
}
