import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {GetItem} from '@copor/core/domain/Core/Repository/GetItem';
import {GetImageDTO} from '@copor/core/domain/Components/Image/interactor/dto/GetImageDTO';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {FakeGetImageInteractorRepo} from '../fake/FakeGetImageInteractorRepo';
import {
	KyselyGetImageInteractorRepo
} from '@copor/core/client/Components/Image/GetImage/repo/kysely/KyselyGetImageInteractorRepo';

export class GetImageInteractorRepoPicker extends NewRepositoryPicker<GetItem<GetImageDTO>> {
	protected getRepositoryList(): Record<string, new () => GetItem<GetImageDTO>> {
		return {
			[DBEnv.FAKE]: FakeGetImageInteractorRepo,
			[DBEnv.KYSELY]: KyselyGetImageInteractorRepo
		};
	}
}
