import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {SaveItem} from '@copor/core/domain/Core/Repository/SaveItem';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {FakeCreateChecklistInteractorRepo}
	from '@copor/checklist/client/Checklist/CreateChecklist/repo/fake/FakeCreateChecklistInteractorRepo';
import {SaveChecklistDTO} from '@copor/checklist/domain/Checklist/interactor/dto/SaveChecklistDTO';
import {KyselyCreateChecklistInteractorRepo}
	from '@copor/checklist/client/Checklist/CreateChecklist/repo/kysely/KyselyCreateChecklistInteractorRepo';

export class CreateChecklistInteractorRepoPicker extends NewRepositoryPicker<SaveItem<SaveChecklistDTO>> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) => SaveItem<SaveChecklistDTO>> {
		return {
			[DBEnv.FAKE]: FakeCreateChecklistInteractorRepo,
			[DBEnv.KYSELY]: KyselyCreateChecklistInteractorRepo
		};
	}
}
