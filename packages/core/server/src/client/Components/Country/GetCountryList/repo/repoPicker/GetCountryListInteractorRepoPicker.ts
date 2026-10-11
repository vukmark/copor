import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {ListItems} from '@copor/core/domain/Core/Repository/ListItems';
import {GetCountryDTO} from '@copor/core/domain/Components/Country/interactor/dto/GetCountryDTO';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {FakeGetCountryListInteractorRepo} from '../fake/FakeGetCountryListInteractorRepo';
import {KyselyGetCountryListInteractorRepo}
	from '@copor/core/client/Components/Country/GetCountryList/repo/kysely/KyselyGetCountryListInteractorRepo';

export class GetCountryListInteractorRepoPicker extends NewRepositoryPicker<ListItems<GetCountryDTO>> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) => ListItems<GetCountryDTO>> {
		return {
			[DBEnv.FAKE]: FakeGetCountryListInteractorRepo,
			[DBEnv.KYSELY]: KyselyGetCountryListInteractorRepo
		};
	}
}
