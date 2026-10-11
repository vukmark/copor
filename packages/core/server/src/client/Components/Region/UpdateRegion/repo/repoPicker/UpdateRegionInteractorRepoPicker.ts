import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {SaveRegionRepo} from '@copor/core/domain/Components/Region/repository/SaveRegionRepo';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {FakeUpdateRegionInteractorRepo} from '../fake/FakeUpdateRegionInteractorRepo';
import {
	KyselyUpdateRegionInteractorRepo
} from '@copor/core/client/Components/Region/UpdateRegion/repo/kysely/KyselyUpdateRegionInteractorRepo';

export class UpdateRegionInteractorRepoPicker extends NewRepositoryPicker<SaveRegionRepo> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) => SaveRegionRepo> {
		return {
			[DBEnv.FAKE]: FakeUpdateRegionInteractorRepo,
			[DBEnv.KYSELY]: KyselyUpdateRegionInteractorRepo
		};
	}
}
