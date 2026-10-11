import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {GetItem} from '@copor/core/domain/Core/Repository/GetItem';
import {GetRegionDTO} from '@copor/core/domain/Components/Region/interactor/dto/GetRegionDTO';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {FakeGetRegionInteractorRepo} from '../fake/FakeGetRegionInteractorRepo';
import {
	KyselyGetRegionInteractorRepo
} from '@copor/core/client/Components/Region/GetRegion/repo/kysely/KyselyGetRegionInteractorRepo';

export class GetRegionInteractorRepoPicker extends NewRepositoryPicker<GetItem<GetRegionDTO>> {
	protected getRepositoryList(): Record<string, new () => GetItem<GetRegionDTO>> {
		return {
			[DBEnv.FAKE]: FakeGetRegionInteractorRepo,
			[DBEnv.KYSELY]: KyselyGetRegionInteractorRepo
		};
	}
}
