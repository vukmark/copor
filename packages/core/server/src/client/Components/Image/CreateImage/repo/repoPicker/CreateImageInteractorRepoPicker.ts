import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {SaveItem} from '@copor/core/domain/Core/Repository/SaveItem';
import {SaveImageDTO} from '@copor/core/domain/Components/Image/interactor/dto/SaveImageDTO';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {FakeCreateImageInteractorRepo} from '../fake/FakeCreateImageInteractorRepo';
import {
	KyselyCreateImageInteractorRepo
} from '@copor/core/client/Components/Image/CreateImage/repo/kysely/KyselyCreateImageInteractorRepo';

export class CreateImageInteractorRepoPicker extends NewRepositoryPicker<SaveItem<SaveImageDTO>> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) => SaveItem<SaveImageDTO>> {
		return {
			[DBEnv.FAKE]: FakeCreateImageInteractorRepo,
			[DBEnv.KYSELY]: KyselyCreateImageInteractorRepo
		};
	}
}
