import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {DeleteItem} from '@copor/core/domain/Core/Repository/DeleteItem';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {FakeDeleteNativeLanguageInteractorRepo} from '../fake/FakeDeleteNativeLanguageInteractorRepo';
import {
	KyselyDeleteNativeLanguageInteractorRepo
} from '@copor/core/client/Components/NativeLanguage/DeleteNativeLanguage/repo/kysely/KyselyDeleteNativeLanguageInteractorRepo';

export class DeleteNativeLanguageInteractorRepoPicker extends NewRepositoryPicker<DeleteItem> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) => DeleteItem> {
		return {
			[DBEnv.FAKE]: FakeDeleteNativeLanguageInteractorRepo,
			[DBEnv.KYSELY]: KyselyDeleteNativeLanguageInteractorRepo
		};
	}
}
