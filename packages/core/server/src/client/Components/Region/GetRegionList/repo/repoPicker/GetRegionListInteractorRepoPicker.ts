import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {FakeGetRegionListInteractorRepo} from '../fake/FakeGetRegionListInteractorRepo';
import {
	KyselyGetRegionListInteractorRepo
} from '@copor/core/client/Components/Region/GetRegionList/repo/kysely/KyselyGetRegionListInteractorRepo';
import {ListItems} from '@copor/core/domain/Core/Repository/ListItems';
import {GetRegionDTO} from '@copor/core/domain/Components/Region/interactor/dto/GetRegionDTO';

export class GetRegionListInteractorRepoPicker extends NewRepositoryPicker<ListItems<GetRegionDTO>> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) => ListItems<GetRegionDTO>> {
		return {
			[DBEnv.FAKE]: FakeGetRegionListInteractorRepo,
			[DBEnv.KYSELY]: KyselyGetRegionListInteractorRepo
		};
	}
}
