import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {DeleteItem} from '@copor/core/domain/Core/Repository/DeleteItem';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {FakeDeleteRegionInteractorRepo} from '../fake/FakeDeleteRegionInteractorRepo';
import {
	KyselyDeleteRegionInteractorRepo
} from '@copor/core/client/Components/Region/DeleteRegion/repo/kysely/KyselyDeleteRegionInteractorRepo';

export class DeleteRegionInteractorRepoPicker extends NewRepositoryPicker<DeleteItem> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) => DeleteItem> {
		return {
			[DBEnv.FAKE]: FakeDeleteRegionInteractorRepo,
			[DBEnv.KYSELY]: KyselyDeleteRegionInteractorRepo
		};
	}
}
