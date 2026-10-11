import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {GetItem} from '@copor/core/domain/Core/Repository/GetItem';
import {GetFeatureListDTO} from '@copor/core/domain/FeatureList/interactor/dto/GetFeatureListDTO';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {FakeGetFeatureListInteractorRepo} from '../fake/FakeGetFeatureListInteractorRepo';
import {
    KyselyGetFeatureListInteractorRepo
} from '@copor/core/client/FeatureList/GetFeatureList/repo/kysely/KyselyGetFeatureListInteractorRepo';

export class GetFeatureListInteractorRepoPicker extends NewRepositoryPicker<GetItem<GetFeatureListDTO>> {
	protected getRepositoryList(): Record<string, new () => GetItem<GetFeatureListDTO>> {
		return {
			[DBEnv.FAKE]: FakeGetFeatureListInteractorRepo,
			[DBEnv.KYSELY]: KyselyGetFeatureListInteractorRepo
		};
	}
}
