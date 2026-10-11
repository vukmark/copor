import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {FakeUpdateChecklistInteractorRepo} from '../fake/FakeUpdateChecklistInteractorRepo';
import {UpdateChecklistRepo} from '@copor/checklist/domain/Checklist/repository/UpdateChecklistRepo';
import {
    KyselyUpdateChecklistInteractorRepo
} from '@copor/checklist/client/Checklist/UpdateChecklist/repo/kysely/KyselyUpdateChecklistInteractorRepo';

export class UpdateChecklistInteractorRepoPicker extends NewRepositoryPicker<UpdateChecklistRepo> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) => UpdateChecklistRepo> {
		return {
			[DBEnv.FAKE]: FakeUpdateChecklistInteractorRepo,
			[DBEnv.KYSELY]: KyselyUpdateChecklistInteractorRepo
		};
	}
}
