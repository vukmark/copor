import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {ListItems} from '@copor/core/domain/Core/Repository/ListItems';
import {GetRegionCityDTO} from '@copor/core/domain/Components/RegionCity/interactor/dto/GetRegionCityDTO';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {
	KyselyGetRegionCityListInteractorRepo
} from '@copor/core/client/Components/RegionCity/GetRegionCityList/repo/kysely/KyselyGetRegionCityListInteractorRepo';
import {
	FakeGetRegionCityListInteractorRepo
} from '@copor/core/client/Components/RegionCity/GetRegionCityList/repo/fake/FakeGetRegionCityListInteractorRepo';

export class GetRegionCityListInteractorRepoPicker extends
	NewRepositoryPicker<ListItems<GetRegionCityDTO>> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) => ListItems<GetRegionCityDTO>> {
		return {
			[DBEnv.FAKE]: FakeGetRegionCityListInteractorRepo,
			[DBEnv.KYSELY]: KyselyGetRegionCityListInteractorRepo
		};
	}
}