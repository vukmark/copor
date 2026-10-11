import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {SaveStateRepo} from '@copor/core/domain/Components/State/repository/SaveStateRepo';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {
	FakeUpdateStateInteractorRepo
} from '@copor/core/client/Components/State/UpdateState/repo/fake/FakeUpdateStateInteractorRepo';
import {
	KyselyUpdateStateInteractorRepo
} from '@copor/core/client/Components/State/UpdateState/repo/kysely/KyselyUpdateStateInteractorRepo';

export class UpdateStateInteractorRepoPicker extends NewRepositoryPicker<SaveStateRepo> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) => SaveStateRepo> {
		return {
			[DBEnv.FAKE]: FakeUpdateStateInteractorRepo,
			[DBEnv.KYSELY]: KyselyUpdateStateInteractorRepo
		};
	}
}
