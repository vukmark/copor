import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {GetItem} from '@copor/core/domain/Core/Repository/GetItem';
import {GetChecklistDTO} from '@copor/checklist/domain/Checklist/interactor/dto/GetChecklistDTO';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {FakeGetChecklistInteractorRepo} from '../fake/FakeGetChecklistInteractorRepo';
import {KyselyGetChecklistInteractorRepo}
	from '@copor/checklist/client/Checklist/GetChecklist/repo/kysely/KyselyGetChecklistInteractorRepo';

export class GetChecklistInteractorRepoPicker extends NewRepositoryPicker<GetItem<GetChecklistDTO>> {
	protected getRepositoryList(): Record<string, new () => GetItem<GetChecklistDTO>> {
		return {
			[DBEnv.KYSELY]: KyselyGetChecklistInteractorRepo,
			[DBEnv.FAKE]: FakeGetChecklistInteractorRepo
		};
	}
}
