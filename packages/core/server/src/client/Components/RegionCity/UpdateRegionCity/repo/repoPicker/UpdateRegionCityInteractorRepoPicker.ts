import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {SaveRegionCityRepo} from '@copor/core/domain/Components/RegionCity/repository/SaveRegionCityRepo';
import {Record} from 'openai/core';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {
	FakeUpdateRegionCityInteractorRepo
} from '@copor/core/client/Components/RegionCity/UpdateRegionCity/repo/fake/FakeUpdateRegionCityInteractorRepo';
import {
	KyselyUpdateRegionCityInteractorRepo
} from '@copor/core/client/Components/RegionCity/UpdateRegionCity/repo/kysely/KyselyUpdateRegionCityInteractorRepo';

export class UpdateRegionCityInteractorRepoPicker extends NewRepositoryPicker<SaveRegionCityRepo> {
	protected getRepositoryList(): Record<string, new(appContext: AppContext) => SaveRegionCityRepo > {
		return {
			[DBEnv.FAKE]: FakeUpdateRegionCityInteractorRepo,
			[DBEnv.KYSELY]: KyselyUpdateRegionCityInteractorRepo
		};
	}
}