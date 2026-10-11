import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {SaveNativeLanguageRepo} from '@copor/core/domain/Components/NativeLanguage/repository/SaveNativeLanguageRepo';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {FakeUpdateNativeLanguageInteractorRepo} from '../fake/FakeUpdateNativeLanguageInteractorRepo';
import {
	KyselyUpdateNativeLanguageInteractorRepo
} from '@copor/core/client/Components/NativeLanguage/UpdateNativeLanguage/repo/kysely/KyselyUpdateNativeLanguageInteractorRepo';

export class UpdateNativeLanguageInteractorRepoPicker extends NewRepositoryPicker<SaveNativeLanguageRepo> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) => SaveNativeLanguageRepo> {
		return {
			[DBEnv.FAKE]: FakeUpdateNativeLanguageInteractorRepo,
			[DBEnv.KYSELY]: KyselyUpdateNativeLanguageInteractorRepo
		};
	}
}
