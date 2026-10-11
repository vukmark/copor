import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {SaveItem} from '@copor/core/domain/Core/Repository/SaveItem';
import {SaveStateDTO} from '@copor/core/domain/Components/State/interactor/dto/SaveStateDTO';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {
	FakeCreateStateInteractorRepo
} from '@copor/core/client/Components/State/CreateState/repo/fake/FakeCreateStateInteractorRepo';
import {
	KyselyCreateStateInteractorRepo
} from '@copor/core/client/Components/State/CreateState/repo/kysely/KyselyCreateStateInteractorRepo';

export class CreateStateInteractorRepoPicker extends NewRepositoryPicker<SaveItem<SaveStateDTO>> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) => SaveItem<SaveStateDTO>> {
		return {
			[DBEnv.FAKE]: FakeCreateStateInteractorRepo,
			[DBEnv.KYSELY]: KyselyCreateStateInteractorRepo
		};
	}
}