import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {ListItems} from '@copor/core/domain/Core/Repository/ListItems';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {FakeGetPublicTagListInteractorRepo} from '../fake/FakeGetPublicTagListInteractorRepo';
import {GetTagDTO} from '@copor/core/domain/Components/Tag/interactor/dto/GetTagDTO';
import {
	KyselyGetPublicTagListInteractorRepo
} from '@copor/core/client/Components/Tag/GetPublicTagList/repo/kysely/KyselyGetPublicTagListInteractorRepo';

export class GetPublicTagListInteractorRepoPicker extends NewRepositoryPicker<ListItems<GetTagDTO>> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) => ListItems<GetTagDTO>> {
		return {
			[DBEnv.FAKE]: FakeGetPublicTagListInteractorRepo,
			[DBEnv.KYSELY]: KyselyGetPublicTagListInteractorRepo
		};
	}
}
