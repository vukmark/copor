import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {GetItem} from '@copor/core/domain/Core/Repository/GetItem';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {FakeGetCountryInteractorRepo} from '../fake/FakeGetCountryInteractorRepo';
import {
	KyselyGetCountryInteractorRepo
} from '@copor/core/client/Components/Country/GetCountry/repo/kysely/KyselyGetCountryInteractorRepo';
import {GetCountryWithStateListDTO} from '@copor/core/domain/Components/Country/interactor/dto/GetCountryWithStateListDTO';

export class GetCountryInteractorRepoPicker extends NewRepositoryPicker<GetItem<GetCountryWithStateListDTO>> {
	protected getRepositoryList(): Record<string, new () => GetItem<GetCountryWithStateListDTO>> {
		return {
			[DBEnv.FAKE]: FakeGetCountryInteractorRepo,
			[DBEnv.KYSELY]: KyselyGetCountryInteractorRepo
		};
	}
}
