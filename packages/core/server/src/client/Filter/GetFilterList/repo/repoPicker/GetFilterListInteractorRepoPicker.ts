import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {GetFilterListRepo} from '@copor/core/domain/Core/global/Filter/repository/GetFilterListRepo';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {FakeGetFilterListInteractorRepo} from '@copor/core/client/Filter/GetFilterList/repo/fake/FakeGetFilterListInteractorRepo';
import {
	KyselyGetFilterListInteractorRepo
} from '@copor/core/client/Filter/GetFilterList/repo/kysely/KyselyGetFilterListInteractorRepo';

export class GetFilterListInteractorRepoPicker extends NewRepositoryPicker<GetFilterListRepo> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) => GetFilterListRepo> {
		return {
			[DBEnv.FAKE]: FakeGetFilterListInteractorRepo,
			[DBEnv.KYSELY]: KyselyGetFilterListInteractorRepo
		};
	}
}