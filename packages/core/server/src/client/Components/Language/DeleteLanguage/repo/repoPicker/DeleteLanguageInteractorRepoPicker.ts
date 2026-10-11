import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {DeleteItem} from '@copor/core/domain/Core/Repository/DeleteItem';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {FakeDeleteLanguageInteractorRepo} from '../fake/FakeDeleteLanguageInteractorRepo';
import {
	KyselyDeleteLanguageInteractorRepo
} from '@copor/core/client/Components/Language/DeleteLanguage/repo/kysely/KyselyDeleteLanguageInteractorRepo';

export class DeleteLanguageInteractorRepoPicker extends NewRepositoryPicker<DeleteItem> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) => DeleteItem> {
		return {
			[DBEnv.FAKE]: FakeDeleteLanguageInteractorRepo,
			[DBEnv.KYSELY]: KyselyDeleteLanguageInteractorRepo
		};
	}
}
