import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {SaveItem} from '@copor/core/domain/Core/Repository/SaveItem';
import {SaveLanguageDTO} from '@copor/core/domain/Components/Language/interactor/dto/SaveLanguageDTO';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {FakeCreateLanguageInteractorRepo} from '../fake/FakeCreateLanguageInteractorRepo';
import {
	KyselyCreateLanguageInteractorRepo
} from '@copor/core/client/Components/Language/CreateLanguage/repo/kysely/KyselyCreateLanguageInteractorRepo';

export class CreateLanguageInteractorRepoPicker extends NewRepositoryPicker<SaveItem<SaveLanguageDTO>> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) => SaveItem<SaveLanguageDTO>> {
		return {
			[DBEnv.FAKE]: FakeCreateLanguageInteractorRepo,
			[DBEnv.KYSELY]: KyselyCreateLanguageInteractorRepo
		};
	}
}
