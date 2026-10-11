import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {GetItem} from '@copor/core/domain/Core/Repository/GetItem';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {FakeGetDefaultCountryInteractorRepo} from '../fake/FakeGetDefaultCountryInteractorRepo';
import {GetCountryDTO} from '@copor/core/domain/Components/Country/interactor/dto/GetCountryDTO';
import {KyselyGetDefaultCountryInteractorRepo}
	from '@copor/core/client/Components/Country/GetDefaultCountry/repo/kysely/KyselyGetDefaultCountryInteractorRepo';

export class GetDefaultCountryInteractorRepoPicker extends NewRepositoryPicker<GetItem<GetCountryDTO[]>> {
	protected getRepositoryList(): Record<string, new () => GetItem<GetCountryDTO[]>> {
		return {
			[DBEnv.FAKE]: FakeGetDefaultCountryInteractorRepo,
			[DBEnv.KYSELY]: KyselyGetDefaultCountryInteractorRepo
		};
	}
}
