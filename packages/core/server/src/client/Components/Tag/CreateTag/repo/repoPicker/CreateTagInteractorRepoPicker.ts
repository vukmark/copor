import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {SaveItem} from '@copor/core/domain/Core/Repository/SaveItem';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {FakeCreateTagInteractorRepo} from '../fake/FakeCreateTagInteractorRepo';
import {SaveTagDTO} from '@copor/core/domain/Components/Tag/interactor/dto/SaveTagDTO';
import {
	KyselyCreateTagInteractorRepo
} from "@copor/core/client/Components/Tag/CreateTag/repo/kysely/KyselyCreateTagInteractorRepo";

export class CreateTagInteractorRepoPicker
	extends NewRepositoryPicker<SaveItem<SaveTagDTO>> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext)
	=> SaveItem<SaveTagDTO>> {
		return {
			[DBEnv.FAKE]: FakeCreateTagInteractorRepo,
			[DBEnv.KYSELY]: KyselyCreateTagInteractorRepo
		};
	}
}
