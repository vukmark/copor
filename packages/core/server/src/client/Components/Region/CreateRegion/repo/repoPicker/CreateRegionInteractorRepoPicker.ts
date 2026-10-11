import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {SaveItem} from '@copor/core/domain/Core/Repository/SaveItem';
import {SaveRegionDTO} from '@copor/core/domain/Components/Region/interactor/dto/SaveRegionDTO';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {FakeCreateRegionInteractorRepo} from '../fake/FakeCreateRegionInteractorRepo';
import {
    KyselyCreateRegionInteractorRepo
} from '@copor/core/client/Components/Region/CreateRegion/repo/kysely/KyselyCreateRegionInteractorRepo';

export class CreateRegionInteractorRepoPicker extends NewRepositoryPicker<SaveItem<SaveRegionDTO>> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) => SaveItem<SaveRegionDTO>> {
		return {
			[DBEnv.FAKE]: FakeCreateRegionInteractorRepo,
			[DBEnv.KYSELY]: KyselyCreateRegionInteractorRepo
		};
	}
}
