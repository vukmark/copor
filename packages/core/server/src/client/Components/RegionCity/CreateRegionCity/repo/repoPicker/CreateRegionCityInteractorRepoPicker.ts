import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {SaveItem} from '@copor/core/domain/Core/Repository/SaveItem';
import {SaveRegionCityDTO} from '@copor/core/domain/Components/RegionCity/interactor/dto/SaveRegionCityDTO';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {
	FakeCreateRegionCityInteractorRepo
} from '@copor/core/client/Components/RegionCity/CreateRegionCity/repo/fake/FakeCreateRegionCityInteractorRepo';
import {
	KyselyCreateRegionCityInteractorRepo
} from '@copor/core/client/Components/RegionCity/CreateRegionCity/repo/kysely/KyselyCreateRegionCityInteractorRepo';

export class CreateRegionCityInteractorRepoPicker extends
	NewRepositoryPicker<SaveItem<SaveRegionCityDTO>> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) => SaveItem<SaveRegionCityDTO>> {
		return {
			[DBEnv.FAKE]: FakeCreateRegionCityInteractorRepo,
			[DBEnv.KYSELY]: KyselyCreateRegionCityInteractorRepo
		};
	}
}