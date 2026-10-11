import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {DeleteItem} from '@copor/core/domain/Core/Repository/DeleteItem';
import {Record} from 'openai/core';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {
	FakeDeleteRegionCityInteractorRepo
} from '@copor/core/client/Components/RegionCity/DeleteRegionCity/repo/fake/FakeDeleteRegionCityInteractorRepo';
import {
	KyselyDeleteRegionCityInteractorRepo
} from '@copor/core/client/Components/RegionCity/DeleteRegionCity/repo/kysely/KyselyDeleteRegionCityInteractorRepo';

export class DeleteRegionCityInteractorRepoPicker extends NewRepositoryPicker<DeleteItem> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) => DeleteItem> {
		return {
			[DBEnv.FAKE]: FakeDeleteRegionCityInteractorRepo,
			[DBEnv.KYSELY]: KyselyDeleteRegionCityInteractorRepo
		};
	}
}