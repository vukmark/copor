import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {GetItem} from '@copor/core/domain/Core/Repository/GetItem';
import {GetRegionCityDTO} from '@copor/core/domain/Components/RegionCity/interactor/dto/GetRegionCityDTO';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {
	FakeGetRegionCityInteractorRepo
} from '@copor/core/client/Components/RegionCity/GetRegionCity/repo/fake/FakeGetRegionCityInteractorRepo';
import {
	KyselyGetRegionCityInteractorRepo
} from '@copor/core/client/Components/RegionCity/GetRegionCity/repo/kysely/KyselyGetRegionCityInteractorRepo';

export class GetRegionCityInteractorRepoPicker extends NewRepositoryPicker<GetItem<GetRegionCityDTO>> {
	protected getRepositoryList(): Record<string, new () => GetItem<GetRegionCityDTO>> {
		return {
			[DBEnv.FAKE]: FakeGetRegionCityInteractorRepo,
			[DBEnv.KYSELY]: KyselyGetRegionCityInteractorRepo
		};
	}
}