import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {ListItems} from '@copor/core/domain/Core/Repository/ListItems';
import {GetLanguageDTO} from '@copor/core/domain/Components/Language/interactor/dto/GetLanguageDTO';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {FakeGetLanguageListInteractorRepo} from '../fake/FakeGetLanguageListInteractorRepo';
import {
	KyselyGetLanguageListInteractorRepo
} from '@copor/core/client/Components/Language/GetLanguageList/repo/kysely/KyselyGetLanguageListInteractorRepo';

export class GetLanguageListInteractorRepoPicker extends NewRepositoryPicker<ListItems<GetLanguageDTO>> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) => ListItems<GetLanguageDTO>> {
		return {
			[DBEnv.FAKE]: FakeGetLanguageListInteractorRepo,
			[DBEnv.KYSELY]: KyselyGetLanguageListInteractorRepo
		};
	}
}
